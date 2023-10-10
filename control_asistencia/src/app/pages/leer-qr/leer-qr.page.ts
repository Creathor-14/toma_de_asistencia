import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-leer-qr',
  templateUrl: './leer-qr.page.html',
  styleUrls: ['./leer-qr.page.scss'],
})
export class LeerQrPage implements OnInit {
  email:string=this.userService.getActualEmail();
  constructor(private router:Router, private userService:UserService) {}
  ngOnInit() {
    this.email=this.userService.getActualEmail();
  }
  registrar_asistencia(){
    this.router.navigateByUrl(`tabs/${this.email}/asistencia/registrar`);
  }


}
