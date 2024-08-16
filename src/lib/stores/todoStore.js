import { writable } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';

const createTodoStore = (initial) => {
	const initalTodo = [
		{
			class: 'urgent_important',
			items: []
		},
		{
			class: 'urgent_not_important',
			items: []
		},
		{
			class: 'not_urgent_important',
			items: []
		},
		{
			class: 'not_urgent_not_important',
			items: []
		}
	];

	for (let item in initial) {
		if (item.urgent && item.important) {
			initalTodo[0].items.push(item);
		} else if (item.urgent && !item.important) {
			initalTodo[1].items.push(item);
		} else if (!item.urgent && item.important) {
			initalTodo[2].items.push(item);
		} else {
			initalTodo[3].items.push(item);
		}
	}

	const todoStore = writable(initalTodo);

	const addTodo = (item) => {
		if (item.urgent && item.important) {
			todoStore.update((store) => {
				store[0].items.push(item);
				return store;
			});
		} else if (item.urgent && !item.important) {
			todoStore.update((store) => {
				store[1].items.push(item);
				return store;
			});
		} else if (!item.urgent && item.important) {
			todoStore.update((store) => {
				store[2].items.push(item);
				return store;
			});
		} else {
			todoStore.update((store) => {
				store[3].items.push(item);
				return store;
			});
		}
	};

	const removeTodo = (item) => {
		if (item.urgent && item.important) {
			todoStore.update((store) => {
				store[0].items = store[0].items.filter((i) => i.id !== item.id);
				return store;
			});
		} else if (item.urgent && !item.important) {
			todoStore.update((store) => {
				store[1].items = store[1].items.filter((i) => i.id !== item.id);
				return store;
			});
		} else if (!item.urgent && item.important) {
			todoStore.update((store) => {
				store[2].items = store[2].items.filter((i) => i.id !== item.id);
				return store;
			});
		} else {
			todoStore.update((store) => {
				store[3].items = store[3].items.filter((i) => i.id !== item.id);
				return store;
			});
		}
	};

	const updateTodo = (item) => {};
};
