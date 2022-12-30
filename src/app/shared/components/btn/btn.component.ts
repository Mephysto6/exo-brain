import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-btn',
  templateUrl: './btn.component.html',
  styleUrls: ['./btn.component.scss'],
})
export class BtnComponent implements OnInit {

  @Input() label !: string;
  @Input() route !: string;
  @Input() btn_css !: string;

  // does not work as imported <app-btn>
  // but css factorisation does

  constructor() { }

  ngOnInit() {}

}
