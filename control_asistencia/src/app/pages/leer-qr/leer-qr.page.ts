import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-leer-qr',
  templateUrl: './leer-qr.page.html',
  styleUrls: ['./leer-qr.page.scss'],
})
export class LeerQrPage implements OnInit {
  id:number=0;
  constructor(private router:Router, private activatedRoute:ActivatedRoute) {}
  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
  }
  volver(){
    this.router.navigateByUrl("inicio/"+this.id);
  }
  registrar_asistencia(){
    this.router.navigateByUrl("registrar-asistencia");
  }


}
