import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-asistencia',
  templateUrl: './registrar-asistencia.page.html',
  styleUrls: ['./registrar-asistencia.page.scss'],
})
export class RegistrarAsistenciaPage implements OnInit {

  constructor(private router:Router) { }
  volver(){
    this.router.navigateByUrl("leer-qr");
  }
  cancelar(){
    this.router.navigateByUrl("inicio/"+1);
  }
  ngOnInit() {
  }

}
