import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CryptInfo } from '../models/crypt-info';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrypterService {

  constructor(private http: HttpClient) { }

  encrypt(body: CryptInfo): Observable<CryptInfo> {
    return this.http.post(`${environment.url}/encrypt`, body);
  }

  decrypt(body: CryptInfo): Observable<CryptInfo> {
    return this.http.post(`${environment.url}/decrypt`, body);
  }
}
