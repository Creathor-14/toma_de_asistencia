import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {
  email:string = this.userService.getActualEmail();
  nombre:string = "";
  apellido:string = "";
  contrasenia:string = "";
  constructor(private router:Router, private userService: UserService, private activatedRoute:ActivatedRoute,
    private helperService:HelperService) { }
  ngOnInit() {
    this.nombre = this.userService.getNombre(this.email);
    this.apellido = this.userService.getApellido(this.email);
    this.contrasenia = this.userService.getContrasenia(this.email);
  }

  getNombre(): string {
    return `${this.userService.getNombre(this.email)}`;
  }
  getApellido(): string {
    return `${this.userService.getApellido(this.email)}`;
  }
  getEmail(): string {
    return `${this.email}`;
  }
  getContrasenia(): string {
    return `${this.userService.getContrasenia(this.email)}`;
  }


  async actualizar(){
    var confirmar = await this.helperService.showConfirm("¿Desea modificar usuario?","Cancelar","Aceptar")
    if(confirmar){
      this.userService.updateUser(this.email, this.nombre, this.apellido, this.contrasenia);
    }
  }
  volver(){
    this.router.navigateByUrl(`tabs/${this.email}/perfil/visualizar`);
  }
}
