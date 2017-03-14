import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import {Observable} from 'rxjs';
@Injectable()
export class HttpClient {
//public baseurl:any ='http://localhost:53852/';
public baseurl:any ='http://99pumba.azurewebsites.net/';
  constructor(private http: Http, public storage: Storage) { }

  createAuthorizationHeader(headers: Headers) {
  this.storage.get('currentUser').then((cUser) => {
   

      headers.append('Authorization', 'Bearer ' + cUser);
      headers.append('Content-Type', 'application/json');
      return headers;
    });

  }


getApiToken(): Observable<Headers> {
     let headers: Headers = new Headers();
    return Observable.fromPromise(this.storage.get('currentUser').then((cUser) => {
           headers.append('Authorization', 'Bearer ' +cUser);
      headers.append('Content-Type', 'application/json');
      return headers;
    },error=>
					{
					 return headers;	
    }));
   //OR return Observalbe.of(this.storage.get('api_token'));
}

getHeaders(): Headers { 
    return new Headers();
}


get(url: string): Observable<any> {   
    return this.getApiToken().flatMap(head => {         
       return this.http.get(this.baseurl+url , {
      headers: head
    });
    });
}

  delete(url) {

   return this.getApiToken().flatMap(head => {   
    return this.http.delete(this.baseurl+url, {
      headers: head
    });
   });
  }
  post(url, data) {
    return this.getApiToken().flatMap(head => {   
    return this.http.post(this.baseurl+url, data, {
      headers: head
    });
    });
  }

  put(url, data) {
    return this.getApiToken().flatMap(head => {  
    return this.http.put(this.baseurl+url, data, {
      headers: head
    });
    });
  }

  RegisterExternalLogin(token,email,url)
  {
     let headers: Headers = new Headers();
     let data={
       Email:email
     }
         headers.append('Authorization', 'Bearer ' +token);
      headers.append('Content-Type', 'application/json');
      return this.http.post(this.baseurl+url, JSON.stringify(data), {
      headers: headers
    });
  }
}