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

function updateTicket(id, modificadoPor, fechaModificado, empresa, departamento, titulo, descripcion, estado, solucion) {
    try {
        const sheet = obtenerSheet(env_().SH_REGISTRO_CASOS);
        const cRows = obtenerRows(env_().SH_REGISTRO_CASOS);
        var rango = sheet.getDataRange().getValues();
        for(var i = 1; i < cRows; i++) {
            if(rango[i][0] == id)  { 
                var j = 1 + i;
                sheet.getRange(j, 4).setValue(modificadoPor);
                sheet.getRange(j, 5).setValue(fechaModificado);
                sheet.getRange(j, 6).setValue(empresa);
                sheet.getRange(j, 7).setValue(departamento);
                sheet.getRange(j, 8).setValue(titulo);
                sheet.getRange(j, 9).setValue(descripcion);
                sheet.getRange(j, 10).setValue(estado);
                sheet.getRange(j, 11).setValue(solucion);
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

function email(id, creado, fechaCreado, titulo, descripcion, empresa, estado) {
    const usuario = { id, creado, fechaCreado, titulo, descripcion, empresa, estado }
    var repo = HtmlService.createTemplateFromFile('frontend/report.html')
    repo.usuario = usuario
    var message = repo.evaluate().getContent()

    GmailApp.sendEmail(
        'jsanchez@sinoenergycorp.com',
        "Ticket: " + usuario.id,
        'message',
        {htmlBody: message}
    );
}

function emailUser(id, user, creado, fechaModificado, titulo, descripcion, empresa, departamento, estado, solucion) {
    const usuario = { id, user, creado, fechaModificado, titulo, descripcion, empresa, departamento, estado, solucion }
    var repo = HtmlService.createTemplateFromFile('frontend/reportuser.html')
    repo.usuario = usuario
    var mes = repo.evaluate().getContent()
    
    GmailApp.sendEmail(
        usuario.creado,
        "Ticket: " + usuario.id,
         "mes",
         {htmlBody: mes}
    );
}