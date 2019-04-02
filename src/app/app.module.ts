import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CrypterComponent } from './components/crypter/crypter.component';
import { EncryptComponent } from './components/encrypt/encrypt.component';
import { DecryptComponent } from './components/decrypt/decrypt.component';
import { HeaderInterceptorService } from './services/header-interceptor.service';
import { ModalComponent } from './components/modal/modal.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ReLoginComponent } from './components/re-login/re-login.component';

import { DomSecurePipe } from './pipes/dom-secure.pipe';

import { StoreModule } from '@ngrx/store';
import { appReducers } from './ngrx/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffect } from './ngrx/effects/auth.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { CrypterEffect } from './ngrx/effects/crypter.effects';

@NgModule({
  entryComponents: [
    ModalComponent,
    ReLoginComponent
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    CrypterComponent,
    EncryptComponent,
    DecryptComponent,
    ModalComponent,
    DomSecurePipe,
    ToolbarComponent,
    ReLoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    StoreModule.forRoot(appReducers),
    environment.production ? [] : StoreDevtoolsModule.instrument({maxAge:25}),
    EffectsModule.forRoot([AuthEffect, CrypterEffect])
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
