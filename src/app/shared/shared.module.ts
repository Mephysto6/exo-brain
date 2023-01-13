import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormErrorComponent } from './components/form-error/form-error.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { BtnComponent } from './components/btn/btn.component';
import { IonicModule } from '@ionic/angular';
import { DonePipe } from './pipes/done.pipe';



@NgModule({
  declarations: [
    FormErrorComponent,
    FooterComponent,
    HeaderComponent,
    BtnComponent,
    DonePipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    IonicModule,
  ],
  exports: [
    FormErrorComponent,
    FooterComponent,
    HeaderComponent,
    BtnComponent,
    DonePipe,
  ],
})
export class SharedModule { }
