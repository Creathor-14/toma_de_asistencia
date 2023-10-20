import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
import { ApisService } from 'src/app/services/apis.service';
import { Region } from 'src/app/models/region';
import { HelperService } from 'src/app/services/helper.service';


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
  email:any;
  user:User={email:"",nombre:"",apellido:"", region:"", comuna:"" ,contrasenia:"", asistencias:[]};
  region: string = "";
  comuna: string = "";

  constructor(private router:Router, private userService:UserService,
    private storageService:StorageService, private auth: AngularFireAuth,
    private helperService:HelperService) { }

  ngOnInit() {
    

  }

  ionViewWillEnter() {
    this.getUserEmail();
    setTimeout(() => {
      this.loading = false;
    },2000);
  }
  
  async getUserEmail(){
    let user = await this.auth.currentUser;
    if(user){
      this.email =  user.email;
      this.getUserStorageData();
    }
  }

  async getUserStorageData(){
    this.user= await this.storageService.getUserData(this.email);
    this.userService.setActualUserData(this.user);
  }

  getNombre(): string {
    return `${this.user.nombre}`;
  }
  getApellido(): string {
    return `${this.user.apellido}`;
  }
  getEmail(): string {
    return `${this.email}`;
  }
  getContrasenia(): string {
    return `${this.user.contrasenia}`;
  }
  getRegion(): string {
    return `${this.user.region}`;
  }
  getComuna(): string {
    return `${this.user.comuna}`;
  }

  async editar(){
    this.router.navigateByUrl(`tabs/${this.email}/perfil/editar`);
    console.log(this.email);
  }

   async eliminar(){
    var corfirmar = await this.helperService.showConfirm("Desea eliminar este usuario del Storage?","Cancelar","Confirmar")
    if (corfirmar == true) {
      this.storageService.eliminarUsuario(this.email);
      this.router.navigateByUrl("login/user");
      console.log('Usuario eliminado de storage, no de firebase');
    }
  }

}
