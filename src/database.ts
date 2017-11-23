import Dexie from 'dexie';

export class UsersAppDB extends Dexie{
	users : Dexie.Table<IUsers,number>
	constructor(){
		super("UsersDB");

		this.version(1).stores({
			users: '++id,name,last_name,last_name2,curp,lat,lng,tittle,imageUrl'
		});

		this.users.mapToClass(Users);
	}
}

export interface IUsers{
	id?: number;
	name: string;
	last_name: string;
	last_name2: string;
	curp: string;
	lat: number;
	lng: number;
	title: string;
	imageUrl: string;
}

export class Users implements IUsers {

	id?: number;
	name: string;
	last_name: string;
	last_name2: string;
	curp: string;
	lat: number;
	lng: number;
	title: string;
	imageUrl: string;

	constructor(
		name: string,
		last_name: string,
		last_name2: string,
		title: string,
		curp: string,
		lat?: number,
		lng?: number,
		id? : number,
		imageUrl?: string
	) {
		this.name = name;
		this.last_name = last_name;
		this.last_name2 = last_name2;
		this.title = title;
		this.curp = curp;

		if(lat) this.lat = lat;
		if(lng) this.lng = lng;
		if(id) this.id = id;
		if (imageUrl) this.imageUrl = imageUrl;
	}

	save(){
		return db.users.add(this);
	}

	setCoords(coords){
	  this.lat = coords.latitude;
	  this.lng = coords.longitude;
	}

	cleanCoords(){
		this.lat = null;
    	this.lng = null;
	}

	static all(){

		return db.users.orderBy("id").reverse().toArray();
	}
}

export let db = new UsersAppDB;
