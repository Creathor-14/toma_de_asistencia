import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

import { ApisService } from 'src/app/services/apis.service';
import { Region } from 'src/app/models/region';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {
  email: string ="";
  nombre: string ="";
  apellido: string ="";
  password: string ="";

  constructor(private userService: UserService,private router:Router, private auth: AngularFireAuth, private helperService:HelperService,
    private storageService:StorageService, private apisService:ApisService) {
    
  }

  volver(){
    this.router.navigateByUrl("login/user");
  }
  ngOnInit() {
    this.cargarRegion();
  }

  
  addUser(){
    if (this.nombre == null) {
      this.helperService.showAlert("Debe ingresar un nombre.", "Advertencia");
    } else if (this.apellido == null) {
      this.helperService.showAlert("Debe ingresar un apellido.", "Advertencia");
    } else if(this.regionSel == -1){
      this.helperService.showAlert("Debe ingresar una region.", "Advertencia");
    } else if(this.comunaSel == -1){
      this.helperService.showAlert("Debe ingresar una comuna.", "Advertencia");
    } else {
      this.helperService.showLoader("Cargando").then(loader => {
        try {
          this.auth.createUserWithEmailAndPassword(this.email, this.password)
            .then(response => {
              this.helperService.showAlert("Usuario registrado correctamente.", "Success");
              let user:User = { email:this.email, nombre:this.nombre, apellido:this.apellido, contrasenia:this.password,asistencias:[] };
              this.storageService.guardarUser(user);
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
              } else {
                this.helperService.showAlert(error, "Error");
                console.log(error);
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
      console.log(this.regionSel);
      const req = await this.apisService.getComuna(this.regionSel);
      this.comunas = req.data;

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