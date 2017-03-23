import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
// import { PopoverController } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service';

// import { LoginPage } from '../login/login';
// import { PopoverPage } from '../popover/popover'

import { TodayInputPage } from '../today-input/today-input';

import _ from 'lodash';

@Component({
    selector: 'page-today',
    templateUrl: 'today.html'
})
export class TodayPage {

    public todayRep: any;
    public todayAllRep: any;
    public todayDivisions: any;
    queryText: string = '';

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public loadingController: LoadingController,
        // public popoverCtrl: PopoverController,
        public auth: AuthService) {
        this.todayRep = null;
    }

    // presentPopover(myEvent) {
    //     let popover = this.popoverCtrl.create(PopoverPage);
    //     popover.present({
    //       ev: myEvent
    //     });
    //   }

    ionViewDidLoad() {
        console.log('ionViewDidLoad TodayPage');
        this.loadToday();
    }

    loadToday() {

        let loader = this.loadingController.create({
            content: 'Loading Timesheet...'
        });

        loader.present();

        this.auth.loadTodayReport()
            .then(data => {
                this.todayAllRep = data;
                this.todayDivisions =
                    _.chain(data)
                        .groupBy('date')
                        .toPairs()
                        .map(item => _.zipObject(['divisionName', 'divisionData'], item))
                        .value();

                this.todayRep = this.todayDivisions;
                // console.log('division data', this.todayRep);
                loader.dismiss();
            });
    }

    updateTimeSheet() {
        let queryTextLower = this.queryText.toLowerCase();
        let filteredTeams = [];
        _.forEach(this.todayDivisions, td => {
            let teams = _.filter(td.divisionData, t => (<any>t).projectName.toLowerCase().includes(queryTextLower));
            if (teams.length) {
                filteredTeams.push({ divisionName: td.divisionName, divisionData: teams });
            }
        });

        this.todayRep = filteredTeams;
    }


    public addInput() {
        this.navCtrl.push(TodayInputPage);
    }

    openView($event, item) {
        this.navCtrl.push(TodayInputPage, item);
    }

}
