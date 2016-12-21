import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {BrowserModule} from '@angular/platform-browser'
import { FormsModule } from '@angular/forms';
import { TableComponent} from './table.component';


@NgModule({
    imports: [RouterModule,BrowserModule,FormsModule],
    declarations: [TableComponent],
    exports: [TableComponent]
})

export class TableModule { }