import {Component, OnInit} from '@angular/core';
import {Places} from "../../../bussiness/model/places";
import {TravellerService} from "../../services/traveller.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Traveller} from "../../models/traveller";
import {MessageDialogComponent} from "../messages-traveller/message-dialog/message-dialog.component";
import {
  NotificationTravellerDialogComponent
} from "../../../travellers/pages/home-traveller/notification-dialog/notification-dialog.component";
import {toInteger} from "lodash";
import {Friendship} from "../../models/friendship";

@Component({
  selector: 'app-home-traveller',
  templateUrl: './home-traveller.component.html',
  styleUrls: ['./home-traveller.component.css']
})
export class HomeTravellerComponent implements OnInit {
  travellers: Traveller[] = [];
  friendship!: Friendship
  presses: boolean = false;
  counter: number = 1;
  constructor(private userService: TravellerService, private dialog: MatDialog) { }

  ngOnInit() {
    const id = toInteger(localStorage.getItem('id'));
    this.getTravellers(id);
  }

  getTravellers(id: number) {
    this.userService.GetAllTravellers().subscribe(
      (data: any[]) => {
        // Filtrar el usuario actual
        this.travellers = data.filter(traveller => traveller.id !== id);
        console.log('Travellers:', this.travellers)
      },
      error => {
        console.error('Error al obtener los usuarios:', error);
      }
    );
  }
  toggleMatch(traveller: Traveller) {
    if (this.presses && this.counter % 2 === 0) {
      this.addMatch(traveller.id);
    } else if (this.counter%2 != 0 && this.presses == false && this.counter != 1) {
      this.removeFriend(traveller);
    }
  }
  addMatch(traveller: number) {
    this.userService.AddMatch(traveller).subscribe(
      (data: any) => {
        this.friendship= data
        console.log(data);
        console.log('Match añadido con éxito');
        // Aquí puedes agregar lógica adicional, como actualizar la lista de matches
      },
      error => {
        console.error('Error al añadir el match:', error);
      }
    );
  }
  removeFriend(traveller: Traveller) {
    this.userService.DeleteMatch(traveller.id).subscribe(
      (response) => {
        console.log('Usuario eliminado de la lista de amigos:', response);
      },
      (error) => {
        console.error('Error al eliminar al usuario de la lista de amigos:', error);
      }
    );
  }
  openMessageDialog(id:number) {
    this.dialog.open(MessageDialogComponent, {
      data: id,
    });
  }
  openNotificationDialog(id:number) {
    this.dialog.open(NotificationTravellerDialogComponent, {
      data: id,
    });
  }
}
