import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
  
})
export class RegistrarPage implements OnInit {
  formReg: FormGroup;

  
  constructor(private userService: UserService,private router:Router, private auth: AngularFireAuth, private helperService:HelperService) {
    this.formReg = new FormGroup({
      email: new FormControl(),
      nombre: new FormControl(),
      apellido: new FormControl(),
      password: new FormControl(),
    })
  }

  volver(){
    this.router.navigateByUrl("login/user");
  }
  ngOnInit() {
  }
  onSubmit(){
    const email = this.formReg.value.email;
    const nombre = this.formReg.value.nombre;
    const apellido = this.formReg.value.apellido;
    const password = this.formReg.value.password;
    if (nombre == null) {
      this.helperService.showAlert("Debe ingresar un nombre.", "Advertencia");
    }
    else if (apellido == null) {
      this.helperService.showAlert("Debe ingresar un apellido.", "Advertencia");
    }else{
      try {
        this.auth.createUserWithEmailAndPassword(email, password)
        .then(response => {
          this.helperService.showAlert("Usuario registrado correctamente.","Succes");
          this.userService.addUser(email, nombre, apellido, password);
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
        });
      } catch (error) {}
    }
  }
    
     
  


}