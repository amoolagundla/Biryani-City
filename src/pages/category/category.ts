import {Component} from '@angular/core';
import {NavController, AlertController,NavParams} from 'ionic-angular';
import {CartPage} from '../../pages/cart/cart';
import {CategoryService} from '../../services/category-service';
import {ItemPage} from "../item/item";
import { CartService} from '../../services/cart-service';
/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-category',
  templateUrl: 'category.html'
})
export class CategoryPage {
  // category object
  public category: any;
    private showList: boolean;
public catId:any;
public cartCount:any;
public productName:any='';
 public product: any = '';
    public products: any=[];
     public filteredProducts: any=[];
  constructor(public nav: NavController, public categoryService: CategoryService,public navParams: NavParams
	, public alertController: AlertController,
  public cartService:CartService) {
    // get first category as sample data
			this.category =JSON.parse(this.navParams.get('Id'));	
      this.productName=JSON.parse(this.navParams.get('Name'));	
this.initializeItems();
 let cart = this.cartService.getCart();
            this.cartCount=cart.length;
this.cartService
        .statusChanged
        .subscribe(data => {
					this.cartCount =data.totalCount;		
              
        });
				
  }

  // view item detail
  viewItem(item:any) {
    this.nav.push(ItemPage, {item: JSON.stringify(item)});
  }

  initializeItems() {
    this.products=[];
    this.products= this.category;
    
  }
    getCatogoriesProductName(ev) {
     
      // Show the results
    this.showList = true;
      

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
       
         // Show the results
    this.showList = false;
    
     // Reset the field
    ev.target.value = '';
    console.log("cancelled clicked");
    }

	// add item to cart
  addCart(item:any) {
    let prompt = this.alertController.create({
      title: 'Quanity',
    message: "1 X",
      inputs: [
        {
          type:'number',
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

          }
        }
      ]
    });

    prompt.present();
  }
GoToCart()
{

	this.nav.push(CartPage);
}
}
