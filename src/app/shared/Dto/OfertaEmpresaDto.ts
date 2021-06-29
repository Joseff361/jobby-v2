export class OfertaEmpresaDto{
    constructor(
        public IdEmpresa: Number,
	    public Descripcion: String,
	    public Jornada: String,
        public Salario: String,
        public Requisitos: String,
        public Beneficios: String, 
        public Area: String 
    ){}
}