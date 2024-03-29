import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { User } from '../models/user.model';
import { Asistencia } from '../models/asistencia';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private helperService:HelperService) { }

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

  async guardarUser(user:User){
    
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
  async editarUsuario(user:User){
    let users:User[]=[];
    var usuarios = await this.obtenerUser();
    for (const i of usuarios) {
      if (i.email == user.email) {
        i.nombre = user.nombre;
        i.apellido = user.apellido;
        i.comuna = user.comuna;
        i.region = user.region;
        
      }
      users.push(i);
    }
    this.setItem("user",JSON.stringify(users));
  }
  async eliminarUsuario(email:string){
    let users:User[]=[];
    var usuarios = await this.obtenerUser();
    for (const i of usuarios) {
      if (i.email != email) {
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
      return {email:"",nombre:"",apellido:"",contrasenia:"", region: "", comuna: "", asistencias:[]};
    }else{
      data = JSON.parse(storageData);
      if(data){
        for(const i of data){
          if(i.email == email){
            return {email:i.email ,nombre:i.nombre, apellido:i.apellido, region:i.region, comuna:i.comuna, contrasenia:i.contrasenia, asistencias:i.asistencias};
          }
        }
      }
      return {email:"",nombre:"",apellido:"",contrasenia:"", region: "", comuna: "", asistencias:[]};
    }
  }



  async addAsistencia(asistencia:Asistencia,email:string){
    if(email==""){
      console.log("probablemente se bugge, falta testeo");
    }
    let user:User = await this.getUserData(email);
    let existeAsist:boolean = false;
    console.log(user)
    for (const a of user.asistencias) {
      let actualAsist:string = a.asignatura+a.seccion+a.fecha+a.hora;
      let nuevaAsist:string = asistencia.asignatura+asistencia.seccion+asistencia.fecha+asistencia.hora;

      if (actualAsist == nuevaAsist) {
        existeAsist=true;
        break;
      }
    }
    if(existeAsist){
      this.helperService.showAlert("Esta asistencia ya estaba registrada.", "Error");
    }else{
      user.asistencias.push(asistencia);
      this.actualizarUser(user);
      this.helperService.showAlert("Asistencia registrada.", "Succes");
    }
    

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

  async getAsistencias(email:string):Promise<Asistencia[]>{//se bueggea
    let data:any[] = [];
    const storageData = await this.getItem("user")
    console.log(storageData);
    if (storageData == null) {
      console.log("NULL")
      return [];
    }else{
      data = JSON.parse(storageData);
      console.log("data:",data)
      if(data){
        for(const i of data){
          if(i.email == email){
            return i.asistencias;
          }
        }
      }
      return [];
    }
  }

  userData:User={email:"",nombre:"",apellido:"", region:"", comuna:"", contrasenia:"", asistencias:[]};
  setActualUserData(user:User){
    this.userData=user;
  }
  getActualUserData():User{
    return this.userData;
  }
}
