import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

@IonicPage()
@Component({
  selector: 'page-form-add',
  templateUrl: 'form-add.html',
})
export class FormAddPage {

	model: any;
  shouldGeolocate: boolean = false;

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
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
      this.geolocation.getCurrentPosition().then(result=>{
        this.model.setCoords(result.coords);
        //console.log(result);
          //this.location (result.coords.latitude, result.coords.longitude);
        }).catch((err) => console.log(err));
    }
    else{
      this.model.cleanCoords();
    }

  }

  save(){
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

  location(lat,long){
    //console.log(lat+ " si " + long);
     this.nativeGeocoder.reverseGeocode(lat, long)
      .then((result: NativeGeocoderReverseResult) =>
        //console.log(result.locality))
        this.model.setUrl(result))
      .catch((error: any) => console.log(error));
  }

  get

}
