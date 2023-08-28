import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email:string = "";
  contrasenia:string = "";

  constructor(private userSercive:UsersService) { }

  login(){
    var respuesta = this.userSercive.verificarUsuario(this.email,this.contrasenia);
    console.log(respuesta)
  }

  ngOnInit() {}

}
