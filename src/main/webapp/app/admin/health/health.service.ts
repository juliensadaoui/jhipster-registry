import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { Route } from 'app/shared/routes/route.model';
import { Health } from './health.model';

@Injectable({ providedIn: 'root' })
export class HealthService {
  constructor(private http: HttpClient) {}

  checkHealth(): Observable<Health> {
    return this.http.get<Health>(SERVER_API_URL + 'management/health');
  }

  // get the instance's health
  checkInstanceHealth(instance: Route | undefined): Observable<Health> {
    if (instance!.prefix.length > 0) {
      return this.http.get<Health>(SERVER_API_URL + instance!.prefix + '/management/health');
    }
    return this.checkHealth();
  }
}
