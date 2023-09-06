import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-asistencia',
  templateUrl: './ver-asistencia.page.html',
  styleUrls: ['./ver-asistencia.page.scss'],
})
export class VerAsistenciaPage implements OnInit {

  constructor(private router:Router) { }
  volver(){
    this.router.navigateByUrl("inicio/"+1);
  }
  ngOnInit() {
  }

}
