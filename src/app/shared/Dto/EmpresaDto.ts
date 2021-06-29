import { UsuarioDto } from "./UsuarioDto";

export class EmpresaDto{
    constructor(
        public nombreDeEmpresa: String,
        public locacion: String,
        public RUC: Number,
        public sitioWeb: String,
        public descripcion: String,
        public pagoEmpresa: any,
        public id: number,
        public usuario: UsuarioDto
    ){}
}