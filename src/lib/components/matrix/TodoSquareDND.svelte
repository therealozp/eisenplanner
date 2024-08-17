<script>
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';

	import Button from '../ui/button/button.svelte';
	import Checkbox from '../ui/checkbox/checkbox.svelte';
	import { Trash } from 'lucide-svelte';

	import { updateTodoItem, removeTodoItem } from '$lib/stores/todoStore';

	export let store;
	export let index;
	export let urgent_status;
	export let important_status;

	$: items = $store.filter(
		(item) => item.urgent === urgent_status && item.important === important_status
	);

	const handleSort = (event) => {
		// console.log(event);
		items = event.detail.items;
	};

	const handleFinalize = (event) => {
		console.log('finalized', event);
		items = event.detail.items;
		const elementID = event.detail.info.id;
		if (event.detail.info.trigger == 'droppedIntoZone') {
			console.log('update has been triggered');
			updateTodoItem(elementID, urgent_status, important_status);
			console.log('elementID: ', elementID, 'has been moved to: ', urgent_status, important_status);
		}
	};
</script>

<div
	use:dndzone={{ items: items, flipDurationMs: 300 }}
	on:consider={(event) => handleSort(event, 0)}
	on:finalize={(event) => handleFinalize(event, 0)}
	class="min-h-full"
>
	{#each items as todo (todo.id)}
		<div
			class="mb-4 flex min-h-14 items-center rounded-md bg-slate-700 p-2"
			animate:flip={{ duration: 300 }}
		>
			<div class="mx-2 flex items-center">
				<Checkbox checked={todo.done} />
			</div>
			<p>{todo.description}</p>
			<Button on:click={() => store.remove(todo.id)} class="ml-auto" variant="outlined">
				<Trash />
			</Button>
		</div>
	{/each}
</div>
