import { OfertaPorEmpresa } from './OfertaPorEmpresa';
import {UsuarioDto} from './UsuarioDto';
export class EstudianteDto{
    public id: Number;
    public nombre: String;
    public apellido: String;
    public curriculum: Curriculum;
    public suscripcion: any;
    public usuario: UsuarioDto;
    public ofertasEmpresa: OfertaPorEmpresa[];
}


export class Curriculum{
    id: number;
    direccion: string;
	email: string;
	formacion: string;
	experiencia: string;
	habilidades: string;
	idiomas: string;
}