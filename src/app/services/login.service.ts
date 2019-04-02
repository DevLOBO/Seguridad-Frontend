import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { ResponseLogin } from '../models/response-login';
import { Observable } from 'rxjs';
import { interval, of } from 'rxjs';
import { map, take, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../ngrx/app.reducer';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient, private router: Router, private store: Store<AppState>) {}

  login(user: User): Observable<ResponseLogin> {
    return this.http.post(`${environment.url}/login`, user);
  }

  isExpired() {
    const that = this;
    return that.store.select('auth').pipe(
      switchMap(auth => {
        const time = Math.floor((new Date(auth.expiration).getTime() - new Date().getTime()) / 1000) + 1;
        console.log(time);

        return interval(1000).pipe(
          map(n => (time - n - 1) <= 0),
          take(time <= 0 ? 1 : time)
        );
      })
    );
  }
}
