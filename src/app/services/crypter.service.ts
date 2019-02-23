import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CryptInfo } from '../models/crypt-info';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrypterService {

  constructor(private http: HttpClient) { }

  encrypt(msg: string): Promise<CryptInfo> {
    return new Promise((res, rej) =>
      this.http.post(`${environment.url}/encrypt`, msg).subscribe(res, rej));
  }

  decrypt(key: string, image: string): Promise<CryptInfo> {
    const body: CryptInfo = { image, key };

    return new Promise((res, rej) =>
    this.http.post(`${environment.url}/decrypt`, body).subscribe(res, rej));
  }
}
