import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionsService } from 'src/app/shared/services/actions.service';
import { Router } from '@angular/router';
import { Action } from 'src/app/core/models/action';
import { FormActionComponent } from 'src/app/actions/components/form-action/form-action.component';

@Component({
  selector: 'app-page-action-add',
  templateUrl: './page-action-add.component.html',
  styleUrls: ['./page-action-add.component.scss'],
})
export class PageActionAddComponent implements OnInit {
  @ViewChildren(FormActionComponent) formActionComponent !: QueryList<FormActionComponent> ;

  public item: Action = new Action();

  constructor(
    public actionService : ActionsService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  async onAdd(obj: Action) {
    console.log("onAdd action", obj)
    await this.actionService.createAction(obj)
    this.router.navigate(["preparation"]) ;
    this.actionService.refresh()
  }

  yeetSubmit(): void {
    console.log("yeetSubmit") ;
    console.log("formActionComponent : ", this.formActionComponent) ;
    console.log("formActionComponent.first : ", this.formActionComponent.first) ;
    this.formActionComponent.first.triggerYeetSubmit();
 }
}
