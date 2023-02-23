import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActionsService } from 'src/app/shared/services/actions.service';

@Component({
  selector: 'app-page-settings-list',
  templateUrl: './page-settings-list.component.html',
  styleUrls: ['./page-settings-list.component.scss'],
})
export class PageSettingsListComponent implements OnInit {
  public show_export : boolean = false ;
  public show_import : boolean = false ;

  public export_value !: string ;

  @ViewChild('myForm') myForm!: NgForm;

  constructor(
    public actionService : ActionsService,
  ) { }

  ngOnInit() {
  }

  on_reset_to_default() {
    this.actionService.resetSettings() ;
  }

  async on_reset_database() {
    await this.actionService.clear_keys() ;
  }

  async on_export_database() {
    this.export_value = await this.actionService.get_export() ;
    this.show_export = true ;
    this.show_import = false ;
  }
  async on_import_database() {
    this.show_export = false ;
    this.show_import = true ;
  }

  on_submit(obj: any) {
    console.log("form received : ", obj) ;
    console.log("db : ", obj.import_database) ;
    var imported_db = obj.import_database;
    if (this.check_valid_db(imported_db)) {
      this.actionService.set_import(imported_db) ;
    }
  }

  check_valid_db(input: string): boolean {
    // TODO : check imported db is valid
    return true;
  }
}
