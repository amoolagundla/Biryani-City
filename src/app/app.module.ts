import {NgModule} from '@angular/core';
import { Storage } from '@ionic/storage';
import {IonicApp, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';
import { FormsModule } from '@angular/forms';
// import services
import {MenuService} from '../services/menu-service';
import {CategoryService} from '../services/category-service';
import {ItemService} from '../services/item-service';
import {CartService} from '../services/cart-service';
import {PostService} from '../services/post-service';
import {ChatService} from '../services/chat-service';
import {AuthenticationService} from '../services/login-service';
import {ValuesService} from '../services/ValuesService';
import {HttpClient} from '../services/HttpClient';
// end import services
// end import services
// import pages
import { ModalContentPage } from '../pages/checkout/ModalContentPage';
import {AboutPage} from '../pages/about/about';
import {ChangePasswordPage} from '../pages/change-password/change-password';
import {MyOrdersPage} from '../pages/my-orders/my-orders';
import {AddressPage} from '../pages/address/address';
import {CartPage} from '../pages/cart/cart';
import {CategoriesPage} from '../pages/categories/categories';
import {CategoryPage} from '../pages/category/category';
import {ChatDetailPage} from '../pages/chat-detail/chat-detail';
import {ChatsPage} from '../pages/chats/chats';
import {CheckoutPage} from '../pages/checkout/checkout';
import {FavoritePage} from '../pages/favorite/favorite';
import {HomePage} from '../pages/home/home';
import {ItemPage} from '../pages/item/item';
import {LoginPage} from '../pages/login/login';
import {NewsPage} from '../pages/news/news';
import {OfferPage} from '../pages/offer/offer';
import {RegisterPage} from '../pages/register/register';
import {SettingPage} from '../pages/setting/setting';
import {UserPage} from '../pages/user/user';
import {LogoutPage} from '../pages/logout/logout';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { SignalRService } from '../services/signalRService';
import{LocationTracker} from '../services/LocationTracker';
import {OrderDetailsPage} from '../pages/order-details/order-details';

import {LoginPartialPage} from '../pages/Login-Partial/Login-Partial';
// end import pages

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '72511df2',
  },
  'push': {
    'sender_id': '794768984490',
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': true
      },
      'android': {
        'iconColor': '#343434'
      }
    }
  }
};
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    AddressPage,
    CartPage,
    CategoriesPage,
    CategoryPage,
    ChatDetailPage,
    ChatsPage,
    CheckoutPage,
    FavoritePage,
    HomePage,
    ItemPage,
    LoginPage,
    NewsPage,
    OfferPage,
    RegisterPage,
    SettingPage,
    UserPage,
		LogoutPage,
		MyOrdersPage,
		ChangePasswordPage,
    OrderDetailsPage,
    ModalContentPage,
    LoginPartialPage
  ],
  imports: [
    IonicModule.forRoot(MyApp,{tabsPlacement: 'top'}),  CloudModule.forRoot(cloudSettings),
		FormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    AddressPage,
    CartPage,
    CategoriesPage,
    CategoryPage,
    ChatDetailPage,
    ChatsPage,
    CheckoutPage,
    FavoritePage,
    HomePage,
    ItemPage,
    LoginPage,
    NewsPage,
    OfferPage,
    RegisterPage,
    SettingPage,
    UserPage,
		MyOrdersPage,
		ChangePasswordPage,
    OrderDetailsPage,
    ModalContentPage,
    LoginPartialPage
  ],
  providers: [
	Storage ,
	MenuService,
    CategoryService,
    ItemService,
    CartService,
    PostService,
    ChatService,
		AuthenticationService,
		HttpClient,
		ValuesService,
    SignalRService,
    LocationTracker
    /* import services */
  ]
})
export class AppModule {
}

export class OrderViewModel{
	      public Id:number ;
        public  ProdcutName:string;
        public  OrderDate : string;
        public  DeliveryTime:string ;
        public  AddressId:string ;
        public  OrderTotal:string ;
        public  UserId:string ;
       public  OrderStatus :string;
			 public thumb:string;
			  constructor()
				 { 
				 }
}
export class category
    {
         constructor()
				 { 
				 }
        public Id: number;
        public  Name:string
        public  CategoryDescription:string;
        public  thumb:string;
        public  Items:Product[];
    }
 export class Product
    {
        constructor()
				 { 
				 }
        public Id: number;
        public ProdcutName:string
        public  ProductDesc :string
        public  IsProductActive:boolean;
        public  Price:string;
        public  thumb:string;
         public  Offer :string;
        
    }
    export class Address {
			 public Id: number;
       public Address1: string;
       public Address2: string;
       public Address3: string;
       public City: string;
       public State: string;
      public  Country: string;
      public  PostalCode: string;
      public  UserName: string;
      public  IsDefault: boolean;
         constructor()
				 { 
				 }
				
    }

    export class Order {
			public Id: number;
        public ProductId: number;
        public UserId: string;
        public Email: string;
        public OrderDate: Date;
       public DeliveryTime: Date;
       constructor()
			 {
			 }
    }

    export class UserInfo {
			 public	 Id: string;
      public  Email: string;
      public  HasRegistered: boolean;
     public   LoginProvider: any;
     public   PhoneNumber: any;
		 public FirstName:string;
		 public LastName:string;
     public   Addresses: Address[];
     public  Orders: OrderViewModel[];
       constructor( 
			 	 )
		{
			
		}
    }



