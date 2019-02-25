import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Error } from '../../models/error';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: []
})
export class ModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public error: Error) {
    console.log(error);
  }
}
