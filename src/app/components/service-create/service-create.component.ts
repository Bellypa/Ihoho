import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OperationService } from 'src/app/services/operations/operation.service';
import * as jwt_decode from 'jwt-decode';
import { AppConfig } from 'src/app/app.config';


@Component({
  selector: 'app-service-create',
  templateUrl: './service-create.component.html',
  styleUrls: ['./service-create.component.scss']
})
export class ServiceCreateComponent implements OnInit {
  partnerService: any;
  partnerId: string;
  bussnessServices: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private operationService: OperationService,
    private router: Router,
    private configuration: AppConfig
  ) {
    this.partnerService = {};
    this.route.params.subscribe(params => {
      this.partnerId = params.partnerId;
    })
  }

  ngOnInit() {
    this.loadBusinessServices();
  }

  loadBusinessServices() {
    this.operationService.getBusinessServices()
      .subscribe(
        data => { this.bussnessServices = data; },
        error => { }
      )
  }



  createPartnerService(form: NgForm) {
    if (form.invalid) {
      return;
    } else {
      this.partnerService.partnerId = jwt_decode(localStorage.getItem(this.configuration.JWT_Token)).Role === '1' ? +localStorage.getItem('PartnerId') :
        jwt_decode(localStorage.getItem(this.configuration.JWT_Token)).PartnerId;
      console.log(this.partnerService);
      this.operationService.createPartnerService(this.partnerService)
        .subscribe(
          data => { this.closeForm(); },
          error => { }
        )
    }
  }


  closeForm() {
    if (jwt_decode(localStorage.getItem(this.configuration.JWT_Token)).Role === '1') {
      this.router.navigate(['/dashboard/services', localStorage.getItem('PartnerId')]);
    } else {
      this.router.navigate(['/dashboard/services', jwt_decode(localStorage.getItem(this.configuration.JWT_Token)).PartnerId])
    }
  }

}
