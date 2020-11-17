import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { MetricsComponent } from './metrics.component';
import { metricsRoute } from './metrics.route';
import { JvmMemoryComponent } from './jvm-memory/jvm-memory.component';
import { JvmThreadsComponent } from './jvm-threads/jvm-threads.component';
import { MetricsCacheComponent } from './metrics-cache/metrics-cache.component';
import { MetricsDatasourceComponent } from './metrics-datasource/metrics-datasource.component';
import { MetricsEndpointsRequestsComponent } from './metrics-endpoints-requests/metrics-endpoints-requests.component';
import { MetricsGarbageCollectorComponent } from './metrics-garbagecollector/metrics-garbagecollector.component';
import { MetricsModalThreadsComponent } from './metrics-modal-threads/metrics-modal-threads.component';
import { MetricsRequestComponent } from './metrics-request/metrics-request.component';
import { MetricsSystemComponent } from './metrics-system/metrics-system.component';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([metricsRoute])],
  declarations: [
    MetricsComponent,
    JvmMemoryComponent,
    JvmThreadsComponent,
    MetricsCacheComponent,
    MetricsDatasourceComponent,
    MetricsEndpointsRequestsComponent,
    MetricsGarbageCollectorComponent,
    MetricsModalThreadsComponent,
    MetricsRequestComponent,
    MetricsSystemComponent,
  ],
})
export class MetricsModule {}
