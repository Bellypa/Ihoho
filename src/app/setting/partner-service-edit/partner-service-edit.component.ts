import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-partner-service-edit',
  templateUrl: './partner-service-edit.component.html',
  styleUrls: ['./partner-service-edit.component.scss']
})
export class PartnerServiceEditComponent implements OnInit {
  public ownerForm: FormGroup;
  businesses: any[]= [];
  partners: any[]= [];
  @Output() backToUser = new EventEmitter<boolean>();
  constructor(private userService: UserService,) { }

  ngOnInit() {
    this.ownerForm = new FormGroup({
      partnerId: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      businessServiceId: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      price: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      seats: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      minDuration: new FormControl('', [Validators.required, Validators.maxLength(10)])
    });

    this.loadBusinessService();
    this.loadPartners();
  }



  loadBusinessService() {
    this.userService.getBusinessService()
      .subscribe(
        data => { this.businesses = data; },
        error => { }
      );
  }



  loadPartners() {
    this.userService.getPartners()
      .subscribe(
        data => { this.partners = data; },
        error => { }
      );
  }




  public hasError = (controlName: string, errorName: string) => {
    return this.ownerForm.controls[controlName].hasError(errorName);
  }

  // public createOwner = (ownerFormValue) => {
  //   if (this.ownerForm.valid) {
  //     this.executeOwnerCreation(ownerFormValue);
  //   }
  // }


  // private executeOwnerCreation = (ownerFormValue) => {
  //   const owner: OwnerForCreation = {
  //     names: ownerFormValue.names,
  //     roleId: ownerFormValue.roleId,
  //     username: ownerFormValue.username,

  //   };

  //   const apiUrl = 'api/owner';
  // }

  initializeFormGroup() {
    this.ownerForm.setValue({
      partnerId: '',
      businessServiceId: '',
      price: '',
      seats: '',
      minDuration: '',
    });
  }

  onSubmit() {
    if (this.ownerForm.invalid) {
      return;
    } else {
      // this.ownerForm.controls['dob'].setValue(this.datepipe.transform(this.ownerForm.get('dob').value, 'yyyy-MM-dd'));
      console.log(this.ownerForm.value);
      this.userService.createParterService(this.ownerForm.value)
        .subscribe(
          data => {
            // window.location.reload();
            console.log('well done');
            this.closeForm();
          },
          error => { console.log(error + ''); }
        );
    }
    // console.log(this.datepipe.transform(this.ownerForm.get('dob').value, 'yyyy-MM-dd'));

  }

  onClear() {
    this.ownerForm.reset();
    this.initializeFormGroup();
    this.closeForm();
  }

  closeForm() {
    this.backToUser.emit(false);
  }

}



export class PartnerService {
  partnerId: number;
  businessServiceId: number;
  price: number;
  seats: number;
  minDuration: number
}