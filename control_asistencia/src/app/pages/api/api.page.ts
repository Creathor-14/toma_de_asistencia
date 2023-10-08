import { Component, OnInit } from '@angular/core';
import { Region } from 'src/app/models/region';
import { HelperService } from 'src/app/services/helper.service';
import { ApisService } from 'src/app/services/apis.service';

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
  
  constructor(private apiService:ApisService, private helperService:HelperService) { }

  ngOnInit() {
    this.cargarRegion();
  }
  async cargarComuna(){
    try {
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

}
