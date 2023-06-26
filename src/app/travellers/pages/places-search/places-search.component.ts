import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Places} from "../../../bussiness/model/places";
import {TravellerService} from "../../services/traveller.service";
import {toInteger} from "lodash";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {Review} from "../../models/review";
import {Traveller} from "../../models/traveller";

@Component({
  selector: 'app-places-search',
  templateUrl: './places-search.component.html',
  styleUrls: ['./places-search.component.css']
})
export class PlacesSearchComponent implements OnInit{
  searchLocation: string = '';
  places: Places[] = [];
  displayedColumns: string[] = ['photo', 'name', 'description', 'location', 'price', 'favorite', 'reviews'];
  place!: Places;
  newReviewContent: string = '';

  displayedColumns2: string[] = ['profileImage', 'fullName', 'reviewContent', 'actions'];
  reviewsData: Review[] = [];

  @ViewChild('editDialog') editDialog!: TemplateRef<any>;
  @ViewChild('addReview') addReview!: TemplateRef<any>;
  constructor(private placeService: TravellerService, private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    const id = toInteger(localStorage.getItem("id"));
    this.getAllPlaces();
    this.loadReviews(this.places.map(place => place.id));
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
  addToFavorites(placeId: number) {
    // Lógica para agregar a favoritos
  }
  openAddReview(){
    this.dialog.open(this.addReview);
  }
  closeEditDialog(): void {
    this.dialog.closeAll();
  }

  createReview(place: any){
    this.placeService.PostReview(place.id).subscribe(
      (response: any) => {
        console.log(response);
      }

    )
  }
  editReview(review: Review){

  }
  loadReviews(id: any){
    this.placeService.GetReviewByPlaceId(id).subscribe(
      (reviews: any) => {
        this.reviewsData = reviews;
        console.log(reviews)
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
}
