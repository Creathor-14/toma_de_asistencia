import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { HelperService } from 'src/app/services/helper.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-resul-qr',
  templateUrl: './resul-qr.page.html',
  styleUrls: ['./resul-qr.page.scss'],
})
export class ResulQrPage implements OnInit {
  email:string=this.userService.getActualEmail();
  @Input() dataQr:any;
  dataAsistencia:any;

  nombre:string = '';
  constructor(private modalController:ModalController, private router:Router, 
    private userService:UserService, private helperService:HelperService) { }

  ngOnInit() {
    console.log("data-Modal",JSON.parse(this.dataQr));
    console.log(JSON.parse(this.dataQr).asignatura);
    this.dataAsistencia = JSON.parse(this.dataQr);
    this.email = this.userService.getActualEmail();
  }


  close(){
    this.modalController.dismiss();
  }
  cancelar(){
    this.modalController.dismiss();
  }
  async registrarAsistencia(){
    var confirmar = await this.helperService.showConfirm("¿Desea registrar su asistencia?","Cancelar","Confirmar");
    if(confirmar){
      this.modalController.dismiss();
      this.helperService.showAlert("Asistencia registrada.", "Mensaje");
      this.router.navigateByUrl("tabs/"+this.email+"/asistencia/visualizar");
    }
  }
}
