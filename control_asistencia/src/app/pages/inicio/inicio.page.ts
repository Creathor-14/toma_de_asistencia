import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {

  constructor(private usersService: UsersService,private activatedRoute:ActivatedRoute) {}

  getMensajeBienvenida(): string {
    if (this.usersService.autenticado) {
      return `Bienvenido ${this.usersService.getName()}`;
    }
    
    console.log(this.usersService.autenticado)
    return 'Bienvenido Invitado';
    
  }
}