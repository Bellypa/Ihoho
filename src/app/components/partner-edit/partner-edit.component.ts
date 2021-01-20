import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { AppConfig } from 'src/app/app.config';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-partner-edit',
  templateUrl: './partner-edit.component.html',
  styleUrls: ['./partner-edit.component.scss']
})
export class PartnerEditComponent implements OnInit {


  public ownerForm: FormGroup;
  roles: any[];
  partner: any;

  constructor(
    private userService: UserService,
    private router: Router,
  ) {
    this.partner = {}
  }

  ngOnInit(): void {
  }



  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    } else {
      this.userService.createPartner(this.partner)
        .subscribe(
          data => {
            this.closePartner();
            console.log('well done');
          },
          error => { console.log(error + ''); }
        );
    }
  }


  closePartner() {
    this.router.navigate(['/dashboard/user-partners']);
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
