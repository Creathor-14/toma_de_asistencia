import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  id:number= 0;
  constructor(private userService: UserService,private router:Router,private activatedRoute:ActivatedRoute) {
    
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
  }
  getMensajeBienvenida(): string {
    return `${this.userService.getNombre(this.id)} ${this.userService.getApellido(this.id)}`;
} 
  exit(){
      this.router.navigateByUrl("login/user");
  }

}
