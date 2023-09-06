import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private alertService:AlertController) {}
  private users: User[] = [
    {id: 0,email: 'th.quiroga@duocuc.cl',nombre: 'Thomas', apellido: 'Quiroga', contrasenia: '123',},
    {id: 1, email: "mar.rees@duocuc.cl",nombre: 'Martin', apellido: 'Rees', contrasenia: "prueba"},
    {id: 2, email: 'a', nombre: "a", apellido: 'a', contrasenia: "a"}
  ];
  usuarioActual = new User(-1, "", "", "","");
  
  lastId():number{//no funciona con los valores por defecto
    if (this.users.length > 0) {
      const ultimoUsuario = this.users[this.users.length - 1];
      return ultimoUsuario.id+1;
    }
    return 0;
  }
  addUser(user: User): void {//no se deben aceptar correos repetidos, ni parametros vacios
    this.users.push(user);
  }
  getUsers(): User[] {
    return this.users;
  }
  deleteUser(id:number): void{
    this.showAlert("Usuario ["+this.usuarioActual.nombre+"] Eliminado.", "Mensaje");
    this.users.splice(id, 1);
  }
  
  existeUsuario(email:string){
    if (email == "") {
      this.showAlert("Debe ingresar un email.", "Advertencia");
      return false;
    }
    for(let i = 0; i<this.users.length; i++){
      let u = this.users[i];
      if(email == u.email){//usar el metodo de pasar parametros por url
          this.usuarioActual=u;
          return true;
      }
    }
    this.showAlert("Usuario inexistente.", "Advertencia");
    return false;
  }
  contraseniaCorrecta(contrasenia:string):boolean{
    if (contrasenia == "") {
      this.showAlert("Debe ingresar una contraseña.", "Advertencia");
      return false;
    }
    if(contrasenia == this.usuarioActual.contrasenia){
      return true;
    }else{
      this.showAlert("Contraseña incorrecta.", "Advertencia");
      return false;
    }
  }
  recuperarContrasenia(email: string): string | null {
    const user = this.users.find(u => u.email === email);
    if (user) {
      return user.contrasenia;
    }
    return null;
  }
  async showAlert(msg:string, title:string){
    var alert = await this.alertService.create({cssClass:"alertClass",message:msg,header:title,buttons:['Aceptar']});
    await alert.present();
    return alert;
  }
  
  getUsuarioActual(){
    return this.usuarioActual;
  }
  getIdUsuarioActual(){
    return this.usuarioActual.id;
  }
  getEmailUsuarioActual(){
    return this.usuarioActual.email;
  }
  getNombreUsuarioActual(){
    return this.usuarioActual.nombre;
  }
  getApellidoUsuarioActual(){
    return this.usuarioActual.apellido;
  }
  getContraseniaUsuarioActual(){
    return this.usuarioActual.contrasenia;
  }

  
}
