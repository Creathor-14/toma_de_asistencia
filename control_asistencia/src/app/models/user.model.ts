import { Asistencia } from "./asistencia";
export class User {
    email: string;
    nombre: string;
    apellido: string;
    contrasenia: string;
    asistencias:Asistencia[];
    constructor(email: string, nombre: string, apellido: string, contrasenia: string) {
      this.email = email;
      this.nombre = nombre;
      this.apellido = apellido;
      this.contrasenia = contrasenia;
      this.asistencias = [];
    }
  }