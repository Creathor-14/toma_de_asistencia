import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.page.html',
  styleUrls: ['./visualizar.page.scss'],
})
export class VisualizarPage implements OnInit {
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
    }
  }

  ionViewWillEnter() {
    this.obtenerAsistencia();
  }
  async obtenerAsistencia(){
    this.asistencias = await this.storageService.getAsistencias(this.email);
    console.log(this.email,this.asistencias);
  }
}
