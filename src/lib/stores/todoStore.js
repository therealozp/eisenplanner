import { writable } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';

const todoStore = writable([]);

const prefillStore = (initial) => {
	const todos = initial.map(({ description, urgent, important, done }) => {
		return { id: uuidv4(), description, urgent, important, done };
	});

	todoStore.set(todos);
};

const addTodoItem = (description, urgent, important) => {
	const task = { id: uuidv4(), description, urgent, important, done: false };
	todoStore.update(($todos) => [...$todos, task]);
};

const removeTodoItem = (id) => {
	todoStore.update(($todos) => $todos.filter((todo) => todo.id !== id));
};

const updateTodoItem = (id, urgent, important) => {
	todoStore.update(($todos) =>
		$todos.map((todo) => {
			if (todo.id === id) {
				return { id, urgent, important, ...todo };
			}
			return todo;
		})
	);

	console.log('DEBUG updateTodoItem', todoStore);
};

export { todoStore, prefillStore, addTodoItem, removeTodoItem, updateTodoItem };
