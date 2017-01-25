import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map'; 
import {HttpClient} from './HttpClient';
import {UserInfo} from '../app/app.module';
import {Observable} from 'rxjs/Rx';
import  'rxjs/add/operator/mergeMap'; 


@Injectable()
export class ValuesService {
	public UserInfo:any;
	public Categories:any;
    constructor(private http: HttpClient) { }
		
		 UpdateUserInfo(use:any) {

         this.UserInfo = use;
    };
        getUserInfo(): any {

        return this.UserInfo;
    };
		
    getAll() {
       return this.http.get('api/UserInfo').map<UserInfo>((response: Response) => response.json())  .catch((error: any) => {
         
          return Observable.throw(error.message || error);
      });
	
    }

    getValues() {
        return this.http.get('api/Values').map((response: Response) => response.json())  .catch((error: any) => {
          
          return Observable.throw(error.message || error);
      });

    }
		UpdateProfile(userInfo:UserInfo) {
        return this.http.post('api/UserInfo',JSON.stringify(userInfo)).map((response: Response) => response.json())  .catch((error: any) => {
      
          return Observable.throw(error.message || error);
      });

    }
		
		  UpdateAddress(Address:any) {
        return this.http.put('api/Addresses/'+Address.Id,JSON.stringify(Address)).map((response: Response) => response)  .catch((error: any) => {
        
          return Observable.throw(error.message || error);
      });

    }
		InsertAddress(Address:any) {
        return this.http.post('api/Addresses/',JSON.stringify(Address)).map((response: Response) => response.json())  .catch((error: any) => {
         
          return Observable.throw(error.message || error);
      });

    }
			DeleteAddress(id:any) {
        return this.http.delete('api/Addresses/'+id).map((response: Response) => response)  .catch((error: any) => {
          
          return Observable.throw(error.message || error);
      });

    }
		
		Register(user:any) {
        return this.http.post('api/Account/Register',user).map((response: Response) => response.json())
				   .catch((error: any) => {
         
          return Observable.throw(error.message || error);
      });

     
    }
		
		RegisterExternal(user:any) {
        return this.http.post('api/Account/RegisterExternal',user).map((response: Response) => response.json())
				   .catch((error: any) => {
         
          return Observable.throw(error.message || error);
      });

     
    }
		
		PostOrder(Order:any) {
        return this.http.post('api/Orders',Order).map((response: Response) => response.json())
				   .catch((error: any) => {
         
          return Observable.throw(error.message || error);
      });

     
    }
		PostChangePassword(passwords:any) {
        return this.http.post('api/Account/ChangePassword',passwords).map((response: Response) => response.json());
				   

     
    }
		 
		
	 getAllCategories() { 
        return this.http.get('api/Categories').map((response: Response) => response.json())  .catch((error: any) => {
        
          return Observable.throw(error.message || error);
      });

    }
		 getAllProducts(id:any) {
        return this.http.get('api/Products/'+id).map((response: Response) => response.json()) .catch((error: any) => {
        
          return Observable.throw(error.message || error);
      });

    }

    GetByProductName(name:any) {
        return this.http.get('api/Products/GetByProductName/'+name).map((response: Response) => response.json()) .catch((error: any) => {
        
          return Observable.throw(error.message || error);
      });

    }
    RegisterExternalLogin(token:any,email:any)
    {
         return this.http.RegisterExternalLogin(token,email,'api/Account/RegisterExternal/').map((response: Response) => response.json()) .catch((error: any) => {
        
          return Observable.throw(error.message || error);
      });
    }

     PostFacebookTokens(tok:any)
    {
      let facebookTokens=
      {
          token :tok
      };
         return this.http.post('api/FacebookTokens',JSON.stringify(facebookTokens)).map((response: Response) => response.json())
				   .catch((error: any) => {
         
          return Observable.throw(error.message || error);
      });
    }
}