import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.page.html',
  styleUrls: ['./visualizar.page.scss'],
})
export class VisualizarPage implements OnInit {
  email:string=this.userService.getActualEmail();
  asistencias:{asignatura: string, seccion: string, docente: string, sala: string, fecha: string, hora: string, leccion: string}[]= [];
  constructor(private userService:UserService, private storageService:StorageService) {}
  ngOnInit() {
    this.email=this.userService.getActualEmail();
    this.ja()
  }
  ionViewWillEnter() {
    console.log("ye")
  }
  async ja(){
    this.asistencias = await this.storageService.getAsistencias(this.email);
    console.log(this.email,this.asistencias)
  }
}
