import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  private returnUrl: string;
  username: string;
  password: string;
  errorMessage: string;
  isConnecting: boolean;
  loginInvalid: boolean;


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { this.errorMessage = ''; this.isConnecting = false; }

  // ngOnInit() {
  // }

  async ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/game';

    this.form = this.fb.group({
      // email: ['', Validators.email],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    if (await this.authService.checkAuthenticated()) {
      await this.router.navigate([this.returnUrl]);
    }

  }


  async onSubmit() {
    this.isConnecting = true;
    if (this.form.valid) {
      try {
        const username = this.form.get('username').value;
        const password = this.form.get('password').value;
        // console.log(username, password);
        // await this.authService.login(username, password);
        this.errorMessage = '';
        const data = {
          username: username,
          password: password
        }
        await (await this.authService.login(data))
          .subscribe(
            data => {
              this.authService.setToken(data.token);
              this.router.navigate(['/dashboard']);
            },
            error => {
              this.isConnecting = false;
              // this.errorMessage = error.error.status === 401 ? 'Username or password is incorrect' : error.error.status;
              console.log(error.error);
              this.errorMessage = error + '';
              
            }
          );
      } catch (err) {
        this.isConnecting = false;
      }
    } else {
      this.isConnecting = false;
    }
  }


  onEnter(element) {
    if ((element.value !== undefined && element.value.length >= 0) || $(this).attr('placeholder') !== null) {
      element.parentNode.querySelector('label').classList.add('active');
    }
  }

  onExit(element) {
    if ((element.value !== undefined && element.value.length === 0) || $(this).attr('placeholder') === null) {
      element.parentNode.querySelector('label').classList.remove('active');
    }
  }


}


function onEnter(element) {
  if ((element.value !== undefined && element.value.length >= 0) || $(this).attr('placeholder') !== null) {
    element.parentNode.querySelector('label').classList.add('active');
  }
}

function onExit(element) {
  if ((element.value !== undefined && element.value.length === 0) || $(this).attr('placeholder') === null) {
    element.parentNode.querySelector('label').classList.remove('active');
  }
}
