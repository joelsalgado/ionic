import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Users } from '../../database';
import { AlertController } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-form-add',
  templateUrl: 'form-add.html',
})
export class FormAddPage {

  model: any;
  shouldGeolocate: boolean = false;
  shouldSend: boolean = true;
  image: string = null;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public geolocation: Geolocation,
    public nativeGeocoder: NativeGeocoder,
    private camera: Camera

  ){
    this.model = Users;
  }

  ionViewDidLoad() {
    this.model = new Users ("","","","","");

  }

  getLocation(){
    if(this.shouldGeolocate){
      this.shouldSend = false;
      this.geolocation.getCurrentPosition().then(result=>{
        this.model.setCoords(result.coords);
        this.location (result.coords.latitude, result.coords.longitude);
        this.shouldSend = true;
      }).catch((err) => console.log(err));
    }
    else{
      this.model.cleanCoords();
    }

  }

  save(){
    if(this.shouldSend){
      this.model.save().then(result=>{
        this.model = new Users ("","","","","");
        let alert = this.alertCtrl.create({
          title: 'Se registro Correctamente!',
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.pop();
      });
    }

  }

  location(lat,long){
    this.nativeGeocoder.reverseGeocode(lat, long)
      .then((result: NativeGeocoderReverseResult) =>{
        this.model.locality = result.locality;
        this.model.subLocality = result.subLocality;
        this.model.thoroughfare = result.thoroughfare;
        this.model.subThoroughfare = result.subThoroughfare;
      }).catch((error: any) =>{
        console.log(error);
      });
  }

  getPicture(){
    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 100,
      targetHeight: 100,
      quality: 40
    }
    this.camera.getPicture( options )
      .then(imageData => {
        this.image = 'data:image/jpeg;base64,'+imageData;
        this.model.imageUrl = this.image;
      })
      .catch(error =>{
        console.error( error );
      });
    }

}
