import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { HelperService } from 'src/app/services/helper.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

import { ApisService } from 'src/app/services/apis.service';
import { Region } from 'src/app/models/region';


@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {
  email:any;
  user:User=this.userService.getActualUserData();
  nombre:string = "";
  apellido:string = "";
  contrasenia:string = "";
  region: string = "";
  comuna: string = "";

  constructor(private router:Router, private userService: UserService,
    private helperService:HelperService, private storageService:StorageService, private auth: AngularFireAuth, private apisService:ApisService) { }
  ngOnInit() {

    this.getUserEmail();
    this.nombre = this.user.nombre;
    this.apellido = this.user.apellido;
    this.contrasenia = this.user.contrasenia;
    this.cargarRegion();

  
    

  }

  async getUserEmail(){
    let user = await this.auth.currentUser;
    if(user){
      this.email =  user.email;
      //this.getUserStorageData();
    }
  }
  getNombreUbicacion(id:number,ubicaciones:any[]){
    for(const u of ubicaciones){
      if(u.id == id){
        return u.nombre
      }
    }
    
  }

  async getUserStorageData(){
    this.user= await this.storageService.getUserData(this.email);
    this.region = this.getNombreUbicacion(this.regionSel,this.regiones);
    this.comuna = this.getNombreUbicacion(this.comunaSel,this.comunas);
  }
  regiones:Region[]=[];
  comunas:any[]=[];
  regionSel:number = -1;
  comunaSel:number = -1;

  async cargarComuna(){
    try {
      const req = await this.apisService.getComuna(this.regionSel);
      this.comunas = req.data;
      this.region= this.comunas[this.regionSel].nombre;
      
    } catch (error:any) {
      console.log("ERROR", error);
      
      this.helperService.showAlert(error.error.msg,"Error")
    }
  }

  async cargarRegion(){
    try {
      const req = await this.apisService.getRegion();
      this.regiones = req.data;
      
      
    } catch (error) {
      
    }
  }



  async actualizar(){
    this.region = this.apisService.getNombreUbicacion(this.regionSel,this.regiones);
    this.comuna = this.apisService.getNombreUbicacion(this.comunaSel,this.comunas);
    console.log(this.user)
    var confirmar = await this.helperService.showConfirm("¿Desea modificar usuario?","Cancelar","Aceptar")
    if(confirmar){
      this.user.nombre = this.nombre;
      this.user.apellido = this.apellido;
      this.user.region = this.region;
      this.user.comuna = this.comuna;

      this.storageService.actualizarUser(this.user);
    }
  }
  volver(){
    this.router.navigateByUrl(`tabs/${this.email}/perfil/visualizar`);
  }
}
