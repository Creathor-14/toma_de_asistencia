import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {
  id:number=this.userService.getActualId();
  constructor(private router:Router, private userService:UserService) {}
  ngOnInit() {
    this.id = this.userService.getActualId();
  }

  cancelar(){
    this.router.navigateByUrl("tabs/"+this.id);
  }
  async registrarAsistencia(){
    var confirmar = await this.userService.showConfirm("¿Desea registrar su asistencia?","Cancelar","Confirmar");
    if(confirmar){
      this.userService.showAlert("Asistencia registrada.", "Mensaje");
      this.router.navigateByUrl("tabs/"+this.id+"/asistencia/visualizar");
    }
  }
}
