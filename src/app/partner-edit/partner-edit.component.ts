import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/users/user.service';

@Component({
  selector: 'app-partner-edit',
  templateUrl: './partner-edit.component.html',
  styleUrls: ['./partner-edit.component.scss']
})
export class PartnerEditComponent implements OnInit {

 
  public ownerForm: FormGroup;
  roles: any[];
  // genders = [
  //   { id: 3, value: 'Male' },
  //   { id: 2, value: 'Female' },
  //   { id: 4, value: 'Other' }
  // ];

  constructor(
    private location: Location,
    private userService: UserService,
    private datepipe: DatePipe
  ) {
    this.loadRoles();
  }

  ngOnInit(): void {
    this.ownerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      phone: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      location: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      // dob: new FormControl(new Date()),
      address: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      momoCode: new FormControl('', [Validators.required]),
      userId: new FormControl('', [Validators.required]),
      // isPermanent: new FormControl(false, Validators.required)
    });
  }



  loadRoles() {
    this.userService.getRoles()
      .subscribe(
        data => { this.roles = data; },
        error => { }
      );
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.ownerForm.controls[controlName].hasError(errorName);
  }

  // public onCancel = () => {
  //   this.location.back();
  // }

  public createOwner = (ownerFormValue) => {
    if (this.ownerForm.valid) {
      this.executeOwnerCreation(ownerFormValue);
    }
  }


  private executeOwnerCreation = (ownerFormValue) => {
    const owner: PartnerForCreation = {
      name: ownerFormValue.name,
      phone: ownerFormValue.phone,
      location: ownerFormValue.location,
      email: ownerFormValue.email,
      momoCode: ownerFormValue.momoCode,
      userId: ownerFormValue.userId,
      // isPermanent: ownerFormValue.isPermanent,
      // roleid: ownerFormValue.roleid
    };

    const apiUrl = 'api/owner';
    // this.repository.create(apiUrl, owner)
    //   .subscribe(res => {
    //     //this is temporary, until we create our dialogs
    //     this.location.back();
    //   },
    //     (error => {
    //       //temporary as well
    //       this.location.back();
    //     })
    //   );
  }


  onClear() {
    this.ownerForm.reset();
    this.initializeFormGroup();
  }


  initializeFormGroup() {
    this.ownerForm.setValue({
      name: '',
      location: '',
      email: '',
      phone: '',
      momoCode: '',
      userId: '',
    });
  }


  onSubmit() {
    if (this.ownerForm.invalid) {
      return;
    } else {
      // this.ownerForm.controls['dob'].setValue(this.datepipe.transform(this.ownerForm.get('dob').value, 'yyyy-MM-dd'));
      console.log(this.ownerForm.value);
      this.userService.createUser(this.ownerForm.value)
        .subscribe(
          data => {
            window.location.reload();
            console.log('well done'); },
          error => { console.log(error + ''); }
        );
    }
    // console.log(this.datepipe.transform(this.ownerForm.get('dob').value, 'yyyy-MM-dd'));

  }
}


export interface PartnerForCreation {
  name: string;
  location: string;
  email: string;
  phone: string;
  momoCode: string;
  userId: string;
}
