import { Asistencia } from "./asistencia";
export class User {
    email: string;
    nombre: string;
    apellido: string;
    region: string;
    comuna:string;
    contrasenia: string;
    asistencias:Asistencia[];
    constructor(email: string, nombre: string, apellido: string, region:string, comuna:string, contrasenia: string) {
      this.email = email;
      this.nombre = nombre;
      this.apellido = apellido;
      this.region = region;
      this.comuna = comuna;
      this.contrasenia = contrasenia;
      this.asistencias = [];
    }
  }