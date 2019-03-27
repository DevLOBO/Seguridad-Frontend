import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { ResponseLogin } from '../models/response-login';
import { Observable } from 'rxjs';
import { interval, of } from 'rxjs';
import { map, take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  dateExpiration: Date;

  constructor(private http: HttpClient, private router: Router) { }

  login(user: User) {
    return new Promise((res, rej) =>
      this.http.post(`${environment.url}/login`, user).subscribe((r: ResponseLogin) => {
        if (r.logged) {
          sessionStorage.setItem('token', r.token);
          sessionStorage.setItem('username', r.username);
          sessionStorage.setItem('roles', JSON.stringify(r.roles));
          this.dateExpiration = new Date(r.expiration);

          setTimeout(() => {
            this.router.navigate(['/crypter']);
            res();
          }, 200);
        }
      }, rej));
  }

  logout() {
    sessionStorage.clear();
    setTimeout(() => this.router.navigate(['/']), 100);
  }

  isExpired(): Observable<boolean> {
    const time = Math.floor((this.dateExpiration.getTime() - new Date().getTime()) / 1000) + 1;
    return interval(1000).pipe(
      map(n => (time - n - 1) <= 0),
      take(time <= 0 ? 1 : time)
    );
  }
}
