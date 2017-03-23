import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { StatusBar, LocalNotifications, Keyboard } from 'ionic-native';

import { AuthService } from '../../providers/auth-service';
import { UserSettings } from '../../providers/user-settings';

import { LoginPage } from '../login/login';
import { TodayPage } from '../today/today';
import { MonthlyPage } from '../monthly/monthly';
import { WeeklyPage } from '../weekly/weekly';
import { ProfileViewPage } from '../profile-view/profile-view';

import { EmployeeMasterPage } from '../employee-master/employee-master';
import { MyApp } from '../../app/app.component';

// import * as moment from 'moment';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    providers: [Keyboard]
})
export class HomePage {
    employeeCode = '';
    password = '';
    info: any;
    sheet: any = HomePage;
    dayTab: any;
    weekTab: any = WeeklyPage;
    monthTab: any = MonthlyPage;
    passwordTab: any = ProfileViewPage;
    userCredentials: any[];
    selMenuItem: any;

    isFirstTime = true;

    //valueforngif = true;

    constructor(
        public nav: NavController,
        public userSettings: UserSettings,
        public navParams: NavParams,
        public keyboard: Keyboard,
        private auth: AuthService) {

        StatusBar.overlaysWebView(true); // let status bar overlay webview

        StatusBar.backgroundColorByHexString('#673147');

        if (this.navParams.data.component != null) {
            this.selMenuItem = this.navParams.data.component;
            this.dayTab = this.selMenuItem;
        }
        else if (this.navParams.data.role === "admin") {
            // this.info = this.auth.getUserInfo();

            this.employeeCode = this.navParams.data.employeeCode;
            this.password = this.navParams.data.password;
            this.dayTab = EmployeeMasterPage;

        } else if (this.navParams.data.role === "user") {
            // this.info = this.auth.getUserInfo();

            this.employeeCode = this.navParams.data.employeeCode;
            this.password = this.navParams.data.password;
            this.dayTab = TodayPage;

        } else {

            this.info = this.auth.getUserInfo();
            this.employeeCode = this.info.employeeCode;
            this.password = this.info.password;

            if (this.info.role === "admin") {
                this.dayTab = EmployeeMasterPage;
            } else {
                this.dayTab = TodayPage;
            }
        }

        console.log('ionViewDidLoad HomePage', this.navParams.data);
        // this.userSettings.isLoggedIn('user').then(userObj => this.flag = userObj);
    }

    ionViewDidLoad() {
        MyApp.prototype.checkNetwork();
    }

    ionViewDidEnter() { }

    ionViewDidLeave() {
        MyApp.prototype.removeSubscription();
    }

    ngAfterViewInit() {
        // Schedule delayed notification
        if (this.isFirstTime) {
            this.isFirstTime = false;

            LocalNotifications.schedule({
                text: 'Hi, Please fill today\'s timesheet.',
                at: new Date(new Date().getTime() + 3600),
                led: '673147',
                // sound: null,
                icon: 'assets/icon/logo.png'
            });
        }
    }


    public logout() {
        this.auth.logout().subscribe(succ => {
            this.nav.parent.parent.setRoot(LoginPage)
        });
    }

}
