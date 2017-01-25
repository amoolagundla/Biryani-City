import { Injectable } from '@angular/core';
import { Http, Headers,Response,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch'; 
import {Observable} from 'rxjs/Observable'; 
import 'rxjs/add/operator/map'; 
import { Storage } from '@ionic/storage';

@Injectable()
export class AuthenticationService {
    //public baseurl:any ='http://localhost:53852/';
public baseurl:any ='http://99pumba.azurewebsites.net/';
    constructor(private http: Http,public storage: Storage){ }
 
    login(userName: string, Password: string) {
			
			 let url = "Token";
        let body = "username=" + userName + "&password=" + Password + "&grant_type=password";
        let headers = new Headers();
				headers.append( 'Content-Type', 'application/x-www-form-urlencoded' );

				
        let options = new RequestOptions({ headers: headers });        
         
       return this.http.post(this.baseurl+url, body, options)
              .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.access_token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
									
                               return response.json();
                              
                    
                }
            });


      
    }

    Facebooklogin(acesstoken:any) {
			
			 let url = "Token";
        let body = "grant_type=facebook&accesstoken="+acesstoken;
      
        let headers = new Headers();
				headers.append( 'Content-Type', 'application/x-www-form-urlencoded' );

				
        let options = new RequestOptions({ headers: headers });        
         
       return this.http.post(this.baseurl+url, body, options)
              .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.access_token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
									
                               return response.json();
                              
                    
                }
            })
      
    }
     Googlelogin(acesstoken:any) {
			
			 let url = "Token";
        let body = "grant_type=google&accesstoken="+acesstoken;
      
        let headers = new Headers();
				headers.append( 'Content-Type', 'application/x-www-form-urlencoded' );

				
        let options = new RequestOptions({ headers: headers });        
         
       return this.http.post(this.baseurl+url, body, options)
              .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.access_token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
									
                               return response.json();
                              
                    
                }
            })
      
    }
          private handleError(error:Response)
					{
						return Observable.throw(error.json().error ||'server error');
					}
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}