import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {Users} from '../../database';
import {FormAddPage} from '../form-add/form-add';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {	

  title: string= "Salario Rosa";
  users: any;
  formPage: any;

  constructor(public navCtrl: NavController) {
  	this.formPage = FormAddPage;
  }

  ionViewWillEnter(){
  	//let users = new Users("Joel", "Valdivia", "Salgado", "Hola", "VASM940825HGRLLR000");

  	//users.save();
  	this.loadUsers();
  }

  loadUsers(){
  	Users.all()
  			.then((resultados) => {
  				this.users = resultados
  				console.log (this.users);
  			});
  }

}
