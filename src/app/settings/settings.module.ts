import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { PageSettingsListComponent } from './page-settings-list/page-settings-list.component';
import { FormImportDbComponent } from '../settings/form-import-db/form-import-db.component';
import { ClipboardModule } from '@angular/cdk/clipboard';

import { FormBuilder, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PageSettingsListComponent,
    FormImportDbComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    ClipboardModule,
  ],
  exports: [
    PageSettingsListComponent,
  ],
})
export class SettingsModule { }
