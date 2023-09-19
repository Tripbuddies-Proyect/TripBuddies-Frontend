import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, retry, throwError} from "rxjs";
import {Traveller} from "../models/traveller";
import {Favorite} from "../models/favorite";
import {Places} from "../../bussiness/model/places";
import {Friendship} from "../models/friendship";
import {Review} from "../models/review";

@Injectable({
  providedIn: 'root'
})
export class TravellerService {
  basicUserURL = "http://localhost:8080/api/v1/users";
  baseURL = "http://localhost:8080/api/v1/users";
  favoriteURL = "http://localhost:8080/api/v1/favorites";
  matchURL = "http://localhost:8080/api/v1/friendship";
  placesURL = "http://localhost:8080/api/v1/places";
  findPlacesURL = "http://localhost:8080/api/v1/places/location";
  PostReviewURL= "http://localhost:8080/api/reviews/places"
  ReviewURL = "http://localhost:8080/api/reviews";
  ReviewPlacesURL = "http://localhost:8080/api/reviews/places";
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
  GetAllTravellers(): Observable<any>{
    return this.http.get<Traveller>(this.baseURL, this.httpOptions).
    pipe(retry(2), catchError(this.handleError));
  }
  GetTravellerById(id: number): Observable<Traveller>{
    return this.http
      .get<Traveller>(`${this.baseURL}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  AddFavorite(id:number, fav: any): Observable<Favorite>{
    return this.http.post<Favorite>(`http://localhost:8080/api/v1/favorites/${id}`,JSON.stringify(fav), this.httpOptions)
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
    return this.http.post<Friendship>(`http://localhost:8080/api/v1/friendship/${id}`, JSON.stringify(friend), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  //Messagess
  GetContacts(userId: number): Observable<Object>{
    return this.http.get<Object>(`http://localhost:8080/api/v1/users/${userId}/messages/LastMessageTraveller`, this.httpOptions).
    pipe(retry(2), catchError(this.handleError));
  }
  GetMessages(contactId: number, UserId:number): Observable<object> {
    return this.http
      .get(`http://localhost:8080/api/v1/users/${UserId}/messages/${contactId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  SendMessage(answer: Object, contactId: number, userId: number): Observable<object>{
    return this.http.
      post<object>(`http://localhost:8080/api/v1/users/${userId}/messages/${contactId}`, answer, this.httpOptions)
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
    return this.http.get<any>(`http://localhost:8080/api/v1/friendship/user/${id}`, this.httpOptions).
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
  PostReview(travellerId: any, review: Review): Observable<any>{
    return this.http.post<any>(`${this.PostReviewURL}/${travellerId}`, JSON.stringify(review), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  GetPlacesByLocation(location: string): Observable<Places>{
    return this.http.get<Places>(`${this.findPlacesURL}/${location}`, this.httpOptions).
    pipe(retry(2), catchError(this.handleError));
  }
  UpdateReview(reviewId: number): Observable<any>{
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
    return this.http.get<any>(`${this.findPlacesURL}/${searchLocation}`, this.httpOptions)
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
