<script>
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';

	import Button from '../ui/button/button.svelte';
	import Checkbox from '../ui/checkbox/checkbox.svelte';
	import * as Tabs from '../ui/tabs/index';
	import * as Tooltip from '../ui/tooltip/index';

	import { Info, Trash, Plus } from 'lucide-svelte';

	import { removeTodoItem, updateTodoItemDone } from '$lib/stores/todoStore';

	export let store;
	export let urgent_status;
	export let important_status;
	export let infoMessage;
	export let onDrop;
	export let openDialog;

	$: items = store.filter(
		(item) => item.urgent === urgent_status && item.important === important_status
	);
	$: inProgressItems = items.filter((item) => !item.done);
	$: completedItems = items.filter((item) => item.done);

	const handleSort = (event) => {
		// console.log(event);
		items = event.detail.items;
	};

	const handleFinalize = (event) => {
		// console.log(event.detail);
		// optimistically update for better UX
		items = event.detail.items;
		// Update the item's status and reorder the list
		const elementID = event.detail.info.id;
		onDrop(elementID, items, urgent_status, important_status);
	};

	const handleUpdateDone = (elementID, done_status) => {
		updateTodoItemDone(elementID, done_status);
	};

	let todoItemColor = 'bg-slate-100';
	if (urgent_status && important_status) {
		todoItemColor = 'bg-rose-600';
	} else if (urgent_status && !important_status) {
		todoItemColor = 'bg-teal-600';
	} else if (!urgent_status && important_status) {
		todoItemColor = 'bg-amber-600';
	} else {
		todoItemColor = 'bg-slate-600';
	}
</script>

<Tabs.Root value="in_progress" class="h-full">
	<div class="flex items-center">
		<Tabs.List class="mb-2">
			<Tabs.Trigger value="in_progress">In Progress</Tabs.Trigger>
			<Tabs.Trigger value="completed">Completed</Tabs.Trigger>
		</Tabs.List>
		<div class="ml-4">
			<Tooltip.Root>
				<Tooltip.Trigger>
					<Info size="20" />
				</Tooltip.Trigger>
				<Tooltip.Content>
					<p>{infoMessage}</p>
				</Tooltip.Content>
			</Tooltip.Root>
		</div>
		<div class="ml-4">
			<Button
				size="icon"
				variant="outline"
				class="-mt-2"
				on:click={() => openDialog(urgent_status, important_status)}
			>
				<Plus size="20" /></Button
			>
		</div>
	</div>

	<Tabs.Content value="in_progress" class="h-full">
		<div
			use:dndzone={{ items: items, flipDurationMs: 300, type: 'in_progress' }}
			on:consider={(event) => handleSort(event)}
			on:finalize={(event) => handleFinalize(event)}
			class="min-h-full"
		>
			{#each inProgressItems as todo (todo.id)}
				<div
					class={`bg- mb-4 flex min-h-14 items-center rounded-md p-2 ` + todoItemColor}
					animate:flip={{ duration: 300 }}
				>
					<div class="mx-2 flex items-center">
						<Checkbox checked={todo.done} on:click={() => handleUpdateDone(todo.id, !todo.done)} />
					</div>
					<p>{todo.description}</p>
					<Button on:click={() => removeTodoItem(todo.id)} class="ml-auto" variant="outlined">
						<Trash />
					</Button>
				</div>
			{/each}
		</div>
	</Tabs.Content>
	<Tabs.Content value="completed" class="h-full">
		<div class="min-h-full">
			{#each completedItems as todo (todo.id)}
				<div
					class={`bg- mb-4 flex min-h-14 items-center rounded-md bg-slate-900 p-2`}
					animate:flip={{ duration: 300 }}
				>
					<div class="mx-2 flex items-center">
						<Checkbox checked={todo.done} on:click={() => handleUpdateDone(todo.id, !todo.done)} />
					</div>
					<p class="line-through">{todo.description}</p>
					<Button on:click={() => removeTodoItem(todo.id)} class="ml-auto" variant="outlined">
						<Trash />
					</Button>
				</div>
			{/each}
		</div>
	</Tabs.Content>
</Tabs.Root>
