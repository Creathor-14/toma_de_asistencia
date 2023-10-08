import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {
  email:string=this.userService.getActualEmail();
  contrasenia:string = "";

  constructor(private router:Router, private userService:UserService, private activatedRoute:ActivatedRoute, 
    private auth: AngularFireAuth, private helperService:HelperService) { }
  ngOnInit() {
    //this.id = this.activatedRoute.snapshot.params['id'];
    //this.id = this.userService.getActualId();
    this.email = this.activatedRoute.snapshot.params['email'];
  }

  getMensajeBienvenida(): string {
    //return `${this.userService.getEmail(this.id)}`;
    return this.email;
  }
  login(){
    this.auth.signInWithEmailAndPassword(this.email,this.contrasenia)
    .then(response => {
      this.helperService.showAlert("User successfully Logged.","Succes");
      this.router.navigateByUrl("tabs/"+this.email);
      console.log(response);
    })
    .catch(error => {

      if(error.code == "auth/missing-password"){
        this.helperService.showAlert("Ingrese una contraseña.", "Error de validación");
      }else if(error.code == "auth/invalid-login-credentials"){
        this.helperService.showAlert("Usuario inexistente o datos invalidos.", "Error de validación");
        //this.router.navigateByUrl("login/user");
      }else{
        console.log(error)
      }
    });
    /*
    var respuesta = this.userService.contraseniaCorrecta(this.id, this.contrasenia);
    if (respuesta!=-1){
      this.router.navigateByUrl("tabs/"+this.id);
    }*/
  }
  volver(){//pasar el correo por parametro
    this.router.navigateByUrl("login/user");
  }
  recuperar(){
    this.router.navigateByUrl("recuperar/"+this.email);
  }
}
