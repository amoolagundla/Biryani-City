import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpClient } from './HttpClient';
import { UserInfo } from '../app/app.module';
import 'rxjs/add/operator/mergeMap';
import { SharedDataService } from './sharedDataService';

@Injectable()
export class ValuesService {
    public UserInfo: any;
    public Categories: any;
    constructor(private http: HttpClient, public _SharedDataService: SharedDataService) { }

    UpdateUserInfo(use: any) {

        this.UserInfo = use;
    };
    getUserInfo(): any {

        return this.UserInfo;
    };
    UpdateOrder(Id: string, status: string) {
        return this.http.get('api/Orders/UpdateOrder/' + Id + '/' + status).map((response: Response) => response.json());

    }
    SaveToken(tok: any) {
        let facebookTokens =
            {
                ID: 0,
                token: tok
            };
        return this.http.post('api/PushTokens/SavePushTokens/', JSON.stringify(facebookTokens)).map((response: Response) => response.json());

    }


    getValues() {
        return this.http.get('api/Values').map((response: Response) => response.json());

    }

    getUserOrders(Id: any) {
        return this.http.get('api/Orders/GetUserOrders/' + Id).map((response: Response) => response.json());

    }
    getUserOrderDetails(Id: any) {
        return this.http.get('api/Orders/GetUserOrderDetails/' + Id).map((response: Response) => response.json());

    }
    UpdateProfile(userInfo: UserInfo) {
        return this.http.post('api/UserInfo', JSON.stringify(userInfo)).map((response: Response) => response.json());

    }

    UpdateAddress(Address: any) {
        return this.http.put('api/Addresses/' + Address.Id, JSON.stringify(Address)).map((response: Response) => response);

    }
    InsertAddress(Address: any) {
        return this.http.post('api/Addresses/', JSON.stringify(Address)).map((response: Response) => response.json());

    }
    DeleteAddress(id: any) {
        return this.http.delete('api/Addresses/' + id).map((response: Response) => response);

    }

    Register(user: any) {
        return this.http.post('api/Account/Register', user).map((response: Response) => response.json());
    }

    RegisterExternal(user: any) {
        return this.http.post('api/Account/RegisterExternal', user).map((response: Response) => response.json());
    }

    PostOrder(Order: any) {
        return this.http.post('api/Orders', Order).map((response: Response) => response.json());

    }
    PostChangePassword(passwords: any) {
        return this.http.post('api/Account/ChangePassword', passwords).map((response: Response) => response.json());



    }

    getAll() {
        return this.http.get('api/UserInfo').map((response: Response) =>  
        {
            this._SharedDataService.USerInfoChanged(response.json());
            
            return response.json()
        });
           
    }

    logOut()
    {
     this._SharedDataService.USerInfoChanged(null);
    }

    getAllCategories() {
        let returnData = this.http.get('api/Categories').map((response: Response) => { return response.json(); });
   return returnData;
    }
    
    getAllProducts(id: any) {
        return this.http.get('api/Products/' + id).map((response: Response) => response.json());
    }

    GetByProductName(name: any) {
        return this.http.get('api/Products/GetByProductName/' + name).map((response: Response) => response.json())
    }
    RegisterExternalLogin(token: any, email: any) {
        return this.http.RegisterExternalLogin(token, email, 'api/Account/RegisterExternal/').map((response: Response) => response.json());
    }

    PostFacebookTokens(tok: any) {
        let facebookTokens =
            {
                token: tok
            };
        return this.http.post('api/FacebookTokens', JSON.stringify(facebookTokens)).map((response: Response) => response.json());
    }
    ResendEmail(email: any, number: any) {
        let PasswordReset =
            {
                Email: email,
                PhoneNumber: number
            };
        return this.http.post('api/Account/LostPassword', JSON.stringify(PasswordReset)).map((response: Response) => response.json());
    }
    ResetPassword(token: any, email: any, newPassword: any, confirmPassword: any) {
        let PasswordReset =
            {
                Token: token,
                Email: email,
                NewPassword: newPassword,
                ConfirmPassword: confirmPassword
            };
        return this.http.post('api/Account/ChangeResetPassword', JSON.stringify(PasswordReset)).map((response: Response) => response.json());
    }
}