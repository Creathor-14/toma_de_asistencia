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
  email: string = "";
  
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

  async login() {
    const loader = await this.helperService.showLoader("Cargando");
    try {
      if (this.contrasenia.length >= 6 && this.contrasenia.length >= 20) {
        this.helperService.showToast("La contraseña debe tener entre 6 y 20 caracteres.",1000, "danger");
        await loader.dismiss();
      } else {
        const request = await this.auth.signInWithEmailAndPassword(this.email, this.contrasenia);

        this.router.navigateByUrl("tabs/" + this.email);
        await loader.dismiss();
        await this.mostrarMensajeInicioSesionExitoso();
      }
    } catch (error: any) {
      if (error.code == "auth/missing-password") {
        this.helperService.showToast("Debe ingresar una contraseña.",1000, "danger");
        await loader.dismiss();
      } else if (error.code == "auth/invalid-login-credentials") {
        this.helperService.showToast("Usuario inexistente o datos inválidos.",1000, "danger");
        await loader.dismiss();
      } else {
        console.error(error);
        await loader.dismiss();
      }
    }
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
