import {Component} from '@angular/core';
import {NavController, AlertController,NavParams} from 'ionic-angular';
import { CartService} from '../../services/cart-service';
import {ItemService} from '../../services/item-service';
import {HomePage} from "../home/home";

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-item',
  templateUrl: 'item.html'
})
export class ItemPage {
  // item object
  public item: any;
 
  constructor(public nav: NavController, public itemService: ItemService,public cartService:CartService, public alertController: AlertController,public navParams: NavParams) {
    // get sample data for item
		 	this.item = 	JSON.parse(this.navParams.get('item'));
			console.log(this.item);
		   // this.item = itemService.getItem(1);
  }

 

  // add item to cart
  addCart(item:any) {
    let prompt = this.alertController.create({
      title: 'Quanity',
      message: "1=1kg, 1.5 =1500 grams",
      inputs: [
        {
          name: 'quantity',
          value: '1'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
           console.log(data);
            // go to cart
					let orderDetail = {
						Id:'',
						Amount: item.Price,
						Quantity:data.quantity,
						UnitPrice: item.Price,
						Product:item,
						total:0
						
					};		
						 this.cartService.addCartItem(orderDetail);
            this.nav.setRoot(HomePage);
          }
        }
      ]
    });

    prompt.present();
  }
}
