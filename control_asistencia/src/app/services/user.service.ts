import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { AlertController } from '@ionic/angular';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private alertService:AlertController, private auth: Auth) {}
  private users: User[] = [
    {id: 0,email: 'th.quiroga@duocuc.cl',nombre: 'Thomas', apellido: 'Quiroga', contrasenia: '123',},
    {id: 1, email: 'mar.rees@duocuc.cl',nombre: 'Martin', apellido: 'Rees', contrasenia: 'prueba'},
    {id: 2, email: 'a', nombre: 'a', apellido: 'a', contrasenia: 'a'},
    {id: 3, email: 'pgy4121-002d', nombre: 'Guillermo', apellido: 'Villacura', contrasenia: 'pgy4121-002d'}
  ];
  actualId:number=-1;
  setActualId(id:number){this.actualId=id;}
  getActualId():number{return this.actualId;}
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
          this.setActualId(u.id);
          return u.id;
      }
    }
    this.showAlert("Usuario inexistente.", "Advertencia");
    return -1;
  }
  /**
   * Verifica que la contraseña sea correcta, si lo es retorna la id, sino -1.
   * @param id 
   * @param contrasenia 
   * @returns id
   */
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

  /**
   * Genera la id para un nuevo usuario.
   * @returns ultimaId+1
   */
  lastId():number{
    if (this.users.length > 0) {
      const ultimoUsuario = this.users[this.users.length - 1];
      return ultimoUsuario.id+1;
    }
    return 0;
  }
  /**
   * Verifica si no existen parametros en blanco, luego que el email ingresado no exista, si no ocurre lo anterior se ingresa el usuario
   * @param id 
   * @param email 
   * @param nombre 
   * @param apellido 
   * @param contrasenia 
   * @returns true
   */
  async addUser(id:number, email:string, nombre:string, apellido:string, contrasenia:string): Promise<boolean> {
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
        return true;
      }  
    }
    return false;
  }
  /**
   * Obtiene la lista de usuarios
   * @returns Users[]
   */
  getUsers(): User[] {
    return this.users;
  }
  /**
   * Elimina un usuario segun su id.
   * @param id 
   */
  deleteUser(id:number): void{
    this.showAlert("Usuario ["+this.getNombre(id)+" "+this.getApellido(id)+"] Eliminado.", "Mensaje");
    this.users.splice(id, 1);
  }
  /**
   * Si no existen parametros en blanco, actualiza los datos del usuario segun su id.
   * @param id 
   * @param nombre 
   * @param apellido 
   * @param contrasenia 
   */
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

  async showConfirm(message:string,btn_cancelar:string,btn_confirmar:string){
    let promise = new Promise<boolean>(async (resolve)=>{
      var alert = await this.alertService.create({cssClass:"",message:message,buttons:[
        
        {
          text:btn_cancelar,
          role: 'cancel',
          handler: () =>{
            resolve(false);
          }
        },
        {
          text:btn_confirmar,
          handler: () =>{
            resolve(true);
          }
        }
      ]})
      await alert.present();

    })
    return promise;
  }

  //Firebase segment
  async register({email, password}: any){
    var confirmar= await this.showConfirm("¿Desea agregar usuario?","Cancelar","Aceptar");
      if (confirmar){
        try{
          createUserWithEmailAndPassword(this.auth,email,password);
          //this.showAlert("Usuario ingresado.", "Mensaje");
          //this.showAlert("Usuario ingresado.", "Mensaje");
        }catch (error:any) {
          console.log("yes");
          if (error.code == 'auth/invalid-email') {
            this.showAlert("El formato del correo no es valido.","Error de validación");
          }else if(error.code == 'auth/weak-password'){
            this.showAlert("La contraseña debe tener un minimo de 6 caracteres.","Error de validación");
          }else if(error.code == 'auth/email-already-in-use'){
            this.showAlert("Este correo ya esta en uso.","Error de validación");
          }else if(error.code == 'auth/admin-restricted-operation'){
            this.showAlert("Ingrese un correo.","Error de validación");
          }else if(error.code == 'auth/missing-password'){
            this.showAlert("Ingrese una contraseña.","Error de validación");
          }else{
            this.showAlert(error, "Error");
            console.log(error) 
          }
        }
      }
  }
  login({email, password}: any){

    return signInWithEmailAndPassword(this.auth, email, password);
  }
}
