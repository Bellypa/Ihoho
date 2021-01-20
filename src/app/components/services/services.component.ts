import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OperationService } from 'src/app/services/operations/operation.service';

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
    private router: Router
  ) {
    this.route.params.subscribe(params => {
      this.partnerId = params.partnerId;
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
    this.router.navigate(['/dashboard/service-edit', this.partnerId]);
  }


  editPartnerService(parternerService) {
    console.log(parternerService.id);
    this.router.navigate(['/dashboard/service-edit', parternerService.id]);
  }
}
