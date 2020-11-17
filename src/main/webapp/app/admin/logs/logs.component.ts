import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Route } from 'app/shared/routes/route.model';
import { RoutesService } from 'app/shared/routes/routes.service';
import { Level, Log, Logger, LoggersResponse } from './log.model';
import { LogsService } from './logs.service';

@Component({
  selector: 'jhi-logs',
  templateUrl: './logs.component.html',
})
export class LogsComponent implements OnInit, OnDestroy {
  loggers?: Log[];
  filteredAndOrderedLoggers?: Log[];
  filter = '';
  orderProp: keyof Log = 'name';
  ascending = true;

  activeRoute?: Route;
  routes?: Route[];
  unsubscribe$ = new Subject();

  constructor(private logsService: LogsService, private routesService: RoutesService) {}

  ngOnInit(): void {
    this.loggers = [];
    this.routesService.routeChanged$.pipe(takeUntil(this.unsubscribe$)).subscribe(route => {
      this.activeRoute = route;
      this.refreshActiveRouteLogs();
    });

    this.routesService.routesChanged$.pipe(takeUntil(this.unsubscribe$)).subscribe(routes => (this.routes = routes));
  }

  changeLevel(name: string, level: Level): void {
    if (this.activeRoute && this.activeRoute.status !== 'DOWN') {
      this.logsService
        .changeInstanceLevel(this.searchByAppName(), name, level)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(() => this.refreshActiveRouteLogs());
    }
  }

  searchByAppName(): Route[] {
    return this.routes!.filter(route => route.appName === this.activeRoute!.appName);
  }

  refreshActiveRouteLogs(): void {
    if (this.activeRoute && this.activeRoute.status !== 'DOWN') {
      this.logsService
        .findInstanceAll(this.activeRoute)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          (response: LoggersResponse) => {
            this.loggers = Object.entries(response.loggers).map((logger: [string, Logger]) => new Log(logger[0], logger[1].effectiveLevel));
            this.filterAndSort();
          },
          error => {
            if (error.status === 500 || error.status === 503 || error.status === 404) {
              this.routesService.routeDown(this.activeRoute);
            }
          }
        );
    } else {
      this.routesService.routeDown(this.activeRoute);
    }
  }

  filterAndSort(): void {
    this.filteredAndOrderedLoggers = this.loggers!.filter(
      logger => !this.filter || logger.name.toLowerCase().includes(this.filter.toLowerCase())
    ).sort((a, b) => {
      if (a[this.orderProp] < b[this.orderProp]) {
        return this.ascending ? -1 : 1;
      } else if (a[this.orderProp] > b[this.orderProp]) {
        return this.ascending ? 1 : -1;
      } else if (this.orderProp === 'level') {
        return a.name < b.name ? -1 : 1;
      }
      return 0;
    });
  }

  ngOnDestroy(): void {
    // prevent memory leak when component destroyed
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
