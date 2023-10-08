import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { AlertController } from '@ionic/angular';
import { HelperService } from './helper.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private alertService:AlertController, private auth: AngularFireAuth, private helperService:HelperService) {}
  private users: User[] = [
    {email: 'a', nombre: 'a', apellido: 'a', contrasenia: 'a'},
    {email: 'pgy4121-002d', nombre: 'Guillermo', apellido: 'Villacura', contrasenia: 'pgy4121-002d'}
  ];
  actualEmail:string="";
  setActualEmail(email:string){this.actualEmail=email;}
  getActualEmail():string{return this.actualEmail;}



  async addUser(email:string, nombre:string, apellido:string, contrasenia:string) {
    this.users.push(new User(email,nombre,apellido,contrasenia));
  }

  getUsers(): User[] {
    return this.users;
  }

  deleteUser(email:string): void{
    this.helperService.showAlert("Usuario ["+this.getNombre(email)+" "+this.getApellido(email)+"] Eliminado.", "Mensaje");
    this.users.splice(this.getUserPosition(email), 1);
  }
  getUserPosition(email:string){
    for(let i = 0; i<this.users.length; i++){
      let u = this.users[i];
        if(email == u.email){
          return i;
        }
    }
    return -1;
  }


  updateUser(email:string, nombre:string, apellido:string, contrasenia:string):void{
    if (nombre == "") {
      this.helperService.showAlert("Debe ingresar un nombre.", "Advertencia");
    }
     else if (apellido == "") {
      this.helperService.showAlert("Debe ingresar un apellido.", "Advertencia");
    }
    else if (contrasenia == "") {
      this.helperService.showAlert("Debe ingresar una contraseña.", "Advertencia");
    }else{
      for(let i = 0; i<this.users.length; i++){
        let u = this.users[i];
        if(email == u.email){
            u.nombre = nombre;
            u.apellido = apellido;
            u.contrasenia = contrasenia;
            this.helperService.showAlert("Usuario Actualizado.", "Mensaje");
        }
      }
    }
    
  }
  
  /**
   * Busca si existe el usuario, si existe dara un mensaje con su contraseña. 
   * @param email 
   * @returns contraseña
   */
  recuperarContrasenia(email: string): string | null {
    const user = this.users.find(u => u.email === email);
    if (user) {
      return user.contrasenia;
    }
    return null;
  }
  


  getNombre(email:string){
    for(let i = 0; i<this.users.length; i++){
      let u = this.users[i];
      if(email == u.email){
          return u.nombre;
      }
    }
    return "";
  }
  getApellido(email:string){
    for(let i = 0; i<this.users.length; i++){
      let u = this.users[i];
      if(email == u.email){
          return u.apellido;
      }
    }
    return "";
  }
  getContrasenia(email:string){
    for(let i = 0; i<this.users.length; i++){
      let u = this.users[i];
      if(email == u.email){
          return u.contrasenia;
      }
    }
    return "";
  }





  //Firebase segment
  
}
