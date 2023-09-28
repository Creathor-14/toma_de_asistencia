import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  id:number= 0;
  constructor(private router:Router,private activatedRoute:ActivatedRoute) {
    
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
  }
  exit(){
      this.router.navigateByUrl("login/user");
  }

}
