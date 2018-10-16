import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from '../environments/environment';
import { NgxEchartsModule } from 'ngx-echarts';
import 'hammerjs';

import 'firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';

import { fuseConfig } from './fuse-config';
import { AuthService } from '../providers/auth-service/auth-service';
import { TemplatesService } from '../providers/templates-service/templates-service';
import { BannerCanvasService } from '../providers/banner-canvas-service/banner-canvas-service';

import { AppComponent } from './app.component';
import { FuseMainModule } from './main/main.module';
import { FuseTopModule } from './main/content/top/top.module';
import { FuseEditModule } from './main/content/edit/edit.module';
import { FuseMakeModule } from './main/content/make/make.module';


const appRoutes: Routes = [
    {
        path: '**',
        redirectTo: 'top'
    }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        BrowserModule,
        AngularFireModule.initializeApp(environment.firebase),
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        TranslateModule.forRoot(),
        NgxEchartsModule,
        // Fuse Main and Shared modules
        FuseModule.forRoot(fuseConfig),
        FuseSharedModule,
        FuseMainModule,
        FuseTopModule,
        FuseEditModule,
        FuseMakeModule
    ],
    providers: [
        AngularFireAuth,
        AngularFireDatabase,
        AuthService,
        TemplatesService,
        BannerCanvasService
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
