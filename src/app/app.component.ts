import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { StatusBar } from 'ionic-native';
import { HomePage } from '../pages/home/home';
import { MyOrdersPage } from '../pages/my-orders/my-orders';
import { CartPage } from '../pages/cart/cart';
import { UserPage } from '../pages/user/user';
import { AboutPage } from '../pages/about/about';
import { LoginPage } from '../pages/login/login';
import { CartService } from '../services/cart-service';

import { UserInfo } from './app.module';

import { SharedDataService } from '../services/sharedDataService';
declare var window;
@Component({
  templateUrl: 'app.html',
  queries: {
    nav: new ViewChild('content')
  }
})
export class MyApp {

  public userInfo: UserInfo = null;
  public url: string = '';
  public name: string = 'Biryani City';
  public rootPage: any;
  public cartItemCount: any = 0;
  public nav: any;
  public pages = [];
  public loggedInPages = [
    {
      title: 'Home',
      icon: 'ios-home-outline',
      count: 0,
      component: HomePage
    }, {
      title: 'My Cart',
      icon: 'ios-cart-outline',
      count: this.cartItemCount,
      component: CartPage
    },
    {
      title: 'Profile',
      icon: 'ios-person-outline',
      count: 0,
      component: UserPage
    }, {
      title: 'Orders',
      icon: 'ios-basket-outline',
      count: 0,
      component: MyOrdersPage
    },
    {
      title: 'About us',
      icon: 'ios-information-circle-outline',
      count: 0,
      component: AboutPage
    },
    {
      title: 'Logout/Login',
      icon: 'ios-log-out-outline',
      count: 0,
      component: LoginPage
    },
    // import menu


  ];
  public loggedOutPages = [
    {
      title: 'Home',
      icon: 'ios-home-outline',
      count: 0,
      component: HomePage
    }, {
      title: 'My Cart',
      icon: 'ios-cart-outline',
      count: this.cartItemCount,
      component: CartPage
    },
    {
      title: 'About us',
      icon: 'ios-information-circle-outline',
      count: 0,
      component: AboutPage
    },
    {
      title: 'Logout/Login',
      icon: 'ios-log-out-outline',
      count: 0,
      component: LoginPage
    },
    // import menu


  ];

  constructor(public platform: Platform, private cartService: CartService, public _SharedDataService: SharedDataService) {
    this.rootPage = HomePage;



    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      this.initializeApp();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  initializeApp() {


    this.platform.registerBackButtonAction(() => {

      if (!this.nav.canGoBack()) {
        window.plugins.appMinimize.minimize();
      }
      else {
        return this.nav.pop();
      }

    });
    this._SharedDataService.UserInfo.subscribe((data) => {

      this.userInfo = data;
        this.showPages();
    });
     this.showPages();
    // subscribe to cart changes
    this.cartService
      .statusChanged
      .subscribe(data => {
        this.pages[1].count = data.totalCount;


      });

  }
  showPages() {
    if (this.userInfo == null) {
      this.pages = this.loggedOutPages;
    }
    else {
      this.pages = this.loggedInPages;
    }
  }
  // view my profile
  viewMyProfile() {
    this.nav.setRoot(UserPage);
  }
}


