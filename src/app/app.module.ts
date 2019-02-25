import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CrypterComponent } from './components/crypter/crypter.component';
import { EncryptComponent } from './components/encrypt/encrypt.component';
import { DecryptComponent } from './components/decrypt/decrypt.component';
import { HeaderInterceptorService } from './services/header-interceptor.service';
import { ModalComponent } from './components/modal/modal.component';

import { MatDialogModule } from '@angular/material';
import { DomSecurePipe } from './pipes/dom-secure.pipe';


@NgModule({
  entryComponents: [
    ModalComponent
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    CrypterComponent,
    EncryptComponent,
    DecryptComponent,
    ModalComponent,
    DomSecurePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }