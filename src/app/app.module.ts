import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { ChatComponent } from './chat/chat.component';
import { HomeComponent } from './home/home.component';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MatIconModule} from '@angular/material/icon';
import {SwingModule} from 'angular2-swing';

import { DirectoryComponent } from './directory/directory.component';
import { Title, Meta } from '@angular/platform-browser';
import { PlacesComponent } from './places/places.component';
import { TravelComponent } from './travel/travel.component';
import { MoviesComponent } from './movies/movies.component';
import { HomenomapComponent } from './homenomap/homenomap.component';
import { AboutComponent } from './about/about.component';
import { PrivactComponent } from './privact/privact.component';
@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    HomeComponent,
    DirectoryComponent,
    PlacesComponent,
    TravelComponent,
    MoviesComponent,
    HomenomapComponent,
    AboutComponent,
    PrivactComponent
  ],
  imports: [
   HttpClientModule,
   ClipboardModule,
  
    BrowserModule,
    MatSliderModule,
    MatIconModule,
    HammerModule,
    SwingModule,
   AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAc8XGVul5dg7dZJT9Bfa3gEXaxVUcVE70'
    }),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
   

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
