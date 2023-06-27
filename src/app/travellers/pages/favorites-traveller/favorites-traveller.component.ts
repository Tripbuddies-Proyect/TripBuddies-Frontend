import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {TravellerService} from "../../services/traveller.service";
import {Favorite} from "../../models/favorite";
import {toInteger} from "lodash";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MessageDialogComponent} from "../messages-traveller/message-dialog/message-dialog.component";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Places} from "../../../bussiness/model/places";
import {Traveller} from "../../models/traveller";
import {Router} from "@angular/router";

@Component({
  selector: 'app-favorites-traveller',
  templateUrl: './favorites-traveller.component.html',
  styleUrls: ['./favorites-traveller.component.css']
})
export class FavoritesTravellerComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  UserId: any;
  dataSource = new MatTableDataSource<Favorite>([]); // Inicializa el dataSource con un array vacío de tipo favoritesModels
  Placesdata: Places;
  Travellerdata: Traveller;
  Favoritedata: Favorite;
  displayedColumns: string[] = ['id', 'name', 'description', 'location', 'country', 'price', 'imagenurl', 'favorite'];

  constructor(private router: Router, private favoriteService: TravellerService, private travellerService: TravellerService) {
    this.Placesdata = {} as Places;
    this.Travellerdata = {} as Traveller;
    this.Favoritedata = {} as Favorite;
  }

  ngOnInit() {
    this.UserId = Number(localStorage.getItem('id'));
    console.log(this.UserId)
    this.getTravellersById(this.UserId);
    console.log(this.Travellerdata)
  }

  getTravellersById(id: any) {
    this.travellerService.GetTravellerById(id).subscribe((response: any) => {
      this.Travellerdata = response;
      this.getListfavoritesById(this.Travellerdata.id);

    });
  }

  getListfavoritesById(id: any) {
    this.favoriteService.GetFavoriteById(id).subscribe((response: any) => {
      this.Favoritedata = response;
      console.log(this.Favoritedata)
      this.dataSource.data = response;
      console.log(this.dataSource.data);
    });
  }

  deleteFavorite(id: any) {
    this.favoriteService.DeleteFavorite(id).subscribe();
  }

  deleteButton(element: any) {
    element.favorite = !element.favorite;
    this.deleteFavorite(element.id);
  }
}
