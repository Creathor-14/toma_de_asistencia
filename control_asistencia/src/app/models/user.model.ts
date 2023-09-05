export class User {
    id: number;
    email: string;
    nombre: string;
    contrasenia: string;
  
    constructor(id: number, email: string, nombre: string, contrasenia: string) {
      this.id = id;
      this.email = email;
      this.nombre = nombre;
      this.contrasenia = contrasenia;
    }
  }