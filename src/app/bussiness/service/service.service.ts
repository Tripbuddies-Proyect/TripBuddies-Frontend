import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {BussinessComponent} from "../model/bussiness";
import {Places} from "../model/places";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  baseURL = "http://localhost:8080/api/v1/Carrier";
  PlaceByBussinessID = "http://localhost:8080/api/v1/places/bussiness";
  ReviewPlacesURL = "http://localhost:8080/api/reviews/places";
  placesURL = "http://localhost:8080/api/v1/places";

  basicUserURL = "http://localhost:8080/api/v1/users";

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
  GetAllBussiness(): Observable<any>{
    return this.http.get<any>(this.baseURL, this.httpOptions).pipe(retry(2), catchError(this.handleError));
  }
  GetBussinessById(id: number): Observable<any>{
    return this.http.get<any>(`${this.baseURL}/${id}`, this.httpOptions).pipe(retry(2), catchError(this.handleError));
  }
  GetPlaceByBussinessId(id: number): Observable<any>{
    return this.http.get<any>(`${this.PlaceByBussinessID}/${id}`, this.httpOptions).pipe(retry(2), catchError(this.handleError));
  }
  UpdateBussiness(bussiness: BussinessComponent): Observable<BussinessComponent>{
    return this.http.put<BussinessComponent>(`${this.baseURL}/${bussiness.id}`, JSON.stringify(bussiness), this.httpOptions).pipe(retry(2), catchError(this.handleError));
  }
  DeletePlace(id:number){
    return this.http.delete(`${this.placesURL}/${id}`, this.httpOptions).pipe(retry(2), catchError(this.handleError));
  }
  UpdatePlace(id:any,Place: Places): Observable<Places>{
    return this.http.put<Places>(`${this.placesURL}/${id}`, JSON.stringify(Place), this.httpOptions).pipe(retry(2), catchError(this.handleError));
  }
  GetReviewsByPlaceId(id: number): Observable<any>{
    return this.http.get<any>(`${this.ReviewPlacesURL}/${id}`, this.httpOptions).pipe(retry(2), catchError(this.handleError));
  }
  //Messagess
  GetContacts(userId: number): Observable<Object>{
    return this.http.get<Object>(`http://localhost:8080/api/v1/users/${userId}/messages/LastMessageBussiness`, this.httpOptions).
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
  PostPlaces(id:number, places: Places): Observable<Places>{
    return this.http.post<Places>(`${this.placesURL}/${id}`,places ,this.httpOptions).pipe(retry(2), catchError(this.handleError));
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

  GetPlaceByid(id:number){
    return this.http.get<any>(`${this.placesURL}/${id}`, this.httpOptions).pipe(retry(2), catchError(this.handleError));
  }
  GetReviewPlaceId(id: number): Observable<any>{
    return this.http.get<any>(`${this.ReviewPlacesURL}/${id}`, this.httpOptions).pipe(retry(2), catchError(this.handleError));
  }
}
