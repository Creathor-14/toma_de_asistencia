import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})

export class UserPage implements OnInit {
  constructor(private router:Router, private userSercive:UserService) { }
  email:string = "";
  
  

  ngOnInit() {
  }
  recuperar(){
    this.router.navigateByUrl("recuperar/-1");
    
  }
  registrarse(){
    this.router.navigateByUrl("registrar");
  }
  siguiente(){
    var respuesta = this.userSercive.existeUsuario(this.email);
    if(respuesta!=-1){
      this.router.navigateByUrl("login/password/"+respuesta);
    }
    
  }
}

