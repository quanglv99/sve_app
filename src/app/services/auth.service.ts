import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { AppService } from "./app.service";

@Injectable({
    providedIn: 'root',
  })
  export class AuthService {
    private isAuthenticated = false;
    private token = '';
  
    constructor(
      private http: HttpClient,
      private appConfig: AppService,
    ) {
    }
  
    login(
      username: string,
      password: string,
    ): Observable<any> {
      const url = this.appConfig.getLoginApi();
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
  
      const body = {
        username: username,
        password: password,
      };
  
      // Make the HTTP POST request
      return this.http.post(url, JSON.stringify(body), { headers: headers }).pipe(
        // Handle the response
        tap(
          (response: any) => {
            if (response.status === 1) {
              this.setAuthenticated(true);
              this.token = response.token;
            }
          },
          (error) => {
            alert("Could not reach Servers")
          }
        )
      );
    }

    
  
    logout(token:any) : Observable<any> {
        const url = this.appConfig.getLogOutUrl();
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
        });
    
        const body = {
          token: token
        };
    
        // Make the HTTP POST request
        return this.http.post(url, JSON.stringify(body), { headers: headers }).pipe(
          // Handle the response
          tap(
            (response: any) => {
              if (response.status === 1) {
                this.setAuthenticated(false);
                this.token = '';
              }
            },
            (error) => {
              alert("Session has timeout")
            }
          )
        );
      }
  
    getIsAuthenticated(): boolean {
      return this.isAuthenticated;
    }
  
    setAuthenticated(value: boolean) {
      this.isAuthenticated = value;
    }
    getToken(): string {
      return this.token;
    }
  }