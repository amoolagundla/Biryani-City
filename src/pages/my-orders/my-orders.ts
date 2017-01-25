import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LoginPage} from '../../pages/login/login';
import { Storage } from '@ionic/storage';
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
  constructor(public nav: NavController, public navCtrl: NavController,public storage: Storage) {
	
	this.storage.get('UserInfo').then((data) => {
                 let user = JSON.parse(data);
                 console.log(user);
	 this.orderViewModel =user.Orders;
            },error=>
					{
						 	this.nav.setRoot(LoginPage);
					});  
		
	
	}

  ionViewDidLoad() {
   
  }

}
