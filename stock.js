//variables
const botonCreador = document.querySelector(".boton")
const contenedorItems = document.querySelector(".item_container")

const tareaNombre = document.querySelector("#tarea_nombre")
const prioridad = document.querySelector("#prioridad")
const calendario = document.querySelector("#fecha")
const nombreItem = document.querySelector(".nombre_item")
const contenedorItemCompleto = document.querySelector(".contenedor_item-completos")
const listadoDeTareas = []





//events

botonCreador.addEventListener("click", crearItem)

document.addEventListener('DOMContentLoaded', () => {
    contenedorItemCompleto.classList.add("oculto");
});


function crearItem(e){
   
    //datos del item
    let nombre = tareaNombre.value;
    let prioridadTexto = "prioridad: " + prioridad.value
    let fechaLimite = "fecha limite: " + calendario.value

    //elemento nombre
    const divNombre = document.createElement("div")
    divNombre.classList.add("div_nombre")
    divNombre.textContent = nombre

    //elemento fecha
    const fecha = document.createElement("div")
    fecha.classList.add("div_fecha")
    fecha.textContent = fechaLimite

    //elemento prioridad
    const divPrioridad = document.createElement("div")
    divPrioridad.classList.add("div_prioridad")
    divPrioridad.textContent = prioridadTexto

    // bloque que contiene -prioridad, -fecha y ambos botones
    const contenedorDerecho = document.createElement("div")
    contenedorDerecho.classList.add("contenedor_derecho")
    
    // crea contenedor de datos
    const contenedorDatos = document.createElement("div")
    contenedorDatos.classList.add("contenedor_datos")

    //crea botones de borrar y completado
    const iconoBorrar = document.createElement("button")
    iconoBorrar.classList.add("icono_borrar")
    iconoBorrar.textContent = "X"
    const iconoCompleto = document.createElement("button")
    iconoCompleto.classList.add("icono_completo")
    iconoCompleto.textContent = "+"

    //adjudica un color al contenedor dependiendo de la prioridad de la actividad
    if(prioridad.value == "baja"){
        contenedorDatos.classList.remove("alta")
        contenedorDatos.classList.remove("media")
        contenedorDatos.classList.add("baja")
    }else if(prioridad.value == "alta"){
        contenedorDatos.classList.remove("baja")
        contenedorDatos.classList.remove("media")
        contenedorDatos.classList.add("alta")

    }else{
        contenedorDatos.classList.remove("baja")
        contenedorDatos.classList.remove("alta")
        contenedorDatos.classList.add("media")
    }

    //oculta la fecha del contenedor en caso de que no se complete el input
    if(!calendario.value){
        fecha.classList.add("oculto")
    }

    //alert de la validacion
    if(nombre === "" || prioridad.value == "prioridad"){
        alert("debes completar por lo menos el nombre y la prioridad de la actividad")
        return
    }
    
    //da forma final al contenedor
    contenedorDatos.appendChild(divNombre)

    contenedorDerecho.append(divPrioridad, fecha, iconoCompleto, iconoBorrar)
    
    
   contenedorDatos.appendChild(contenedorDerecho)
    contenedorItems.appendChild(contenedorDatos)
  
    //resetea los input
    tareaNombre.value = ""
    prioridad.value = "prioridad"
    calendario.value = ""


    

    //funcionalidad al boton borrar
    iconoBorrar.addEventListener("click", e=>{
        iconoBorrar.parentElement.parentElement.remove()
       
    })

    
    //funcionalidad al boton completado
    iconoCompleto.addEventListener("click", e=>{

        //variables a completar para que se transmitan al item completado
        const item = e.target;
        const itemTodo = item.parentElement.parentElement
 
        //animacion
        itemTodo.classList.add("completado")

        //datos a transmitir
        const nombreItemCompleto = itemTodo.firstChild.textContent
        const prioridaItemCompleto = item.parentElement.firstChild.textContent
        

       
        if(contenedorItemCompleto.firstChild){
            contenedorItemCompleto.classList.remove("oculto")
        }
      
        
        //espera a que termine animacion para crear la lista de completados
        setTimeout(() => {
            guardar()
         }, 500);

         
        function guardar(){
            //contenedor padre
            const contDivCompletado = document.createElement("div")
            contDivCompletado.classList.add("completadoDiv")

            //nombre
            const containerNombre = document.createElement("div")
            containerNombre.classList.add("nombre_completado")
            containerNombre.textContent = `${nombreItemCompleto}`

            //prioridad
            const containerPrioridad = document.createElement("div")
            containerPrioridad.classList.add("prioridad_completado")
            containerPrioridad.textContent = `${prioridaItemCompleto}`
            
            //boton borrar
            const iconoBorrar2 = document.createElement("button")
            iconoBorrar2.classList.add("icono_borrar-2")
            iconoBorrar2.textContent = "X"

            //borra el item de la lista
            iconoBorrar2.addEventListener("click", e=>{
                iconoBorrar2.parentElement.remove()
            })
            
            
            contDivCompletado.append(containerNombre, containerPrioridad, iconoBorrar2)
           
            contenedorItemCompleto.appendChild(contDivCompletado)
            itemTodo.remove()

          
            
        }
        
    })
 
}
