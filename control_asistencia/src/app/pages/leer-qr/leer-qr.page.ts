import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-leer-qr',
  templateUrl: './leer-qr.page.html',
  styleUrls: ['./leer-qr.page.scss'],
})
export class LeerQrPage implements OnInit {
  id:number=this.userService.getActualId();
  constructor(private router:Router, private userService:UserService) {}
  ngOnInit() {
    this.id = this.userService.getActualId();
  }
  registrar_asistencia(){
    this.router.navigateByUrl("asistencia/registrar");
  }


}
