import { Injectable } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';
type User = Array <{id: number; name: string; password: string}>;

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  user: User = [
    { id: 0, name: "th.quiroga@duocuc.cl", password: "123"},
    { id: 1, name: "prueba@duocuc.cl", password: "prueba"},
    { id: 2, name: "a", password: "a"}
  ];
  
  autenticado = new usuarioAutenticado(-2, "","");


  verificarUsuario(email:string, contrasenia:string){
    if (email == "") {
      this.showAlert("Debe ingresar un email.", "Advertencia");
      return -1;
    }
    if (contrasenia == "") {
      this.showAlert("Debe ingresar una contraseña.", "Advertencia");
      return -1;
    }
    for(let i = 0; i<this.user.length; i++){
      let u = this.user[i];
      if(email == u.name){
        if(contrasenia == u.password){
          this.showAlert("Iniciando sesion.", "Correcto");
          this.autenticado.setId(u.id);
          this.autenticado.setName(u.name);
          this.autenticado.setPassword(u.password);
          return u.id;
        }else{
          this.showAlert("Contraseña incorrecta.", "Advertencia");
          return -1;
        }
      }
    }
    this.showAlert("Usuario inexistente.", "Advertencia");

    return -1;
  }
  async showAlert(msg:string, title:string){
    var alert = await this.alertService.create({cssClass:"alertClass",message:msg,header:title,buttons:['Aceptar']});
    await alert.present();
    return alert;
  }
  recuperarContrasenia(email: string): string | null {
    const user = this.user.find(u => u.name === email);
    if (user) {
      return user.password;
    }
    return null;
  }
  getName(){//quisas cambiar cuando veamos los usuarios de la bd
    return this.autenticado.name;
  }
  
  constructor(private alertService:AlertController) { }
}
export class usuarioAutenticado {
  // Define propiedades del objeto
  id: number;
  name: string;
  password: string;

  // Constructor para inicializar el objeto
  constructor(id: number, name: string, password:string) {
    this.id = id;
    this.name = name;
    this.password = password;
  }
  setId(id:number){
    this.id=id;
  }
  setName(name:string){
    this.name=name;
  }
  setPassword(password:string){
    this.password=password;
  }
}