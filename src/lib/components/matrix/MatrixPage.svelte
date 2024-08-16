<script>
	import EisenhowerGrid from './EisenhowerGrid.svelte';
	import TodoSquare from './TodoSquare.svelte';
	import TodoSquareDnd from './TodoSquareDND.svelte';
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';

	import { v4 as uuidv4 } from 'uuid';

	const todos = [
		{
			status: 'urgent_important',
			items: [
				{ id: uuidv4(), description: 'Finish the SvelteKit course', urgent: true, important: true },
				{
					id: uuidv4(),
					description: 'Prepare the slides for the presentation',
					urgent: true,
					important: true
				}
			]
		},
		{
			status: 'not_urgent_important',
			items: [
				{ id: uuidv4(), description: 'Buy a new book', urgent: false, important: true },
				{ id: uuidv4(), description: 'Write a blog post', urgent: false, important: true }
			]
		},
		{
			status: 'urgent_not_important',
			items: [
				{ id: uuidv4(), description: 'Call the insurance company', urgent: true, important: false },
				{ id: uuidv4(), description: 'Go to the doctor', urgent: true, important: false }
			]
		},
		{
			status: 'not_urgent_not_important',
			items: [
				{ id: uuidv4(), description: 'Watch a movie', urgent: false, important: false },
				{ id: uuidv4(), description: 'Go for a walk', urgent: false, important: false }
			]
		}
	];
</script>

<EisenhowerGrid>
	<div
		slot="urgent_important"
		class="overflow-y-auto border-b-2 border-r-2 border-b-slate-100 border-r-slate-100 p-4"
	>
		<TodoSquareDnd store={todos} index={0} />
	</div>
	<div slot="not_urgent_important" class="overflow-y-auto border border-b-2 border-b-slate-100 p-4">
		<TodoSquareDnd store={todos} index={1} />
	</div>
	<div slot="urgent_not_important" class="overflow-y-auto border border-r-2 border-r-slate-100 p-4">
		<TodoSquareDnd store={todos} index={2} />
	</div>
	<div slot="not_urgent_not_important" class="overflow-y-auto p-4">
		<TodoSquareDnd store={todos} index={3} />
	</div>
</EisenhowerGrid>
