import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
  
})
export class RegistrarPage implements OnInit {
  email:string = "";
  nombre:string = "";
  apellido:string = "";
  contrasenia:string = "";
  newUser = {
    id: this.userService.lastId(),
    email: '',
    nombre: '',
    apellido: '',
    contrasenia: '',
  };
  users: User[];//ver usuarios existentes
  
  constructor(private userService: UserService,private router:Router) {
    this.users = this.userService.getUsers();//ver usuarios existentes
  }

  addUser(): void {
    let ingresado = this.userService.addUser(this.userService.lastId(), this.email, this.nombre, this.apellido, this.contrasenia);
    if(ingresado){
      this.email= '';
      this.nombre= '';
      this.apellido= '';
      this.contrasenia= '';
    }
  }

  volver(){
    this.router.navigateByUrl("login/user");
  }
  ngOnInit() {
  }

}
