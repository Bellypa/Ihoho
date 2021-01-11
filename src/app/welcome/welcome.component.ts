import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  spaceScreens: any[] = [];
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }



  logoutRT() {}

  loginRT() {
    this.router.navigate(['/login']);
  }

}
