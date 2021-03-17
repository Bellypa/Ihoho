import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OperationService } from 'src/app/services/operations/operation.service';
import * as jwt_decode from 'jwt-decode';
import { AppConfig } from 'src/app/app.config';


@Component({
  selector: 'app-service-edit',
  templateUrl: './service-edit.component.html',
  styleUrls: ['./service-edit.component.scss']
})
export class ServiceEditComponent implements OnInit {
  partnerId: string;
  partnerService: any;
  bussnessServices: any[];
  // isUpdate: boolean;
  formData: FormData;
  partnerServiceId: string;
  isChangingImageService: boolean;


  constructor(
    private route: ActivatedRoute,
    private operationService: OperationService,
    private router: Router,
    private configuration: AppConfig) {

    this.partnerService = {};
    this.route.params.subscribe(params => {
      this.partnerId = params.partnerId;
      this.loadPartnerServiceById(this.partnerId);
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


  loadPartnerServiceById(id) {
    this.operationService.getPartnerServiceById(id)
      .subscribe(
        data => {
          this.partnerService.price = data.price;
          this.partnerService.businessServiceId = data.serviceId;
          this.partnerService.seats = data.seats;
          this.partnerService.minDuration = data.minDuration;
          this.partnerService.imageData = data.imageData;
          this.partnerServiceId = data.id;
        }, error => { }
      )
  }

  createPartnerService(form: NgForm) {
    if (form.invalid) {
      return;
    } else {
      this.partnerService.partnerId = jwt_decode(localStorage.getItem(this.configuration.JWT_Token)).Role === '1' ? +localStorage.getItem('PartnerId') :
        jwt_decode(localStorage.getItem(this.configuration.JWT_Token)).PartnerId;
      console.log(this.partnerService);
      this.operationService.updatePartnerService(this.partnerService, this.partnerServiceId)
        .subscribe(
          data => { this.closeServiceEdit(); },
          error => { }
        )
    }
  }


  closeServiceEdit() {
    if (jwt_decode(localStorage.getItem(this.configuration.JWT_Token)).Role === '1') {
      this.router.navigate(['/dashboard/services', localStorage.getItem('PartnerId')]);
    } else {
      this.router.navigate(['/dashboard/services', jwt_decode(localStorage.getItem(this.configuration.JWT_Token)).PartnerId])
    }
  }


  changeToUploadImage() {
    this.isChangingImageService = true;
  }


  fileChange1(event) {
    // tslint:disable-next-line:prefer-const
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      // tslint:disable-next-line:prefer-const
      let file: File = fileList[0];
      const licencFile = file.name.split('.');
      this.formData = new FormData();
      this.formData.append('ImageData', file, file.name);
      this.formData.append('PartnerServiceId', this.partnerServiceId);
    }
  }

  savePartnerServiceImage() {
    this.operationService.createPartnerServiceImage(this.formData)
      .subscribe(
        data => { this.loadPartnerServiceById(this.partnerId); },
        error => { }
      )
  }
}

