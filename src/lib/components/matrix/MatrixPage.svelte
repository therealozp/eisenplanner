<script>
	import EisenhowerGrid from './EisenhowerGrid.svelte';
	import TodoSquareDnd from './TodoSquareDND.svelte';

	import { todoStore, prefillStore } from '../../stores/todoStore';
	import { onMount } from 'svelte';
	import { updateTodoStore, addTodoItem } from '../../stores/todoStore';

	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import Checkbox from '../ui/checkbox/checkbox.svelte';
	import Input from '../ui/input/input.svelte';

	const initialTodos = [
		{ description: 'Finish the SvelteKit course', urgent: true, important: true, done: false },
		{
			description: 'Prepare the slides for the presentation',
			urgent: true,
			important: true,
			done: false
		},
		{ description: 'Buy a new book', urgent: false, important: true, done: false },
		{ description: 'Write a blog post', urgent: false, important: true, done: false },
		{ description: 'Call the insurance company', urgent: true, important: false, done: false },
		{ description: 'Go to the doctor', urgent: true, important: false, done: false },
		{ description: 'Watch a movie', urgent: false, important: false, done: false },
		{ description: 'Go for a walk', urgent: false, important: false, done: false }
	];
	// for initialization and temporary store
	let todos;
	let dialogOpen = false;

	// props for new todoItem
	let newTodoDescription = '';
	let newTodoUrgent = false;
	let newTodoImportant = false;

	todoStore.subscribe((value) => {
		// console.log('value', value);
		todos = value;
	});

	const handleDrop = (elementID, items, urgency, importance) => {
		// keeping the order invariance in the items by updating the entire store at a time
		const newStatusItems = items.map((item) => {
			if (item.id === elementID) {
				return { ...item, urgent: urgency, important: importance };
			}
			return item;
		});

		updateTodoStore(newStatusItems);
	};

	const handleOpenDialog = (prefilledUrgent, prefilledImportant) => {
		// do this so that the user can open the dialog and have it already customized
		newTodoUrgent = prefilledUrgent;
		newTodoImportant = prefilledImportant;

		dialogOpen = false;
		dialogOpen = true;
	};

	const handleAddTodoItem = () => {
		if (newTodoDescription.trim() !== '') {
			addTodoItem(newTodoDescription, newTodoUrgent, newTodoImportant);
		}
		dialogOpen = false;
	};

	onMount(() => {
		prefillStore(initialTodos);
		console.log('prefilled Todos');
	});
</script>

<Dialog.Root open={dialogOpen}>
	<Dialog.Content class="sm:max-w-[500px]">
		<Dialog.Header>
			<Dialog.Title>Add TODO</Dialog.Title>
			<Dialog.Description>Add item to the Eisenhower Matrix.</Dialog.Description>
		</Dialog.Header>
		<div class="grid gap-4 py-4">
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="desc" class="text-right">Description</Label>
				<Input id="desc" bind:value={newTodoDescription} class="col-span-3 max-h-[150px]" />
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="urgent" class="text-right">Urgent?</Label>
				<Checkbox id="urgent" bind:checked={newTodoUrgent} />
				<Label for="important" class="text-right">Important?</Label>
				<Checkbox id="important" bind:checked={newTodoImportant} />
			</div>
		</div>
		<Dialog.Footer>
			<Button type="submit" on:click={handleAddTodoItem}>Add</Button>
		</Dialog.Footer>
	</Dialog.Content>
	<EisenhowerGrid>
		<div
			slot="urgent_important"
			class=" overlay-scrollbar relative h-full w-full overflow-y-auto overflow-x-hidden border-b-2 border-r-2 border-b-slate-100 border-r-slate-100 p-4"
		>
			<TodoSquareDnd
				store={todos}
				index={0}
				urgent_status={true}
				important_status={true}
				infoMessage="Urgent and important. Get these done first."
				onDrop={handleDrop}
				openDialog={handleOpenDialog}
			/>
		</div>
		<div
			slot="not_urgent_important"
			class="overlay-scrollbar relative h-full w-full overflow-y-auto overflow-x-hidden border-b-2 border-b-slate-100 p-4"
		>
			<TodoSquareDnd
				store={todos}
				index={1}
				urgent_status={false}
				important_status={true}
				infoMessage="Important, but not urgent. Try to schedule these."
				onDrop={handleDrop}
				openDialog={handleOpenDialog}
			/>
		</div>
		<div
			slot="urgent_not_important"
			class="overlay-scrollbar relative h-full w-full overflow-y-auto overflow-x-hidden border border-r-2 border-r-slate-100 p-4"
		>
			<TodoSquareDnd
				store={todos}
				index={2}
				urgent_status={true}
				important_status={false}
				infoMessage="Urgent, but not important. Delegate these."
				onDrop={handleDrop}
				openDialog={handleOpenDialog}
			/>
		</div>
		<div
			slot="not_urgent_not_important"
			class="overlay-scrollbar relative h-full w-full overflow-y-auto overflow-x-hidden p-4"
		>
			<TodoSquareDnd
				store={todos}
				index={3}
				urgent_status={false}
				important_status={false}
				infoMessage="Not important, nor urgent. Do these last, or delete them."
				onDrop={handleDrop}
				openDialog={handleOpenDialog}
			/>
		</div>
	</EisenhowerGrid>
</Dialog.Root>

<style>
	.overlay-scrollbar {
		overflow-y: auto;
		scrollbar-gutter: stable;
		scrollbar-width: thin; /* Firefox */
		scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
		-ms-overflow-style: -ms-autohiding-scrollbar; /* IE and Edge */
	}

	/* For WebKit browsers */
	.overlay-scrollbar::-webkit-scrollbar {
		width: 8px;
		position: absolute; /* Make it overlay */
	}

	.overlay-scrollbar::-webkit-scrollbar-track {
		background: transparent;
	}

	.overlay-scrollbar::-webkit-scrollbar-thumb {
		background-color: rgba(255, 255, 255, 0.3);
		border-radius: 10px;
	}

	.overlay-scrollbar::-webkit-scrollbar-thumb:hover {
		background-color: rgba(255, 255, 255, 0.5);
	}
</style>
