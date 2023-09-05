import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leer-qr',
  templateUrl: './leer-qr.page.html',
  styleUrls: ['./leer-qr.page.scss'],
})
export class LeerQrPage implements OnInit {

  constructor(private router:Router) { }
  volver(){
    this.router.navigateByUrl("inicio/"+1);
  }
  registrar_asistencia(){
    this.router.navigateByUrl("registrar-asistencia");
  }
  ngOnInit() {
  }

}
