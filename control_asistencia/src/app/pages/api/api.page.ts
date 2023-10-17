import { Component, OnInit } from '@angular/core';
import { Region } from 'src/app/models/region';
import { HelperService } from 'src/app/services/helper.service';
import { ApisService } from 'src/app/services/apis.service';
import { User } from 'src/app/models/user.model';
import { StorageService } from 'src/app/services/storage.service';

import { BarcodeScanner } from 'capacitor-barcode-scanner';
import { ResulQrPage } from 'src/app/modals/resul-qr/resul-qr.page';
import { Asistencia } from 'src/app/models/asistencia';
@Component({
  selector: 'app-api',
  templateUrl: './api.page.html',
  styleUrls: ['./api.page.scss'],
})
export class ApiPage implements OnInit {
  regiones:Region[]=[];
  comunas:any[]=[];
  regionSel:number = 0;
  comunaSel:number = 0;
  
  constructor(private apiService:ApisService, private helperService:HelperService,
    private storageService:StorageService) { }

  ngOnInit() {
    this.cargarRegion();
  }
  async cargarComuna(){
    try {
      console.log(this.regionSel);
      const req = await this.apiService.getComuna(this.regionSel);
      this.comunas = req.data;
    } catch (error:any) {
      console.log("ERROR", error);
      
      this.helperService.showAlert(error.error.msg,"Error")
    }
  }

  async cargarRegion(){
    try {
      const req = await this.apiService.getRegion();
      this.regiones = req.data;
      console.log("REGIONES",this.regiones);
    } catch (error) {
      
    }
  }

  user:User={email: "", nombre: "", apellido: "", contrasenia: "", asistencias: []};
  public userName:string="";
  public userEmail:string="";
  public userLastName:string="";
  public userPassword:string="";
  public userAsistencias:Asistencia[]=[];
  
  setStorage(){
    let user:User = {email:this.userEmail,nombre:this.userName,apellido:this.userLastName,contrasenia:this.userPassword,asistencias:this.userAsistencias};
    this.storageService.create("user",JSON.stringify(user))

  }
  async getStorage(){
    await this.storageService.read("user").then((data:any)=>{
      if(data.value){
        
        let u = JSON.parse(data.value);
        this.user=u;
      }else{
        this.user={email:"none",nombre:"none",apellido:"none",contrasenia:"none",asistencias:[]};
      }
    })

  }
  async updateStorage(){
    let user:User = {email:this.userEmail,nombre:this.userName,apellido:this.userLastName,contrasenia:this.userPassword,asistencias:this.userAsistencias};
    await this.storageService.create("user",JSON.stringify(user))
  }
  async deleteFromStorage(){
    await this.storageService.delete("user");
  }
  async clearStorage(){
    await this.storageService.clear();
  }

  
  async prueba(){
    this.storageService.guardarUser(this.userEmail, this.userName, this.userLastName, this.userPassword);
  }

}
