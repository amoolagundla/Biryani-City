import { Component } from '@angular/core';
import { NavController,ViewController ,NavParams } from 'ionic-angular';
import {Address} from '../../app/app.module';
import { ValuesService } from '../../services/ValuesService';
import { LoadingController } from 'ionic-angular';
@Component({
    selector: 'New-Adress',
    templateUrl: 'NewAdress.html'
})
export class ModalContentPage {
	public loading :any= this.loadingCtrl.create({
      content: "Please wait...",      
      dismissOnPageChange: true
    });
public address:any={
				Address1:'',
				Address2:'',
				State:'',
				City:'',
				Country:'India',
				Address3:'',
				UserName:'',
				Id:0,
				IsDefault:false, 
				PostalCode:''
				};

  constructor(public navCtrl: NavController,
	public loadingCtrl: LoadingController,public navParams: NavParams,
	public valuesService:ValuesService,public viewCtrl: ViewController
  ) {
    
   	let add = this.navParams.get('user');
       	if (add != undefined) {
			this.address= JSON.parse(add);
		    console.log(this.address);
		}
  }

  	 save(model: Address, isValid: boolean) {
  
		if(isValid)
		{

            	if (model.Id > 0) {
                    this.valuesService.UpdateAddress(model)
					.subscribe(
					da => {
                           this.updateUserInof();
						
					}, error => {
						this.loading.dismiss();
					});

                }
                else{
			this.loading.present();
			
			this.valuesService.InsertAddress(model)
            .subscribe(
                da => {	
				        this.updateUserInof();
					});
                }

			
		}
  }

  updateUserInof()
  {
	  this.valuesService.getAll()
					.subscribe(
					da => {

						 this.loading.dismiss();
				      
                         this.viewCtrl.dismiss();
					}, error => {
						this.loading.dismiss();
					});
	  
   
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
}