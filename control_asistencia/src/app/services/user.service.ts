import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() {}

  userData:User={email:"",nombre:"",apellido:"", region:"", comuna:"", contrasenia:"", asistencias:[]};
  setActualUserData(user:User){
    this.userData=user;
  }
  getActualUserData():User{
    return this.userData;
  }
  
}
