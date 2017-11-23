import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Users } from '../../database';
import { AlertController } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';

/**
 * Generated class for the FormAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-form-add',
  templateUrl: 'form-add.html',
})
export class FormAddPage {

  model: any;
  shouldGeolocate: boolean = false;
  shouldSend: boolean = true;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public geolocation: Geolocation,
    public nativeGeocoder: NativeGeocoder,

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
        //console.log(result);
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
    //console.log(lat+ " si " + long);
    this.nativeGeocoder.reverseGeocode(lat, long)
      .then((result: NativeGeocoderReverseResult) =>{
        //console.log(result.locality))
        //console.log("hola");
        //let loc2: string = result.locality +" " + result.subLocality + " " + result.thoroughfare + " " + result.subThoroughfare;

        this.model.locality = result.locality;
        this.model.subLocality = result.subLocality;
        this.model.thoroughfare = result.thoroughfare;
        this.model.subThoroughfare = result.subThoroughfare;
      }).catch((error: any) =>{
        console.log(error);
        console.log("error");
      });
  }

}
