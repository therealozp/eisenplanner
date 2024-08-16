<script>
	import { crossfade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';

	import Button from '../ui/button/button.svelte';
	import Checkbox from '../ui/checkbox/checkbox.svelte';
	import { Trash } from 'lucide-svelte';

	export let store;
	export let index;

	const handleSort = (event) => {
		console.log(event);
		store[index].items = event.detail.items;
	};

	const handleFinalize = (event) => {
		console.log(event);
		store[index].items = event.detail.items;
	};
</script>

<div
	use:dndzone={{ items: store[index].items, flipDurationMs: 300 }}
	on:consider={(event) => handleSort(event, 0)}
	on:finalize={(event) => handleFinalize(event, 0)}
>
	{#each store[index].items as todo (todo.id)}
		<div class="my-4 flex h-12 items-center rounded-md bg-slate-700 p-2">
			<div class="mx-2 flex items-center"></div>
			{todo.description}
			<Button on:click={() => store.remove(todo.id)} class="ml-auto" variant="outlined">
				<Trash />
			</Button>
		</div>
	{/each}
</div>
