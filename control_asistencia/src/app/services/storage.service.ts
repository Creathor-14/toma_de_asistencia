import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { User } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async create(key:string, value:any){
    Preferences.set({key,value});
  }

  async read(key:string){
    return (await Preferences.get({key}));
  }
  
  async update(key:string, value:any){
    await Preferences.set({key,value});
  }

  async delete(key:string){
    await Preferences.remove({key});
  }
  
  async clear(){
    await Preferences.clear();
  }


  //profe
  /*
  async getItem(key:string):Promise<string | null>{
    const obj = await Preferences.get({key:key});
    return obj.value;
  }
  async obtenerUser():Promise<User[]>{
    const storageData = await this.getItem(storageUsuario);
    if (storageData == null) {
      return[];
    }

    const data:any[] = JSON.parse(storageData);
    if (data) {
      return data;
    }
    else{
      return [];
    }
  }


  async guardarUser(usuario:User[]){
    var usuarios = await this.obtenerUsuario();
    for (const i of usuarios) {
      if (i) {
        usuario.push(i);
      }
    }
    this.setItem(storageUsuario,JSON.stringify(usuario));
  }*/

}
