import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  

  constructor(private alertController:AlertController, private loadingController:LoadingController) { }
  async showConfirm(message:string,btn_cancelar:string,btn_confirmar:string){
    let promise = new Promise<boolean>(async (resolve)=>{
      var alert = await this.alertController.create({cssClass:"",message:message,buttons:[
        
        {
          text:btn_cancelar,
          role: 'cancel',
          handler: () =>{
            resolve(false);
          }
        },
        {
          text:btn_confirmar,
          handler: () =>{
            resolve(true);
          }
        }
      ]})
      await alert.present();

    })
    return promise;
  }
  async showAlert(msg:string, title:string){
    var alert = await this.alertController.create({cssClass:"alertClass",message:msg,header:title,buttons:['Aceptar']});
    await alert.present();
    return alert;
  }

  async showLoader(msg:string){
    var loader = await this.loadingController.create({cssClass:"loaderClass",message:msg,translucent:true})
    await loader.present();
    return loader;
  }





}
