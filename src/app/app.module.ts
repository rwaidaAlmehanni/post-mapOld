import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { InfoModalPage } from '../pages/info-modal/info-modal' ;
import { Auth } from '../providers/auth';
import { UploadPage } from '../pages/upload/upload';
import { ItemComponent } from './../pages/upload/upload';
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    InfoModalPage,
    LoginPage,
    RegisterPage,
    UploadPage,
    ItemComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    InfoModalPage,
    TabsPage,
    LoginPage,
    RegisterPage,
    UploadPage,
    ItemComponent
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},Auth]
})
export class AppModule {}
