function siVacio(thing,siVacio='No Registra') {
    return (thing === null || thing.trim() === "") ? siVacio : thing;
}

function toFechaSimple(fecha) {
    return new Date(fecha).toLocaleDateString('es-CO');
}
function toFechaHora(fecha) {
    return new Date(fecha).toLocaleDateString('es-CO',{day:"2-digit",month:"2-digit",year:'numeric',hour:"2-digit",minute:"2-digit"});
}
export {siVacio,toFechaSimple,toFechaHora}