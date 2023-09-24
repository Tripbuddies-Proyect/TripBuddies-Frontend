import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {BussinessComponent} from "../../model/bussiness";
import {BreakpointObserver} from "@angular/cdk/layout";
import {ActivatedRoute, Router} from "@angular/router";
import {TravellerService} from "../../../travellers/services/traveller.service";
import {ServiceService} from "../../service/service.service";
import {delay} from "rxjs";
import {toInteger} from "lodash";
import {Bussiness} from "../../../public/register/model/bussiness";

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit{
  @ViewChild(MatSidenav)
  sidenav!:MatSidenav;
  bussiness!:Bussiness;
  profile: boolean = false;
  currentRoute: string ="";
  notifications: Array<any> = [];
  constructor(private observer: BreakpointObserver, private router:Router, private route: ActivatedRoute, private service: ServiceService) {
  }

  ngOnInit(): void {
    this.ngAfterViewInit();
   // this.GetAllNotifications();
    const id = toInteger(localStorage.getItem("id"));
    this.service.GetBussinessById(id).subscribe((response:any)=>{
      this.bussiness = response;
    });
  }
  private ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      })
  }
  analizeRoot(){
    this.currentRoute = this.router.url;
    //find profile string in current route
    if (this.currentRoute.includes('profile')) {
      this.profile = true;
    }
    else
    {
      this.profile = false;
    }
  }
  setOption() {
    this.profile = true;
  }
  disableOption(){
    this.profile = false;
  }
  private GetAllNotifications() {
    this.service.GetAllNotifications(toInteger(localStorage.getItem("id"))).subscribe((response:any)=> {
      this.notifications = response;
      console.log(this.notifications);
    });
  }

}
