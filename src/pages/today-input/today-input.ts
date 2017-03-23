import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { EmailComposer } from 'ionic-native';

import { AuthService } from '../../providers/auth-service';
import * as moment from 'moment';

@Component({
    selector: 'page-today-input',
    templateUrl: 'today-input.html'
})
export class TodayInputPage {

    public currentDate: string;
    public minDate: string;
    public myDate: any;

    dateNow: string;
    timeStarts: string;
    timeEnds: string;

    public viewOrEdit: boolean = false;
    public canEdit: boolean = false;
    myIcon: string = "";

    public projectDetails: any;

    todayInsertData = {
        _projectName: '',
        _dateNow: '',
        _timeStarts: '',
        _timeEnds: '',
        _timeDiff: '',
        _taskDescription: ''
    };

    constructor(
        public navCtrl: NavController,
        public alertCtrl: AlertController,
        public auth: AuthService,
        public navParams: NavParams) {

        console.log('navParams : ', this.navParams.data);

        this.myDate = new Date();

        if (this.navParams.data.date != null) {
            this.viewOrEdit = true;
            this.canEdit = false;

            this.myDate.setMonth(this.navParams.data.date.substring(0, 2));
            this.myDate.setDate(this.navParams.data.date.substring(3, 5));
            this.myDate.setFullYear(this.navParams.data.date.substring(6, 10));

            this.currentDate = this.myDate.toISOString();
            this.todayInsertData._dateNow = this.myDate.toISOString();
            this.todayInsertData._timeStarts = this.navParams.data.startTime;
            this.todayInsertData._timeEnds = this.navParams.data.endTime;
            this.todayInsertData._projectName = this.navParams.data.projectName;
            this.todayInsertData._taskDescription = this.navParams.data.taskDescription;

        } else {
            this.viewOrEdit = false;
            this.canEdit = true;

            this.currentDate = this.myDate.toISOString();
            this.todayInsertData._dateNow = this.currentDate;
            // this.todayInsertData._timeStarts = "10:30";
            // this.todayInsertData._timeEnds = "19:00";

        }


        let reqDate = new Date();
        let _fullDate = (1 + this.myDate.getMonth()) + "/" + this.myDate.getDate() + "/" + this.myDate.getFullYear()

        if (this.myDate.getDate() > 7) {
            if (this.myDate.getMonth() == 0) {
                reqDate.setDate(this.myDate.getDate() - 7);
            } else {
                reqDate.setMonth(11);
            }
        }
        else {
            if (this.myDate.getMonth() == 0) {
                reqDate.setFullYear(this.myDate.getFullYear() - 1);
                reqDate.setMonth(11);
                reqDate.setDate(22);
            } else {
                reqDate.setMonth(this.myDate.getMonth() - 1);
                reqDate.setDate(22);
            }
        }

        this.minDate = reqDate.toISOString();

        let weeknumber = moment(_fullDate, "MM/DD/YYYY").week();


        console.log('Weeknumber : ', weeknumber);
        console.log('Date : ', this.myDate.getDate());
        console.log('Month : ', (1 + this.myDate.getMonth()));
        console.log('Year : ', this.myDate.getFullYear());


        if (this.viewOrEdit) {
            // Save form
            this.myIcon = "done-all";
        } else {
            // Edit form
            this.myIcon = "done-all";
        }
    }

    changeStartTime() {
        console.log('_timeStarts : ', this.todayInsertData._timeStarts);

        var _sT = '';
        var _eT = '';
        var message = '';
        this.todayInsertData._timeDiff = '';

        if (this.todayInsertData._timeStarts.length != 0) {
            _sT = this.todayInsertData._timeStarts.replace(/[^a-zA-Z0-9]/g, '');
        }

        if (this.todayInsertData._timeEnds.length != 0) {
            _eT = this.todayInsertData._timeEnds.replace(/[^a-zA-Z0-9]/g, '');
        }

        if (_eT.length != 0 && _sT.length != 0) {

            if (_eT > _sT) {
                var mins = moment.utc(moment(this.todayInsertData._timeEnds, "HH:mm")
                    .diff(moment(this.todayInsertData._timeStarts, "HH:mm"))).format("HH:mm");

                console.log('Difference : ', mins);
                // message = "Duration : " + mins;
                message = '';
                this.todayInsertData._timeDiff = mins;
            } else if (_eT == _sT) {
                console.log(': Equal : ');
                message = "Start time and end time should be different.";
            } else {
                console.log(': invalid : ');
                message = "Invalid time selection.";
            }
        }

        let alert = this.alertCtrl.create({
            title: 'Time',
            subTitle: message,
            buttons: [{
                text: 'OK',
                handler: () => {
                    console.log('OK clicked');
                    // this.navCtrl.pop();
                }
            }]
        });

        if (message.length != 0) {
            alert.present();
        }
    }

    changeEndTime() {
        console.log('_timeEnds : ', this.todayInsertData._timeEnds);

        var _sT = '';
        var _eT = '';
        var message = '';
        this.todayInsertData._timeDiff = '';

        if (this.todayInsertData._timeStarts.length != 0) {
            _sT = this.todayInsertData._timeStarts.replace(/[^a-zA-Z0-9]/g, '');
        }

        if (this.todayInsertData._timeEnds.length != 0) {
            _eT = this.todayInsertData._timeEnds.replace(/[^a-zA-Z0-9]/g, '');
        }

        if (_eT.length != 0 && _sT.length != 0) {

            if (_eT > _sT) {
                var mins = moment.utc(moment(this.todayInsertData._timeEnds, "HH:mm")
                    .diff(moment(this.todayInsertData._timeStarts, "HH:mm"))).format("HH:mm");

                console.log('Difference : ', mins);
                // message = "Duration : " + mins;
                message = '';
                this.todayInsertData._timeDiff = mins;
            } else if (_eT == _sT) {
                console.log(': Equal : ');
                message = "Start time and end time should be different.";
            } else {
                console.log(': invalid : ');
                message = "Invalid time selection.";
            }
        }

        let alert = this.alertCtrl.create({
            title: 'Time',
            subTitle: message,
            buttons: [{
                text: 'OK',
                handler: () => {
                    console.log('OK clicked');
                    // this.navCtrl.pop();
                }
            }]
        });

        if (message.length != 0) {
            alert.present();
        }

    }

    ionViewDidLoad() {
        this.loadProjectDetails();
        console.log('ionViewDidLoad TodayInputPage');

        // EmailComposer.isAvailable().then((available: boolean) => {
        //     if (available) {
        //         //Now we know we can send
        //         alert("Available");
        //     } else {
        //         // alert("Not available");
        //
        //     }
        // });
    }

    loadProjectDetails() {
        this.auth.loadProjectDetails()
            .then(data => {
                this.projectDetails = data;
            });
    }

    todayInsert() {

        if (this.canEdit) {
            var alertMessage = '';
            if (this.viewOrEdit) {
                alertMessage = 'Data updated sucessfully.';
            } else {
                alertMessage = 'Data inserted sucessfully.';
            }
            console.log('TodayInputPage : ', this.todayInsertData);
            this.todayInsertData._dateNow = (1 + this.myDate.getMonth()) + "/" + this.myDate.getDate() + "/" + this.myDate.getFullYear();
            let alert = this.alertCtrl.create({
                title: 'Time Sheet',
                subTitle: alertMessage,
                buttons: [{
                    text: 'OK',
                    handler: () => {
                        // console.log('OK clicked');
                        this.navCtrl.pop();
                    }
                }]
            });
            alert.present();
        } else {
            this.canEdit = true;
        }
    }

    changeProject($event, pName) {
        //  (ionChange)="changeProject($event, todayInsertData._projectName)"
        this.todayInsertData._projectName = pName;
        this.viewOrEdit = false;
    }

    ngAfterViewInit() {

    }

}
