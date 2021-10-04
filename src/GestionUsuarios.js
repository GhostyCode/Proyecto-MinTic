class EditarInfo{
    constructor(){
        this.usuarios = [
            {identificacion: "0000000001", correo: "usuario1@gmail.com", estado:"pendiente",rol:"vendedor",editar:"editar"},
            {identificacion:"0000000002", correo:"usuario2@gmail.com", estado:"pendiente",rol:"vendedor",editar:"editar"},
            {identificacion:"0000000003", correo:"usuario3@gmail.com", estado:"pendiente",rol:"administrador",editar:"editar"},
            {identificacion:"0000000004", correo:"usuario4@gmail.com", estado:"pendiente",rol:"vendedor",editar:"editar"},
            {identificacion:"0000000005", correo:"usuario5@gmail.com", estado:"pendiente",rol:"vendedor",editar:"editar"},
            {identificacion:"0000000006", correo:"usuario6@gmail.com", estado:"pendiente",rol:"vendedor",editar:"editar"},
            {identificacion:"0000000007", correo:"usuario7@gmail.com", estado:"pendiente",rol:"administrador",editar:"editar"},
            {identificacion:"0000000008", correo:"usuario8@gmail.com", estado:"pendiente",rol:"vendedor",editar:"editar"}
        ];
        this.usuariosBK = this.usuarios;
        this.onInit();
        console.log(this.usuarios);
    }
    onInit(){
        let cuerpo = document.getElementById("cuerpoTabla");
        let auxEstado;
        let auxRol;

        this.usuarios.forEach(usuario =>{
            let fila = cuerpo.insertRow(cuerpo.rows.length);
            fila.insertCell(0).innerHTML = usuario.identificacion;
            fila.insertCell(1).innerHTML = usuario.correo;
            fila.insertCell(2).innerHTML = usuario.estado;
            fila.insertCell(3).innerHTML = usuario.rol;
            fila.insertCell(4).innerHTML = usuario.editar;
            // auxEstado = document.getElementById(inputEstado)[document.getElementById(inputEstado).selectedIndex].value;
                 
        });
    }
    buscar(){}
}

let editarInfo = new EditarInfo();