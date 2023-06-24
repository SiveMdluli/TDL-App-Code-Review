const addItem = (todos, input, render) => {
  const newItemText = input.value.trim();

  if (newItemText === '') {
    return;
  }

  const newTodo = {
    description: newItemText,
    completed: false,
    index: todos.length + 1,
  };

  todos.push(newTodo);
  input.value = '';
  render();
};

const clearCompleted = (todos, render) => {
  const updatedTodos = todos.filter((todo) => !todo.completed);
  todos.splice(0, todos.length, ...updatedTodos);

  updatedTodos.forEach((todo, index) => {
    todo.index = index + 1;
  });

  localStorage.setItem('todos', JSON.stringify(updatedTodos));
  render(updatedTodos);
};

export { addItem, clearCompleted };
