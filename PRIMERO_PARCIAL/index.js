const Vehiculos = [
    {id:1,nombre:"audi A3",carroceria:"hatchback",precio:35000,presupuesto_del_auto:"noble",path:"./assets/nobles-y-deportivos/audi-a3.png"},
    {id:2,nombre:"Chevrolet Cruze",carroceria:"sedan",precio:17500,presupuesto_del_auto:"noble",path:"./assets/nobles-y-deportivos/chevrolet-cruze.png"},
    {id:3,nombre:"fiat Cronos",carroceria:"sedan",precio:20000,presupuesto_del_auto:"noble",path:"./assets/nobles-y-deportivos/fiat-kronnos.png"},
    {id:4,nombre:"Nissan Sentra",carroceria:"sedan",precio:23000,presupuesto_del_auto:"noble",path:"./assets/nobles-y-deportivos/nissan-sentra.png"},    
    {id:5,nombre:"Toyota Corolla",carroceria:"sedan",precio:35000,presupuesto_del_auto:"noble",path:"./assets/nobles-y-deportivos/toyota-corolla.png"},
    {id:6,nombre:"Volkswagen golf",carroceria:"hatchback",precio:20000,presupuesto_del_auto:"noble",path:"./assets/nobles-y-deportivos/volkswagen-golf.png"},
    {id:7,nombre:"Aston Martin db11",carroceria:"coupe",precio:120000,presupuesto_del_auto:"deportivo",path:"./assets/premiums-y-superdeportivos/aston-martin-db11.png"},
    {id:8,nombre:"Audi r8",carroceria:"Deportivo coupe",precio:140000,presupuesto_del_auto:"deportivo",path:"./assets/premiums-y-superdeportivos/audi-r8.png"},
    {id:9,nombre:"Chevrolet Corvette",carroceria:"Deportivo Coupe",precio:100000,presupuesto_del_auto:"deportivo",path:"./assets/premiums-y-superdeportivos/chevrolet-corvette.png"},
    {id:10,nombre:"Ford Mustang",carroceria:"Deportivo Coupe",precio:70000,presupuesto_del_auto:"deportivo",path:"./assets/premiums-y-superdeportivos/ford-mustang.png"},
    {id:11,nombre:"Mercedes Benz Amg",carroceria:"Deportivo Coupe",precio:230000,presupuesto_del_auto:"deportivo",path:"./assets/premiums-y-superdeportivos/mercedes-benz-amg.png"},
    {id:12,nombre:"Porsche 911",carroceria:"Deportivo Coupe",precio:140000,presupuesto_del_auto:"deportivo",path:"./assets/premiums-y-superdeportivos/porsche-911.png"}
]
let ReservasRealizadas = [

]
/*------------------- CREAR LAS SECCIONES DE LOS AUTOS ---------------------------------*/

function CrearLosDivsDeLosAutos(Lista_autos){
    let textAutos = "";
    Lista_autos.forEach(Vehiculo => {
        textAutos += `<div class="card-Auto">
                            <img class="Auto-img"src="${Vehiculo.path}" alt="alt_de_${Vehiculo.path}">
                            <div class = "div-nombre-precio-vehiculo">
                                <h3>${Vehiculo.nombre}</h3>
                                <p>$${Vehiculo.precio}</p>
                            </div>
                            <button class="botones-mas-info" id=${Vehiculo.id}>solicita mas informacion</button>
                            </div>`});
return textAutos
}
function dibujarLosAutosEnPantalla(lista_filtrada,clase_para_el_query){
    const vehiculos_query = document.querySelector(clase_para_el_query);
    let text = CrearLosDivsDeLosAutos(lista_filtrada)
    vehiculos_query.innerHTML = text;

}

function añadirVehiculosALaPagina(palabra_filtro,clase_para_el_query){
    const lista_filtrada = Vehiculos.filter(vehiculo => vehiculo.presupuesto_del_auto === palabra_filtro)
    dibujarLosAutosEnPantalla(lista_filtrada,clase_para_el_query)
}
/*---------- Ordenar Por Precio ------------*/

/*MENOR A MAYOR*/

function OrdenarPorPrecioMenorAMayor(palabra_filtro,clase_para_el_query,boton){
    const precio_menor_a_mayor = document.getElementById(boton)
    agregarListaOrdenadaAPaginaMenorAMayor(precio_menor_a_mayor,palabra_filtro,clase_para_el_query)
    }
function agregarListaOrdenadaAPaginaMenorAMayor(PrecioElement,palabra_filtro,clase_para_el_query){
    PrecioElement.addEventListener("click", () =>{
        const lista_filtrada = Vehiculos.filter(vehiculo => vehiculo.presupuesto_del_auto === palabra_filtro)
        const lista_ordenada = lista_filtrada.sort((vehiculo1,vehiculo2) => vehiculo1.precio -vehiculo2.precio)
        dibujarLosAutosEnPantalla(lista_ordenada,clase_para_el_query)
    })
}

/*MAYOR A MENOR*/
function OrdenarPorPrecioMayorAMenor(palabra_filtro,clase_para_el_query,boton){
    const precio_mayor_a_menor= document.getElementById(boton)
    agregarListaOrdenadaAPaginaMayorAMenor(precio_mayor_a_menor,palabra_filtro,clase_para_el_query)
    }
    
function agregarListaOrdenadaAPaginaMayorAMenor(PrecioElement,palabra_filtro,clase_para_el_query){
    PrecioElement.addEventListener("click", () =>{
        const lista_filtrada = Vehiculos.filter(vehiculo => vehiculo.presupuesto_del_auto === palabra_filtro)
        const lista_ordenada = lista_filtrada.sort((vehiculo1,vehiculo2) => vehiculo2.precio -vehiculo1.precio)
        dibujarLosAutosEnPantalla(lista_ordenada,clase_para_el_query)
    })
}

/*---------- Funcionamiento del submit ------------*/

function GuardarDatosDelUsarlo(){
    const form = document.getElementById("id-form-vehiculos")
    form.addEventListener("submit",(event) =>{
        event.preventDefault()
        const input_nombre = document.getElementById("fname").value
        const input_email = document.getElementById("Emal").value
        const input_vehiculo = document.getElementById("Vehiculoname").value
        if(ValidarVehiculo(input_vehiculo)){
            ReservasRealizadas.push({"nombre": input_nombre,
            "email_contacto":input_email,
            "vehiculo_reservado":input_vehiculo
            })
            agregarAllocalStorage()
        }else{
            alert("ERROR. EL VEHICULO INGRESADO NO EXISTE. INTENTE NUEVAMENTE")
        }
    })
}

/* Validaciones del form */
function ValidarVehiculo(input_vehiculo){
    const boolean = Vehiculos.some(vehiculo => vehiculo.nombre.toLocaleLowerCase() === input_vehiculo.toLocaleLowerCase())
    return boolean 
}

/* ---------- FUNCIONES DEL LOCALSTORAGE ------------*/


function agregarAllocalStorage(){
    let ReservasRealizadasJSON = JSON.stringify(ReservasRealizadas)
    localStorage.setItem("ResevervasTotalesDeLaWeb",ReservasRealizadasJSON)
    console.table(JSON.parse(ReservasRealizadasJSON))
}

function traerLocalStorage(){
    const ReservasRealizadasJson = JSON.parse(localStorage.getItem("ResevervasTotalesDeLaWeb"))
    console.log(ReservasRealizadasJson)
    if(!(ReservasRealizadasJson === null) && ReservasRealizadasJson.length > 0){
        ReservasRealizadas = ReservasRealizadasJson;
        console.log("test de traerLocalStorage")
    }
}

/* ---------- FUNCIONES DEL BOTON DEL SSOLICITA MAS INFORMACION ------------*/
function agregarProducto(id) {
    const input_auto = document.getElementById("Vehiculoname")
    for (const vehiculo of Vehiculos) {
        if (vehiculo.id === id) {
            console.log(vehiculo.nombre)
            input_auto.value = vehiculo.nombre
            break;
        }
    }
}

function asociarBotonesAgregar() {
    let botones = document.querySelectorAll(".botones-mas-info");
    for (let i = 0; i < botones.length; i++) {
        botones[i].addEventListener("click", function() {
            agregarProducto(Number(this.id));
        });}
}

function init (){
    traerLocalStorage()
    añadirVehiculosALaPagina("noble",".contenedor-de-vehiculos-nobles",)
    añadirVehiculosALaPagina("deportivo",".contenedor-de-vehiculos-deportivos")
    OrdenarPorPrecioMenorAMayor("noble",".contenedor-de-vehiculos-nobles","botones-precios↓-noble")
    OrdenarPorPrecioMayorAMenor("noble",".contenedor-de-vehiculos-nobles","botones-precios↑-noble")
        OrdenarPorPrecioMenorAMayor("deportivo",".contenedor-de-vehiculos-deportivos","botones-precios↓-deportivo")
    OrdenarPorPrecioMayorAMenor("deportivo",".contenedor-de-vehiculos-deportivos","botones-precios↑-deportivo")
    asociarBotonesAgregar()
    GuardarDatosDelUsarlo()
}
init()