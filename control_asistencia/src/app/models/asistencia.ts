export class Asistencia{
    asignatura:string;
    seccion:string;
    docente:string;
    sala:string;
    fecha:string;
    hora:string;
    leccion:string;
    constructor(asignatura: string, seccion: string, docente: string, sala: string, fecha: string, hora: string, leccion: string) {
        this.asignatura = asignatura;
        this.seccion = seccion;
        this.docente = docente;
        this.sala = sala;
        this.fecha = fecha;
        this.hora = hora;
        this.leccion = leccion;
      }
}