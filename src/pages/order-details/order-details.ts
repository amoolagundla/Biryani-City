import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LoginPage} from '../../pages/login/login';
import { Storage } from '@ionic/storage';
import {
    ValuesService
} from '../../services/ValuesService';
import {
    
    AlertController,
    NavParams
    
} from 'ionic-angular';
import {Events} from 'ionic-angular';

/*
  Generated class for the OrderDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-order-details',
  templateUrl: 'order-details.html'
})
export class OrderDetailsPage {

 public orderViewModel:any[];
    public orderInfo:any;
    public ifsys:boolean=false;
  constructor(public nav: NavController, public navCtrl: NavController,public storage: Storage,public valService:ValuesService,public alrt:AlertController,public navParams:NavParams
  ,public events:Events) {
	
	this.orderInfo = this.navParams.get('id');
     this.storage.get('UserInfo').then((user) => {
          let users =JSON.parse(user);
          console.log(users.Email)
      if(users.Email =='sys@gmail.com')
          {
            this.ifsys=true;
          }
     },err=>
     {

     });
        
	 this.valService.getUserOrderDetails(this.orderInfo.OrderId).subscribe(data=>
   {
          this.orderViewModel=data;
          
          console.log(data);
   },err=>
   {
             this.nav.pop();
   })


           
		
	
	}

  NotifyUser()
  {
     this.events.publish('SendMessage',{to:this.orderInfo.Email});
  }

}
