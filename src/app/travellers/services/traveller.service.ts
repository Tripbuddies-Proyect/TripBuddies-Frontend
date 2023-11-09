import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, retry, throwError} from "rxjs";
import {Traveller} from "../models/traveller";
import {Favorite} from "../models/favorite";
import {Places} from "../../bussiness/model/places";
import {Friendship} from "../models/friendship";
import {Review} from "../models/review";
import {Adquisicions} from "../models/Adquisicions";

@Injectable({
  providedIn: 'root'
})
export class TravellerService {
  basicUserURL = "https://tripbuddies-backend-production.up.railway.app/api/v1/users";
  baseURL = "https://tripbuddies-backend-production.up.railway.app/api/v1/travellers";
  favoriteURL = "https://tripbuddies-backend-production.up.railway.app/api/v1/favorites";
  matchURL = "https://tripbuddies-backend-production.up.railway.app/api/v1/friendship";
  placesURL = "https://tripbuddies-backend-production.up.railway.app/api/v1/places";
  findPlacesbyDestinoURL = "https://tripbuddies-backend-production.up.railway.app/api/v1/places/destino";
  PostReviewURL= "https://tripbuddies-backend-production.up.railway.app/api/reviews/places"
  ReviewURL = "https://tripbuddies-backend-production.up.railway.app/api/reviews";
  ReviewPlacesURL = "https://tripbuddies-backend-production.up.railway.app/api/reviews/places";
  AdqusisiconURL = "https://tripbuddies-backend-production.up.railway.app/api/v1/Adquisicions";




  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log(`An error occurred: ${error.error.message}`);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
    return throwError(
      'something happened with request, please try again later'
    );
  }


  GetAdquisicionById(id: number): Observable<Adquisicions>{
    return this.http.get<Adquisicions>(`${this.AdqusisiconURL}/${id}`, this.httpOptions).
    pipe(retry(2), catchError(this.handleError));
  }

  PostAdquisicon(adquisicion: Adquisicions,PlacesId:number,TravellerId:number): Observable<Adquisicions>{
    return this.http.post<Adquisicions>(`${this.AdqusisiconURL}/${TravellerId}/place/${PlacesId}`, JSON.stringify(adquisicion), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  VerifyAdquisicion(TravellerId:number,PlaceId:number): Observable<Adquisicions>{
    return this.http.get<Adquisicions>(`${this.AdqusisiconURL}/traveller/${TravellerId}/place/${PlaceId}`, this.httpOptions).pipe(retry(2), catchError(this.handleError));
  }


  GetAdquisicionByTravellerId(id: number): Observable<Adquisicions>{
    return this.http.get<Adquisicions>(`${this.AdqusisiconURL}/traveller/${id}`, this.httpOptions).pipe(retry(2), catchError(this.handleError));
  }



  GetAllTravellers(): Observable<any>{
    return this.http.get<Traveller>(this.baseURL, this.httpOptions).
    pipe(retry(2), catchError(this.handleError));
  }
  GetTravellerById(id: number): Observable<Traveller>{
    return this.http
      .get<Traveller>(`${this.baseURL}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  AddFavorite(userId:number, placeId: number): Observable<Favorite>{
    return this.http.post<Favorite>(`https://tripbuddies-backend-production.up.railway.app/api/v1/favorites/${userId}/${placeId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  UpdateTraveller(traveller: Traveller): Observable<Traveller>{
    return this.http
      .put<Traveller>(`${this.baseURL}/${traveller.id}`, JSON.stringify(traveller), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  GetAllPlaces(): Observable<Places>{
    return this.http.get<Places>(this.placesURL, this.httpOptions).
    pipe(retry(2), catchError(this.handleError));
  }
  AddMatch(id: number, friend: any): Observable<Friendship>{
    return this.http.post<Friendship>(`https://tripbuddies-backend-production.up.railway.app/api/v1/friendship/${id}`, JSON.stringify(friend), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  //Messagess
  GetContacts(userId: number): Observable<Object>{
    return this.http.get<Object>(`https://tripbuddies-backend-production.up.railway.app/api/v1/users/${userId}/messages/LastMessageTraveller`, this.httpOptions).
    pipe(retry(2), catchError(this.handleError));
  }
  GetMessages(contactId: number, UserId:number): Observable<object> {
    return this.http
      .get(`https://tripbuddies-backend-production.up.railway.app/api/v1/users/${UserId}/messages/${contactId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  SendMessage(answer: Object, contactId: number, userId: number): Observable<object>{
    return this.http.
      post<object>(`https://tripbuddies-backend-production.up.railway.app/api/v1/users/${userId}/messages/${contactId}`, answer, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  //Notification
  GetNotificationsByUserId(id:number, userId: number): Observable<object>{
    return this.http.get<object>(`${this.basicUserURL}/${userId}/notifications/${id}`, this.httpOptions).
    pipe(retry(2), catchError(this.handleError));
  }

  SendNotification(notification: Object, userId: number, UserId: number): Observable<object>{
    return this.http.post<object>(`${this.basicUserURL}/${userId}/notifications/${UserId}`, JSON.stringify(notification), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  GetAllNotifications(id: number): Observable<object>{
    return this.http.get<object>(`${this.basicUserURL}/${id}/notifications`, this.httpOptions).
    pipe( retry(2), catchError(this.handleError));
  }
  DeleteNotificationById(id: number, userId: number): Observable<object>{
    return this.http.delete<object>(`${this.basicUserURL}/${userId}/notifications/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  //--Notifications
  GetMatchByID(id: number): Observable<Object>{
    return this.http.get<any>(`https://tripbuddies-backend-production.up.railway.app/api/v1/friendship/user/${id}`, this.httpOptions).
    pipe(retry(2), catchError(this.handleError));
  }
  DeleteMatch(id: number){
    return this.http.delete(`${this.matchURL}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  DeleteFavorite(id: number): Observable<object>{
    return this.http.delete<object>(`${this.favoriteURL}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  PostReview(placesid: number,travellerId:number, review: Review): Observable<Review>{
    return this.http.post<any>(`${this.PostReviewURL}/${placesid}/traveller/${travellerId}`,review, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  GetPlacesByLocation(location: string): Observable<Places>{
    return this.http.get<Places>(`${this.findPlacesbyDestinoURL}/${location}`, this.httpOptions).
    pipe(retry(2), catchError(this.handleError));
  }
  GetReviewById(reviewId: number): Observable<any>{
    return this.http.put<any>(`${this.ReviewURL}/${reviewId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  GetReviewByPlaceId(placeId: number): Observable<any>{
    return this.http.get<any>(`${this.ReviewPlacesURL}/${placeId}`, this.httpOptions).
    pipe(retry(2), catchError(this.handleError));
  }




  getCurrentUser(userId: number): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/${userId}`, this.httpOptions)
      .pipe(
        catchError(this.handleError),
        // Encontrar el usuario con el ID correspondiente
        map((users: any[]) => users.find(user => user.id === userId))
      );
  }

  searchPlacesByLocation(searchLocation: any): Observable<any>{
    return this.http.get<any>(`${this.findPlacesbyDestinoURL}/${searchLocation}`, this.httpOptions)
      .pipe(retry(2),catchError(this.handleError));
  }

  GetPlacesById(id: any): Observable<any> {
    return this.http.get<any>(`${this.placesURL}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));

  }

  GetFavoriteById(id: any): Observable<any> {
    return this.http.get<any>(`${this.favoriteURL}/travellerId/${id}`, this.httpOptions)
      .pipe( retry(2), catchError(this.handleError));

  }
}
