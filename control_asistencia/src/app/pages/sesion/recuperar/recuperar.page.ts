import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage {
  id:number=-1;
  email: string = '';
  correoExist:boolean = false;

  constructor(private userService: UserService, private router: Router, private activatedRoute:ActivatedRoute) {}

  ngOnInit(){
    this.id = this.activatedRoute.snapshot.params['id'];
    if(this.id!=-1){
      this.correoExist = true;
      this.email = this.userService.getEmail(this.id);
      console.log("correo:",this.email);
    }
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
