import { todos, renderTodoList, todoList } from './todos.js';
import { addItem } from './ui-actions.js';

const newItemInput = document.getElementById('new-item-input');
const addItemButton = document.getElementById('add-item-button');

const initializeUI = () => {
  renderTodoList();

  addItemButton.addEventListener('click', (event) => {
    event.preventDefault();
    addItem(todos, newItemInput, renderTodoList);
  });

  todoList.addEventListener('change', (event) => {
    const checkbox = event.target;
    const taskDescription = checkbox.nextSibling;

    const todo = todos.find(
      (todo) => todo.description === taskDescription.textContent,
    );

    if (todo) {
      todo.completed = checkbox.checked;
      renderTodoList();
    }
  });

  todoList.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  todoList.addEventListener('drop', (e) => {
    e.preventDefault();
    const fromIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
    const toIndex = Array.from(todoList.children).indexOf(e.target);

    const [removed] = todos.splice(fromIndex, 1);
    todos.splice(toIndex, 0, removed);

    renderTodoList();
  });
};

export { initializeUI };
