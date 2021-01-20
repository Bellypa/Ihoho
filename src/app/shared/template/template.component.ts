import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { AppConfig } from 'src/app/app.config';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {
  currentUser: any;
  constructor(
    private configuration: AppConfig, 
    private router: Router) {
    this.currentUser = jwt_decode(localStorage.getItem(this.configuration.JWT_Token));
    console.log(this.currentUser);
  }

  ngOnInit() {
  }


  goToMyService() {
    this.router.navigate(['/dashboard/services', this.currentUser.PartnerId])
  }



  logout() {
    localStorage.removeItem(this.configuration.JWT_Token);
    this.router.navigate(['/']);
  }


}
