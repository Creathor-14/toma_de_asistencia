import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {
  constructor(private usersService: UsersService) {}

  getMensajeBienvenida(): string {
    if (this.usersService.usuarioAutenticado) {
      return `Bienvenido ${this.usersService.usuarioAutenticado.name}`;
    }
    return 'Bienvenido Invitado';
  }
}