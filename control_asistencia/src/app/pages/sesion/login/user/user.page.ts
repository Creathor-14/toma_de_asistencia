import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';



@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})

export class UserPage implements OnInit {
  constructor(private router:Router, private helperService:HelperService) { }
  email:string = "";
  
  

  ngOnInit() {
  }
  recuperar(){
    this.router.navigateByUrl("recuperar/-1");
  }
  registrarse(){
    this.router.navigateByUrl("registrar");
  }

  siguiente() {
    if (this.email === "") {
      this.helperService.showToast("Debe ingresar un correo.",1000, "danger"); 
    } else if (this.email.length > 50) {
      this.helperService.showToast("El correo electrónico no debe superar los 50 caracteres.",1000, "danger"); 
    } 
    else if(!this.validateEmail(this.email)){
      this.helperService.showToast("Formato de correo invalido.",1000, "danger"); 
    }else{
      //this.userService.setActualEmail(this.email);
      this.router.navigateByUrl("login/password/"+this.email);
      this.helperService.showToast("¡Ingrese su clave!", 1000, "succes"); 
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

