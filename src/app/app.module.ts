import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Network } from 'ionic-native';
import { Storage } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';

import 'chart.js';

import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { HomePage } from '../pages/home/home';
import { TodayPage } from '../pages/today/today';
import { MonthlyPage } from '../pages/monthly/monthly';
import { WeeklyPage } from '../pages/weekly/weekly';
import { PasswordPage } from '../pages/password/password';
import { LoadingPage } from '../pages/loading/loading';

import { EmployeeMasterPage } from '../pages/employee-master/employee-master'
import { EmployeeProjectPage } from '../pages/employee-project/employee-project'
import { ProjectMasterPage } from '../pages/project-master/project-master'
import { SummaryDetailsPage } from '../pages/summary-details/summary-details'
// import { PopoverPage } from '../pages/popover/popover'
import { TodayInputPage } from '../pages/today-input/today-input';
import { ProfileViewPage } from '../pages/profile-view/profile-view';
import { ItemComponent } from '../pages/profile-view/profile-view';
import { MapsPage } from '../pages/maps/maps';
import { EmployeeMasterInputPage } from '../pages/employee-master-input/employee-master-input';
import { ProjectMasterInputPage } from '../pages/project-master-input/project-master-input';

// import { AgmCoreModule } from 'angular2-google-maps/core';

import { AuthService } from '../providers/auth-service';
import { UserSettings } from '../providers/user-settings';
import { ConnectivityService } from '../providers/connectivity-service';

import { ChartsModule } from 'ng2-charts';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        LoginPage,
        RegisterPage,
        TodayPage,
        WeeklyPage,
        MonthlyPage,
        PasswordPage,
        EmployeeMasterPage,
        EmployeeProjectPage,
        ProjectMasterPage,
        SummaryDetailsPage,
        ProfileViewPage,
        TodayInputPage,
        LoadingPage,
        ItemComponent,
        MapsPage,
        EmployeeMasterInputPage,
        ProjectMasterInputPage
    ],
    imports: [
        IonicModule.forRoot(MyApp),
        HttpModule,
        ChartsModule
        // AgmCoreModule.forRoot({ apiKey: 'AIzaSyDsKR-DzJJuYHwOy-ebrtBIYfSpXtz5B0Y' })
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        LoginPage,
        RegisterPage,
        TodayPage,
        WeeklyPage,
        MonthlyPage,
        PasswordPage,
        EmployeeMasterPage,
        EmployeeProjectPage,
        ProjectMasterPage,
        SummaryDetailsPage,
        ProfileViewPage,
        TodayInputPage,
        LoadingPage,
        ItemComponent,
        MapsPage,
        EmployeeMasterInputPage,
        ProjectMasterInputPage
    ],
    providers: [
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        AuthService,
        Network,
        ConnectivityService,
        UserSettings,
        Storage
    ]
})
export class AppModule { }
