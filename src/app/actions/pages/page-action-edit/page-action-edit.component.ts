import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionsService } from 'src/app/shared/services/actions.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Action } from 'src/app/core/models/action';
import { FormActionComponent } from '../../components/form-action/form-action.component';

@Component({
  selector: 'app-page-action-edit',
  templateUrl: './page-action-edit.component.html',
  styleUrls: ['./page-action-edit.component.scss'],
})
export class PageActionEditComponent implements OnInit {
  @ViewChildren(FormActionComponent) formActionComponent !: QueryList<FormActionComponent> ;
  public item !: Action;

  constructor(
    public actionService : ActionsService,
    private activatedRoute : ActivatedRoute,
    private router : Router,
  ) {

  }

  async ngOnInit() {
    let id = Number(this.activatedRoute.snapshot.paramMap.get('id')) ;
    console.log("TYPE OF ID", typeof id, "ID", id)

    this.item = await this.actionService.getActionDetails(id) ;
  }

  async onEdit(obj: Action) {
    console.log("on edit obj : ", obj)
    await this.actionService.updateAction(obj.id, obj)
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
