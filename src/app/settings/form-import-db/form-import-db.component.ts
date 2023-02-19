import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-import-db',
  templateUrl: './form-import-db.component.html',
  styleUrls: ['./form-import-db.component.scss'],
})
export class FormImportDbComponent implements OnInit {

  @ViewChild('myForm') myForm!: NgForm;
  @Output() submitted = new EventEmitter<string>() ;

  public form !: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      import_database:[""],
    });
  }

  onSubmit() {
    // console.log("form ts", this.form.value) ;
    this.submitted.emit(this.form.value) ;
    this.ngOnInit() ;
  }

}
