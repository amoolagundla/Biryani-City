import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {ViewChild} from '@angular/core';
import {StatusBar} from 'ionic-native';
// import pages
import {HomePage} from '../pages/home/home';
import {MyOrdersPage} from '../pages/my-orders/my-orders';
import {RegisterPage} from '../pages/register/register';
//import {FavoritePage} from '../pages/favorite/favorite';
import {CartPage} from '../pages/cart/cart';
import {UserPage} from '../pages/user/user';
import {AboutPage} from '../pages/about/about';
import {LoginPage} from '../pages/login/login';
import{CartService} from '../services/cart-service';
import {
    
    NativeStorage
    
    
     
    
} from 'ionic-native';
import {
    Push,
    PushToken
} from '@ionic/cloud-angular';
// end import pages

@Component({
  templateUrl: 'app.html',
  queries: {
    nav: new ViewChild('content')
  }
})
export class MyApp {
public url:string='';
public name:string='Biryani City';
  public rootPage: any;
public cartItemCount:any = 0;
  public nav: any;

  public pages = [
    {
      title: 'Home',
      icon: 'ios-home-outline',
      count: 0,
      component: HomePage
    },

    

    {
      title: 'My Cart',
      icon: 'ios-cart-outline',
      count: this.cartItemCount,
      component: CartPage
    },
		{
      title: 'Profile',
      icon: 'ios-list-outline',
      count: 0,
      component: UserPage
    },{
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

  constructor(public platform: Platform, private cartService: CartService ,public push: Push) {
    this.rootPage = HomePage;
  
   NativeStorage.getItem('userDetails').then((data) =>
   {
      this.url=data.url;
      this.name=data.name;

   },err=>
   {

   });
    platform.ready().then(() => {
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
    this.push.unregister();
       this.platform.registerBackButtonAction(() => {

         if (!this.nav.canGoBack()) {
           this.nav.setRoot(HomePage); 
          }
          else
          {
            return this.nav.pop();
          }
       
      });
      
      // subscribe to cart changes
      this.cartService
        .statusChanged
        .subscribe(data => {
					this.pages[1].count =data.totalCount;
			
              
        });
      
  }

  // view my profile
  viewMyProfile() {
    this.nav.setRoot(UserPage);
  }
}


