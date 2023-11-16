import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
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
        this.helperService.showAlert("La contraseña debe tener entre 5 y 20 caracteres.", "Error de validación");
        await loader.dismiss();
      } else {
        const request = await this.auth.signInWithEmailAndPassword(this.email, this.contrasenia);
        this.router.navigateByUrl("tabs/" + this.email);
        await loader.dismiss();
        await this.mostrarMensajeInicioSesionExitoso();
      }
    } catch (error: any) {
      if (error.code == "auth/missing-password") {
        this.helperService.showAlert("Ingrese una contraseña.", "Error de validación");
        await loader.dismiss();
      } else if (error.code == "auth/invalid-login-credentials") {
        this.helperService.showAlert("Usuario inexistente o datos inválidos.", "Error de validación");
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
