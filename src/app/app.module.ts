import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BussinessComponent } from './public/register/bussiness/bussiness.component';
import { TravellerComponent } from './public/register/traveller/traveller.component';
import { DialogBoxComponent } from './public/register/dialog-box/dialog-box.component';
import { DialogBoxInvalidFormComponent } from './public/register/dialog-box-invalid-form/dialog-box-invalid-form.component';
import {MatIconModule} from "@angular/material/icon";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { PageNotfoundComponent } from './public/page-notfound/page-notfound.component';
import { RegisterComponent } from './public/register/register/register-page/register.component';
import { LoginComponent } from './public/login/login.component';
import {HttpClientModule} from "@angular/common/http";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSortModule} from "@angular/material/sort";
import {MatCardModule} from "@angular/material/card";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatSelectModule} from "@angular/material/select";
import {MatRadioModule} from "@angular/material/radio";
import {MatDialogModule} from "@angular/material/dialog";
import {MatNativeDateModule, MatRippleModule} from "@angular/material/core";
import {ScrollingModule} from "@angular/cdk/scrolling";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatDividerModule} from "@angular/material/divider";
import {MatBadgeModule} from "@angular/material/badge";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { HomeTravellerComponent } from './travellers/pages/home-traveller/home-traveller.component';
import { MessagesTravellerComponent } from './travellers/pages/messages-traveller/messages-traveller.component';
import { NotificationTravellerComponent } from './travellers/pages/notification-traveller/notification-traveller.component';
import { ProfileTravellerComponent } from './travellers/pages/profile-traveller/profile-traveller.component';
import { FavoritesTravellerComponent } from './travellers/pages/favorites-traveller/favorites-traveller.component';
import { MatchsTravellerComponent } from './travellers/pages/matchs-traveller/matchs-traveller.component';
import { HomeBussinessComponent } from './bussiness/pages/home-bussiness/home-bussiness.component';
import { PlacesBussinessComponent } from './bussiness/pages/places-bussiness/places-bussiness.component';
import { PostPlacesBussinessComponent } from './bussiness/pages/plans-bussiness/post-places-bussiness/post-places-bussiness.component';
import { EditPlaceComponent } from './bussiness/pages/plans-bussiness/edit-place/edit-place.component';
import { MessagesBussinessComponent } from './bussiness/pages/messages-bussiness/messages-bussiness.component';
import { NotificationBussinessComponent } from './bussiness/pages/notification-bussiness/notification-bussiness.component';
import { PlansBussinessComponent } from './bussiness/pages/plans-bussiness/plans-bussiness.component';
import { ProfileBussinessComponent } from './bussiness/pages/profile-bussiness/profile-bussiness.component';
import { EditprofileComponent } from './bussiness/pages/profile-bussiness/editprofile/editprofile.component';
import { DestinationsTravellerComponent } from './travellers/pages/destinations-traveller/destinations-traveller.component';
import { NotificationDialogComponent } from './bussiness/pages/home-bussiness/notification-dialog/notification-dialog.component';
import {TravellersComponent} from './travellers/traveller.component';
import { MessageDialogComponent } from './travellers/pages/messages-traveller/message-dialog/message-dialog.component'
import {NotificationTravellerDialogComponent} from "./travellers/pages/home-traveller/notification-dialog/notification-dialog.component";
import {MatListModule} from "@angular/material/list";
import { PlacesSearchComponent } from './travellers/pages/places-search/places-search.component';
import { ReviewsPlacesComponent } from './travellers/pages/places-search/reviews-places/reviews-places.component';
import {CdkColumnDef} from "@angular/cdk/table";
import { BusinessComponent } from './bussiness/pages/business/business.component';
import { AddCardDialogComponent } from './bussiness/pages/add-card-dialog/add-card-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    BussinessComponent,
    TravellerComponent,
    DialogBoxComponent,
    DialogBoxInvalidFormComponent,
    PageNotfoundComponent,
    RegisterComponent,
    LoginComponent,
    HomeTravellerComponent,
    MessagesTravellerComponent,
    NotificationTravellerComponent,
    ProfileTravellerComponent,
    FavoritesTravellerComponent,
    MatchsTravellerComponent,
    HomeBussinessComponent,
    PlacesBussinessComponent,
    PostPlacesBussinessComponent,
    EditPlaceComponent,
    MessagesBussinessComponent,
    NotificationBussinessComponent,
    PlansBussinessComponent,
    ProfileBussinessComponent,
    EditprofileComponent,
    DestinationsTravellerComponent,
    NotificationDialogComponent,
    TravellersComponent,
    MessageDialogComponent,
    NotificationTravellerDialogComponent,
    PlacesSearchComponent,
    ReviewsPlacesComponent,
    BusinessComponent,
    AddCardDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSortModule,
    MatCardModule,
    MatGridListModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDialogModule,
    MatRippleModule,
    ScrollingModule,
    MatSidenavModule,
    MatDividerModule,
    MatRippleModule,
    ScrollingModule,
    MatBadgeModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule
  ],
  providers: [
    CdkColumnDef
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
