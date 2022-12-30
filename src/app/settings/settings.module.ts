import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { PageSettingsListComponent } from './page-settings-list/page-settings-list.component';



@NgModule({
  declarations: [
    PageSettingsListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    IonicModule.forRoot(),
  ],
  exports: [
    PageSettingsListComponent,
  ],
})
export class SettingsModule { }
