import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.page.html',
  styleUrls: ['./visualizar.page.scss'],
  animations: [
    trigger('fadeInOut',[
      state('void', style({ opacity: 0})),
      state('*', style({ opacity: 1})),
      transition('void => *', animate('1000ms ease-in')),
      transition('* => void', animate('1000ms ease-out')),
    ])
  ],
})
export class VisualizarPage implements OnInit {
  loading = true;
  content = false;
  email:any;
  asistencias:{asignatura: string, seccion: string, docente: string, sala: string, fecha: string, hora: string, leccion: string}[]= [];
  constructor(private storageService:StorageService,
    private auth: AngularFireAuth) {}
  ngOnInit() {
    this.getUserEmail();
  }

  async getUserEmail(){
    let user = await this.auth.currentUser;
    if(user){
      this.email =  user.email;
      this.obtenerAsistencia();
    }
  }

  ionViewWillEnter() {
    this.loading = true;
    this.obtenerAsistencia();
    setTimeout(() => {
      if(this.asistencias.length!=0){
        this.content=true;
      }
      this.loading = false;
    },2000);
  }
  async obtenerAsistencia(){
    this.asistencias = await this.storageService.getAsistencias(this.email);
    console.log(this.email,this.asistencias);
  }
}
