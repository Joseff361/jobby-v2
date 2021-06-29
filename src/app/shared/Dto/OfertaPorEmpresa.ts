import { EmpresaDto } from './EmpresaDto';
import { EstudianteDto } from './EstudianteDto';
export class OfertaPorEmpresa{
    id: Number;
	descripcion: String;
	jornada: String;
    salario: String;
    requisitos: String;
    beneficios: String; 
    area: String;
    fecha: Date;
    empresa: EmpresaDto;
    estudiantes: EstudianteDto[];
}