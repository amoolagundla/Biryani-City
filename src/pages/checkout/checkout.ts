import {
    Component, ViewChild, ElementRef
} from '@angular/core';
import {
    NavController,
    AlertController,
    NavParams, Platform
} from 'ionic-angular';
import {
    HomePage
} from "../home/home";
import {
    AddressPage
} from "../address/address";
import {
    UserInfo
} from '../../app/app.module';
import {
    CartService
} from '../../services/cart-service';
import {
    ValuesService
} from '../../services/ValuesService';
import {
    LoadingController
} from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { Storage } from '@ionic/storage';
import {PayPal, PayPalPayment, PayPalConfiguration} from "ionic-native";
import{LocationTracker} from '../../services/LocationTracker';
import { ModalController,Events } from 'ionic-angular';
import { ModalContentPage } from './ModalContentPage';
declare var google;
declare const RazorpayCheckout: any;

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-checkout',
    templateUrl: 'checkout.html'
})
export class CheckoutPage {
    public duration:number=0;
    public currentAddress: any;
    public DeliveyTime: any='12PM';
    public DeliveyDate: string = new Date().toISOString();
    public userInfo: UserInfo;
    public addressId: any=0;
    public paymentMethod: any = 0;
    public myVar: boolean = false;
    public totalAddress: any;
    public total: any;
    public cart: any[] = [];
    public checkouts: any = {
        DeliveryTime: '',
        DeliveryDate: ''

    };
    public delivery:boolean =false;
    public address: any = {
        Address1: '',
        Address2: '',
        State: '',
        City: '',
        Country: 'India',
        Address3: '',
        UserName: '',
        Id: 0,
        IsDefault: false,
        PostalCode: ''
    };
    public loading: any = this.loadingCtrl.create({
        content: "Please wait...",
        dismissOnPageChange: true
    });

    // slides for slider 
    @ViewChild('map') mapElement: ElementRef;
    map: any;


    loadMap() {

        this.platform.ready().then(() => {

            let locationOptions = { timeout: 10000, enableHighAccuracy: true };

            navigator.geolocation.getCurrentPosition(

                (position) => {
                    let geocoder = new google.maps.Geocoder;
                    var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                    let options = {
                        center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                        zoom: 64,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    }

                    //this.map = new google.maps.Map(document.getElementById("map"), options);

                    geocoder.geocode({ 'latLng': latlng }, function (results, status) {

                        if (status == google.maps.GeocoderStatus.OK) {
                            if (results[0]) {

                                this.currentAddress = results[0].address_components[0].long_name + " " + results[0].address_components[1].long_name + "," + results[0].address_components[2].long_name + "," + results[0].address_components[5].long_name + "," + results[0].address_components[6].long_name + "," + results[0].address_components[7].long_name;
                                var element = document.getElementById("p1");
                                element.innerHTML = this.currentAddress;
                                console.log(this.currentAddress);
                            }
                            else {
                                console.log('Unable to detect your address.');
                                this.currentAddress = 'Unable to detect your address.';
                            }
                        } else {
                            console.log('Unable to detect your address.'); this.currentAddress = 'Unable to detect your address.';
                        }
                    });
                },

                (error) => {
                    console.log(error);
                }, locationOptions

            );

        });

    }




    constructor(public nav: NavController,
        public alertController: AlertController,
        public navParams: NavParams,
        public cartService: CartService,
        private valuesService: ValuesService,
        public loadingCtrl: LoadingController, public platform: Platform, public storage: Storage,public locationTracker: LocationTracker,
		public modalCtrl: ModalController,public events:Events) {
         
        this.events.subscribe('myEvent',() => {

         this.getUserInfosw();

});
         
        this.storage.get('UserInfo').then((currentUser) => {
            this.userInfo = SerializationHelper.toInstance(new UserInfo(), currentUser);
           
            // set data for categories
            this.cart = cartService.getCart();
            this.total = this.navParams.get('total');
            this.platform = platform; this.loadMap();
            this.myVar = true;
        }, error => {

            });



    }

getUserInfosw()
  {
    this.valuesService.getAll()
            .subscribe(
                data => {   
                     this.userInfo = data;
                this.storage.set('UserInfo',JSON.stringify(data)).then(()=>{
                     this.events.publish('UpdateUserInfo');
                },err=>{});
                }, 
                error => {
                 
                  
                });
                
  }
addNewAddress()
{
    let modal = this.modalCtrl.create(ModalContentPage);
              modal.present();
}


    // edit address
    editAddress() {
        let prompt = this.alertController.create({
            title: 'Address',
            message: "",
            inputs: [{
                name: 'address',
                value: ''
            },],
            buttons: [{
                text: 'Cancel',
                handler: data => {
                    console.log('Cancel clicked');
                }
            }, {
                text: 'Save',
                handler: data => {
                    console.log('Saved clicked');
                }
            }]
        });

        prompt.present();
    }
    GetPayMent(id) {
        this.paymentMethod = id;
    }
    GetAddressId(Id) {
        this.addressId = Id;
    }

    addAddress() {
          this.loading.present();
        let add = document.getElementById("p1").innerText;

        if (add != undefined) {
            console.log('oside')
            let addd: string[] = add.split(',');
            console.log(add);
            this.address.Address1 = addd[0];
            this.address.State = addd[3];
            this.address.City = addd[2];
            this.address.PostalCode = addd[4];

        }
        this.valuesService.InsertAddress(this.address)
            .subscribe(
            da => {
                console.log("added id is " + da.Id)
                this.userInfo.Addresses.push(da);
                this.storage.set('UserInfo', JSON.stringify(this.userInfo));
                this.loading.dismiss();
            });
        
    }
    
    // place order button click
    buy() {
        // show alert this.valuesService.PostOrder(OrdDetail).subscribe(
       if(this.delivery==false)
       {
           if(this.paymentMethod==1)
           {
               this.onSubmit();
           }
           else if(this.paymentMethod==2)
           {
                let OrderDetail = {
                DeliveryTime: this.DeliveyTime,
                DeliveryDate: this.DeliveyDate,
                cart: this.cartService.getCart(),
                AddressId: this.addressId,
                PaymentMethod: this.paymentMethod
            };
          
            this.loading.present();
           this.PlaceOrder(OrderDetail);
           }
           else if(this.paymentMethod==0)
           {
                  this.showLoginAlert("Please select a payment option");
           }
       }
       else 
       {
            if(this.paymentMethod==1 && this.addressId > 0)
           {
               this.onSubmit();
           }
           else if(this.paymentMethod==2 && this.addressId > 0)
           {
                let OrderDetail = {
                DeliveryTime: this.DeliveyTime,
                DeliveryDate: this.DeliveyDate,
                cart: this.cartService.getCart(),
                AddressId: this.addressId,
                PaymentMethod: this.paymentMethod
            };
           // alert(this.addressId)
            this.loading.present();
           this.PlaceOrder(OrderDetail);
           }
           else 
           {
                 let msg= 'please select ';
               if(this.delivery== true)
               {
                    if(this.addressId <=0||this.addressId==undefined)
                        msg +=' address,';
               }
               else
               {
                   this.addressId=0;
               }
               

                if(this.paymentMethod==0)
                msg+='payment method';
           
             if(msg!='please select ')   
             this.showLoginAlert(msg);
           }
       }
    }
   public showLoginAlert(msg:any)
	{
		let alert = this.alertController.create({
      title: 'Alert',
      subTitle: msg, 
      buttons: [
        {
          text: 'OK',
          handler: data => {
          
		
          }
        }
      ]
    });

    alert.present();
	}
    public onSubmit() {
        // var amt = this.total * 100;
        // var options = {
        //     description: 'Credits towards consultation',
        //     image: 'https://i.imgur.com/3g7nmJC.png',
        //     currency: 'INR',
        //     key: 'rzp_test_TXWGPmvIG46GTp',
        //     amount: amt,
        //     name: '99Meat',
        //     prefill: {
        //         email: '',
        //         contact: '',
        //         name: ''
        //     },
        //     theme: {
        //         color: '#F37254'
        //     },
        //     modal: {
        //         ondismiss: function () {
        //             alert('dismissed');
        //             this.loading.dismiss();
        //         }
        //     }
        // };

        // var successCallback = function (payment_id) {
        //     alert('payment_id: ' + payment_id);
        //     this.loading.dismiss();
        // };

        // var cancelCallback = function (error) {
        //     alert(error.description + ' (Error ' + error.code + ')');
        //     this.loading.dismiss();
        // };

        // this.platform.ready().then(() => {
        //     RazorpayCheckout.open(options, successCallback, cancelCallback);
        // })
       let tot= this.total;
     let th=this;
       PayPal.init({
  "PayPalEnvironmentProduction": "YOUR_PRODUCTION_CLIENT_ID",
  "PayPalEnvironmentSandbox": "AU5Mng0JFeoHV0HtrNCQJbI_ShoYQtPnlAd9y5iDIF11DNQx8bNCZSJYU6uRlaxowpkPwB7qYO2wCe9U"
}).then(() => {
  // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
  PayPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
    // Only needed if you get an "Internal Service Error" after PayPal login!
    //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
  })).then(() => {
    let payment = new PayPalPayment(tot, 'USD', 'Description', 'sale');
    PayPal.renderSinglePaymentUI(payment).then(() => {
      // Successfully paid

      // Example sandbox response
      //
      // {
      //   "client": {
      //     "environment": "sandbox",
      //     "product_name": "PayPal iOS SDK",
      //     "paypal_sdk_version": "2.16.0",
      //     "platform": "iOS"
      //   },
      //   "response_type": "payment",
      //   "response": {
      //     "id": "PAY-1AB23456CD789012EF34GHIJ",
      //     "state": "approved",
      //     "create_time": "2016-10-03T13:33:33Z",
      //     "intent": "sale"
      //   }
      // }
        
       th.loading.present();
            let OrderDetail = {
                DeliveryTime: th.DeliveyTime,
                DeliveryDate: th.DeliveyDate,
                cart: th.cartService.getCart(),
                AddressId: th.addressId,
                PaymentMethod: th.paymentMethod
            };
            th.placeOrder(OrderDetail);

    }, (err) => {
        alert(err);
      // Error or render dialog closed without being successful
    });
  }, (err) => {
      alert(err);
    // Error in configuration
  });
}, () => {
    alert('initialization');
  // Error in initialization, maybe PayPal isn't supported or something else
});
    }

    public showAlert() {
        let alert = this.alertController.create({
            title: 'Info',
            subTitle: 'Your order has been sent. We will notify when your order is ready',
            buttons: [{
                text: 'OK',
                handler: data => {

                    this.cartService.ClearCart();
                      this.events.publish('NewOrder');
                    this.nav.setRoot(HomePage);
                }
            }]
        });

        alert.present();
    }

    public PlaceOrder(OrdDetail: any) {
        if (this.paymentMethod == 1) {
            this.onSubmit();
        }
        else {
           this.placeOrder(OrdDetail);
        }
    }
public placeOrder(orderDetail:any)
{
     
     this.valuesService.PostOrder(orderDetail).subscribe(
                data => {
                    this.getUserInfo();
                },
                error => {
                    this.loading.dismiss();
                });
}
    public getUserInfo() {
        this.valuesService.getAll().subscribe(
            data => {
                localStorage.removeItem("UserInfo");
                localStorage.setItem('UserInfo', JSON.stringify(data));
                this.loading.dismiss();
                this.showAlert();
            }, error => {
                this.loading.dismiss();
            });
    }
}
export class SerializationHelper {
    static toInstance<T>(obj: T, json: string): T {
        var jsonObj = JSON.parse(json);

        if (typeof obj["fromJSON"] === "function") {
            obj["fromJSON"](jsonObj);
        }
        else {
            for (var propName in jsonObj) {
                obj[propName] = jsonObj[propName]
            }
        }

        return obj;
    }
}