import { Component } from '@angular/core';
import { Error } from '../../models/error';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/ngrx/app.reducer';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: []
})
export class ModalComponent {
  error: Error;

  constructor(private store: Store<AppState>) {
    this.store.select('crypter').subscribe(crypter => this.error = crypter.error);
  }
}
