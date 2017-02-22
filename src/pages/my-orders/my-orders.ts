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
    private showList: boolean;
       public myVar: boolean = false;
    public orderViewModel:any[];
     public filtered:any[];
    public user:any;
    public products:any[];
  constructor(public nav: NavController, public navCtrl: NavController,public storage: Storage,public valService:ValuesService,public alrt:AlertController) {
	

  


	this.storage.get('UserInfo').then((data) => {
                 this.user = JSON.parse(data);
                 
	 this.valService.getUserOrders(this.user.Email =="sys@gmail.com"? 'null':this.user.Id).subscribe(data=>
   {
          this.orderViewModel=data;
            this.initializeItems();
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
