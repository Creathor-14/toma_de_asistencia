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
  email:string=this.userService.getActualEmail();

  constructor(private router:Router, private userService: UserService, private activatedRoute:ActivatedRoute) {

   }
  ngOnInit() {
    this.email=this.userService.getActualEmail();
    
    setTimeout(() => {
      this.loading = false;
    },2000);
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
  editar(){
    this.router.navigateByUrl(`tabs/${this.email}/perfil/editar`);
  }

  eliminar(){
    this.userService.deleteUser(this.email);
    this.router.navigateByUrl("login/user");
  }

}
