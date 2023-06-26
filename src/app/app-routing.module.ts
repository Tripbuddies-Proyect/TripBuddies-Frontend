import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from "./public/register/register/register-page/register.component";
import {TravellerComponent} from "./public/register/traveller/traveller.component";
import {BussinessComponent} from "./public/register/bussiness/bussiness.component";
import {PageNotfoundComponent} from "./public/page-notfound/page-notfound.component";
import {LoginComponent} from "./public/login/login.component";
import {TravellersComponent} from "./travellers/traveller.component";
import {HomeTravellerComponent} from "./travellers/pages/home-traveller/home-traveller.component";
import {
  NotificationTravellerComponent
} from "./travellers/pages/notification-traveller/notification-traveller.component";
import {MessagesTravellerComponent} from "./travellers/pages/messages-traveller/messages-traveller.component";
import {ProfileTravellerComponent} from "./travellers/pages/profile-traveller/profile-traveller.component";
import {FavoritesTravellerComponent} from "./travellers/pages/favorites-traveller/favorites-traveller.component";
import {MatchsTravellerComponent} from "./travellers/pages/matchs-traveller/matchs-traveller.component";
import {PlacesSearchComponent} from "./travellers/pages/places-search/places-search.component";
import {ReviewsPlacesComponent} from "./travellers/pages/places-search/reviews-places/reviews-places.component";

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'login', component: LoginComponent},
  {path: 'sign-up', component: RegisterComponent, children: [
      {path:'traveller', component: TravellerComponent},
      {path:'bussiness', component: BussinessComponent}
    ]
  },
  { path: 'travellers', component: TravellersComponent, children: [
      {path:'home', component: HomeTravellerComponent},
      {path: 'notifications', component: NotificationTravellerComponent},
      {path: 'profile', component: ProfileTravellerComponent},
      {path: 'messages', component: MessagesTravellerComponent},
      {path: 'favorites', component: FavoritesTravellerComponent},
      {path: 'matches', component: MatchsTravellerComponent},
      {path: 'search', component: PlacesSearchComponent},
      {path: 'reviews', component: ReviewsPlacesComponent},
  ]

  },
  { path: '**', component: PageNotfoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
