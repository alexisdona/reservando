var Restaurant = function(id, nombre, rubro, ubicacion, horarios, imagen, calificaciones) {
    this.id = id;
    this.nombre = nombre;
    this.rubro = rubro;
    this.ubicacion = ubicacion;
    this.horarios = horarios;
    this.imagen = imagen;
    this.calificaciones = calificaciones;

}

Restaurant.prototype.reservarHorario = function(horarioReservado) {
    this.horarios = this.horarios.filter(horario => horario !== horarioReservado);

}

Restaurant.prototype.calificar = function(nuevaCalificacion) {
    if (Number.isInteger(nuevaCalificacion) && nuevaCalificacion > 0 && nuevaCalificacion < 10) {
        this.calificaciones.push(nuevaCalificacion);
    }
}
Restaurant.prototype.sumatoria = function(calificaciones) {
    var sumatoria = 0;
    for (var i = 0; i < this.calificaciones.length; i++) {
        sumatoria += this.calificaciones[i]
    }
    return sumatoria;
}
Restaurant.prototype.promedio = function(calificaciones) {
    var sumatoria = this.sumatoria(calificaciones);
    var cantidadDeCalificaciones = calificaciones.length;
    if (cantidadDeCalificaciones > 0) {
        return sumatoria / cantidadDeCalificaciones;
    } else {
        return 0;
    }
}


Restaurant.prototype.obtenerPuntuacion = function() {
    var promedio = this.promedio(this.calificaciones)
    return Math.round(promedio * 10) / 10;

}



//agrego este metodo para obtener los horarios del restaurant
Restaurant.prototype.obtenerHorarios = function() {
    return this.horarios;
}