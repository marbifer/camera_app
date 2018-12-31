import { Component } from "@angular/core";
import { Camera, CameraOptions } from "@ionic-native/camera";
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject
} from "@ionic-native/file-transfer";
import { File } from "@ionic-native/file";
import { LoadingController, IonicPage, AlertController } from "ionic-angular";
import { HttpClient } from "@angular/common/http";
//import { Observable } from "rxjs/Observable";
import { AuthService } from "./../../services/auth.service";

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  myPhoto: string;

  constructor(
    private camera: Camera,
    public http: HttpClient,
    private transfer: FileTransfer,
    private file: File,
    private loadingCtrl: LoadingController,
    public auth: AuthService,
    public alertCtrl: AlertController
  ) {}

  async pictureFromCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      saveToPhotoAlbum: true
    };

    // Take photo
    this.takePhoto(options);
  }

  pictureFromGallery() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      saveToPhotoAlbum: true
    };

    this.takePhoto(options);
  }

  async takePhoto(options: CameraOptions) {
    try {
      // Take Photo and store result
      const result = await this.camera.getPicture(options);

      // Append this to the dom
      this.myPhoto = `data:image/jpeg;base64,${result}`;
      this.auth.auhtorizePhotos();
    } catch (e) {
      console.error(e);
    }
  }

  uploadImage() {
    const authorization = this.auth.getPhotosToken();
    const bearerToken = "Bearer " + authorization;
    let loader = this.loadingCtrl.create({
      content: "Subiendo..."
    });
    loader.present();

    // Create File transfer Object
    const fileTransfer: FileTransferObject = this.transfer.create();
    const random = Math.floor(Math.random() * 100);

    let options: FileUploadOptions = {
      fileKey: "photo",
      fileName: "myPhoto" + random + ".jpg",
      chunkedMode: false,
      httpMethod: "post",
      mimeType: "image/jpg",
      headers: {
        Authorization: bearerToken,
        "Content-type": "application/octet-stream",
        "X-Goog-Upload-File-Name": "myPhoto" + random + ".jpg",
        "X-Goog-Upload-Protocol": "raw"
      }
    };

    fileTransfer
      .upload(
        this.myPhoto,
        "https://photoslibrary.googleapis.com/v1/uploads",
        options
      )
      .then(
        data => {
          // Success
          console.log("Exitoso", JSON.stringify(data));
          alert("Exitoso");
          loader.dismiss();
        },
        err => {
          alert("Error: La imagen no pudo subirse");
          loader.dismiss();
        }
      );
  }
}
