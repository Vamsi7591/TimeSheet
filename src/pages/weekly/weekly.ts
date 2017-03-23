import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Screenshot } from 'ionic-native';
import { Chart } from 'chart.js';

@Component({
    selector: 'page-weekly',
    templateUrl: 'weekly.html'
})
export class WeeklyPage {
    month: string = "02";
    year: number = 2017;
    currentWeekDay: number = 6;
    weeks: any = [];
    week: number = 9;

    @ViewChild('pieCanvas') pieCanvas;

    pieChart: any;
    public pieChartLabels: string[] = [];
    public pieChartData: number[] = [];

    public weekRespDataSetsArray: Array<any>;
    public weeksColorArray: Array<any>;


    constructor(public navCtrl: NavController, public navParams: NavParams) {

        for (let i = 1; i < 53; i++) {
            this.weeks.push(i);
        }

        console.log('Weeks: ', this.weeks);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad WeeklyPage');
    }

    ionViewWillEnter() {
        console.log('ionViewWillEnter WeeklyPage');
        this.ionViewDidLoad();


    }

    changeWeek() {
        console.log('changeWeek : ', this.week);

        this.ngAfterViewInit();
    }

    ngAfterViewInit() {
        // Pie
        this.pieChartLabels = ['TimeSheet', 'Lunch', 'Tea Break', 'IONIC 2', 'VRI', 'Salesforce'];
        this.pieChartData = [12, 3, 1, 14, 19, 25];
        this.weekRespDataSetsArray = [];

        this.weeksColorArray = [
            {
                color: "Blue",
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(75,192,192,0.4)",
                pointHoverBorderWidth: 10,
                pointRadius: 1,
                pointHitRadius: 10,
                lineTension: 0.1,
                borderDashOffset: 0.0,
                borderCapStyle: 'butt',
                borderJoinStyle: 'miter',
                spanGaps: false
            },
            {
                color: "DimGrey",
                backgroundColor: "rgba(119, 113, 128,0.4)",
                borderColor: "rgba(119, 113, 128,1)",
                pointBorderColor: "rgba(119, 113, 128,1)",
                pointBackgroundColor: "#fff",
                pointHoverBackgroundColor: "rgba(119, 113, 128,1)",
                pointHoverBorderColor: "rgba(119, 113, 128,0.4)",
                pointHoverBorderWidth: 10,
                pointRadius: 1,
                pointHitRadius: 10,
                lineTension: 0.1,
                borderDashOffset: 0.0,
                borderCapStyle: 'butt',
                borderJoinStyle: 'miter',
                spanGaps: false
            },
            {
                color: "Chocolate",
                backgroundColor: "rgba(255, 128, 0,0.4)",
                borderColor: "rgba(255, 128, 0,1)",
                pointBorderColor: "rgba(255, 128, 0,1)",
                pointBackgroundColor: "#fff",
                pointHoverBackgroundColor: "rgba(255, 128, 0,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                lineTension: 0.1,
                borderDashOffset: 0.0,
                borderCapStyle: 'butt',
                borderJoinStyle: 'miter',
                spanGaps: false
            },
            {
                color: "Purple",
                backgroundColor: "rgba(74, 35, 90,0.4)",
                borderColor: "rgba(74, 35, 90,1)",
                pointBorderColor: "rgba(74, 35, 90,1)",
                pointBackgroundColor: "#fff",
                pointHoverBackgroundColor: "rgba(74, 35, 90,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                lineTension: 0.1,
                borderDashOffset: 0.0,
                borderCapStyle: 'butt',
                borderJoinStyle: 'miter',
                spanGaps: false
            },
            {
                color: "Green Copper",
                backgroundColor: "rgba(133,99,99,0.4)",
                borderColor: "rgba(133,99,99,1)",
                pointBorderColor: "rgba(133,99,99,1)",
                pointBackgroundColor: "#fff",
                pointHoverBackgroundColor: "rgba(133,99,99,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                lineTension: 0.1,
                borderDashOffset: 0.0,
                borderCapStyle: 'butt',
                borderJoinStyle: 'miter',
                spanGaps: false
            },
            {
                color: "bronze",
                backgroundColor: "rgba(140,120,83,0.4)",
                borderColor: "rgba(140,120,83,1)",
                pointBorderColor: "rgba(140,120,83,1)",
                pointBackgroundColor: "#fff",
                pointHoverBackgroundColor: "rgba(140,120,83,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                lineTension: 0.1,
                borderDashOffset: 0.0,
                borderCapStyle: 'butt',
                borderJoinStyle: 'miter',
                spanGaps: false
            },
            {
                color: "Steel Blue",
                backgroundColor: "rgba(35, 107, 142,0.4)",
                borderColor: "rgba(35, 107, 142,1)",
                pointBorderColor: "rgba(35, 107, 142,1)",
                pointBackgroundColor: "#fff",
                pointHoverBackgroundColor: "rgba(35, 107, 142,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                lineTension: 0.1,
                borderDashOffset: 0.0,
                borderCapStyle: 'butt',
                borderJoinStyle: 'miter',
                spanGaps: false
            },
            {
                color: "Dark Turquoise",
                backgroundColor: "rgba(112,147,219,0.4)",
                borderColor: "rgba(112,147,219,1)",
                pointBorderColor: "rgba(112,147,219,1)",
                pointBackgroundColor: "#fff",
                pointHoverBackgroundColor: "rgba(112,147,219,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                lineTension: 0.1,
                borderDashOffset: 0.0,
                borderCapStyle: 'butt',
                borderJoinStyle: 'miter',
                spanGaps: false
            },
            {
                color: "Aquamarine",
                backgroundColor: "rgba(127,255,212,0.4)",
                borderColor: "rgba(127,255,212,1)",
                pointBorderColor: "rgba(127,255,212,1)",
                pointBackgroundColor: "#fff",
                pointHoverBackgroundColor: "rgba(127,255,212,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                lineTension: 0.1,
                borderDashOffset: 0.0,
                borderCapStyle: 'butt',
                borderJoinStyle: 'miter',
                spanGaps: false
            },
            {
                color: "Green Yellow",
                backgroundColor: "rgba(209,146,117,0.4)",
                borderColor: "rgba(209,146,117,1)",
                pointBorderColor: "rgba(209,146,117,1)",
                pointBackgroundColor: "#fff",
                pointHoverBackgroundColor: "rgba(209,146,117,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                lineTension: 0.1,
                borderDashOffset: 0.0,
                borderCapStyle: 'butt',
                borderJoinStyle: 'miter',
                spanGaps: false
            },
            {
                color: "LightCoral",
                backgroundColor: "rgba(240,128,128,0.4)",
                borderColor: "rgba(240,128,128,1)",
                pointBorderColor: "rgba(240,128,128,1)",
                pointBackgroundColor: "#fff",
                pointHoverBackgroundColor: "rgba(240,128,128,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                lineTension: 0.1,
                borderDashOffset: 0.0,
                borderCapStyle: 'butt',
                borderJoinStyle: 'miter',
                spanGaps: false
            },
            {
                color: "MediumPurple",
                backgroundColor: "rgba(147,112,219,0.4)",
                borderColor: "rgba(147,112,219,1)",
                pointBorderColor: "rgba(147,112,219,1)",
                pointBackgroundColor: "#fff",
                pointHoverBackgroundColor: "rgba(147,112,219,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                lineTension: 0.1,
                borderDashOffset: 0.0,
                borderCapStyle: 'butt',
                borderJoinStyle: 'miter',
                spanGaps: false
            },
            {
                color: "Quartz",
                backgroundColor: "rgba(217,217,243,0.4)",
                borderColor: "rgba(217,217,243,1)",
                pointBorderColor: "rgba(217,217,243,1)",
                pointBackgroundColor: "#fff",
                pointHoverBackgroundColor: "rgba(217,217,243,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                lineTension: 0.1,
                borderDashOffset: 0.0,
                borderCapStyle: 'butt',
                borderJoinStyle: 'miter',
                spanGaps: false
            }
        ];

        for (let k = 0; k < this.pieChartLabels.length; k++) {

            let weekData = {
                label: this.pieChartLabels[k],

                backgroundColor: this.weeksColorArray[k].backgroundColor,
                // borderColor: this.weeksColorArray[k].borderColor,
                // pointBorderColor: this.weeksColorArray[k].pointBorderColor,
                // pointBackgroundColor: this.weeksColorArray[k].pointBackgroundColor,
                // pointHoverBackgroundColor: this.weeksColorArray[k].pointHoverBackgroundColor,
                hoverBackgroundColor: this.weeksColorArray[k].pointHoverBorderColor,
                // pointHoverBorderWidth: 2,
                // pointRadius: 1,
                // pointHitRadius: 10,
                // lineTension: 0.1,
                // borderDashOffset: 0.0,
                // borderCapStyle: 'butt',
                // borderJoinStyle: 'miter',
                // spanGaps: false,

                data: '' + this.pieChartData[k]
            };

            this.weekRespDataSetsArray.push(weekData);
        }

        var data = {
            labels: this.pieChartLabels,
            datasets: [
                {
                    data: this.pieChartData,
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#4A235A",
                        "#912020",
                        "#35565B"
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#4A235A",
                        "#912020",
                        "#35565B"
                    ]
                }]
        };

        this.pieChart = new Chart(this.pieCanvas.nativeElement, {
            type: 'pie',
            data: data
            // data: {
            //     labels: this.pieChartLabels,
            //     datasets: this.weekRespDataSetsArray
            // }
        });
    }

    // events
    // public chartClicked(e: any): void {
    //   console.log(e);
    // }
    //
    // public chartHovered(e: any): void {
    //   console.log(e);
    // }

}
