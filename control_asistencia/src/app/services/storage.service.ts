import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { User } from '../models/user.model';
import { Asistencia } from '../models/asistencia';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async create(key:string, value:any){
    Preferences.set({key,value});
  }

  async read(key:string){
    this.getItem(key);
    return (await Preferences.get({key}));
  }
  
  async update(key:string, value:any){
    await Preferences.set({key,value});
  }

  async delete(key:string){
    await Preferences.remove({key});
  }
  
  async clear(){
    await Preferences.clear();
  }


  //profe
  
  async getItem(key:string):Promise<string | null>{
    const obj = await Preferences.get({key:key});    
    return obj.value;
  }
  async obtenerUser():Promise<User[]>{
    const storageData = await this.getItem("user");
    if (storageData == null) {
      return[];
    }

    const data:any[] = JSON.parse(storageData);
    if (data) {
      return data;
    }
    else{
      return [];
    }
  }

  async guardarUser(email:string, nombre:string, apellido:string, contrasenia:string){
    let user:User = {
      email: email, nombre: nombre, apellido: apellido, contrasenia: contrasenia,
      asistencias: []
    };
    let users:User[]=[];
    users.push(user);

    var usuarios = await this.obtenerUser();
    for (const i of usuarios) {
      if (i) {
        users.push(i);
      }
    }
    this.setItem("user",JSON.stringify(users));
  }

  async setItem(llave:string,valor:string){
    await Preferences.set({key:llave,value:valor});
  }

  //pruebas
  async getUserData(email:string):Promise<User>{
    let data:any[] = [];
    const storageData = await this.getItem("user")
    if (storageData == null) {
      return {email:"",nombre:"",apellido:"",contrasenia:"", asistencias:[]};
    }else{
      data = JSON.parse(storageData);
      if(data){
        for(const i of data){
          if(i.email = email){
            return {email:i.email ,nombre:i.nombre, apellido:i.apellido, contrasenia:i.contrasenia, asistencias:i.asistencias};
          }
        }
      }
      return {email:"",nombre:"",apellido:"",contrasenia:"", asistencias:[]};
    }
  }



  async addAsistencia(asistencia:Asistencia,email:string){
    let user:User = await this.getUserData(email);
    
    user.asistencias.push(asistencia);
    this.actualizarUser(user);

  }
  async actualizarUser(user:User){

    let users:User[]=[];
    users.push(user);

    var usuarios = await this.obtenerUser();
    for (const i of usuarios) {
      if (i.email != user.email) {
        users.push(i);
      }
    }
    this.setItem("user",JSON.stringify(users));
  }

}
