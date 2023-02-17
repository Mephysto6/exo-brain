import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { ActionsRoutingModule } from './actions-routing.module';

import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { IonicModule } from '@ionic/angular';
// pages
import { PageActionListComponent } from './pages/page-action-list/page-action-list.component';
import { PageActionViewComponent } from './pages/page-action-view/page-action-view.component';
import { PageActionEditComponent } from './pages/page-action-edit/page-action-edit.component';
import { PageActionChangeComponent } from './pages/page-action-change/page-action-change.component';
import { PageActionAddComponent } from './pages/page-action-add/page-action-add.component';

import { FormActionComponent } from './components/form-action/form-action.component';
import { FormCategoryComponent } from './components/form-category/form-category.component';
import { ActionCardComponent } from './components/action-card/action-card.component';
import { ButtonRefreshComponent } from './components/button-refresh/button-refresh.component';
import { PriorityIconComponent } from './components/priority-icon/priority-icon.component';

@NgModule({
  declarations: [
    PageActionListComponent,
    PageActionViewComponent,
    PageActionEditComponent,
    PageActionChangeComponent,
    PageActionAddComponent,
    FormActionComponent,
    FormCategoryComponent,
    ActionCardComponent,
    ButtonRefreshComponent,
    PriorityIconComponent,
  ],
  imports: [
    CommonModule,
    ActionsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule,
    IonicModule.forRoot(),
  ],
  exports: [
    PageActionListComponent,
    PageActionViewComponent,
    PageActionEditComponent,
    PageActionChangeComponent,
    PageActionAddComponent,
  ],
})
export class ActionsModule { }
