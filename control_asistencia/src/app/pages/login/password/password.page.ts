import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {
  email:string = "";
  contrasenia:string = "";
  constructor(private router:Router, private userSercive:UserService) { }
  volver(){//pasar el correo por parametro
    this.router.navigateByUrl("login/user");
  }
  recuperar(){
    this.router.navigateByUrl("recuperar");
  }
  getMensajeBienvenida(): string {
      return `${this.userSercive.getEmailUsuarioActual()}`;
  }
  login(){

    var respuesta = this.userSercive.contraseniaCorrecta(this.contrasenia);
    if (respuesta){
      this.router.navigateByUrl("inicio/"+this.email);
    }
    
  }
  ngOnInit() {
  }

}
