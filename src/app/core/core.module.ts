import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionsModule } from 'src/app/actions/actions.module';
import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { NavComponent } from './components/nav/nav.component';
import { RouterModule } from '@angular/router';
import { SettingsModule } from '../settings/settings.module';



@NgModule({
  declarations: [
    NavComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    ActionsModule,
    SettingsModule,
    NavComponent,
  ],
})
export class CoreModule { }
