import { Injectable } from '@angular/core';
import {UserInfo,category} from '../app/app.module';
import { BehaviorSubject} from 'rxjs/BehaviorSubject';
import {
    Storage
} from '@ionic/storage';
@Injectable()
export class SharedDataService {
    public Categories= new BehaviorSubject<category>(new category());
    public UserInfo = new BehaviorSubject<UserInfo>( new UserInfo());
	public USerInfoChanged(newData:UserInfo)
    {
       
        this.UserInfo.next(newData);
        
    }	

    public CategoriesChanged(newData:category)
    {
        this.Categories.next(newData);
    }
public getUserInfo()
{
 this.storage.get('UserInfo').then((data) => {

    
                     this.USerInfoChanged(JSON.parse(data));
                      
                    
                    }, error => {

                    });
}
    constructor( public storage: Storage)
    {
        this.getUserInfo();
               
    }	
}