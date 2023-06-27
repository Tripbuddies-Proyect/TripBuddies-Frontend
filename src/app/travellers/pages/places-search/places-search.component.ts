import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Places } from "../../../bussiness/model/places";
import { TravellerService } from "../../services/traveller.service";
import { toInteger } from "lodash";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { Review } from "../../models/review";
import { Traveller } from "../../models/traveller";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import {MessageDialogComponent} from "../messages-traveller/message-dialog/message-dialog.component";
import {
  NotificationDialogComponent
} from "../../../bussiness/pages/home-bussiness/notification-dialog/notification-dialog.component";
import {Favorite} from "../../models/favorite";

@Component({
  selector: 'app-places-search',
  templateUrl: './places-search.component.html',
  styleUrls: ['./places-search.component.css']
})
export class PlacesSearchComponent implements OnInit {
  searchLocation: string = '';
  places: Places[] = [];
  displayedColumns: string[] = ['photo', 'name', 'description', 'location', 'price', 'favorite', 'reviews'];
  place: Places;
  newReviewContent: string = '';
  review: Review;
  displayedColumns2: string[] = ['profileImage', 'fullName', 'reviewContent', 'actions'];
  reviewsData: Review[] = [];
  reviewForm: FormGroup;
  users : Traveller;
  UserId: number = 0;
  favorite: Favorite;
  placeId: any; // Cambiado el nombre a PlaceId en lugar de PlaceID
  @ViewChild('editDialog') editDialog!: TemplateRef<any>;
  @ViewChild('addReview') addReview!: TemplateRef<any>;
  @ViewChild('placesAll') placesAll!: TemplateRef<any>;
  @ViewChild('locationAll') locationAll!: TemplateRef<any>;

  constructor(
    private placeService: TravellerService,
    private router: Router,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.review = {} as Review;
    this.place = {} as Places;
    this.users = { } as Traveller;
    this.favorite = {} as Favorite;
    this.reviewForm = this.formBuilder.group({
      reviewText: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  ngOnInit(): void {
    const id = toInteger(localStorage.getItem("id"));
    this.UserId = id;
    this.route.params.subscribe(params => {
      this.placeId = +params['placesid']; // El "+" convierte el parámetro en un número
    });
    this.GetTravellerId(id);
  }

  searchPlaces() {
    this.placeService.searchPlacesByLocation(this.searchLocation).subscribe(
      (response: any) => {
        this.places = response;
        console.log(response);
      },
      (error: any) => {
        console.error('Error al buscar lugares:', error);
      }
    );
  }
  openLocationAll() {
    this.dialog.open(this.locationAll);
    this.searchPlaces();
  }
  getAllPlaces() {
    this.placeService.GetAllPlaces().subscribe(
      (response: any) => {
        this.places = response;
        console.log(response);
      },
      (error: any) => {
        console.error('Error al obtener todos los lugares:', error);
      }
    );
  }
  openEditDialog(id: number) {
    this.dialog.open(this.editDialog);
    this.loadReviews(id);
  }
  SendMessageToBussines(id:any){

  }
  addToFavorites(id: number) {
    this.placeService.GetPlacesById(id).subscribe(
      (response: any) => {
        this.favorite.places_Id = response;
        console.log(response);
      }
    );
    this.placeService.GetTravellerById(this.UserId).subscribe(
      (response: any) => {
        this.favorite.traveller_Id = response;
        console.log(response);
      }
    );
    this.placeService.AddFavorite(this.UserId,this.favorite).subscribe(
      (response:any)=> {
      this.favorite = response
      console.log(response);
      console.log("Agregado a favoritos")
    },
      error => {
      console.error('Error al agregar a favoritos:', error)
      });
  }
  deleteFavorite(id:any){
    this.placeService.DeleteFavorite(id).subscribe(
      (response:any)=>{
        console.log(response);
      }
    );
  }
  favoriteButton(element:any){
    element.favorite = !element.favorite;
    if(element.favorite==true){
      this.GetPlacesId(element.id);
    }
    else{
      this.deleteFavorite(element.id);
    }
  }
  openAddReview() {
    this.dialog.open(this.addReview);
  }
  closeEditDialog(): void {
    this.dialog.closeAll();
  }
  openAllPlaces() {
    this.dialog.open(this.placesAll);
    this.getAllPlaces()
  }
  editReview(review: Review) {
    // Lógica para editar una reseña
  }
  loadReviews(id: any) {
    this.placeId = id; // Actualizar el valor de placeId
    this.placeService.GetReviewByPlaceId(id).subscribe(
      (reviews: any) => {
        this.reviewsData = reviews;
        console.log(reviews);
      },
      (error: any) => {
        console.error('Error al obtener las reseñas:', error);
      }
    );
  }
  isCurrentUserReview(review: Review) {
    const currentUserId = toInteger(localStorage.getItem("id"));
    return review.traveller.id === currentUserId;
  }
  onSubmit() {
  }
  createReviews(id: number, review: any) {
    this.placeService.PostReview(id, review).subscribe(
      (response: any) => {
        console.log(response);
        // Actualizar la lista de reseñas del lugar después de crear la reseña
        this.loadReviews(this.placeId);
        this.closeEditDialog(); // Cerrar el diálogo de añadir reseña
      },
      (error: any) => {
        console.error('Error al crear la reseña:', error);
        // Manejar el error según sea necesario
      }
    );
  }
  add() {
    this.createReviews(this.placeId, this.review);
  }
  GetTravellerId(id:any){
    this.placeService.GetTravellerById(id).subscribe((response:any)=>{
      this.users=response;
      this.review.traveller=this.users;
      this.GetPlacesId(this.placeId);
    });
  }
  GetPlacesId(id:any){
    this.placeService.GetPlacesById(id).subscribe((response:any)=>{
      this.review.places=response;
      console.log(response)
    });
  }

}
