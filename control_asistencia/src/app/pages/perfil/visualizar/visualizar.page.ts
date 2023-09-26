import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.page.html',
  styleUrls: ['./visualizar.page.scss'],
  animations: [
    trigger('fadeInOut',[
      state('void', style({ opacity: 0})),
      state('*', style({ opacity: 1})),
      transition('void => *', animate('1000ms ease-in')),
      transition('* => void', animate('1000ms ease-out')),
    ])
  ],
})
export class VisualizarPage implements OnInit {
  loading = true;
  id:number = 0;

  constructor(private router:Router, private userService: UserService, private activatedRoute:ActivatedRoute) { }
  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    setTimeout(() => {
      this.loading = false;
    },2000);
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
  editar(){
    this.router.navigateByUrl("perfil/editar/"+this.id);
  }
  volver(){
    this.router.navigateByUrl("inicio/"+this.id);
  }
  eliminar(){
    this.userService.deleteUser(this.id);
    this.router.navigateByUrl("login/user");
  }

}
