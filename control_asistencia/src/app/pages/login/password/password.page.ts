import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {
  id:number = 0;
  contrasenia:string = "";
  constructor(private router:Router, private userSercive:UserService, private activatedRoute:ActivatedRoute) { }
  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  getMensajeBienvenida(): string {
      return `${this.userSercive.getEmail(this.id)}`;
  }
  login(){
    var respuesta = this.userSercive.contraseniaCorrecta(this.id, this.contrasenia);
    if (respuesta!=-1){
      this.router.navigateByUrl("inicio/"+this.id);
    }
  }
  volver(){//pasar el correo por parametro
    this.router.navigateByUrl("login/user");
  }
  recuperar(){
    this.router.navigateByUrl("recuperar01/"+this.id);
  }
}
