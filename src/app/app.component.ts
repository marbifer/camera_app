import { Component, ViewChild } from "@angular/core";
import { Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { TabsPage } from "../pages/tabs/tabs";

// Import Auth0Cordova
import Auth0Cordova from "@auth0/cordova";
import { HomePage } from "../pages/home/home";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild("myNav") nav;
  rootPage: any = TabsPage;
  activePage: any;
  pages: Array<{ title: string; component: any }>;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen
  ) {
    this.pages = [
      { title: "Home", component: TabsPage },
      { title: "LogOut", component: HomePage }
    ];

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      // Redirect back to app after authenticating
      (window as any).handleOpenURL = (url: string) => {
        Auth0Cordova.onRedirectUri(url);
      };
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
    this.activePage = page;
  }
}
