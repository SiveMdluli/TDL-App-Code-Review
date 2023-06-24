import { addItem, clearCompleted } from './ui-actions.js';

const todoList = document.getElementById('todo-list');
const input = document.getElementById('new-item-input');
const addItemButton = document.getElementById('add-item-button');
const clearCompletedButton = document.getElementById('clear-completed-button');

const todos = JSON.parse(localStorage.getItem('todos')) || [];

const renderTodoList = () => {
  todoList.innerHTML = '';

  todos.forEach((todo, index) => {
    todo.index = index + 1;

    const todosListItem = document.createElement('li');
    todosListItem.classList.add('task-list-item');

    const checkboxWrapper = document.createElement('label');
    checkboxWrapper.classList.add('checkbox-wrapper');

    const checkbox = document.createElement('input');
    checkbox.classList.add('checkbox');

    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;

    const checkmark = document.createElement('span');
    checkmark.classList.add('checkmark');

    checkboxWrapper.appendChild(checkbox);
    checkboxWrapper.appendChild(checkmark);

    const taskDescription = document.createElement('span');
    taskDescription.classList.add('task-description');
    taskDescription.textContent = todo.description;

    if (todo.completed) {
      taskDescription.classList.add('completed');
    }

    const icon = document.createElement('span');
    icon.classList.add('fas', 'fa-ellipsis-v');
    icon.style.color = '#c8ccd0';

    icon.addEventListener('click', (e) => {
      showOptionsMenu(e);
    });

    function showOptionsMenu(e) {
      const optionsMenus = document.querySelectorAll('.options-menu');
      optionsMenus.forEach((menu) => {
        if (menu !== e.target.querySelector('.options-menu')) {
          menu.remove();
        }
      });

      const optionsMenu = document.createElement('div');
      optionsMenu.classList.add('options-menu');

      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.addEventListener('click', () => {
        editTodo(todo);
        hideOptionsMenu();
      });

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => {
        deleteTodo(todo);
        hideOptionsMenu();
      });

      optionsMenu.appendChild(editButton);
      optionsMenu.appendChild(deleteButton);
      e.target.appendChild(optionsMenu);
    }

    function hideOptionsMenu() {
      const optionsMenu = document.querySelector('.options-menu');
      if (optionsMenu !== null) {
        optionsMenu.remove();
      }
    }

    function editTodo(todo) {
      const todoIndex = todos.indexOf(todo);
      const taskDescription = todoList.querySelector(
        `.task-list-item:nth-child(${todoIndex + 1}) .task-description`,
      );
      const currentDescription = taskDescription.textContent.trim();
      taskDescription.innerHTML = '';

      const form = document.createElement('form');
      form.classList.add('edit-form');
      const input = document.createElement('input');
      input.classList.add('edit-input');
      input.value = currentDescription;
      form.appendChild(input);

      const saveButton = document.createElement('button');
      saveButton.type = 'submit';
      saveButton.textContent = 'Save';
      form.appendChild(saveButton);

      const cancelButton = document.createElement('button');
      cancelButton.type = 'button';
      cancelButton.textContent = 'Cancel';
      form.appendChild(cancelButton);

      taskDescription.appendChild(form);

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const newDescription = input.value.trim();
        if (newDescription !== '') {
          todos[todoIndex].description = newDescription;
          localStorage.setItem('todos', JSON.stringify(todos));
          renderTodoList();
        }
      });

      cancelButton.addEventListener('click', () => {
        taskDescription.innerHTML = currentDescription;
      });
    }

    const deleteTodo = (todo) => {
      const todoIndex = todos.indexOf(todo);
      todos.splice(todoIndex, 1);

      for (let i = todoIndex; i < todos.length; i++) {
        todos[i].index = i + 1;
      }

      localStorage.setItem('todos', JSON.stringify(todos));
      renderTodoList();
    };

    checkbox.addEventListener('change', () => {
      todo.completed = checkbox.checked;
      localStorage.setItem('todos', JSON.stringify(todos));
    });

    todosListItem.appendChild(checkboxWrapper);
    todosListItem.appendChild(taskDescription);
    todosListItem.appendChild(icon);
    todosListItem.draggable = true;
    todoList.appendChild(todosListItem);
  });

  localStorage.setItem('todos', JSON.stringify(todos));

  addItemButton.addEventListener('click', () => {
    addItem(todos, input, renderTodoList);
  });

  clearCompletedButton.addEventListener('click', () => {
    clearCompleted(todos, renderTodoList);
  });
};

export { todos, renderTodoList, todoList };
