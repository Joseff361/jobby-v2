export class UsuarioDto{
    constructor(
        public id: Number,
        public correo: string,
        public contrasenia: string,
        public tipo: string
    ){}
}