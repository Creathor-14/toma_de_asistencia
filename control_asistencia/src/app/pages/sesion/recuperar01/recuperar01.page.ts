import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-recuperar01',
  templateUrl: './recuperar01.page.html',
  styleUrls: ['./recuperar01.page.scss'],
})

export class Recuperar01Page {
  id:number = 0;
  constructor(private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute ) {}
  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
  }
  
  async recuperarContrasenia() {
    
    await this.userService.showAlert(`La contraseña para el email ${this.userService.getEmail(this.id)} es: ${this.userService.getContrasenia(this.id)}`, 'Correcto');
    
  }
  


  volver(){
    this.router.navigateByUrl("login/user");
  }


  
  
}

