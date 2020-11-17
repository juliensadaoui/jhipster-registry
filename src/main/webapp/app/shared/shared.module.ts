import { NgModule } from '@angular/core';
import { SharedLibsModule } from './shared-libs.module';
import { AlertComponent } from './alert/alert.component';
import { AlertErrorComponent } from './alert/alert-error.component';
import { HasAnyAuthorityDirective } from './has-any-authority.directive';
import { DurationPipe } from './date/duration.pipe';
import { FormatMediumDatetimePipe } from './date/format-medium-datetime.pipe';
import { FormatMediumDatePipe } from './date/format-medium-date.pipe';
import { GroupByPipe } from './pipe/group-by.pipe';
import { RouteSelectorComponent } from './routes/route-selector.component';
import { RefreshSelectorComponent } from './refresh/refresh-selector.component';
import { SortByDirective } from './sort/sort-by.directive';
import { SortDirective } from './sort/sort.directive';
import { ItemCountComponent } from './item-count.component';

@NgModule({
  imports: [SharedLibsModule],
  declarations: [
    AlertComponent,
    AlertErrorComponent,
    HasAnyAuthorityDirective,
    DurationPipe,
    FormatMediumDatetimePipe,
    FormatMediumDatePipe,
    RouteSelectorComponent,
    RefreshSelectorComponent,
    SortByDirective,
    SortDirective,
    ItemCountComponent,
    GroupByPipe,
  ],
  exports: [
    SharedLibsModule,
    AlertComponent,
    AlertErrorComponent,
    HasAnyAuthorityDirective,
    DurationPipe,
    FormatMediumDatetimePipe,
    FormatMediumDatePipe,
    RouteSelectorComponent,
    RefreshSelectorComponent,
    SortByDirective,
    SortDirective,
    ItemCountComponent,
    GroupByPipe,
  ],
})
export class SharedModule {}
