import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { HelperService } from 'src/app/services/helper.service';



@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  email:string=this.userService.getActualEmail();
  constructor(private userService: UserService,private router:Router,private activatedRoute:ActivatedRoute, private helperService: HelperService) {
    
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

  cerrarSesion() {
    this.helperService.showToast("¡Sesión cerrada con éxito!", 1000); 
    this.router.navigateByUrl('/login');
  }



  

  
 


}
