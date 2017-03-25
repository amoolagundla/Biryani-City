import {
    Platform
} from 'ionic-angular';
import { Component, OnInit } from '@angular/core';;
import {
    NavController
} from 'ionic-angular';
import {
    HomePage
} from "../home/home";
import {
    AuthenticationService
} from "../../services/login-service";
import {
    ValuesService
} from "../../services/ValuesService";
import {
    LoadingController
} from 'ionic-angular';
import {
    AlertController

} from 'ionic-angular';
import {
    RegisterPage
} from "../register/register";

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import {
    Facebook,
    NativeStorage,
    GooglePlus,
    LocalNotifications
    

} from 'ionic-native';
import {
    Storage
} from '@ionic/storage';
import { OneSignal } from 'ionic-native';
import { LoginPartialPage } from '../Login-Partial/Login-Partial';
declare const facebookConnectPlugin: any;
/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage implements OnInit {

    /*private oauth: OauthCordova = new OauthCordova();
        private facebookProvider: Facebook = new Facebook({
          clientId: "172669669872080",
          appScope: ["email"]
        })*/

    public username: string = '';
    public token: string;
    public loading: any = this.loadingCtrl.create({
        content: "Please wait...",
        dismissOnPageChange: true
    });
    FB_APP_ID: number = 1835538836698571;
    public password: string = '';

    ngOnInit() {
        this.initializeApp();

           this.valuesService.logOut();
        NativeStorage.remove('google');
        NativeStorage.remove('at');
        this.storage.remove('products');
        this.storage.remove('categories');
        this.storage.remove('currentUser');
        this.storage.remove('userName');
        this.storage.remove('UserInfo');


        GooglePlus.logout().then(
            function (msg) {

            },
            function (fail) {
                console.log(fail);
            }
        );

        Facebook.logout().then(() => {

        },
            err => {

            });

        
    };
    constructor(public nav: NavController,
        private authenticationService: AuthenticationService,
        public loadingCtrl: LoadingController,
        public valuesService: ValuesService,
        public alertCtrl: AlertController,
        public platform: Platform,
        public storage: Storage) {



    }

    // go to register page
    register() {
        this.nav.push(RegisterPage);
    }
    // login and go to home page
    login() {

        this.nav.push(LoginPartialPage);

    }



    initializeApp() {
    }


    Googlelogin(acesstoken: any) {



        this.loading.present();

        this.authenticationService.Googlelogin(acesstoken)
            .subscribe(
            data => {



                this.storage.set('currentUser', data.access_token).then(() => {


                    this.getUserInfo();

                }, error => {

                });

            },
            error => {
                this.loading.dismiss();
                let er = error.json();
                let alert = this.alertCtrl.create({
                    title: 'Login Error ',
                    subTitle: er.error_description,
                    buttons: ['Dismiss']
                });
                alert.present();
                this.nav.setRoot(LoginPage);
            });

    }
    facebooklogin(acesstoken: any) {

        this.loading.present();
        NativeStorage.remove('at');
          

        
        this.authenticationService.Facebooklogin(acesstoken)
            .subscribe(
            data => {
                   
                this.storage.set('currentUser', data.access_token).then(() => {

              
                    this.getUserInfo();

                }, error => {

                });

            },
            error => {
                this.loading.dismiss();
                let er = error.json();
                let alert = this.alertCtrl.create({
                    title: 'Login Error Api',
                    subTitle: er,
                    buttons: ['Dismiss']
                });
                alert.present();
                this.nav.setRoot(LoginPage);
            });

             

    }
    googlelog() {

        let navv = this.nav;
        let glog = this;


        GooglePlus.login({

            'webClientId': '695358309253-rg8nla5ip1bqs1sk7qlt1imlh7fsatco.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
            'offline': true
        })
            .then(function (user) {
                let at = JSON.stringify(user);
               
                let userDetails = {
                    url: user.imageUrl,
                    name: user.givenName
                };              
                NativeStorage.setItem('userDetails', userDetails).then()
                glog.Googlelogin(at);

            }, function (error) {
                let er = error.json();
                let alert = this.alertCtrl.create({
                    title: 'Login Error ',
                    subTitle: er,
                    buttons: ['Dismiss']
                });
                alert.present();
                navv.setRoot(LoginPage);
            });
    }

    public postfbTokens(token: any) {
        this.loading.present();
        this.valuesService.PostFacebookTokens(token)
            .subscribe(
            data => {

               

            },
            error => {
              

            });
    }


    ioniclog() {
        }

    getUserInfo() {
        this.valuesService.getAll()
            .subscribe(
            data => {

                this.storage.set('UserInfo', JSON.stringify(data)).then(() => {
                    //   this.getCatogories();



                    NativeStorage.remove('at');
                    this.loading.dismiss();
                    this.registerPushToken();
                    this.nav.setRoot(HomePage, { email: data.Email });

                }, error => {

                });

            },
            error => {
                this.loading.dismiss();

            });

    }

    registerPushToken() {

        OneSignal.getIds().then(data => {
            
           this.valuesService.SaveToken(JSON.stringify(data)).subscribe(() => {
            }, err => {
                });
// this gives you back the new userId and pushToken associated with the device. Helpful.
});
        // this.push.unregister();
        // this.push.register().then((t: PushToken) => {
        //     return this.push.saveToken(t);
        // }).then((t: PushToken) => {
        //    // alert(t.token);
            
        // });

        // this.push.rx.notification()
        //     .subscribe((msg) => {
        //      alert(msg);
        //         let ms = msg;
        //         LocalNotifications.schedule({
        //             id: 1,
        //             title: ms.title,
        //             text: ms.text,
        //             icon: 'res://img/icon.png',
        //             smallIcon: 'res://icon.png',
        //             led:'ff0202'
        //         });

        //     });
    }

    getCatogories() {
        this.valuesService.getAllCategories()
            .subscribe(
            data => {
                this.storage.set('categories', JSON.stringify(data)).then(() => {
                    this.loading.dismiss();
                    this.nav.setRoot(HomePage);

                }, error => {
                    this.loading.dismiss();
                });

            },
            error => {
                this.loading.dismiss();
            });
    }

    loginFB() {

        let permissions = new Array();
        let navv = this.nav;
        let platform = this;
        Facebook.logout()
            .then(function (response) {

            }, function (error) {
                console.log(error);
            });
        //the permissions your facebook app needs from the user
        permissions = ["public_profile,email"];

        Facebook.login(permissions)
            .then(function (response) {
                let userId = response.authResponse.userID;
                let at = response.authResponse.accessToken;
               // alert(at)
                platform.facebooklogin(at);

                //now we have the users info, let's save it in the NativeStorage

                let userDetails = {
                    url: "https://graph.facebook.com/" + userId + "/picture?type=large",
                    name: ''
                };

              
                NativeStorage.setItem('userDetails', userDetails)
                    .then(function () {

                    }, function (error) {
                        console.log(error);
                    });

            }, function (error) {
                      let er = error.json();
                let alert = this.alertCtrl.create({
                    title: 'Login Error ',
                    subTitle: er,
                    buttons: ['Dismiss']
                });
                alert.present();
                navv.setRoot(LoginPage);

            });
    }

    getdetails() {
        facebookConnectPlugin.getLoginStatus((response) => {
            if (response.status == "connected") {
                facebookConnectPlugin.api('/' + response.authResponse.userID + '?fields=id,name,gender', [],
                    function onSuccess(result) {
                        alert(JSON.stringify(result));
                    },
                    function onError(error) {
                        alert(error);
                    }
                );
            } else {
                alert('Not logged in');
            }
        })
    }

    logout() {
        facebookConnectPlugin.logout((response) => {
            alert(JSON.stringify(response));
        })
    }
}