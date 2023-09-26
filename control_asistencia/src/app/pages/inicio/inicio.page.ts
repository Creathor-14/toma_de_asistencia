import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {
  id:number=0;
  constructor(private userService: UserService,private router:Router, private activatedRoute:ActivatedRoute) {}
  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
  }
  getMensajeBienvenida(): string {
      return `Bienvenido ${this.userService.getNombre(this.id)} ${this.userService.getApellido(this.id)}`;
  }



  perfil(){
    this.router.navigateByUrl("perfil/ver/"+this.id);
  }
  leerQr(){
    this.router.navigateByUrl("leer-qr/"+this.id);
  }
  verasistencia(){
    this.router.navigateByUrl("ver-asistencia/"+this.id);
  }


  async cerrarSesion(){
    var confirmar = await this.userService.showConfirm("Desea cerrar la sesión actual?","Cancelar","Confirmar")
    console.log(confirmar);
    if (confirmar) {
      this.router.navigateByUrl("login/user");
    }
  }

}