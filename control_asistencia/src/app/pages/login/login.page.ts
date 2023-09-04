import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email:string = "";
  contrasenia:string = "";

  constructor(private userSercive:UsersService, private router:Router) { }

  login(){
    var respuesta = this.userSercive.verificarUsuario(this.email,this.contrasenia);
    if (respuesta != null){
      console.log(respuesta);
      this.router.navigateByUrl("inicio/"+respuesta);
    }else{
      console.log(respuesta);
    }
    
  }
  recuperar(){
    this.router.navigateByUrl("recuperar");
  }
  
  ngOnInit() {}

}
