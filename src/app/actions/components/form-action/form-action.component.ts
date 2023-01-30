import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActionsService } from 'src/app/shared/services/actions.service';
import { Router } from '@angular/router';
import { Action } from 'src/app/core/models/action';

@Component({
  selector: 'app-form-action',
  templateUrl: './form-action.component.html',
  styleUrls: ['./form-action.component.scss'],
})
export class FormActionComponent implements OnInit {

  @ViewChild('myForm') myForm!: NgForm;
  @Input() init!: Action;
  @Output() submitted = new EventEmitter<Action>() ;

  public form !: FormGroup;
  public repetition_choices = ["ONCE", "DAILY", "WEEKLY"] ;
  public priority_choices = [0, 1, 2, 3] ;
  public days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  // public current_repetition = "ONCE" ;

  constructor(private fb: FormBuilder) {
    console.log(this.init); // undefined
  }

  ngOnInit() {
    console.log(this.init); // ??
    this.initForm() ;
    // this.current_repetition = this.init.repetition ;
    this.onChanges() ;
  }

  triggerYeetSubmit() : void {
    console.log("triggerYeetSubmit") ;
    this.myForm.ngSubmit.emit();
  }

  initForm() {
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
    this.enableOrDisable(this.init.repetition) ;
  }

  onChanges() {
    this.form.get('repetition')?.valueChanges
    .subscribe(selectedRepetition => {
      this.enableOrDisable(selectedRepetition) ;
    });
  }

  enableOrDisable(current_repetition: string) {
    if (current_repetition == "ONCE") {
      this.form.get('repetition_hour')?.reset();
      this.form.get('repetition_hour')?.disable();
      this.form.get('repetition_day')?.reset();
      this.form.get('repetition_day')?.disable();
    }
    else if (current_repetition == "DAILY") {
      this.form.get('repetition_hour')?.enable();
      this.form.get('repetition_day')?.reset();
      this.form.get('repetition_day')?.disable();
    }
    else if (current_repetition == "WEEKLY") {
      this.form.get('repetition_hour')?.enable();
      this.form.get('repetition_day')?.enable();
    }
  }

  onSubmit() {
    console.log("form ts", this.form.value) ;
    this.submitted.emit(this.form.value) ;
  }

}
