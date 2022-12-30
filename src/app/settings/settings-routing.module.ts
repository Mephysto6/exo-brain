import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageSettingsListComponent } from './page-settings-list/page-settings-list.component';


const routes: Routes = [
  { path: 'settings', component: PageSettingsListComponent },

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
