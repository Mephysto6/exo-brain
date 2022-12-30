import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageActionViewComponent } from './pages/page-action-view/page-action-view.component';
import { PageActionListComponent } from './pages/page-action-list/page-action-list.component';
import { PageActionChangeComponent } from './pages/page-action-change/page-action-change.component';
import { PageActionEditComponent } from './pages/page-action-edit/page-action-edit.component';
import { PageActionAddComponent } from './pages/page-action-add/page-action-add.component';

const routes: Routes = [
  { path: 'take-action', component: PageActionViewComponent },
  { path: 'preparation', component: PageActionListComponent },
  { path: 'preparation/edit', component: PageActionChangeComponent },
  { path: 'preparation/edit/:id', component: PageActionEditComponent },
  { path: 'preparation/add', component: PageActionAddComponent },

  // { path: 'orders/add', component: PageAddOrderComponent },
  // // :id = paramètre
  // { path: 'orders/edit/:id', component: PageEditOrderComponent },
  // { path: 'test', component: TestComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActionsRoutingModule { }
