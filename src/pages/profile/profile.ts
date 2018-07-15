import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { LocalUser } from '../../models/local_user';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { API_CONFIG } from '../../config/api.config';
import { CameraOptions, Camera } from '@ionic-native/camera';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente: ClienteDTO;
  picture: string;
  cameraOn: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storageService: StorageService,
    public clienteService: ClienteService,
    public camera: Camera) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData(){
    let localUser: LocalUser = this.storageService.getLocalUser();
    if (localUser && localUser.email) {

      /*this.clienteService.findByEmail(localUser.email)
        .flatMap((response: ClienteDTO) => this.clienteService.getImageFromBucket(response.id))
        .subscribe((response: ClienteDTO) => {
          this.cliente = response;
          this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;
        },
        error => { });*/

      /*Observable.forkJoin(
        [
        this.clienteService.findByEmail(localUser.email),
        this.clienteService.getImageFromBucket(this.cliente.id)
        ]
      )
      .subscribe(responses => {
        this.cliente = responses[0];
        this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;
      },
        error => { }
      );*/

      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.cliente = response as ClienteDTO;
          this.getImageIfExists(this.cliente.id);
        },
          error => {
            if (error.status == 403) {
              this.navCtrl.setRoot('HomePage');
            }
          });
    }
    else {
      this.navCtrl.setRoot('HomePage');
    }
  }

  getImageIfExists(clienteId: string) {
    this.clienteService.getImageFromBucket(clienteId)
      .subscribe((response: any) => {
        this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${clienteId}.jpg`;
      },
        error => { });
  }

  getCameraPicture() {

    this.cameraOn = true;

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options)
      .then((imageData) => {
        this.picture = 'data:image/png;base64,' + imageData;
        this.cameraOn = false;
      }, (err) => {
    });
  }

  sendPicture() {
        this.clienteService.uploadPicture(this.picture)
          .subscribe(response => {
            this.picture = null;
            this.loadData();
          },
          error => {
          });
      }

      cancel() {
        this.picture = null;
      }

}
