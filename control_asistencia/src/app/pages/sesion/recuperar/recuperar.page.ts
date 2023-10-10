import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage {
  
  email: string = this.userService.getActualEmail();

  constructor(private userService: UserService, private router: Router, private activatedRoute:ActivatedRoute, private helperService:HelperService) {}

  ngOnInit(){
    this.email=this.userService.getActualEmail();
  }
  async recuperarContrasenia() {
    if (this.email.trim() === '') {
      // Valida que se haya ingresado un email
      await this.helperService.showAlert('Debe ingresar un email.', 'Advertencia');
      return;
    }
    const contraseña = this.userService.recuperarContrasenia(this.email);
    if (contraseña !== null) {
      await this.helperService.showAlert(`La contraseña para el email ${this.email} es: ${contraseña}`, 'Correcto');
    } else {
      await this.helperService.showAlert('Email no registrado', 'Advertencia');
    }
  }
  volver(){
    this.router.navigateByUrl("login/user");
  }
  
}
