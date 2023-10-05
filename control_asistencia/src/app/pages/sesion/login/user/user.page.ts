import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})

export class UserPage implements OnInit {
  constructor(private router:Router, private userService:UserService) { }
  email:string = "";
  
  

  ngOnInit() {
  }
  recuperar(){
    this.router.navigateByUrl("recuperar/-1");
    
  }
  registrarse(){
    this.router.navigateByUrl("registrar");
  }
  siguiente(){
    if(this.email == ""){
      this.userService.showAlert("Ingrese un correo.", "Error de validación");
    }else if(!this.validateEmail(this.email)){
      this.userService.showAlert("Formato de correo invalido.", "Error de validación");
    }else{
      this.router.navigateByUrl("login/password/"+this.email);
    }
    
    /*
    var respuesta = this.userSercive.existeUsuario(this.email);
    if(respuesta!=-1){
      this.router.navigateByUrl("login/password/"+respuesta);
    }
    */
  }
  validateEmail(email: string): boolean {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return pattern.test(email);
  }
}

