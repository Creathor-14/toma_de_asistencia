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
  newUser = {
    id: this.userService.lastId(),
    email: '',
    nombre: '',
    contrasenia: '',
  };
  users: User[];
  
  constructor(private userService: UserService,private router:Router) {
    this.users = this.userService.getUsers();
  }

  addUser(): void {
    this.userService.addUser(this.newUser);
    this.newUser = new User(this.userService.lastId(), '', '', ''); // Reiniciar el usuario
  }
  defectUseres():void{
    this.userService.addUser({id: 0,email: 'th.quiroga@duocuc.cl',nombre: 'Thomas',contrasenia: '123',});
    this.userService.addUser({ id: 1, email: "prueba@duocuc.cl",nombre: 'Martin', contrasenia: "prueba"});
    this.userService.addUser({ id: 2, email: 'a', nombre: "a", contrasenia: "a"});
  }
  volver(){
    this.router.navigateByUrl("login/user");
  }
  ngOnInit() {
  }

}
