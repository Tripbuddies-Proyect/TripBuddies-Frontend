import {Component, OnInit} from '@angular/core';
import {ServiceService} from "../../service/service.service";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {toInteger} from "lodash";

@Component({
  selector: 'app-messages-bussiness',
  templateUrl: './messages-bussiness.component.html',
  styleUrls: ['./messages-bussiness.component.css']
})
export class MessagesBussinessComponent implements OnInit {
  UserId: number = 0;
  messages: Array<any> = [];
  contacts: Array<any> = [];
  answer: string = "";
  show: boolean = false;
  mobile:boolean = false;
  contactName: string = "Contact Name";
  contactDescription: string = "Contact Description";
  contactId: number = 0;
  contactPhoto: string = 'https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg';

  constructor(private service: ServiceService, private breakpoint: BreakpointObserver) { }

  ngOnInit(): void {
  }


}
