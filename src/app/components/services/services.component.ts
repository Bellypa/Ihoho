import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OperationService } from 'src/app/services/operations/operation.service';
import * as jwt_decode from 'jwt-decode';
import { AppConfig } from 'src/app/app.config';
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  partnerId: string;
  partnerServices: any[] = [];
  searchPartnerService: string;
  constructor(
    private operationService: OperationService,
    private route: ActivatedRoute,
    private router: Router,
    private configuration: AppConfig
  ) {
    this.route.params.subscribe(params => {
      this.partnerId = params.partnerId;
      if (jwt_decode(localStorage.getItem(this.configuration.JWT_Token)).Role === '1') {
        localStorage.setItem('PartnerId', this.partnerId);
      }
      this.loadPartnerService(this.partnerId);
    })
  }

  ngOnInit() {

  }



  loadPartnerService(partner) {
    this.operationService.getPartnerService(partner)
      .subscribe(
        data => { this.partnerServices = data; },
        error => { }
      )
  }



  

  newPartnerService() {
    if (jwt_decode(localStorage.getItem(this.configuration.JWT_Token)).Role === '1') {
      this.router.navigate(['/dashboard/service-create', localStorage.getItem('PartnerId')]);
    } else {
      this.router.navigate(['/dashboard/service-create', jwt_decode(localStorage.getItem(this.configuration.JWT_Token)).PartnerId])
    }

  }


  editPartnerService(parternerService) {
    console.log(parternerService.id);
    this.router.navigate(['/dashboard/service-edit', parternerService.id]);
  }
}
