import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { UserService } from 'src/app/services/user.service';
import { StorageService } from 'src/app/services/storage.service';



@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {
  email: string = this.userService.getActualEmail();
  
  contrasenia: string = "";

  constructor(
    private router: Router,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private auth: AngularFireAuth,
    private helperService: HelperService,
    private storageService:StorageService
  ) {}

  ngOnInit() {
    this.email = this.activatedRoute.snapshot.params['email'];
  }

  getMensajeBienvenida(): string {
    return this.email;
  }

  login() {
    this.auth
      .signInWithEmailAndPassword(this.email, this.contrasenia)
      .then((response) => {
        this.mostrarMensajeInicioSesionExitoso();
        this.router.navigateByUrl("tabs/" + this.email);
        console.log(response);
      })
      .catch((error) => {
        if (error.code == "auth/missing-password") {
          this.helperService.showAlert("Ingrese una contraseña.", "Error de validación");
        } else if (error.code == "auth/invalid-login-credentials") {
          this.helperService.showAlert(
            "Usuario inexistente o datos inválidos.",
            "Error de validación"
          );
        } else {
          console.error(error);
        }
      });
  }

  mostrarMensajeInicioSesionExitoso() {
    
    const usuario = this.email;
    const mensaje = `¡Bienvenido, ${usuario} !`;
    this.helperService.showAlert(mensaje, "Inicio de Sesión Exitoso");
  }

  volver() {
    this.router.navigateByUrl("login/user");
  }

  recuperar() {
    this.router.navigateByUrl("recuperar/" + this.email);
  }
}
