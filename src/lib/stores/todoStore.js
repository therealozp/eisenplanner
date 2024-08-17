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

const updateTodoItemDone = (id, done_status) => {
	todoStore.update(($todos) =>
		$todos.map((todo) => {
			if (todo.id === id) {
				return { ...todo, done: done_status };
			}
			return todo;
		})
	);
};

const updateTodoStore = (updatedItems) => {
	todoStore.update(($todos) => {
		// Remove the updated items from the original list and add the reordered items back
		const nonUpdatedItems = $todos.filter(
			(todo) => !updatedItems.find((updatedItem) => updatedItem.id === todo.id)
		);
		return [...nonUpdatedItems, ...updatedItems];
	});

	console.log('DEBUG update todostore');
};

export {
	todoStore,
	prefillStore,
	addTodoItem,
	removeTodoItem,
	updateTodoItemDone,
	updateTodoStore
};
