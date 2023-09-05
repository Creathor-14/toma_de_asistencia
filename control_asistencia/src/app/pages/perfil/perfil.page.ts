import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {


  constructor(private router:Router, private userService: UserService) { }
  getNombre(): string {
    return `${this.userService.getNombreUsuarioActual()}`;
  }
  getApellido(): string {
    return `apellido: ${this.userService.getNombreUsuarioActual()}`;
  }
  getEmail(): string {
    return `${this.userService.getEmailUsuarioActual()}`;
  }
  getContrasenia(): string {
    return `contraseña: ${this.userService.getEmailUsuarioActual()}`;
  }
  volver(){
    this.router.navigateByUrl("inicio/");
  }
  ngOnInit() {
  }

}
