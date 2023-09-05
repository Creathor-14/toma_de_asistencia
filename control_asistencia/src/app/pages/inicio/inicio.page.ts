import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {

  constructor(private userService: UserService,private activatedRoute:ActivatedRoute) {}

  getMensajeBienvenida(): string {
      return `Bienvenido ${this.userService.getNombreUsuarioActual()}`;
  }
}