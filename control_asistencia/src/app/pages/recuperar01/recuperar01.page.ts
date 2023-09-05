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
    const contraseña = this.userService.recuperarContrasenia(this.email);
    if (contraseña !== null) {
      await this.userService.showAlert(`La contraseña para el email ${this.email} es: ${contraseña}`, 'Correcto');
    } else {
      await this.userService.showAlert('Email no registrado', 'Advertencia');
    }
  }


  volver(){
    this.router.navigateByUrl("login/user");
  }


  
  
}

