import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

import { BarcodeScanner } from 'capacitor-barcode-scanner';
import { ResulQrPage } from 'src/app/modals/resul-qr/resul-qr.page';
import { HelperService } from 'src/app/services/helper.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-leer-qr',
  templateUrl: './leer-qr.page.html',
  styleUrls: ['./leer-qr.page.scss'],
})
export class LeerQrPage implements OnInit {
  email:any;
  constructor(private router:Router, private userService:UserService, 
    private helperService:HelperService, private angularFireAuth:AngularFireAuth,
    private auth: AngularFireAuth) {}
  ngOnInit() {
    this.getUserEmail()
  }

  async getUserEmail(){
    let user = await this.auth.currentUser;
    if(user){
      this.email =  user.email;
    }
  }

  registrar_asistencia(){
    this.router.navigateByUrl(`tabs/${this.email}/asistencia/registrar`);
  }
  resultQr:any ='';
  async scan(){
    var u = await this.angularFireAuth.currentUser;
    console.log(u?.email);
    this.resultQr  = (await BarcodeScanner.scan()).code;
    console.log("obj QR",JSON.parse(this.resultQr),"algo xd");
    await this.modalResultQr();
  }

  async modalResultQr(){
    var qr = [];
    qr.push(this.resultQr);
    const parametros={dataQr: this.resultQr}
    await this.helperService.showModal(ResulQrPage,parametros,false);
  }

}
