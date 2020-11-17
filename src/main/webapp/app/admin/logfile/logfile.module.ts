import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LogfileComponent } from 'app/admin/logfile/logfile.component';
import { logfileRoute } from 'app/admin/logfile/logfile.route';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([logfileRoute])],
  declarations: [LogfileComponent],
})
export class LogfileModule {}
