import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { AppConfig } from '../app.config';
import { map, catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuthenticated = new BehaviorSubject<boolean>(false);


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;', 'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      Accept: 'q=0.8;application/json;q=0.9'
    })
  };

  postUrl: string = this.config.apiUrl;
  constructor(
    private router: Router,
    private http: HttpClient,
    private config: AppConfig
  ) { }


  getToken() {
    if (localStorage.getItem(this.config.JWT_Token)) {
      // const token = this.aESEncryptDecryptService.decrypt(localStorage.getItem(this.config.JWT_Token));
      // return token;
    } else {
      const token = null;
      return token;
    }
  }



  isLogedIn() {
    if (localStorage.getItem('token')) {
      return true;
    } else { return false; }
  }




  login(credentials: any): Observable<any> {
    const body = JSON.stringify(credentials);
    return this.http.post<any>(this.postUrl + 'users/login', body, this.httpOptions)
      .pipe(map(this.extractData),
        catchError(this.handleErrors));
  }


  private extractData(res: Response) {
    const body = JSON.parse(JSON.stringify(res || null));
    return body || {};
  }



  async checkAuthenticated() {
    // const authenticated = await this.authClient.session.exists();
    // this.isAuthenticated.next(authenticated);
    // return authenticated;
    return null;
  }







  async logout(redirect: string) {
    try {
      // await this.authClient.signOut();
      this.isAuthenticated.next(false);
      this.router.navigate([redirect]);
    } catch (err) {
      console.error(err);
    }
  }


  private handleErrors(error: HttpErrorResponse): Observable<any> {
    if (error.status > 0) {
      if (error.status > 0) {
        if (error.status === 401) {
          return throwError('Unauthorized');
        } else if (error.status === 500) {
          return throwError('Contact your administrator');
        } else if (error.status === 302) {
          return throwError('Already have an open session.');
        } else if (error.status === 404) {
          return throwError(error.error);
        } else {
          return throwError(error.error || 'Server error');
        }
      }
    } else {
      return throwError('Please check your connection or Contact Your administrator');
    }
  }

}
