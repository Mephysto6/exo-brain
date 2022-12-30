import { NgModule } from '@angular/core';
import { Router, PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PageActionAddComponent } from './actions/pages/page-action-add/page-action-add.component';
import { PageActionChangeComponent } from './actions/pages/page-action-change/page-action-change.component';
import { PageActionEditComponent } from './actions/pages/page-action-edit/page-action-edit.component';
import { PageActionListComponent } from './actions/pages/page-action-list/page-action-list.component';
import { PageActionViewComponent } from './actions/pages/page-action-view/page-action-view.component';
import { PageSettingsListComponent } from './settings/page-settings-list/page-settings-list.component';


const routes: Routes = [
  { path: "", redirectTo: "/take-action", pathMatch: "full" },

  // take action
  { path: 'take-action', component: PageActionViewComponent },

  //  preparation
  { path: 'preparation', component: PageActionListComponent },
  { path: 'preparation/edit', component: PageActionChangeComponent },
  { path: 'preparation/edit/:id', component: PageActionEditComponent },
  { path: 'preparation/add', component: PageActionAddComponent },

  // settings
  { path: 'settings', component: PageSettingsListComponent },

  // { path: "**", component: PageNotFoundComponent },
  // {
  //   path: '',
  //   loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private router: Router){
    console.log(this.router.config, 'tableau de routes')
  }
}
