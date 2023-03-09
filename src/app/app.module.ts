import { getAuth, provideAuth } from '@angular/fire/auth';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { LoginPageComponent } from './features/auth/pages/login-page/login-page.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoginFormComponent } from './features/auth/components/login-form/login-form.component';
import { RegisterPageComponent } from './features/auth/pages/register-page/register-page.component';

@NgModule({
  declarations: [
    AppComponent, 
    DashboardComponent, 
    LoginPageComponent,
    LoginFormComponent,
    RegisterPageComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirebaseApp(() => initializeApp(environment.firebaseGK, 'anotherApp')),
    provideStorage(() => getStorage()),
    provideStorage(() => getStorage(getApp(), 'anotherBucket')),
    provideStorage(() => getStorage(getApp('anotherApp'))),
    provideFirestore(() => getFirestore()),
    provideFirestore(() => getFirestore(getApp())),
    provideFirestore(() => getFirestore(getApp('anotherApp'))),
    provideAuth(() => getAuth()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
