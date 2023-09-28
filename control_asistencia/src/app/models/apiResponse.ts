export class ApiResponse<type>{
    msg:string = "";
    data:type[]<id:number,nombre:string> = [];
    success:boolean = false;
    idFailed:boolean = false;
}