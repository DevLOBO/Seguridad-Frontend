import { NgModule } from '@angular/core';
import { MatDialogModule, MatToolbarModule } from '@angular/material';

@NgModule({
  imports: [
    MatDialogModule,
    MatToolbarModule
  ],
  exports: [
    MatDialogModule,
    MatToolbarModule
  ]
})
export class MaterialModule { }
