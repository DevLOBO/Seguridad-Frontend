import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { ResponseLogin } from '../models/response-login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient, private router: Router) { }

  login(user: User) {
    return new Promise((res, rej) =>
      this.http.post(`${environment.url}/login`, user).subscribe((r: ResponseLogin) => {
        if (r.logged) {
          sessionStorage.setItem('token', r.token);
          this.router.navigate(['/crypter']);
          res();
        } else {
          rej(r.error);
        }
      }));
  }
}
