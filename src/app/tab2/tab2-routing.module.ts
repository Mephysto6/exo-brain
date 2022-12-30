import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { FormActionComponent } from '../shared/components/form-action/form-action.component';
import { Tab2Page } from './tab2.page';


const routes: Routes = [
  {
    path: '',
    component: Tab2Page,
  },
  // {
  //   path: "/edit",
  //   component: FormActionComponent,
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab2PageRoutingModule {}
