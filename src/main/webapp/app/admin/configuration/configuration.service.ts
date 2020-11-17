import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { Route } from 'app/shared/routes/route.model';
import { Bean, Beans, ConfigProps, Env, PropertySource } from './configuration.model';

@Injectable({ providedIn: 'root' })
export class ConfigurationService {
  constructor(private http: HttpClient) {}

  getBeans(prefix: string = ''): Observable<Bean[]> {
    return this.http.get<ConfigProps>(SERVER_API_URL + prefix + 'management/configprops').pipe(
      map(configProps =>
        Object.values(
          Object.values(configProps.contexts)
            .map(context => context.beans)
            .reduce((allBeans: Beans, contextBeans: Beans) => ({ ...allBeans, ...contextBeans }))
        )
      )
    );
  }

  getInstanceBeans(instance: Route | undefined): Observable<Bean[]> {
    if (instance!.prefix.length > 0) {
      return this.getBeans(instance!.prefix + '/');
    }
    return this.getBeans();
  }

  getPropertySources(prefix: string = ''): Observable<PropertySource[]> {
    return this.http.get<Env>(SERVER_API_URL + prefix + 'management/env').pipe(map(env => env.propertySources));
  }

  getInstancePropertySources(instance: Route | undefined): Observable<PropertySource[]> {
    if (instance!.prefix.length > 0) {
      return this.getPropertySources(instance!.prefix + '/');
    }
    return this.getPropertySources();
  }
}
