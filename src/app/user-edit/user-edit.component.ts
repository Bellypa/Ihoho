import { Location, DatePipe } from '@angular/common';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
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
  user: any;

  constructor(
    private userService: UserService,
  ) {
    this.user = {};
    this.loadRoles();
  }

  ngOnInit(): void {

  }



  loadRoles() {
    this.userService.getRoles()
      .subscribe(
        data => { this.roles = data; },
        error => { }
      );
  }




  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    } else {
      this.user.roleId = +this.user.roleId;
      this.userService.createUser(this.user)
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


  closeForm() {
    this.backToUser.emit(false);
  }
}




export interface OwnerForCreation {
  username: string;
  names: string;
  roleId: number
}
