import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { HelperService } from 'src/app/services/helper.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

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
  constructor(private router:Router, private userService: UserService,
    private helperService:HelperService, private storageService:StorageService, private auth: AngularFireAuth) { }
  ngOnInit() {

    this.getUserEmail();
    this.nombre = this.user.nombre;
    this.apellido = this.user.apellido;
    this.contrasenia = this.user.contrasenia;

  
    

  }

  async getUserEmail(){
    let user = await this.auth.currentUser;
    if(user){
      this.email =  user.email;
      //this.getUserStorageData();
    }
  }

  async getUserStorageData(){
    this.user= await this.storageService.getUserData(this.email);
  }



  async actualizar(){
    var confirmar = await this.helperService.showConfirm("¿Desea modificar usuario?","Cancelar","Aceptar")
    if(confirmar){
      //this.userService.updateUser(this.email, this.nombre, this.apellido, this.contrasenia);
    }
  }
  volver(){
    this.router.navigateByUrl(`tabs/${this.email}/perfil/visualizar`);
  }
}
