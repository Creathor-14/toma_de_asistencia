export class User {
    id: number;
    email: string;
    nombre: string;
    apellido: string;
    contrasenia: string;
  
    constructor(id: number, email: string, nombre: string, apellido: string, contrasenia: string) {
      this.id = id;
      this.email = email;
      this.nombre = nombre;
      this.apellido = apellido;
      this.contrasenia = contrasenia;
    }
  }