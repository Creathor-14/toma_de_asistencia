import { Component, OnInit } from '@angular/core';
import { trigger,state, style, transition, animate } from '@angular/animations';
@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.page.html',
  styleUrls: ['./prueba.page.scss'],
  animations: [
    trigger('fadeInOut',[
      state('void', style({ opacity: 0})),
      state('*', style({ opacity: 1})),
      transition('void => *', animate('1000ms ease-in')),
      transition('* => void', animate('1000ms ease-out')),
    ])
  ]
})
export class PruebaPage implements OnInit {
  loading = true;
  constructor() {}
  ngOnInit(){
    setTimeout(() => {
      this.loading = false;
    },2000);
  }

}
