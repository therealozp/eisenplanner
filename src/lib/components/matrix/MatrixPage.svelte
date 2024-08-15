<script>
	import EisenhowerGrid from './EisenhowerGrid.svelte';
	import { createTodoStore } from '$lib/stores/todoStore.js';
	import TodoSquare from './TodoSquare.svelte';

	let todos = createTodoStore([
		{ done: false, description: 'write some docs', urgent: true, important: true },
		{ done: false, description: 'start writing JSConf talk', urgent: true, important: true },
		{ done: true, description: 'buy some milk', urgent: false, important: true },
		{ done: false, description: 'mow the lawn', urgent: true, important: false },
		{ done: false, description: 'feed the turtle', urgent: false, important: false },
		{ done: false, description: 'fix some bugs', urgent: false, important: true }
	]);
</script>

<EisenhowerGrid>
	<div slot="important_and_urgent" class="">
		<TodoSquare store={todos} urgent={true} important={true} />
	</div>
	<div slot="important_and_not_urgent" class="">
		<TodoSquare store={todos} urgent={false} important={true} />
	</div>
	<div slot="not_important_and_urgent" class="">
		<TodoSquare store={todos} urgent={true} important={false} />
	</div>
	<div slot="not_important_and_not_urgent" class="">
		<TodoSquare store={todos} urgent={false} important={false} />
	</div>
</EisenhowerGrid>
