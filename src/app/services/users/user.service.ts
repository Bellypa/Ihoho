import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
    return this.http.post<any[]>(this.url + 'users', this.httpOptions);
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
}
