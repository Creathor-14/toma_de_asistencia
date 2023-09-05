import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-recuperar01',
  templateUrl: './recuperar01.page.html',
  styleUrls: ['./recuperar01.page.scss'],
})

export class Recuperar01Page {
  email: string = '';
  constructor(private userService: UserService, private router: Router ) {

  }
  
  async recuperarContrasenia() {
    
    await this.userService.showAlert(`La contraseña para el email ${this.userService.getEmailUsuarioActual()} es: ${this.userService.getContraseniaUsuarioActual()}`, 'Correcto');
    
  }
  


  volver(){
    this.router.navigateByUrl("login/user");
  }


  
  
}

