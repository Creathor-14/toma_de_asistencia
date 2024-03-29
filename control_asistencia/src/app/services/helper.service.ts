import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController, ModalController } from '@ionic/angular';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  userData:User={email:"",nombre:"",apellido:"", region:"", comuna:"", contrasenia:"", asistencias:[]};
  setActualUserData(user:User){
    this.userData=user;
  }
  getActualUserData():User{
    return this.userData;
  }

  constructor(private alertController:AlertController, private loadingController:LoadingController, private toastController:ToastController, private modalController: ModalController) { }
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

  async showToast(msg:string,duracion:number = 1000,color:string){
    var toast = await this.toastController.create(
      {
        cssClass:"cssToast",
        message:msg,
        translucent:true,
        position:"bottom",
        duration:duracion,
        color:color,
      }
      );
      await toast.present();
      return toast;
  }

  async showModal(component:any,props:any = {},hideable = false){
    var modal = await this.modalController.create
    (
      {
        component:component,
        cssClass:"cssModal",
        componentProps:props,
        backdropDismiss:hideable
      }
    )
    await modal.present();
  }





}
