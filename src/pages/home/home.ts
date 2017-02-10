import {
    Component 
} from '@angular/core';
import {
    NavController,
    AlertController,
    NavParams
} from 'ionic-angular';
import {
    LoadingController
} from 'ionic-angular';
import {
    CartPage
} from '../../pages/cart/cart';
import {
    ValuesService
} from '../../services/ValuesService';
import {
    CategoryPage
} from "../category/category";
import {
    CartService
} from '../../services/cart-service';
import {
    LoginPage
} from '../../pages/login/login';
import {
    Storage
} from '@ionic/storage';
import {

    LocalNotifications

} from 'ionic-native';
import {Events} from 'ionic-angular';
declare var $: any;
/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage   {

    // list of categories
    public loading: any = this.loadingCtrl.create({
        content: "Please wait...",
        dismissOnPageChange: true
    });
     private showList: boolean;
    public categories: any;
    public cartCount: any = 0;
    public abc: any;
    public email: any = 'sys';
    public product: any = '';
    public products: any=[];
     public filteredProducts: any=[];
    public myVar: boolean = true;
    constructor(public loadingCtrl: LoadingController,
        public nav: NavController,
        private valuesService: ValuesService,
        private cartService: CartService,
        public storage: Storage,
        public alertController: AlertController, public navParams: NavParams,public events:Events) {
            this.showList = false;
             this.cartService
            .statusChanged
            .subscribe(data => {
                this.cartCount = data.totalCount;
             

            },err=>
            {

            });
              
       
            let cart = this.cartService.getCart();
            this.cartCount=cart.length;
          

        this.getCatogories();

        
        this.email = this.navParams.get('email');
      
        // set data for categories
        this.storage.get('UserInfo').then((user) => {
          let users =JSON.parse(user);
          this.email = users.Email;
            this.valuesService.UpdateUserInfo(users);

             // Get an observable for events emitted on this channel
        if (this.email != '' || this.email!=undefined ||  this.email!=null) {
            $.connection.hub.url = 'http://99pumba.azurewebsites.net/signalr/hubs';
            let chat = $.connection.chatHub;
            let th = this;
            let em = this.email;
            // Start the connection.
             

                 this.events.subscribe('SendMessage',(data) => {
                      
                          chat.server.sendToSpecific('sys@gmail.com','Your Order is Ready to Pickup',data.to);
         

});
            // Create a function that the hub can call to broadcast chat messages.
            chat.client.broadcastMessage = function(name, message) {
                  
                               // var msg = JSON.parse(message);
            // alert(message)
                // Schedule a sinle notification
                LocalNotifications.schedule({
                    id: 1,
                    title: 'Biryani City',
                    text: message,
                    icon: 'res://sicon.png'
                });
            };

            $.connection.hub.start({
                withCredentials: false
            }).done(function() {
                //Calls the notify method of the server

                chat.server.notify(em, $.connection.hub.id);


            });

            $.connection.hub.disconnected(function() {
    setTimeout(function() {
         $.connection.hub.start({
                withCredentials: false
            }).done(function() {
                //Calls the notify method of the server

                chat.server.notify(em, $.connection.hub.id);


            });
    }, 5000); // Re-start connection after 5 seconds
});

        }
        }, error => {

            this.nav.setRoot(LoginPage);
        });
        // subscribe to cart changes
       
     
       
        
    }



    // add item to cart
    addCart(item: any) {
        let prompt = this.alertController.create({
            title: 'Quanity',
            message: "1 X",
            inputs: [{
                name: 'quantity',
                value: '1'
            }, ],
            buttons: [{
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
                            Id: '',
                            Amount: item.Price,
                            Quantity: data.quantity,
                            UnitPrice: item.Price,
                            Product: item,
                            total: 0

                        };
                        this.cartService.addCartItem(orderDetail);
                        
                    }
                }
            ]
        });

        prompt.present();
    }

    public postfbTokens(token: any) {
        this.loading.present();
        this.valuesService.PostFacebookTokens(token)
            .subscribe(
                data => {

                    this.loading.dismiss();

                },
                error => {
                    this.loading.dismiss();

                });
    }
    getCatogories() {
        this.loading.present();
        this.valuesService.getAllCategories()
            .subscribe(
                data => {
                    this.categories = data;
                    this.loading.dismiss();this.initializeItems();
                },
                error => {
                    this.loading.dismiss();
                });
    }
initializeItems() {
    this.products=[];
    this.categories.forEach(element => {
        element.Items.forEach(item=>{
               this.products.push(item);
        });
    });
  
 
  }
    getCatogoriesProductName(ev) {
     
      // Show the results
    this.showList = true;
      
this.myVar=false;
    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
        this.filteredProducts = this.products.filter(
          book => book.ProdcutName.toLowerCase().indexOf(val.toLowerCase()) > -1);
   
    }
    else
    {
        this.filteredProducts = this.products;
    }
       

    }
    onCancel(ev) {
        this.myVar = true;
         // Show the results
    this.showList = false;
    
     // Reset the field
    ev.target.value = '';
    console.log("cancelled clicked");
    }
    doRefresh(refresher) {

        this.valuesService.getAllCategories()
            .subscribe(
                data => {
                    refresher.complete();
                    this.storage.set('categories', JSON.stringify(data)).then((categories) => {
                        this.categories = data;
                    }, error => {

                    });
                }, error => {
                    refresher.complete();
                    this.loading.dismiss();
                });
    }

    GoToCart() {
   if(this.cartCount!=0)
        this.nav.push(CartPage);
        else
        {
             let alert = this.alertController.create({
                            title: 'Cart ',
                            subTitle: 'Cart Empty',
                            buttons: ['Dismiss']
                        });
                        alert.present();
        }
    }
    // view a category
    ViewCategory(categoryId,name) {

        this.nav.push(CategoryPage, {
            Id: JSON.stringify(categoryId),
            Name:  JSON.stringify(name)
        });
    }
}