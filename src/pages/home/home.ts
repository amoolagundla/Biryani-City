
import { Component, OnInit } from '@angular/core';
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
    Storage
} from '@ionic/storage';

import {  UserInfo } from '../../app/app.module';

import { SharedDataService } from '../../services/sharedDataService';
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
export class HomePage implements OnInit {

    // list of categories
public userInfo:UserInfo;
    public loading: any = this.loadingCtrl.create({
        content: "Please wait...",
        dismissOnPageChange: true
    });
    private showList: boolean;
    public myVar: boolean = true;
    public categories: any;
    public cartCount: any = 0;
    public abc: any;
    public email: any = 'sys';
    public product: any = '';
    public products: any = [];
    public filteredProducts: any = [];


    ngOnInit() {
        this.showList = false;
        this.cartService
            .statusChanged
            .subscribe(data => {
                this.cartCount = data.totalCount;


            }, err => {

            });


        let cart = this.cartService.getCart();
        this.cartCount = cart.length;


        this.getCatogories();

        this.email = this.navParams.get('email');

        this._SharedDataService.UserInfo.subscribe((data)=>
			{
				
				this.userInfo=data;
			});
        // subscribe to cart changes

    }
    constructor(public loadingCtrl: LoadingController,
        public nav: NavController,
        private valuesService: ValuesService,
        private cartService: CartService,
        public storage: Storage,
        public alertController: AlertController, public navParams: NavParams,
        public _SharedDataService: SharedDataService) {
    }

    

    // add item to cart
    addCart(item: any) {
        let prompt = this.alertController.create({ 
            title: 'Quanity',
            message: "1 X",
            inputs: [{
                 type:'number',
                name: 'quantity',
                value: '1'
            },],
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
                    this.loading.dismiss(); this.initializeItems();
                },
                error => {
                    this.loading.dismiss();
                });
      
    }
    initializeItems() {
        this.products = [];
        this.categories.forEach(element => {
            element.Items.forEach(item => {
                this.products.push(item);
            });
        });


    }
    getCatogoriesProductName(ev) {

        // Show the results
        this.showList = true;

        this.myVar = false;
        // set val to the value of the searchbar
        let val = ev.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.filteredProducts = this.products.filter(
                book => book.ProdcutName.toLowerCase().indexOf(val.toLowerCase()) > -1);

        }
        else {
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
        if (this.cartCount != 0)
            this.nav.push(CartPage);
        else {
            let alert = this.alertController.create({
                title: 'Cart ',
                subTitle: 'Cart Empty',
                buttons: ['Dismiss']
            });
            alert.present();
        }
    }
    // view a category
    ViewCategory(categoryId, name) {

        this.nav.push(CategoryPage, {
            Id: JSON.stringify(categoryId),
            Name: JSON.stringify(name)
        });
    }
}