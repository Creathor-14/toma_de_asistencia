import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {
  email:string=this.userService.getActualEmail();
  constructor(private router:Router, private userService:UserService, private helperService:HelperService) {}
  ngOnInit() {
    this.email = this.userService.getActualEmail();
  }

  cancelar(){
    this.router.navigateByUrl(`tabs/${this.email}/leer-qr`);
    alert("jajaj");
  }
  async registrarAsistencia(){
    var confirmar = await this.helperService.showConfirm("¿Desea registrar su asistencia?","Cancelar","Confirmar");
    if(confirmar){
      this.helperService.showAlert("Asistencia registrada.", "Mensaje");
      this.router.navigateByUrl("tabs/"+this.email+"/asistencia/visualizar");
    }
  }
}
