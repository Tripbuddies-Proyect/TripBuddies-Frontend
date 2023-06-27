import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Places} from "../../../bussiness/model/places";
import {TravellerService} from "../../services/traveller.service";
import {toInteger} from "lodash";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {Review} from "../../models/review";
import {Traveller} from "../../models/traveller";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

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
  review: Review;
  displayedColumns2: string[] = ['profileImage', 'fullName', 'reviewContent', 'actions'];
  reviewsData: Review[] = [];
  reviewForm: FormGroup;
  PlaceId: number = 0;
  @ViewChild('editDialog') editDialog!: TemplateRef<any>;
  @ViewChild('addReview') addReview!: TemplateRef<any>;
  @ViewChild('placesAll') placesAll!: TemplateRef<any>;
  @ViewChild('locationAll') locationAll!: TemplateRef<any>;
  constructor(private placeService: TravellerService, private router: Router, private dialog: MatDialog, private formBuilder: FormBuilder) {
    this.review = { } as Review;
    this.reviewForm = new FormGroup({
      reviewText: new FormControl('', [Validators.required, Validators.maxLength(500)])
    });

  }

  ngOnInit(): void {
    const id = toInteger(localStorage.getItem("id"));

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
  openLocationAll(){
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
  addToFavorites(placeId: number) {
    // Lógica para agregar a favoritos
  }
  openAddReview(){
    this.dialog.open(this.addReview);
  }
  closeEditDialog(): void {
    this.dialog.closeAll();
  }
  openAllPlaces(){
    this.dialog.open(this.placesAll);
    this.getAllPlaces()
  }

  createReview(id : number){
    this.review.reviewText = this.reviewForm.get('reviewText')?.value;
    this.placeService.PostReview(id, this.review).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error: any) => {
        console.error('Error al crear la reseña:', error);
      }
    );
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
