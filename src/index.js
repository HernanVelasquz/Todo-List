import './styles.css';
import { Todo, TodoList } from './classes';
import { crearTodoHtml } from './js/componentes';


export const todoList = new TodoList();

todoList.todos.forEach( crearTodoHtml );

/* El argumento del forEach, hace referencia a  todo => crearTodoHtml(todo)*/

console.log('Todos', todoList.todos);  