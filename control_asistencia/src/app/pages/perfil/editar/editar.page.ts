import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {
  id:number = 0;
  nombre:string = this.userService.getNombre(this.id);
  apellido:string = this.userService.getApellido(this.id);
  contrasenia:string = this.userService.getContrasenia(this.id);
  constructor(private router:Router, private userService: UserService, private activatedRoute:ActivatedRoute) { }
  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  getNombre(): string {
    return `${this.userService.getNombre(this.id)}`;
  }
  getApellido(): string {
    return `${this.userService.getApellido(this.id)}`;
  }
  getEmail(): string {
    return `${this.userService.getEmail(this.id)}`;
  }
  getContrasenia(): string {
    return `${this.userService.getContrasenia(this.id)}`;
  }


  actualizar(){
    this.userService.updateUser(this.id, this.nombre, this.apellido, this.contrasenia);
  }
  volver(){
    this.router.navigateByUrl("perfil/"+this.id);
  }
}
