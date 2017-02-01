import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LoginPage} from '../../pages/login/login';
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
    public orderViewModel:any[];
    public user:any;
  constructor(public nav: NavController, public navCtrl: NavController,public storage: Storage,public valService:ValuesService,public alrt:AlertController) {
	

  


	this.storage.get('UserInfo').then((data) => {
                 this.user = JSON.parse(data);
                 
	 this.valService.getUserOrders(this.user.Email =="sys@gmail.com"? 'null':this.user.Id).subscribe(data=>
   {
          this.orderViewModel=data;
   },err=>
   {
             this.nav.pop();
   })


            },error=>
					{
             let alert = this.alrt.create({
                            title: 'Error ',
                            subTitle: 'Please Login to view Orders',
                            buttons: ['Dismiss']
                        });
                        alert.present();
             this.nav.pop();
					});  
		
	
	}

  ionViewDidLoad() {
   
  }
doRefresh(refresher) {


this.valService.getUserOrders(this.user.Email =="sys@gmail.com"? 'null':this.user.Id).subscribe(data=>
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
