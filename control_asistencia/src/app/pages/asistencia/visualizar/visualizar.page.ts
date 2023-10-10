import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.page.html',
  styleUrls: ['./visualizar.page.scss'],
})
export class VisualizarPage implements OnInit {
  email:string=this.userService.getActualEmail();
  constructor(private userService:UserService) {}
  ngOnInit() {
    this.email=this.userService.getActualEmail();
  }

}
