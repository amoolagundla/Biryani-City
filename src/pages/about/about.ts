import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';


/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  // working days
  public days = [
    {
      'name': 'Monday',
      'hours': '09:00Am - 10:00pm'
    },
    {
      'name': 'Tuesday',
      'hours': '09:00Am - 10:00pm'
    },
    {
      'name': 'Wednesday',
      'hours': '09:00Am - 10:00pm'
    },
    {
      'name': 'Thursday',
      'hours': '09:00Am - 10:00pm'
    },
    {
      'name': 'Friday',
       'hours': '09:00Am - 10:00pm'
    },
    {
      'name': 'Saturday',
       'hours': '09:00Am - 10:00pm'
    },
    {
      'name': 'Sunday',
       'hours': '09:00Am - 10:00pm'
    }
  ];

  constructor(public nav: NavController) {
  }
}
