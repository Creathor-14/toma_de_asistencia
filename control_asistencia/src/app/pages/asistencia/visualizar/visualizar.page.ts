import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.page.html',
  styleUrls: ['./visualizar.page.scss'],
})
export class VisualizarPage implements OnInit {
  id:number=this.userService.getActualId();
  constructor(private userService:UserService) {}
  ngOnInit() {
    this.id = this.userService.getActualId();
  }

}
