import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {
    ValuesService
} from '../../services/ValuesService';
import {
    
    AlertController
    
} from 'ionic-angular';
import {
   OrderDetailsPage
} from '../../pages/order-details/order-details';

import { SharedDataService } from '../../services/sharedDataService';

import {  UserInfo } from '../../app/app.module';
/*
  Generated class for the MyOrders page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'MyOrdersPage',
  templateUrl: 'my-orders.html'
})
export class MyOrdersPage {
    private showList: boolean;
       public myVar: boolean = false;
    public orderViewModel:any[];
     public filtered:any[];
    public user:any;
    public userInfo:UserInfo;
    public products:any[];
  constructor(public nav: NavController, public navCtrl: NavController,public storage: Storage,public valService:ValuesService,public alrt:AlertController,
   public _SharedDataService: SharedDataService) {
	

  this._SharedDataService.UserInfo.subscribe((data)=>
			{
			
				this.userInfo=data;

                       console.log(this.userInfo)
			});
        this.valService.getUserOrders(this.userInfo.Email =="sys@gmail.com"? 'null':this.userInfo.Id).subscribe(data=>
   {
          this.orderViewModel=data;
            this.initializeItems();
   },err=>
   {
             this.nav.pop();
   })
	
	}

  


initializeItems() {
    this.products=[];
    this.orderViewModel.forEach(element => {
        this.products.push(element);
    });
}

   getCatogoriesProductName(ev) {
     
      
      // Show the results
    this.showList = true;
             
this.myVar=true;

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
     
        this.filtered = this.products.filter(
      
          item =>
         
         item.Email.indexOf(val) !== -1
        );
    console.log(this.filtered);
    }
    else
    {
        this.filtered = null;
    }

    }

    onCancel(ev) {
this.myVar=true;
       
    
     // Reset the field
    ev.target.value = '';
    console.log("cancelled clicked");
    }

    
doRefresh(refresher) {


this.valService.getUserOrders(this.userInfo.Email =="sys@gmail.com"? 'null':this.userInfo.Id).subscribe(data=>
   {
      refresher.complete();
          this.orderViewModel=data;
   },err=>
   {
 refresher.complete(); 
   })


       
    }
  itemSelected(item)
  {
  
    this.nav.push(OrderDetailsPage,{id:item})
  }

}
