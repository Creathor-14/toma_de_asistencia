import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
  
})
export class RegistrarPage implements OnInit {
  formReg: FormGroup;

  
  constructor(private userService: UserService,private router:Router) {
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

    this.userService.register({email,password})
      .then(response => {
        let ingresado = this.userService.addUser(this.userService.lastId(), email, nombre, apellido, password);
        console.log(response);
      })
      .catch(error => console.log(error));
  }

}
