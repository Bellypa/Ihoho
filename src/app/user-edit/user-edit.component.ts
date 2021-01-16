import { Location, DatePipe } from '@angular/common';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/users/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  public ownerForm: FormGroup;
  @Output() backToUser = new EventEmitter<boolean>();
  roles: any[];
  genders = [
    { id: 3, value: 'Male' },
    { id: 2, value: 'Female' },
    { id: 4, value: 'Other' }
  ];

  constructor(
    private location: Location,
    private userService: UserService,
    private datepipe: DatePipe
  ) {
    this.loadRoles();
  }

  ngOnInit(): void {
    this.ownerForm = new FormGroup({
      names: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      roleId: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      username: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      // dob: new FormControl(new Date()),
      // address: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      // email: new FormControl('', [Validators.required, Validators.email]),
      // genderid: new FormControl('', [Validators.required]),
      // roleid: new FormControl('', [Validators.required]),
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
    const owner: OwnerForCreation = {
      names: ownerFormValue.names,
      roleId: ownerFormValue.roleId,
      username: ownerFormValue.username,
      // dob: ownerFormValue.dob,
      // address: ownerFormValue.address,
      // email: ownerFormValue.email,
      // genderid: ownerFormValue.genderid,
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


 


  initializeFormGroup() {
    this.ownerForm.setValue({
      names: '',
      roleId: '',
      username: '',
    });
  }


  onSubmit() {
    if (this.ownerForm.invalid) {
      console.log('something wrong');
      console.log(this.ownerForm.value);
      return;
    } else {
      // this.ownerForm.controls['dob'].setValue(this.datepipe.transform(this.ownerForm.get('dob').value, 'yyyy-MM-dd'));
      console.log(this.ownerForm.value);
      this.userService.createUser(this.ownerForm.value)
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




export interface OwnerForCreation {

  username: string;
  names: string;
  roleId: number
}
