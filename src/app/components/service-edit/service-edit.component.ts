import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OperationService } from 'src/app/services/operations/operation.service';

@Component({
  selector: 'app-service-edit',
  templateUrl: './service-edit.component.html',
  styleUrls: ['./service-edit.component.scss']
})
export class ServiceEditComponent implements OnInit {
  partnerId: string;
  partnerService: any;
  bussnessServices: any[];
  headerName: string;
  isUpdate: boolean;
  formData: FormData;
  partnerServiceId: string;
  isChangingImageService: boolean;


  constructor(
    private route: ActivatedRoute,
    private operationService: OperationService,
    private router: Router) {

    this.partnerService = {};
    this.route.params.subscribe(params => {
      this.partnerId = params.partnerId;
      if (+this.partnerId !== 0) {
        this.isUpdate = true;
        this.headerName = 'Update Partner Service'
        this.loadPartnerServiceById(this.partnerId);
      } else {
        this.isUpdate = false;
        this.headerName = 'Create Partner Service';
      }
      // this.loadPartnerService(this.partnerId);
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
      if (this.isUpdate) {
        console.log('Update data');
      } else {
        this.partnerService.partnerId = +this.partnerId;
        this.operationService.createPartnerService(this.partnerService)
          .subscribe(
            data => { this.router.navigate(['/dashboard/services', this.partnerId]); },
            error => { }
          )
      }

    }
  }


  closeServiceEdit() {
    this.router.navigate(['/dashboard/services', this.partnerId]);
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

