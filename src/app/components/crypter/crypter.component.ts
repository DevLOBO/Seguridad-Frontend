import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/ngrx/app.reducer';

@Component({
  selector: 'app-crypter',
  templateUrl: './crypter.component.html',
  styles: []
})
export class CrypterComponent {
  roles: string[];

  constructor(
    private store: Store<AppState>
  ) {
    this.store.select('auth').subscribe(auth => {
      this.roles = auth.roles;
    });
    
  }
}
