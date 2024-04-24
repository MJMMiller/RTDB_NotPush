import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getDatabase, provideDatabase} from '@angular/fire/database';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase()),
    provideFirebaseApp(() => initializeApp({"projectId":"rtdb---iot-7687c","appId":"1:522868287328:web:23f23f4b6c84828d4b6005","databaseURL":"https://rtdb---iot-7687c-default-rtdb.firebaseio.com","storageBucket":"rtdb---iot-7687c.appspot.com","apiKey":"AIzaSyDmFhG3Frq1_Bi9RPAVw0Ry5uNHqM47JE4","authDomain":"rtdb---iot-7687c.firebaseapp.com","messagingSenderId":"522868287328"})),],
    
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
