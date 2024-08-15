<script>
	import { crossfade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { flip } from 'svelte/animate';
	import Checkbox from '../ui/checkbox/checkbox.svelte';

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
	<li in:receive={{ key: todo.id }} out:send={{ key: todo.id }} animate:flip={{ duration: 200 }}>
		<label>
			<Checkbox on:change={() => store.toggleUrgent(todo.id)} checked={todo.urgent} />
			<Checkbox on:change={() => store.toggleImportant(todo.id)} checked={todo.important} />
			{todo.description}
			<button on:click={() => store.remove(todo)}>x</button>
		</label>
	</li>
{/each}
