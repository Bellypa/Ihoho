import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppConfig } from 'src/app/app.config';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string;
  httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json;', 'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        // Authorization: this.authService.getToken(),
        Accept: 'q=0.8;application/json;q=0.9',
        'Access-Control-Max-Age': '600',
        'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
        Pragma: 'no-cache',
        Expires: '0'
      }

    )
  };



  constructor(
    private http: HttpClient,
    private configuration: AppConfig,
    private authService: AuthService,
  ) {
    this.url = this.configuration.apiUrl;
  }



  getUsers() {
    return this.http.get<any[]>(this.url + 'users', this.httpOptions);
  }

  createUser(user: any) {
    const body = JSON.stringify(user);
    return this.http.post<any[]>(this.url + 'users', body, this.httpOptions)
      .pipe(map((data: any) => {
        return data;
      }),
        catchError(this.handleErrors));
  }
  getClients() {
    return this.http.get<any[]>(this.url + 'businessClients', this.httpOptions);
  }
  getPartners() {
    return this.http.get<any[]>(this.url + 'partners', this.httpOptions);
  }


  getRoles() {
    return this.http.get<any[]>(this.url + 'roles', this.httpOptions);
  }


  getBusinessService() {
    return this.http.get<any[]>(this.url + 'businessServices', this.httpOptions);
  }


  getParterService() {
    return this.http.get<any[]>(this.url + 'roles', this.httpOptions);
  }


  createParterService(user: any) {
    const body = JSON.stringify(user);
    return this.http.post<any[]>(this.url + 'partnerServices', body, this.httpOptions)
      .pipe(map((data: any) => {
        return data;
      }),
        catchError(this.handleErrors));
  }

  private handleErrors(error: HttpErrorResponse): Observable<any> {
    console.log(error);
    if (error.status > 0) {
      if (error.status > 0) {
        if (error.status === 401) {
          // return throwError('Unauthorized');
          return throwError(error.error);
        } else if (error.status === 500) {
          return throwError('Please try again');
        } else if (error.status === 302) {
          return throwError('Already have an open session.');
        } else if (error.status === 404) {
          return throwError(error.error);
        } else {
          console.log(error);
          return throwError(error.error || 'Please try again');
        }
      }
    } else {
      return throwError('Check Connection and Try again');
    }
  }

}
