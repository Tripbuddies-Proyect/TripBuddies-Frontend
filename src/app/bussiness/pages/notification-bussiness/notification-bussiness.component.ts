import {Component, OnInit} from '@angular/core';
import {ServiceService} from "../../service/service.service";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {toInteger} from "lodash";

@Component({
  selector: 'app-notification-bussiness',
  templateUrl: './notification-bussiness.component.html',
  styleUrls: ['./notification-bussiness.component.css']
})
export class NotificationBussinessComponent implements OnInit {

  UserId: number = 0;
  Company: any;
  notifications: Array<any> = [];

  constructor(private service: ServiceService, private breakpoint: BreakpointObserver) {
  }

  ngOnInit(): void {
    this.UserId = toInteger(localStorage.getItem("id"));
    this.breakpoint.observe([Breakpoints.XSmall, Breakpoints.HandsetLandscape]).subscribe((response: any) => {
      console.log(response);
    });
    this.GetAllNotifications();
  }

  GetNotification(id: number) {
    this.service.GetNotificationsByUserId(id, this.UserId).subscribe((response: any) => {
      this.notifications = response;
    });
  }

  GetAllNotifications() {
    this.service.GetAllNotifications(this.UserId).subscribe((response: any) => {
      this.notifications = response;
      console.log(this.notifications);
    });
  }


  DeleteNotificationById(id: number) {
    this.service.DeleteNotificationById(id, this.UserId).subscribe((response: any) => {
      this.GetNotification(this.UserId);
    });
    location.reload();
  }
}
