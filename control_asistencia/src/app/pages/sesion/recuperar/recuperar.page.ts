import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage {
  
  email: string = "";

  constructor( private router: Router, private activatedRoute:ActivatedRoute, 
    private angularFireAuth: AngularFireAuth, private helperService:HelperService) {}

  ngOnInit(){
    let e = this.activatedRoute.snapshot.params['email'];
    if(e != -1){
      this.email = e;
    }
    
  }

  volver(){
    this.router.navigateByUrl("login/user");
  }
  resetPassword(): void { 
    if (this.email === "") {
      this.helperService.showAlert("Ingrese un correo.", "Error de validación");
    } else if (this.email.length > 50) {
      this.helperService.showAlert("El correo electrónico no debe superar los 50 caracteres.", "Error de validación");
    } 
    else if(!this.validateEmail(this.email)){
      this.helperService.showAlert("Formato de correo invalido.", "Error de validación");
    }else{
      this.angularFireAuth.sendPasswordResetEmail(this.email)
      .then(() => {
        this.helperService.showAlert("Revise su correo electronico.", "Success");
        this.router.navigateByUrl("login/user");
      })
      .catch((error:any) => {
        this.helperService.showAlert("Error.", "Error");
      });
    }
    
  }
  validateEmail(email: string): boolean {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return pattern.test(email);
  }
  
}
