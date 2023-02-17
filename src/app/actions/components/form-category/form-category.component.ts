import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-category',
  templateUrl: './form-category.component.html',
  styleUrls: ['./form-category.component.scss'],
})
export class FormCategoryComponent implements OnInit {

  @ViewChild('myForm') myForm!: NgForm;
  @Output() submitted = new EventEmitter<string>() ;
  @Input() show_button : boolean = true ;

  public form !: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    this.form = this.fb.group({
      category_name:[""],
    });

  }

  click_on_button() {
    this.show_button = false ;
  }

  onSubmit() {
    console.log("form ts", this.form.value) ;
    this.submitted.emit(this.form.value) ;
    this.ngOnInit()
    this.show_button = true ;
  }

}
