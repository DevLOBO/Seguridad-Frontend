import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { ResponseLogin } from '../models/response-login';
import { Observable, Subscription } from 'rxjs';
import { timer, of } from 'rxjs';
import { map, take, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../ngrx/app.reducer';
import { LockAction } from '../ngrx/actions/auth.actions';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  watchLock: Subscription;

  constructor(private http: HttpClient, private router: Router, private store: Store<AppState>) {
  }

  login(user: User): Observable<ResponseLogin> {
    return this.http.post(`${environment.url}/login`, user);
  }

  isExpired(): Observable<boolean> {
    const that = this;
    return that.store.select('auth').pipe(
      switchMap(auth => {
        const time = Math.floor((new Date(auth.expiration).getTime() - new Date().getTime()) / 1000) + 1;

        return timer(1, 1000).pipe(
          map(n => (time - n) <= 0),
          take(time <= 0 ? 1 : time + 1)
        );
      })
    );
  }

  startWatch() {
    this.watchLock = this.isExpired().subscribe(l => {
      if (l)
        this.store.dispatch(new LockAction());
    });
  }

  stopWatch() {
    this.watchLock.unsubscribe();
  }
}
