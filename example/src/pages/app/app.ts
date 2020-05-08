import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Plugins, CameraResultType, MediaType } from '@capacitor/core';

/**
 * Generated class for the AppPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-app',
  templateUrl: 'app.html',
})
export class AppPage {
  @ViewChild('inputEl')
  inputEl:ElementRef;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppPage');
    console.log('Got input el', this.inputEl);
    this.inputEl.nativeElement.addEventListener('keydown', (event: KeyboardEvent) => {
      console.log('KEYDOWN!', event);
      if ((event.metaKey || event.code == 'ArrowLeft') || (event.code == 'ArrowRight') ||
          (event.code == 'ArrowUp') || (event.code == 'ArrowDown') ||
          (event.code == 'Delete') || (event.code == 'Backspace')) {
          return;
      } else if (event.key.search(/\d/) == -1) {
          event.preventDefault();
      }
    });
  }

  async canOpenUrl() {
    const ret = await Plugins.App.canOpenUrl({ url: 'com.getcapacitor.myapp' });
    console.log('Can open url: ', ret.value);
  }

  async openUrl() {
    const ret = await Plugins.App.openUrl({ url: 'com.getcapacitor.myapp://page?id=ionicframework' });
    console.log('Open url response: ', ret);
  }

  async failCall() {
    await Plugins.App.openUrl({ url: null });
  }

  async takePicture() {
    const { Camera } = Plugins;
    const image = await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.Uri
    });
    // image.webPath will contain a path that can be set as an image src. 
    // You can access the original file using image.path, which can be 
    // passed to the Filesystem API to read the raw data of the image, 
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)

    console.log('Path returned for image' + image.webPath);
  }

  async takeVideo() {
    const { Camera } = Plugins;
    const video = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      mediaType: MediaType.Video
    });

    console.log('Path returned for video' + video.webPath);
  }
}
