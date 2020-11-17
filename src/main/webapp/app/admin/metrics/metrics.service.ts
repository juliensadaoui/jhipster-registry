import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { Route } from 'app/shared/routes/route.model';
import { Metrics, ThreadDump } from './metrics.model';

@Injectable({ providedIn: 'root' })
export class MetricsService {
  constructor(private http: HttpClient) {}

  // get the Registry's metrics
  getMetrics(): Observable<Metrics> {
    return this.http.get<Metrics>(SERVER_API_URL + 'management/jhimetrics');
  }

  // get the instance's metrics
  getInstanceMetrics(instance: Route | undefined): Observable<Metrics> {
    if (instance!.prefix.length > 0) {
      return this.http.get<Metrics>(SERVER_API_URL + instance!.prefix + '/management/jhimetrics');
    }
    return this.getMetrics();
  }

  threadDump(): Observable<ThreadDump> {
    return this.http.get<ThreadDump>(SERVER_API_URL + 'management/threaddump');
  }

  instanceThreadDump(instance: Route | undefined): Observable<ThreadDump> {
    if (instance!.prefix.length > 0) {
      return this.http.get<ThreadDump>(SERVER_API_URL + instance!.prefix + '/management/threaddump');
    }
    return this.threadDump();
  }
}
