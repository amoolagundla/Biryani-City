import {Component,OnInit} from '@angular/core';
import {NavController,NavParams} from 'ionic-angular';
import {LoginPage} from "../login/login";
import { ValuesService } from '../../services/ValuesService';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage implements OnInit {
 public user: any={
      email: '',
      password: '',
      confirmPassword: '',
			phonenumber:'',
			FirstName:'',
			LastName:''
    };
 public errorMessage:any; 
 public loading :any= this.loadingCtrl.create({
      content: "Please wait...",      
      dismissOnPageChange: true 
    });
 
 
  constructor(public nav: NavController,private valuesService:ValuesService,public toastCtrl: ToastController,public navParams: NavParams,
		public loadingCtrl: LoadingController) {
			 localStorage.removeItem("UserInfo");
	 localStorage.removeItem("currentUser");
	 let addre = this.navParams.get('address');
	
	 if(addre !=null)
	 {		 
		 this.user=JSON.parse(addre);
	 }
  }
 ngOnInit() {
   
  }
SignIn()
{    this.nav.pop();
	    this.nav.setRoot(LoginPage);
}
  save(model: any, isValid: boolean,event:Event) {
    // call API to save customer
     event.preventDefault();
									
		if(isValid)
		{
			this.loading.present();
			this.valuesService.Register(model)
            .subscribe(
                data => {			
                         this.loading.dismiss();
												  if(data =="success")	
													{
                             let toast = this.toastCtrl.create({
																					message: 'User Sign in sucessful',
																					duration: 3000,
																					cssClass:'toast-container'
																				});
																				toast.present();
                       																			
                         this.nav.setRoot(LoginPage);
													}
													else
													{
														
														console.log(data);
														let toast = this.toastCtrl.create({
																					message: data.m_StringValue.toString(),
																					duration: 3000,
																					cssClass:'toast-container'
																				});
																				toast.present();
																				 this.nav.setRoot(RegisterPage,{address:JSON.stringify(model)});
													}
                },
								  err => { 
									console.log(err);
									this.loading.dismiss();	
									let toast = this.toastCtrl.create({
																					message: err,
																					duration: 3000,
																					cssClass:'toast-container'
																				}); 
																				toast.present();
});
										 
		}
  }

  
}
