import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {

  constructor(private userService: UserService,private router:Router) {}

  getMensajeBienvenida(): string {
      return `Bienvenido ${this.userService.getNombreUsuarioActual()}`;
  }
  cerrarSesion(){
    this.router.navigateByUrl("login/user");
  }

  verasistencia(){
    this.router.navigateByUrl("ver-asistencia");
  }
  perfil(){
    this.router.navigateByUrl("perfil/"+1);
  }
  leerQr(){
    this.router.navigateByUrl("leer-qr");
  }
}