import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage {
  email: string = '';
  constructor(private userService: UserService, private router: Router ) {

  }
  async recuperarContrasenia() {
    if (this.email.trim() === '') {
      // Valida que se haya ingresado un email
      await this.userService.showAlert('Debe ingresar un email.', 'Advertencia');
      return;
    }
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
