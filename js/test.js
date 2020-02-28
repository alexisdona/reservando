var expect = chai.expect;
var assert = chai.assert;

describe('Verificando la funcionalidad de reserva de horario en restaurant', function() {
    it('Cuando se reserva un horario de un restaurant, el horario correspondiente se elimina del arreglo. Reservo 12:30 de los talas y el horario desaparee', function() {
        var restaurant = listado.buscarRestaurante(25);
        var cantidadHorariosAntes = restaurant.obtenerHorarios().length;
        restaurant.reservarHorario("12:30");
        var cantidadHorariosAhora = restaurant.obtenerHorarios().length;
        expect(cantidadHorariosAntes).to.equal(cantidadHorariosAhora + 1);

    });
    it('Cuando se reserva un horario que el restaurant no posee, el arreglo se mantiene igual. Reservo 16:30 para los Talas del Entrerriano', function() {

        var restaurant = listado.buscarRestaurante(25);
        var cantidadHorariosAntes = restaurant.obtenerHorarios().length;
        restaurant.reservarHorario("16:30");
        var cantidadHorariosAhora = restaurant.obtenerHorarios().length;
        expect(cantidadHorariosAntes).to.equal(cantidadHorariosAhora);

    });
    it('Cuando se intenta reservar un horario pero no se le pasa ningún parámetro a la función, el arreglo se mantiene igual.', function() {
        var restaurant = listado.buscarRestaurante(26);
        var cantidadHorariosAntes = restaurant.obtenerHorarios().length;
        restaurant.reservarHorario();
        var cantidadHorariosAhora = restaurant.obtenerHorarios().length;
        expect(cantidadHorariosAntes).to.equal(cantidadHorariosAhora);

    });
});
describe('Verificando puntuación de los restaurantes', function() {
    it('Calculando el promedio de los talas del entrerriano. Debe dar 9 porque suma 27 puntos con 3 calificaciones', function() {
        var restaurant = listado.buscarRestaurante(25);
        var promedio = restaurant.obtenerPuntuacion();
        expect(promedio).to.equal(9);

    });
    it('Calculando el promedio de Pizzería El Cuartito. Debe dar 0 porque no tiene calificaciones todavía', function() {
        var restaurant = listado.buscarRestaurante(26);
        var promedio = restaurant.obtenerPuntuacion();
        expect(promedio).to.equal(0);

    });
});

describe('Verificando la funcionalidad de calificacion de los restaurantes', function() {
    it('Califico a TAO Uptown con 9 puntos. Antes tenía 5 calificaciones y pasa a tener 6.', function() {
        var restaurant = listado.buscarRestaurante(1);
        var cantidadDeCalificacionesAntes = restaurant.calificaciones.length;
        restaurant.calificar(9);
        var cantidadDeCalificacionesDespues = restaurant.calificaciones.length;
        expect(cantidadDeCalificacionesAntes).to.equal(cantidadDeCalificacionesDespues - 1);

    });
    it('Califia TAO Uptown con 0. Sigue teniendo 5 calificaciones', function() {
        var restaurant = listado.buscarRestaurante(1);
        var cantidadDeCalificacionesAntes = restaurant.calificaciones.length;
        restaurant.calificar(0);
        var cantidadDeCalificacionesDespues = restaurant.calificaciones.length;
        expect(cantidadDeCalificacionesAntes).to.equal(cantidadDeCalificacionesDespues);

    });
    it('Califia TAO Uptown con la palabra zaraza. Sigue teniendo 5 calificaciones', function() {
        var restaurant = listado.buscarRestaurante(1);
        var cantidadDeCalificacionesAntes = restaurant.calificaciones.length;
        restaurant.calificar('zaraza');
        var cantidadDeCalificacionesDespues = restaurant.calificaciones.length;
        expect(cantidadDeCalificacionesAntes).to.equal(cantidadDeCalificacionesDespues);

    });
    it('Califia a la pizzeria El Cuartito con -5. Sigue sin calificaciones', function() {
        var restaurant = listado.buscarRestaurante(26);
        var cantidadDeCalificacionesAntes = restaurant.calificaciones.length;
        restaurant.calificar(-5);
        var cantidadDeCalificacionesDespues = restaurant.calificaciones.length;
        expect(cantidadDeCalificacionesAntes).to.equal(cantidadDeCalificacionesDespues);

    });

});

describe('Verificando la funcionalidad de buscar restaurante', function() {
    it('Busco el restaurante con id =1 y verifico que existe y se llama TAO Uptown', function() {
        var restaurant = listado.buscarRestaurante(1);
        var nombreRestaurant = restaurant.nombre;
        expect(nombreRestaurant).to.equal('TAO Uptown');

    });
    it('Busco el restaurante que no existe. Espero el mensaje de error "No se ha encontrado ningún restaurant" ', function() {
        var restaurant = listado.buscarRestaurante(99);
        expect(restaurant).to.equal('No se ha encontrado ningún restaurant');

    });
    it('No le paso parametros a la funcion buscarRestaurant(id). Espero el mensaje de error "No se ha encontrado ningún restaurant" ', function() {
        var restaurant = listado.buscarRestaurante();
        expect(restaurant).to.equal('No se ha encontrado ningún restaurant');

    });
    it('Le paso un parametro inválido a la funcion buscarRestaurant(id). Por ejemplo un String. Espero el mensaje de error "No se ha encontrado ningún restaurant" ', function() {
        var restaurant = listado.buscarRestaurante("Alexis");
        expect(restaurant).to.equal('No se ha encontrado ningún restaurant');

    });
});

describe('Verificando la funcionalidad de obtener restaurantes', function() {
    it('Filtro por Todos. Me debe devolver todos los restaurantes', function() {
        var cantidadDeRestaurantes = listado.obtenerRestaurantes(null, null, null).length;
        expect(cantidadDeRestaurantes).to.equal(26);

    });
    it('Filtro por rubro = "Parrilla". Me debe devolver 1 opción', function() {
        var cantidadDeRestaurantes = listado.obtenerRestaurantes('Parrilla', null, null).length;
        expect(cantidadDeRestaurantes).to.equal(1);

    });
    it('Filtro por ciudad = "Buenos Aires". Me debe devolver 2 opciones', function() {
        var cantidadDeRestaurantes = listado.obtenerRestaurantes(null, 'Buenos Aires', null).length;
        expect(cantidadDeRestaurantes).to.equal(2);

    });
    it('Filtro por horario = "11:30". Me debe devolver 1 opción', function() {
        var cantidadDeRestaurantes = listado.obtenerRestaurantes(null, null, '11:30').length;
        expect(cantidadDeRestaurantes).to.equal(2);

    });
    it('Filtro por horario = "23:30". No hay opciones', function() {
        var cantidadDeRestaurantes = listado.obtenerRestaurantes(null, null, '23:30').length;
        expect(cantidadDeRestaurantes).to.equal(0);

    });
    it('Filtro por ciudad = "Carapachay". Me debe devolver 2 opciones', function() {
        var cantidadDeRestaurantes = listado.obtenerRestaurantes(null, 'Carapachay', null).length;
        expect(cantidadDeRestaurantes).to.equal(0);

    });
    it('Filtro por rubro = "vegano". Me debe devolver 2 opciones', function() {
        var cantidadDeRestaurantes = listado.obtenerRestaurantes('vegano', null, null).length;
        expect(cantidadDeRestaurantes).to.equal(0);

    });

});

describe('Verificando la funcionalidad de cálculo de precios para una reserva', function() {

    it('Precio base: No hay descuento ni adicional por reserva para dos dia de semana fuera de horario concurrido', function() {
        var precioBase = reservaPara2FueraDeHoraSinDescuento.calcularPrecioBase();
        expect(precioBase).to.equal(1200);
    });
    it('Precio total: No hay descuento ni adicional por reserva para dos dia de semana fuera de horario concurrido', function() {
        var precioTotal = reservaPara2FueraDeHoraSinDescuento.calcularPrecioTotal();
        expect(precioTotal).to.equal(1200);
    });
    it('Precio base: Adicional del 5% por reservar para 2 en horario concurrido', function() {
        var precioBase = reservaPara2EnHoraConcurrida.calcularPrecioBase();
        expect(precioBase).to.equal(1200);
    });

    it('Precio total: Adicional del 5% por reservar para 2 en horario concurrido', function() {
        var precioTotal = reservaPara2EnHoraConcurrida.calcularPrecioTotal();
        expect(precioTotal).to.equal(1260);
    });
    it('Descuento del 15% por código DES15 + adicional del 5% por reservar para 2  en horario concurrido', function() {
        var precioTotal = reservaPara2ConCodigoDeDescuentoDES15EnHorarioConcurrido.calcularPrecioTotal();
        expect(precioTotal).to.equal(1080);
    });
    it('Descuento del 15% por código DES15 por reserva para 2  fuera de horario concurrido', function() {
        var precioTotal = reservaPara2ConCodigoDeDescuentoDES15.calcularPrecioTotal();
        expect(precioTotal).to.equal(1020);
    });
    it('Descuento de $200 por código DES200 por reserva para 2 fuera de horario concurrido', function() {
        var precioTotal = reservaPara2ConCodigoDeDescuentoDES200.calcularPrecioTotal();
        expect(precioTotal).to.equal(1000);
    });

    it('Descuento del 10% por código DES1 por reserva para 2 fuera de horario concurrido', function() {
        var precioTotal = reservaPara2ConCodigoDeDescuentoDES1.calcularPrecioTotal();
        expect(precioTotal).to.equal(600);
    });

    it('Descuento del 15% por  reserva para 8 fuera de horario concurrido', function() {
        var precioTotal = reservaPara9.calcularPrecioTotal();
        expect(precioTotal).to.equal(3825);
    });

    it('Descuento del 10% por  reserva para 7 fuera de horario concurrido', function() {
        var precioTotal = reservaPara7.calcularPrecioTotal();
        expect(precioTotal).to.equal(3150);
    });

    it('Descuento del 5% por  reserva para 6 fuera de horario concurrido', function() {
        var precioTotal = reservaPara6.calcularPrecioTotal();
        expect(precioTotal).to.equal(2850);
    });

    it('Adicional del 10% por por reserva para 2 en fin de semana fuera de horario concurrido', function() {
        var precioTotal = reservaDeFinDeSemanaPara2FueraDeHorario.calcularPrecioTotal();
        expect(precioTotal).to.equal(2200);
    });
    it('Adicional del 10% + adicional del 5% por por reserva para 2 en fin de semana dentro de horario concurrido', function() {
        var precioTotal = reservaDeFinDeSemanaPara2EnHorarioConcurrido.calcularPrecioTotal();
        expect(precioTotal).to.equal(2300);
    });





});