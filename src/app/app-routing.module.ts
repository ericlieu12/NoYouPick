import { DirectoryComponent } from './directory/directory.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { PlacesComponent } from './places/places.component';
import { TravelComponent } from './travel/travel.component';
import { MoviesComponent } from './movies/movies.component';
import { HomenomapComponent } from './homenomap/homenomap.component';
import { AboutComponent } from './about/about.component';
import { PrivactComponent } from './privact/privact.component';
const routes: Routes = [
  { path: 'restaurants', component: HomeComponent },
  { path: 'privacy', component: PrivactComponent },
  { path: 'about', component: AboutComponent },
  { path: 'places', component: HomeComponent },
  { path: 'travel', component: HomeComponent },
  { path: 'movies', component: HomenomapComponent },
  { path: 'places/:id', component: PlacesComponent },
  { path: 'restaurants/:id', component: ChatComponent },
  { path: 'travel/:id', component: TravelComponent },
  { path: 'movies/:id', component: MoviesComponent },
  { path: '', component: DirectoryComponent},
  { path: '**', redirectTo: '/', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
