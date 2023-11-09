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
  friendship: Friendship
  presses: boolean = false;
  counter: number = 1;
  UserId: number = 0;
  Notf: any = NotificationTravellerDialogComponent;
  answer: string = "";
  constructor(private userService: TravellerService, private dialog: MatDialog) {
    this.friendship = {} as Friendship;
  }

  ngOnInit() {
    const id = toInteger(localStorage.getItem('id'));
    this.UserId = id;
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
  addMatch(id: number) {
    this.userService.GetTravellerById(id).subscribe(
      (data: any) => {
        this.friendship.friend = data;
        console.log(data);
      }
    );
    this.userService.GetTravellerById(this.UserId).subscribe(
      (data: any) => {
        this.friendship.user_id = data;
        console.log(data);
      });
    this.userService.AddMatch(this.UserId, this.friendship).subscribe(
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
    this.sendNotification(this.friendship.friend.id);
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
  sendNotification(data: any) {
    let TempAnswer: object = {
      "id": 0,
      "content": "This user did match with you!",
      "date": "2022-11-19T19:53:42.582Z",
      "emitter": {
        "id": this.UserId
      },
      "receiver": {
        "id": data
      }
    };

    this.userService.SendNotification(TempAnswer, this.UserId, data ).subscribe(response => {
      console.log(response);
    });

    this.answer = "";
  }
}
