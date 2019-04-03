import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../ngrx/app.reducer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LogoutAction } from '../ngrx/actions/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AppState>) { }
  canActivate(): Observable<boolean> {
    return this.store.select('auth').pipe(map(a => a.authenticated && !a.locked)).pipe(
      map(t => {
        if (!t)
          this.store.dispatch(new LogoutAction());

        return t;
      })
    );
  }
}
