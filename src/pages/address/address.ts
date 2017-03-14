import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Address, UserInfo } from '../../app/app.module';
import { ValuesService } from '../../services/ValuesService';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ModalController,Events } from 'ionic-angular';
import { ModalContentPage } from '../../pages/checkout/ModalContentPage';
import {SharedDataService} from '../../services/sharedDataService';
/*
  Generated class for the Address page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
	selector: 'page-address',
	templateUrl: 'address.html'
})
export class AddressPage implements OnInit {
	public _userinfo:UserInfo;
	public loading: any = this.loadingCtrl.create({
		content: "Please wait...",
		dismissOnPageChange: true
	});
	public  goToCart:boolean=false;
	public userInfo: UserInfo;
	public myVar: boolean;
	public fromCheckout: boolean = false;
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
	ngOnInit() {
          this.events.subscribe('myEvent',() => {

        this.getUser();

}); 

 this.events.subscribe('UpdateUserInfo',() => {

          this.getUser();
}); 
		let add = this.navParams.get('address');
       this.goToCart = this.navParams.get('gotToCart');
	
		if (add != undefined) {
			console.log('oside')
			let addd: string[] = add.split(',');
			console.log(add);
			this.address.Address1 = addd[0];
			this.address.State = addd[3];
			this.address.City = addd[2];
			this.address.PostalCode = addd[4];
			this.fromCheckout = true;
			this.myVar = false;
		}
		
            this._SharedDataService.UserInfo.subscribe((data)=>
			{
				this._userinfo=data;
				this.userInfo=data;
			});
	}


	constructor(public navCtrl: NavController,
		public loadingCtrl: LoadingController, public navParams: NavParams,
		public valuesService: ValuesService, public storage: Storage ,	public modalCtrl: ModalController,public events:Events,public _SharedDataService:SharedDataService) {


	}

	getUser()
  {
    this.valuesService.getAll()
            .subscribe(
                data => {  
                   
                this.storage.set('UserInfo',JSON.stringify(data)).then(()=>{
                    
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

	EditAddress(Addresses: any) {
		 let modal = this.modalCtrl.create(ModalContentPage, {"user": JSON.stringify(Addresses)});
              modal.present();
	}
	GoBack() {
		this.myVar = !this.myVar;
	}
	remove(id: number) {
		this.loading.present();
		this.valuesService.DeleteAddress(id).
			subscribe(
			da => {
				this.loading.dismiss();
                 this.events.publish('UpdateUserInfo');
				
					
					  

			}, error => {
				this.loading.dismiss();
			});
	}

	save(model: Address, isValid: boolean) {

		if (isValid) {
			this.loading.present();
			if (model.Id > 0) {
				this.valuesService.UpdateAddress(model)
					.subscribe(
					da => {

						this.userInfo.Addresses = this.userInfo.Addresses
							.filter(todo => todo.Id !== model.Id);

						this.userInfo.Addresses.push(model);
						this.storage.set('UserInfo', JSON.stringify(this.userInfo));
						this.loading.dismiss();

                         if(this.goToCart== undefined)
						 {
							 this.navCtrl.pop();
						
						 }
						 else{
						this.navCtrl.setRoot(AddressPage);
						 }
					}, error => {
						this.loading.dismiss();
					});
			}
			else {
				this.valuesService.InsertAddress(model)
					.subscribe(
					da => {
                          console.log("added id is " + da.Id)
						this.userInfo.Addresses.push(da);
						this.storage.set('UserInfo', JSON.stringify(this.userInfo));
						this.loading.dismiss();


						if(this.goToCart== undefined)
						 {
							 this.navCtrl.pop();
						
						 }
						 else{
						this.navCtrl.setRoot(AddressPage);
						 }

					});
			}
		}
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