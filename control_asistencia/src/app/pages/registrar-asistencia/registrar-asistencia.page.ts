import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registrar-asistencia',
  templateUrl: './registrar-asistencia.page.html',
  styleUrls: ['./registrar-asistencia.page.scss'],
})
export class RegistrarAsistenciaPage implements OnInit {
  id:number=0;
  constructor(private router:Router, private activatedRoute:ActivatedRoute, private userService:UserService) {}
  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
  }
  volver(){
    this.router.navigateByUrl("leer-qr/"+this.id);
  }
  cancelar(){
    this.router.navigateByUrl("inicio/"+this.id);
  }
  async registrarAsistencia(){
    var confirmar = await this.userService.showConfirm("¿Desea registrar su asistencia?","Cancelar","Confirmar");
    if(confirmar){
      this.userService.showAlert("Asistencia registrada.", "Mensaje");
      this.router.navigateByUrl("inicio/"+this.id);
    }
  }


}
