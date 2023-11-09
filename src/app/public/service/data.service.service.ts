import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpRequest} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {TravellerComponent} from "../register/traveller/traveller.component";
import {Bussiness} from "../register/model/bussiness";
import {Traveller} from "../register/model/traveller";

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  travellerURL = "https://tripbuddies-backend-production.up.railway.app/api/v1/travellers";
  bussinessURL = "https://tripbuddies-backend-production.up.railway.app/api/v1/Carrier";
  basePath = "https://tripbuddies-backend-production.up.railway.app/api/v1/users";
  friendIdURL = "https://tripbuddies-backend-production.up.railway.app/api/v1/friendship/user";
  favoriteIdURL = "https://tripbuddies-backend-production.up.railway.app/api/v1/favorites/travellerId/";
  constructor(private http: HttpClient) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    throw new Error('Method not implemented.');
  }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
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
  getTravellersAll(): Observable<any> {
    return this.http.get<TravellerComponent>(`${this.travellerURL}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  getBussinessAll(): Observable<Bussiness>{
    return this.http.get<Bussiness>(`${this.bussinessURL}`, this.httpOptions).
    pipe( retry(2), catchError(this.handleError));
  }
  getAllUser(): Observable<object> {
    return this.http
      .get<object>(this.basePath, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  getUserByEmail(email: string): Observable<object> {
    return this.http
      .get<object>(`${this.basePath}/searchByEmail/${email}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  getUserById(id: number): Observable<object> {
    return this.http
      .get<object>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  getMatchsById(id:number): Observable<any>{
    return this.http
      .get<any>(`${this.friendIdURL}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  getFavoritesById(id:number): Observable<any>{
    return this.http
      .get<any>(`${this.favoriteIdURL}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  postTraveller(traveller: Traveller): Observable<Traveller> {
    return this.http
      .post<Traveller>(this.travellerURL, traveller, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
  postBussiness(bussiness: Bussiness): Observable<Bussiness> {
    return this.http
      .post<Bussiness>(this.bussinessURL, bussiness, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
  postMatchs(matchs: any, id:number): Observable<any> {
    return this.http
      .post<any>(`${this.friendIdURL}/${id}`, matchs, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
  postFavorites(favorites: any, id:number): Observable<any> {
    return this.http
      .post<any>(`${this.favoriteIdURL}/${id}`, favorites, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  getTravellerByEmailAndPassword(email:string,password:string): Observable<Traveller> {
    return this.http
      .get<Traveller>(`${this.travellerURL}/email/${email}/password/${password}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  getCarrierByEmailAndPassword(email:string,password:string): Observable<Traveller> {
    return this.http
      .get<Traveller>(`${this.bussinessURL}/email/${email}/password/${password}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }




}
