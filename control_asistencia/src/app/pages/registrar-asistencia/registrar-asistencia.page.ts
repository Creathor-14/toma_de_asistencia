import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-registrar-asistencia',
  templateUrl: './registrar-asistencia.page.html',
  styleUrls: ['./registrar-asistencia.page.scss'],
})
export class RegistrarAsistenciaPage implements OnInit {
  id:number=0;
  constructor(private router:Router, private activatedRoute:ActivatedRoute) {}
  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
  }
  volver(){
    this.router.navigateByUrl("leer-qr/"+this.id);
  }
  cancelar(){
    this.router.navigateByUrl("inicio/"+this.id);
  }


}
