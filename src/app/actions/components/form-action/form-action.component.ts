import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionsService } from 'src/app/shared/services/actions.service';
import { Router } from '@angular/router';
import { Action } from 'src/app/core/models/action';

@Component({
  selector: 'app-form-action',
  templateUrl: './form-action.component.html',
  styleUrls: ['./form-action.component.scss'],
})
export class FormActionComponent implements OnInit {

  @Input() init!: Action;
  @Output() submitted = new EventEmitter<Action>() ;
  public form !: FormGroup;

  constructor(private fb: FormBuilder) {
    console.log(this.init); // undefined
  }

  ngOnInit() {
    console.log(this.init); // ??
    this.form = this.fb.group({
      id:[this.init.id],
      name: [this.init.name],
      time: [this.init.time],
      priority: [this.init.priority],
      repetition: [this.init.repetition],
      repetition_hour: [this.init.repetition_hour],
      repetition_day: [this.init.repetition_day],
      last_done: [this.init.last_done],
    });
  }

  onSubmit() {
    console.log("form ts", this.form.value) ;
    this.submitted.emit(this.form.value) ;
  }

}
