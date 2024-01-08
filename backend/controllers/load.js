function save(data) {
    try {
        const sheet = obtenerSheet(env_().SH_REGISTRO_CASOS);
        Insert(JSON.parse(data), sheet);
        return {
            titulo:" Registro Exitoso",
            descripcion: "Ticket Cargado En Sistema"
        }
    } catch (error) {
        return {
            titulo: "Ha Ocurrido un Error! " + error,
            descripcion: "Datos No Almacenados, Intente Otra Vez"
        }
    }
}

function listarUser(id = undefined) {
    return JSON.stringify(_read(obtenerSheet(env_().SH_REGISTRO_CASOS), id))
  
}

function listarRequest(id = undefined, fn = undefined) {
    try {
        if(fn === 1) return JSON.stringify(_read(obtenerSheet(env_().SH_REGISTRO_CASOS), id))
        else if(fn === 2) return JSON.stringify(_readFecha(obtenerSheet(env_().SH_REGISTRO_CASOS), id))
    } catch(error) {
        console.error(error)
    }
}

function listarEstado(estado) {
   return JSON.stringify(readEstado(obtenerSheet(env_().SH_REGISTRO_CASOS), estado))
 }

function cantRows() {
   return obtenerRows(env_().SH_REGISTRO_CASOS)
}

function perfil() {
    return perfilUsuario();
}

function validarUser(user) {
    var useracceso = 'vacio';
    const sheet = obtenerSheet(env_().SH_REGISTRO_ADMIN);
    const cRows = obtenerRows(env_().SH_REGISTRO_ADMIN);
    var cant = sheet.getDataRange().getValues();
    for(var i = 1; i < cRows; i++) {
        if(cant[i][0] == user)  { 
            useracceso = cant[i][0]
    } 
 } return useracceso
}

function updateTicket(TR, NombreApellido, Numerotelefono, Departamento, TipoSolicitud, TipoServicio, desde, hasta, FechaServicio, Horarequerida, estado, vehiculo, AsignadoPor) {
    try {
        const sheet = obtenerSheet(env_().SH_REGISTRO_CASOS);
        const cRows = obtenerRows(env_().SH_REGISTRO_CASOS);
        var rango = sheet.getDataRange().getValues();
        for(var i = 1; i < cRows; i++) {
            if(rango[i][0] == TR)  { 
                var j = 1 + i;
                sheet.getRange(j, 4).setValue(NombreApellido);
                sheet.getRange(j, 5).setValue(Numerotelefono);
                sheet.getRange(j, 6).setValue(Departamento);
                sheet.getRange(j, 7).setValue(TipoSolicitud);
                sheet.getRange(j, 8).setValue(TipoServicio);
                sheet.getRange(j, 9).setValue(desde);
                sheet.getRange(j, 10).setValue(hasta);
                sheet.getRange(j, 11).setValue(FechaServicio);
                sheet.getRange(j, 12).setValue(Horarequerida);
                sheet.getRange(j, 13).setValue(estado);
                sheet.getRange(j, 14).setValue(vehiculo);
                sheet.getRange(j, 15).setValue(AsignadoPor);
                return {
                    titulo:" Actualización Exitoso",
                    descripcion: "Ticket Cargado En Sistema"
                }
        } 
    }
    } catch (error) {
        return {
            titulo: "Ha Ocurrido un Error! " + error,
            descripcion: "Datos No Almacenados, Intente Otra Vez"
        }
    }
}

function email(TR, creado, fechaCreado, NombreApellido, Departamento, TipoSolicitud, TipoServicio, FechaServicio, Horarequerida, estado) {
    const usuario = { TR, creado, fechaCreado, NombreApellido, Departamento, TipoSolicitud, TipoServicio, FechaServicio, Horarequerida, estado }
    var repo = HtmlService.createTemplateFromFile('frontend/report.html')
    repo.usuario = usuario
    var message = repo.evaluate().getContent()

    GmailApp.sendEmail(
        'bmarquez@integra-ws.com',
        "Ticket: " + usuario.TR,
        'message',
        {htmlBody: message}
    );
}

function emailUser(TR, creado, fechaCreado, NombreApellido, Departamento, TipoSolicitud, TipoServicio, FechaServicio, Horarequerida, estado, vehiculo) {
    const usuario = { TR, creado, fechaCreado, NombreApellido, Departamento, TipoSolicitud, TipoServicio, FechaServicio, Horarequerida, estado, vehiculo }
    var repo = HtmlService.createTemplateFromFile('frontend/reportuser.html')
    repo.usuario = usuario
    var mes = repo.evaluate().getContent()
    
    GmailApp.sendEmail(
        usuario.creado,
        "Ticket: " + usuario.TR,
         "mes",
         {htmlBody: mes}
    );
}

function listarRecursos(id = undefined) {
    return JSON.stringify(_read(obtenerSheet(env_().SH_REGISTRO_LISTASVARIAS), id));
  }