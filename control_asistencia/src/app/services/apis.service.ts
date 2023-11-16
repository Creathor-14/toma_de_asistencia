import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../models/apiResponse';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApisService {
  constructor(private http:HttpClient) { }
  //region
  async getRegion(){
    return await lastValueFrom(this.http.get<ApiResponse<any>>(`${environment.apiUrl}region`));
  }

  async getComuna(regionId:number){
    return await lastValueFrom(this.http.get<ApiResponse<any>>(`${environment.apiUrl}comuna/` + regionId));
  }

  getNombreUbicacion(id:number,ubicaciones:any[]){
    for(const u of ubicaciones){
      if(u.id == id){
        return u.nombre
      }
    }
    
  }
}
