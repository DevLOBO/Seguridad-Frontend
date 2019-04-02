import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../ngrx/app.reducer';

@Injectable()
export class HeaderInterceptorService implements HttpInterceptor {
  token: string;

  constructor(private store: Store<AppState>) {
    this.store.select('auth').subscribe(auth => this.token = auth.token);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      }
    });
    
    return next.handle(request);
  }
}
