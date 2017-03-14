import { Component,OnInit } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { CartService } from '../../services/cart-service';
import { CheckoutPage } from "../checkout/checkout";
import {
  LoginPage
} from '../../pages/login/login';

import {  UserInfo } from '../../app/app.module';
import { SharedDataService } from '../../services/sharedDataService';
/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html'
})
export class CartPage implements OnInit {
  // cart data
  public cart: any;
  public total: any;
  public userInfo: UserInfo = null;

  ngOnInit()
  {
    
  }
  constructor(public nav: NavController, public cartService: CartService, public alertController: AlertController, 
    public _SharedDataService: SharedDataService) {


    this._SharedDataService.UserInfo.subscribe((data) => {

      this.userInfo = data;
    });

    // set sample data
    this.cart = cartService.getCart();
    this.total = cartService.calcTotalSum();
    if (this.cart.length == 0) {
      this.nav.pop();
      this.nav.push(HomePage);
    }
  }

  // plus quantity
  plusQty(item) {
    console.log(item);
    item.Quantity++;
    this.total = this.cartService.calcTotalSum();
  }

  // minus quantity
  minusQty(item) {
    if (item.Quantity > 1) {
      item.Quantity--;
      this.total = this.cartService.calcTotalSum();
    }
  }

  // remove item from cart
  remove(index, item) {
    this.cartService.removeCartItem(index);
    this.total = this.cartService.calcTotalSum();
    this.cart = this.cartService.getCart();
    if (this.cart.length == 0) {
      this.showAlert();
    }
  }
  public showAlert() {
    let alert = this.alertController.create({
      title: 'Info',
      subTitle: 'No Items in Cart',
      buttons: [
        {
          text: 'OK',
          handler: data => {
            this.nav.pop();
            this.nav.push(HomePage);
          }
        }
      ]
    });

    alert.present();
  }

  public showLoginAlert() {
    let alert = this.alertController.create({
      title: 'Alert',
      subTitle: 'Yuo are  Not Logged In! please Login',
      buttons: [
        {
          text: 'OK',
          handler: data => {

            this.nav.push(LoginPage);
          }
        }
      ]
    });

    alert.present();
  }
  public GotToHome() {
    this.nav.setRoot(HomePage);
  }

  // click buy button
  buy() {

    // set data for categories

    if (this.userInfo != null || this.userInfo != undefined) {
      this.nav.push(CheckoutPage, {
        total: this.total,
      });
    } else {
      this.showLoginAlert();
    }
  }
}
