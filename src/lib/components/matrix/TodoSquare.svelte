<script>
	import { crossfade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { flip } from 'svelte/animate';

	import Button from '../ui/button/button.svelte';
	import Checkbox from '../ui/checkbox/checkbox.svelte';
	import { Trash } from 'lucide-svelte';

	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 200),
		fallback(node, params) {
			// get computed style first
			const style = getComputedStyle(node);
			const transform = style.transform == 'none' ? '' : style.transform;

			return {
				duration: 600,
				easing: quintOut,
				css: (t) => `
                    transform: ${transform} scale(${t});
                    opacity: ${t}
                `
			};
		}
	});

	export let store;
	export let urgent;
	export let important;
</script>

{#each $store.filter((t) => t.important == important && t.urgent == urgent) as todo (todo.id)}
	<div
		in:receive={{ key: todo.id }}
		out:send={{ key: todo.id }}
		animate:flip={{ duration: 200 }}
		class="my-4 flex h-12 items-center rounded-md bg-slate-700 p-2"
	>
		<div class="mx-2 flex items-center">
			<Checkbox on:click={() => store.toggleUrgent(todo.id)} checked={todo.urgent} class="mx-1" />
			<Checkbox on:click={() => store.toggleImportant(todo.id)} checked={todo.important} />
		</div>
		{todo.description}
		<Button on:click={() => store.remove(todo.id)} class="ml-auto" variant="outlined">
			<Trash />
		</Button>
	</div>
{/each}
