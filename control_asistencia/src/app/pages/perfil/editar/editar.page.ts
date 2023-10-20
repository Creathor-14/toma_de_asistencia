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
  loading:boolean = true;
  email:any;
  user:User={email:"",nombre:"",apellido:"", region:"", comuna:"" ,contrasenia:"", asistencias:[]};
  nombre:string = "";
  apellido:string = "";
  region: string = "";
  comuna: string = "";

  constructor(private router:Router, private userService: UserService,
    private helperService:HelperService, private storageService:StorageService, private auth: AngularFireAuth, private apisService:ApisService) { }
  ngOnInit() {
  }

  ionViewWillEnter() {
    this.helperService.showLoader("Cargando").then(loader => {
      this.getUserEmail();
      this.cargarRegion();
      setTimeout(() => {
        this.nombre = this.user.nombre;
        this.apellido = this.user.apellido;
        this.region = this.user.region;
        this.comuna = this.user.comuna;
        this.loading = false;
        loader.dismiss();
      },500);
    });
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
    if (!this.nombre) {
      this.helperService.showToast("Debe ingresar un nombre.",1000, "danger");
    } else if (!/^[A-Za-z]+$/.test(this.nombre)) {
      this.helperService.showToast("El nombre solo debe contener letras.",1000, "danger");
    } else if (!this.apellido) {
      this.helperService.showToast("Debe ingresar un apellido.",1000, "danger");
    } else if (!/^[A-Za-z]+$/.test(this.apellido)) {
      this.helperService.showToast("El apellido solo debe contener letras.",1000, "danger");      
    }else if(this.regionSel != -1 && this.comunaSel == -1){
      console.log("elija comuna valida")
    }else{
      var confirmar = await this.helperService.showConfirm("¿Desea modificar usuario?","Cancelar","Aceptar")
      if(confirmar){
        this.user.nombre = this.nombre;
        this.user.apellido = this.apellido;
        if(this.regionSel != -1){
          this.region = this.apisService.getNombreUbicacion(this.regionSel,this.regiones);
          this.user.region = this.region;
        }
        if(this.comunaSel != -1){
          this.comuna = this.apisService.getNombreUbicacion(this.comunaSel,this.comunas);
          this.user.comuna = this.comuna;
        }

        this.storageService.actualizarUser(this.user);
      }
    }
    
        
    
  }
  volver(){
    this.router.navigateByUrl(`tabs/${this.email}/perfil/visualizar`);
  }
}
