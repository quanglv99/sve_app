import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { AppService } from "./app.service";

@Injectable({
    providedIn: 'root',
  })
  export class AuthService {
    private isAuthenticated = false;
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
              }
            },
            (error) => {
              alert("Could not reach Servers")
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
            
          },
          (error) => {
            alert("Could not reach Servers")
          }
        )
      );
      }

      enrollCheck(token:any) : Observable<any> {
        const url = this.appConfig.getEnrollCheckUrl();
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
        });
    
        const body = {
          token: token
        };
        return this.http.post(url, JSON.stringify(body), { headers: headers }).pipe(
          tap(
            (response: any) => {
            },
            (error) => {
              alert("Could not reach Servers")
            }
          )
        );
      }
  
      enroll(token: string , foundation_id: string, id_card_front_scan: string, id_card_back_scan: string, photo: string) : Observable<any>
      {
      const url = this.appConfig.getEnrollUpload();
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
  
      const body = {
        token: token,
        foundation_id: foundation_id,
        id_card_front_scan: id_card_front_scan,
        id_card_back_scan: id_card_back_scan,
        photo: photo
      };
  
      // Make the HTTP POST request
      return this.http.post(url, JSON.stringify(body), { headers: headers }).pipe(
        // Handle the response
        tap(
          (response: any) => {
            
          },
          (err) =>
          {
            console.log(err)
          }
        )
      );
      }

      enrollImage(token: string , user_id: string, member_id: string, username: string, image_list: string[], zip: boolean) : Observable<any>
      {
      const url = this.appConfig.getEnrollScanUrl();
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
  
      const body = {
        token: token,
        user_id: user_id,
        member_id: member_id,
        username: username,
        image_list: image_list,
        zip: zip
      };
  
      // Make the HTTP POST request
      return this.http.post(url, JSON.stringify(body), { headers: headers }).pipe(
        // Handle the response
        tap(
          (response: any) => {
            
          },
          (error) => {
            alert("Could not reach Servers")
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