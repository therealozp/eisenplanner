<script>
	export let todo;
</script>

<div>
	<label in:receive={{ key: todo.id }} out:send={{ key: todo.id }} animate:flip={{ duration: 200 }}>
		<Checkbox on:change={() => $store.toggleDone(todo.id)} checked={todo.done} />
		<Checkbox on:change={() => store.toggleUrgent(todo.id)} checked={todo.urgent} />
		<Checkbox on:change={() => store.toggleImportant(todo.id)} checked={todo.important} />
		{todo.description}
		<button on:click={() => store.remove(todo)}>x</button>
	</label>
</div>
