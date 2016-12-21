import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {BrowserModule} from '@angular/platform-browser'
import { FormsModule } from '@angular/forms';
import { FormComponent } from './forms.component';

@NgModule({
    imports: [RouterModule,BrowserModule,FormsModule],
    declarations: [FormComponent],
    exports: [FormComponent]
})

export class FormModule { }
