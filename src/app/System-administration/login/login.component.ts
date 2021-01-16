import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  public loginInvalid: boolean;
  private formSubmitAttempt: boolean;
  private returnUrl: string;
  username: string;
  password: string;
  errorMessage: string;


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { this.errorMessage = ''; }

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
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
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
              // localStorage.setItem('token', JSON.stringify(data.token));
              // localStorage.setItem('token', JSON.stringify(data));
              this.authService.setToken(data.token);
              this.authService.setLoginUser(JSON.stringify(data), data);
              this.router.navigate(['/welcome']);
            },
            error => {
              this.errorMessage = error.error.status === 401 ? 'Username or password is incorrect' : error.error.status;
              console.log(error.error);
            }
          );
      } catch (err) {
        this.loginInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
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
