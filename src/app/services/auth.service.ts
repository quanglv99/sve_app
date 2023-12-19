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
    //data user login
    private userLoggerSession: any
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
              localStorage.setItem('currentToken', response.token);
              localStorage.setItem('currentUsername', response.sve_member.ldap_user);
              localStorage.setItem('currentUserFullname', response.sve_member.member_full_name);
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
            }
          )
        );
      }

      profile(token: string , user_id: string, member_id: string, username: string, full_info: boolean) : Observable<any>
      {
      const url = this.appConfig.getMemberInfoUrl();
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
  
      const body = {
        token: token,
        user_id: user_id,
        member_id: member_id,
        username: username,
        full_info: full_info
      };
  
      // Make the HTTP POST request
      return this.http.post(url, JSON.stringify(body), { headers: headers }).pipe(
        // Handle the response
        tap(
          (response: any) => {
            
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
    getToken(): any {
        return localStorage.getItem('currentToken')
    }
  }