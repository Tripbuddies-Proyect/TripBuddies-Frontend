import { Component, OnInit } from '@angular/core';
import { TravellerService } from "../../services/traveller.service";
import { toInteger } from "lodash";
import { Friendship } from "../../models/friendship"; // Asegúrate de importar correctamente el tipo Friendship

@Component({
  selector: 'app-matchs-traveller',
  templateUrl: './matchs-traveller.component.html',
  styleUrls: ['./matchs-traveller.component.css']
})
export class MatchsTravellerComponent implements OnInit {
  response: Friendship[] = [];

  constructor(private service: TravellerService) { }

  ngOnInit(): void {
    const id = toInteger(localStorage.getItem("id"));
    this.loadFriends(id);
  }

  loadFriends(userId: number): void {
    this.service.GetMatchByID(userId).subscribe(
      (response: any) => {
        this.response = response;
        console.log(response);
      },
      (error: any) => {
        console.error('Error al obtener la lista de amigos:', error);
      }
    );
  }

  removeFriend(id: number): void {
    this.service.DeleteMatch(id).subscribe((response: any) => {
      this.response = this.response.filter((friend: Friendship) => friend.id !== id);
    });
  }
}
