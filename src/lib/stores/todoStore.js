import { writable } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';

const createTodoStore = (initial) => {
	const todos = initial.map(({ description, urgent, important, done }) => {
		return { id: uuidv4(), description, urgent, important, done };
	});

	const { subscribe, update } = writable(todos);

	return {
		subscribe,

		add: (description, urgent, important) => {
			const task = { id: uuidv4(), description, urgent, important, done: false };
			update(($todos) => [...$todos, task]);
		},
		remove: (id) => {
			update(($todos) => $todos.filter((todo) => todo.id !== id));
		},
		toggleDone: (id) => {
			update(($todos) => {
				return $todos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo));
			});
		},

		toggleUrgent: (id) =>
			update(($todos) => {
				console.log('call to update urgent received.');
				return $todos.map((todo) => (todo.id === id ? { ...todo, urgent: !todo.urgent } : todo));
			}),

		toggleImportant: (id) =>
			update(($todos) => {
				return $todos.map((todo) =>
					todo.id === id ? { ...todo, important: !todo.important } : todo
				);
			})
	};
};

export { createTodoStore };
