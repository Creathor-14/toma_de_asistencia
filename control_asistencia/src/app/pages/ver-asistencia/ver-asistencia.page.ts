import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ver-asistencia',
  templateUrl: './ver-asistencia.page.html',
  styleUrls: ['./ver-asistencia.page.scss'],
})
export class VerAsistenciaPage implements OnInit {
  id:number=this.userService.getActualId();
  constructor(private router:Router, private activatedRoute:ActivatedRoute, private userService:UserService) {}
  ngOnInit() {
    this.id = this.userService.getActualId();
  }
  volver(){
    this.router.navigateByUrl("inicio/"+this.id);
  }

}
