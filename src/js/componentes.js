import { Todo } from '../classes';
import { todoList } from '../index'

// Referencias los Elemtos Html
const divTodoList  = document.querySelector('.todo-list');
const txtInput     = document.querySelector('.new-todo');
const btnBorrarAll = document.querySelector('.clear-completed');
const ulFiltros    = document.querySelector('.filters');
const anchorfiltro = document.querySelectorAll('.filtro');


/**
 * Funcion encargada de tenerar el codigo HTML, para poder agregar los en la lista
 * agregando un div que contendra todos los elementos de la lista, haciendo referencia
 * el primer hijo que tendra el div.
 */
export const crearTodoHtml = ( todo ) => {
    const htmlTodo = `
    <li class="${ (todo.completado) ? 'completed': '' }" data-id="${ todo.id }">
        <div class="view">
            <input class="toggle" type="checkbox" ${ ( todo.completado ) ? 'checked' : '' }>
            <label>${ todo.tarea }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append( div.firstElementChild );

    return div;
}

/**
 * Evento encargado de detectar la tecla precionada y el contenido de la informacion
 * para validar si el contenido en el input del html no esta vacio, ademas de dectar 
 * la pulsacion de la tecla enter.
  */
txtInput.addEventListener( 'keyup', ( event ) =>{

    if ( event.keyCode === 13 && txtInput.value.length > 0 ){

        const nuevoTodo = new Todo( txtInput.value ); 
        todoList.nuevoTodo( nuevoTodo );
        
        crearTodoHtml( nuevoTodo );
        txtInput.value = '';

    }
});

/**
 * Evento encargado de dectectar si el usuario marca una tarea como completada
 * para cambiar el atributo y el color de esta. Ademas de dectar si hay que borrar
 * un elemento seleccionado
  */
divTodoList.addEventListener('click', ( event ) =>{
    
    const nombreElemento = event.target.localName;
    const todoElemento = event.target.parentElement.parentElement;  
    const todoId = todoElemento.getAttribute('data-id');

    if(nombreElemento.includes('input')){ // click en el check
        todoList.marcarCompletado( todoId );
        todoElemento.classList.toggle('completed');
    }else if (nombreElemento.includes('button')){ // Hay que borrar el todo
        todoList.eliminarTodo( todoId );
        divTodoList.removeChild( todoElemento );
    }
});

/**
 *  Evento encargado de borrar todos loe elementos de la lista completados.
  */
btnBorrarAll.addEventListener('click', () =>{
    
    todoList.eliminarCompletados();

    for( let i = divTodoList.children.length - 1; i >= 0; i-- ){
        
        const elemento = divTodoList.children[i];
        if( elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }
    } 
}); 

/**
 * Evento encargado de aplicar los filtros de los botones generales.
 */
ulFiltros.addEventListener('click', ( event ) =>{

    const filtros = event.target.text;
    if ( !filtros ) { return; }
    anchorfiltro.forEach( elem => elem.classList.remove('selected') );
    event.target.classList.add('selected');

    for(const elemento of divTodoList.children){
        
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch(filtros){
            case 'Pendientes':
                if(completado){
                    elemento.classList.add('hidden');
                }
            break;
            
            case 'Completados':
                if(!completado){
                    elemento.classList.add('hidden');
                }
            break;
        }
    }
});
