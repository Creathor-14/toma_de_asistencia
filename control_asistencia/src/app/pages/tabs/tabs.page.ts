import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Geolocation } from '@capacitor/geolocation';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  constructor(private router:Router,private activatedRoute:ActivatedRoute, 
    private helperService:HelperService, private auth:AngularFireAuth) {
    
  }

  ngOnInit() {

    
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
  }
  async location(){
    const l = await Geolocation.getCurrentPosition();
      console.log("Pegar en maps:",l.coords.latitude,l.coords.longitude);
      this.helperService.showAlert(`${l.coords.latitude}, ${l.coords.longitude}`,"Latitud, Longitud");
  }


}
