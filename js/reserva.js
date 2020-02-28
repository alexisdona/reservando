var Reserva = function(fechaYhora, cantidadDePersonas, precioPorPersona, codigoDeDescuento) {
    this.fechaYHora = fechaYhora;
    this.cantidadDePersonas = cantidadDePersonas;
    this.precioPorPersona = precioPorPersona;
    this.codigoDeDescuento = codigoDeDescuento;


}

Reserva.prototype.calcularPrecioTotal = function() {
    var precioBase = this.calcularPrecioBase();
    var adicionales = this.adicionalPorFinDeSemana(precioBase) + this.adicionalPorHorario(precioBase);
    var descuentos = this.descuentoPorCodigo(precioBase) + this.descuentoPorGrupo(precioBase);
    return precioBase + adicionales - descuentos;
}

Reserva.prototype.calcularPrecioBase = function() {
    return this.cantidadDePersonas * this.precioPorPersona;
}

Reserva.prototype.descuentoPorGrupo = function(precioBase) {
    var descuento = 0;
    if (this.cantidadDePersonas > 8) {
        descuento = precioBase * 0.15;
    } else if (this.cantidadDePersonas > 6 && this.cantidadDePersonas <= 8) {
        descuento = precioBase * 0.1;
    } else if (this.cantidadDePersonas >= 4 && this.cantidadDePersonas <= 6) {
        descuento = precioBase * 0.05;
    }
    return descuento;
}

Reserva.prototype.descuentoPorCodigo = function(precioBase) {
    var descuento = 0;
    if (this.codigoDeDescuento === "DES15") {
        descuento = precioBase * 0.15;
    } else if (this.codigoDeDescuento === "DES200") {
        descuento = 200;
    } else if (this.codigoDeDescuento === "DES1") {
        descuento = this.precioPorPersona;
    }
    return descuento;

}

Reserva.prototype.devolverMinutosTranscurridosDelDia = function() {
    return this.fechaYHora.getHours() * 60;
}

Reserva.prototype.horarioConcurrido = function() {
    return ((this.devolverMinutosTranscurridosDelDia() >= 780 && this.devolverMinutosTranscurridosDelDia() <= 840) ||
        (this.devolverMinutosTranscurridosDelDia() >= 1200 && this.devolverMinutosTranscurridosDelDia() <= 1260));


}



Reserva.prototype.adicionalPorHorario = function(precioBase) {
    var adicionalPorHorario = 0;
    if (this.horarioConcurrido()) {
        adicionalPorHorario = 0.05;
    }
    return precioBase * adicionalPorHorario;
}

Reserva.prototype.adicionalPorFinDeSemana = function(precioBase) {
    var adicionalPorFinDeSemana = 0;
    if (this.reservaEsFinDeSemana()) {
        adicionalPorFinDeSemana = 0.1;
    }
    return precioBase * adicionalPorFinDeSemana;
}

Reserva.prototype.reservaEsFinDeSemana = function() {
    return (this.fechaYHora.getDay() === 0 || this.fechaYHora.getDay() === 5 || this.fechaYHora.getDay() === 6);
}


var reservaPara2FueraDeHoraSinDescuento = new Reserva(new Date(2020, 02, 25, 23, 30, 00, 00), 2, 600, null);
var reservaPara2EnHoraConcurrida = new Reserva(new Date(2020, 02, 25, 20, 30, 00, 00), 2, 600, null);
var reservaPara2ConCodigoDeDescuentoDES15EnHorarioConcurrido = new Reserva(new Date(2020, 02, 25, 20, 30, 00, 00), 2, 600, 'DES15');
var reservaPara2ConCodigoDeDescuentoDES15 = new Reserva(new Date(2020, 02, 25, 22, 30, 00, 00), 2, 600, 'DES15');
var reservaPara2ConCodigoDeDescuentoDES200 = new Reserva(new Date(2020, 02, 25, 22, 30, 00, 00), 2, 600, 'DES200');
var reservaPara2ConCodigoDeDescuentoDES1 = new Reserva(new Date(2020, 02, 25, 22, 30, 00, 00), 2, 600, 'DES1');
var reservaPara9 = new Reserva(new Date(2020, 02, 25, 23, 30, 00, 00), 9, 500, null);
var reservaPara7 = new Reserva(new Date(2020, 02, 25, 23, 30, 00, 00), 7, 500, null);
var reservaPara6 = new Reserva(new Date(2020, 02, 25, 23, 30, 00, 00), 6, 500, null);
var reservaDeFinDeSemanaPara2FueraDeHorario = new Reserva(new Date(2020, 02, 29, 23, 30, 00, 00), 2, 1000, null);
var reservaDeFinDeSemanaPara2EnHorarioConcurrido = new Reserva(new Date(2020, 02, 28, 20, 30, 00, 00), 2, 1000, null);