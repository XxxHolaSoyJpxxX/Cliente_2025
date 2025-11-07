import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { MatInput } from '@angular/material/input';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButton,
    MatToolbar,
    MatInput,
    MatFormField,
    MatIcon,

  ],
  exports: [
    MatButton,
    MatToolbar,
    MatInput,
    MatFormField,
    MatIcon,
  ]
})
export class MaterialModule { }
