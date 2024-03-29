import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { StorageService } from 'src/app/services/storage.service';
import { ApisService } from 'src/app/services/apis.service';
import { Region } from 'src/app/models/region';
import { User } from 'src/app/models/user.model';
@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {
  email: string = "";
  nombre: string = "";
  apellido: string = "";
  region: string = "";
  comuna: string = "";
  password: string ="";
  constructor(private router:Router, private auth: AngularFireAuth, private helperService:HelperService,
    private storageService:StorageService, private apisService:ApisService) {
  }
  volver(){
    this.router.navigateByUrl("login/user");
  }
  ngOnInit() {
    this.cargarRegion();
  }
  addUser() {
    if (!this.email) {
      this.helperService.showToast("Debe ingresar un correo.",1000, "danger"); 
    } else if (!this.email) {
      this.helperService.showToast("El formato del correo no es válido.",1000, "danger");
    } else if (!this.nombre) {
      this.helperService.showToast("Debe ingresar un nombre.",1000, "danger");
    } else if (!/^[A-Za-z]+$/.test(this.nombre)) {
      this.helperService.showToast("El nombre solo debe contener letras.",1000, "danger");
    } else if (!this.apellido) {
      this.helperService.showToast("Debe ingresar un apellido.",1000, "danger");
    } else if (!/^[A-Za-z]+$/.test(this.apellido)) {
      this.helperService.showToast("El apellido solo debe contener letras.",1000, "danger");
    } else if (this.regionSel === -1) {
      this.helperService.showToast("Debe ingresar una región.",1000, "danger");
    } else if (this.comunaSel === -1) {
      this.helperService.showToast("Debe ingresar una comuna.",1000, "danger");
    } else if (!this.password) {
      this.helperService.showToast("Debe ingresar una contraseña.",1000, "danger");
    } else if (this.password.length < 6 || this.password.length > 20) {
      this.helperService.showToast("La contraseña debe tener entre 6 y 20 caracteres.",1000, "danger");
    }else {
      this.region = this.apisService.getNombreUbicacion(this.regionSel, this.regiones);
      this.comuna = this.apisService.getNombreUbicacion(this.comunaSel, this.comunas);
      this.helperService.showLoader("Cargando").then(loader => {
        try {
          this.auth.createUserWithEmailAndPassword(this.email, this.password)
            .then(response => {
              this.helperService.showAlert("Usuario registrado correctamente.", "Éxito");
              let user: User = {
                email: this.email,
                nombre: this.nombre,
                apellido: this.apellido,
                region: this.region,
                comuna: this.comuna,
                contrasenia: this.password,
                asistencias: []
              };
              this.storageService.guardarUser(user);
              this.router.navigateByUrl("login/user");
            })
            .catch(error => {
              if (error.code == 'auth/invalid-email') {
                this.helperService.showAlert("El formato del correo no es válido.", "Error de validación");
              } else if (error.code == 'auth/weak-password') {
                this.helperService.showAlert("La contraseña debe tener un mínimo de 6 caracteres.", "Error de validación");
              } else if (error.code == 'auth/email-already-in-use') {
                this.helperService.showAlert("Este correo ya está en uso.", "Error de validación");
              } else if (error.code == 'auth/admin-restricted-operation') {
                this.helperService.showAlert("Ingrese un correo.", "Error de validación");
              } else if (error.code == 'auth/missing-password') {
                this.helperService.showAlert("Ingrese una contraseña.", "Error de validación");
              } else if (error.code == "auth/network-request-failed") {
                this.helperService.showAlert("Problema de conectividad con los servidores, verifique su conexión a Internet.", "Error de red");
              } else {
                this.helperService.showAlert(error, "Error");
                console.error(error);
              }
            })
            .finally(() => {
              loader.dismiss();
            });
        } catch (error) {}
      });
    }
  }
  regiones:Region[]=[];
  comunas:any[]=[];
  regionSel:number = -1;
  comunaSel:number = -1;
  async cargarComuna(){
    try {
      const req = await this.apisService.getComuna(this.regionSel);
      this.comunas = req.data;
      this.region= this.comunas[this.regionSel].nombre;
      
    } catch (error:any) {
      console.log("ERROR", error);
      this.helperService.showAlert(error.error.msg,"Error")
    }
  }
  async cargarRegion(){
    try {
      const req = await this.apisService.getRegion();
      this.regiones = req.data;
    } catch (error) {
    }
  }
}