import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Asistencia } from 'src/app/models/asistencia';
import { HelperService } from 'src/app/services/helper.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-resul-qr',
  templateUrl: './resul-qr.page.html',
  styleUrls: ['./resul-qr.page.scss'],
})
export class ResulQrPage implements OnInit {
  email:any;
  @Input() dataQr:any;
  dataAsistencia:any;

  nombre:string = '';
  constructor(private modalController:ModalController, private router:Router, 
    private userService:UserService, private helperService:HelperService,
    private storageService:StorageService, private auth: AngularFireAuth) { }

  ngOnInit() {
    this.getUserEmail();
    console.log("data-Modal",JSON.parse(this.dataQr));
    this.dataAsistencia = JSON.parse(this.dataQr);
  }
  async getUserEmail(){
    let user = await this.auth.currentUser;
    if(user){
      this.email =  user.email;
    }
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
      let asistencia:Asistencia = this.dataAsistencia;
      
      this.storageService.addAsistencia(asistencia,this.email);
      this.modalController.dismiss();
      
      this.router.navigateByUrl("tabs/"+this.email+"/asistencia/visualizar");
    }
  }
}
