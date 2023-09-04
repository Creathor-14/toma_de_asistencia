import { Injectable } from '@angular/core';
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

  usuarioAutenticado: { id: number; name: string; password: string } | null = null; // Variable para almacenar el usuario autenticado

  verificarUsuario(email:string, contrasenia:string){
    if (email == "") {
      this.showAlert("Debe ingresar un email.", "Advertencia");
      return;
    }
    if (contrasenia == "") {
      this.showAlert("Debe ingresar una contraseña.", "Advertencia");
      return;
    }
    for(let i = 0; i<this.user.length; i++){
      let u = this.user[i];
      if(email == u.name){
        if(contrasenia == u.password){
          this.showAlert("Iniciando sesion.", "Correcto");
          return;//deberia devolver la id del usuario
        }else{
          this.showAlert("Contraseña incorrecta.", "Advertencia");
          return;
        }
      }
    }
    this.showAlert("Usuario inexistente.", "Advertencia");
    return;
    /*
    for(const u in this.user){
      const v = User[u];
      console.log(u);
    }*/
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
  
  constructor(private alertService:AlertController) { }
}
