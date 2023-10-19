import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { HelperService } from 'src/app/services/helper.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';



@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  email:string=this.userService.getActualEmail();
  constructor(private userService: UserService,private router:Router,private activatedRoute:ActivatedRoute, 
    private helperService:HelperService, private auth:AngularFireAuth) {
    
  }

  ngOnInit() {
    this.email=this.userService.getActualEmail();
    
  }
  getMensajeBienvenida(): string {
    return `${this.userService.getNombre(this.email)} ${this.userService.getApellido(this.email)}`;
  } 
  redirectToLogin() {

    this.router.navigate(['login/user']); 
  }

  async cerrarSesion() {
    var corfirmar = await this.helperService.showConfirm("Desea cerrar la sesión actual?","Cancelar","Confirmar")
    if (corfirmar == true) {
      await this.auth.signOut();
      this.helperService.showToast("¡Sesión cerrada con éxito!", 1000,"success"); 
      await this.router.navigate(['login/user']);
      
    }
    
    //this.router.navigate(['login/user']); 
  }



  

  
 


}
