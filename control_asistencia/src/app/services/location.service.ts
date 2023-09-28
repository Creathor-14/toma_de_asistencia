import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';// para la api
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  apiUrl:string="https://dev.matiivilla.cl/Duoc/Location/Region";
  constructor(private httpClientModule:HttpClient) { }

  async getRegion(){//la ruta se debe cargar en enviroments.ts
    return await lastValueFrom(this.httpClientModule.(`${this.apiUrl}`));
  }
}
