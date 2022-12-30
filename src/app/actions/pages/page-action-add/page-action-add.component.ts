import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionsService } from 'src/app/shared/services/actions.service';
import { Router } from '@angular/router';
import { Action } from 'src/app/core/models/action';

@Component({
  selector: 'app-page-action-add',
  templateUrl: './page-action-add.component.html',
  styleUrls: ['./page-action-add.component.scss'],
})
export class PageActionAddComponent implements OnInit {

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

}
