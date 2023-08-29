import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage {
  email: string = '';
  constructor(private usersService: UsersService) {}
  async recuperarContrasenia() {
    if (this.email.trim() === '') {
      // Valida que se haya ingresado un email
      await this.usersService.showAlert('Debe ingresar un email.', 'Advertencia');
      return;
    }
    const contraseña = this.usersService.recuperarContrasenia(this.email);
    if (contraseña !== null) {
      await this.usersService.showAlert(`La contraseña para el email ${this.email} es: ${contraseña}`, 'Correcto');
    } else {
      await this.usersService.showAlert('Email no registrado', 'Advertencia');
    }
  }
}
