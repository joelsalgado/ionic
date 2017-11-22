import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Users } from '../../database';
import { AlertController } from 'ionic-angular';

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

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public alertCtrl: AlertController,
  ){
  	this.model = Users;
  }

  ionViewDidLoad() {
    this.model = new Users ("","","","","");

    
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

}
