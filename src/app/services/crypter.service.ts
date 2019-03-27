import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CryptInfo } from '../models/crypt-info';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrypterService {

  constructor(private http: HttpClient) { }

  encrypt(msg: string, t: number, email: string): Promise<CryptInfo> {
    const user = sessionStorage.getItem('username');
    const body: CryptInfo = {
      message: msg,
      time: t,
      username: user,
      to: email
    };
    return new Promise((res, rej) =>
      this.http.post(`${environment.url}/encrypt`, body).subscribe(res, rej));
  }

  decrypt(key: string, image: string): Promise<CryptInfo> {
    const username = sessionStorage.getItem('username');
    const body: CryptInfo = { image, key, username };

    return new Promise((res, rej) =>
    this.http.post(`${environment.url}/decrypt`, body).subscribe(res, rej));
  }
}
