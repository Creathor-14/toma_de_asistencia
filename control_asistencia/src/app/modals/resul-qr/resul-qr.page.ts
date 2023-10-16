import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-resul-qr',
  templateUrl: './resul-qr.page.html',
  styleUrls: ['./resul-qr.page.scss'],
})
export class ResulQrPage implements OnInit {
  @Input() dataQr:any;
  dataAsistencia:any;

  nombre:string = '';
  constructor(private modalController:ModalController) { }

  ngOnInit() {
    console.log("data-Modal",JSON.parse(this.dataQr));
    this.dataAsistencia = JSON.parse(this.dataQr);
  }


  close(){
    this.modalController.dismiss();
  }
}
