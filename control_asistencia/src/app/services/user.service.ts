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

  /**
   * Ve si existe un usuario con ese correo, si existe regresa su id, si no -1.
   * @param email 
   * @returns id
   */
  existeUsuario(email:string):number{
    if (email == "") {
      this.showAlert("Debe ingresar un email.", "Advertencia");
      return -1;
    }
    for(let i = 0; i<this.users.length; i++){
      let u = this.users[i];
      if(email == u.email){
          return u.id;
      }
    }
    this.showAlert("Usuario inexistente.", "Advertencia");
    return -1;
  }
  
  contraseniaCorrecta(id:number, contrasenia:string):number{
    if (contrasenia == "") {
      this.showAlert("Debe ingresar una contraseña.", "Advertencia");
      return -1;
    }
    for(let i = 0; i<this.users.length; i++){
      let u = this.users[i];
      if(u.id == id && u.contrasenia == contrasenia){
          return u.id;
      }
    }
    this.showAlert("Contraseña incorrecta.", "Advertencia");
    return -1;
    
  }


  lastId():number{//no funciona con los valores por defecto
    if (this.users.length > 0) {
      const ultimoUsuario = this.users[this.users.length - 1];
      return ultimoUsuario.id+1;
    }
    return 0;
  }
  addUser(id:number, email:string, nombre:string, apellido:string, contrasenia:string): boolean {//no se deben aceptar correos repetidos, ni parametros vacios
    if (email == "") {
      this.showAlert("Debe ingresar un email.", "Advertencia");
    }
    else if (nombre == "") {
      this.showAlert("Debe ingresar un nombre.", "Advertencia");
    }
     else if (apellido == "") {
      this.showAlert("Debe ingresar un apellido.", "Advertencia");
    }
    else if (contrasenia == "") {
      this.showAlert("Debe ingresar una contraseña.", "Advertencia");
    }else{
      let inexistente:boolean = true;
      for(let i = 0; i<this.users.length; i++){
        let u = this.users[i];
        if(email == u.email){
            this.showAlert("Email de usuario ocupado.", "Mensaje");
            inexistente = false;
            break;
        }
      }
      if(inexistente){
        this.users.push(new User(id,email,nombre,apellido,contrasenia));
        this.showAlert("Usuario ingresado.", "Mensaje");
        return true;
      }  
    }
    return false;
  }
  getUsers(): User[] {
    return this.users;
  }
  deleteUser(id:number): void{
    this.showAlert("Usuario ["+this.getNombre(id)+" "+this.getApellido(id)+"] Eliminado.", "Mensaje");
    this.users.splice(id, 1);
  }
  updateUser(id:number, nombre:string, apellido:string, contrasenia:string):void{
    if (nombre == "") {
      this.showAlert("Debe ingresar un nombre.", "Advertencia");
    }
     else if (apellido == "") {
      this.showAlert("Debe ingresar un apellido.", "Advertencia");
    }
    else if (contrasenia == "") {
      this.showAlert("Debe ingresar una contraseña.", "Advertencia");
    }else{
      for(let i = 0; i<this.users.length; i++){
        let u = this.users[i];
        if(id == u.id){
            u.nombre = nombre;
            u.apellido = apellido;
            u.contrasenia = contrasenia;
            this.showAlert("Usuario Actualizado.", "Mensaje");
        }
      }
    }
    
  }
  
  
  recuperarContrasenia(email: string): string | null {
    const user = this.users.find(u => u.email === email);
    if (user) {
      return user.contrasenia;
    }
    return null;
  }
  

  //mejorar las funciones de aca abajo
  getEmail(id:number){
    for(let i = 0; i<this.users.length; i++){
      let u = this.users[i];
      if(id == u.id){
          return u.email;
      }
    }
    return "";
  }
  getNombre(id:number){
    for(let i = 0; i<this.users.length; i++){
      let u = this.users[i];
      if(id == u.id){
          return u.nombre;
      }
    }
    return "";
  }
  getApellido(id:number){
    for(let i = 0; i<this.users.length; i++){
      let u = this.users[i];
      if(id == u.id){
          return u.apellido;
      }
    }
    return "";
  }
  getContrasenia(id:number){
    for(let i = 0; i<this.users.length; i++){
      let u = this.users[i];
      if(id == u.id){
          return u.contrasenia;
      }
    }
    return "";
  }

  async showAlert(msg:string, title:string){
    var alert = await this.alertService.create({cssClass:"alertClass",message:msg,header:title,buttons:['Aceptar']});
    await alert.present();
    return alert;
  }
}
