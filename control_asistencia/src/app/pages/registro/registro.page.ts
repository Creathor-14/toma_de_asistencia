import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  constructor(private userService: UserService,private router:Router) { }

  volver(){
    this.router.navigateByUrl("inicio/");
  }

  ngOnInit() {
  }

}
