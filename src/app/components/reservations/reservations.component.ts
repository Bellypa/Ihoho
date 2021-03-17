import { Component, OnInit } from '@angular/core';
import { OperationService } from 'src/app/services/operations/operation.service';
import * as jwt_decode from 'jwt-decode';
import { AppConfig } from 'src/app/app.config';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {
  reservations: any[] = [];
  viewReservations: any[] = [];
  searchReservation: string;
  constructor(
    private operationService: OperationService,
    private configuration: AppConfig,
    // private alertService: ToasterSer
  ) { }

  ngOnInit() {
    this.loadReservations();
  }

  loadReservations() {
    // console.log(jwt_decode(localStorage.getItem(this.configuration.JWT_Token)));
    if (jwt_decode(localStorage.getItem(this.configuration.JWT_Token)).Role === '1') {
      this.operationService.getReservations()
        .subscribe(
          data => { this.reservations = data; this.viewReservations = this.reservations; },
          error => { }
        )
    } else if (jwt_decode(localStorage.getItem(this.configuration.JWT_Token)).Role === '2') {
      this.operationService.getReservationByPartnerId()
        .subscribe(
          data => { this.reservations = data; this.viewReservations = this.reservations; },
          error => { }
        )
    }
    // this.const user = jwt_decode(localStorage.getItem(this.configuration.JWT_Token));
  }


  serveClient(event) {
    this.operationService.serveClient(event.id)
      .subscribe(
        data => { this.loadReservations(); },
        error => { }
      )
  }

  // filtering application
  filterSessions(firter) {
    console.log(firter);
    if (firter === '0') {
      this.viewReservations = this.reservations;
    } else {
      this.viewReservations = this.reservations.filter(session => {
        console.log(session.isServed.toString());
        return session.isServed.toString() === firter + '';
      });
    }
  }
}
