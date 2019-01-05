import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { IonicStorageModule } from "@ionic/storage";
import { MyApp } from "./app.component";
import { AuthService } from "./../services/auth.service";
import { HomePage } from "../pages/home/home";
import { TabsPage } from "../pages/tabs/tabs";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { HttpClientModule } from "@angular/common/http";
import { HttpModule } from "@angular/http";
import { Camera } from "@ionic-native/camera";
import { FileTransfer } from "@ionic-native/file-transfer";
import { File } from "@ionic-native/file";
import { IonicImageViewerModule } from "ionic-img-viewer";
import { PhotoLibrary } from "@ionic-native/photo-library";
import { SafePipe } from "./safe.pipe";

@NgModule({
  declarations: [MyApp, HomePage, TabsPage, SafePipe],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    IonicImageViewerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage, TabsPage],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    FileTransfer,
    File,
    PhotoLibrary,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthService
  ]
})
export class AppModule {}
