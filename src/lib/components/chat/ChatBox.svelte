<script>
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import { beforeUpdate, afterUpdate } from 'svelte';
	import autosize from 'autosize';
	import { onMount } from 'svelte';
	import { systemMessage, appendTodoToMessage } from '$lib';
	import { todoStore } from '$lib/stores/todoStore';
	import Button from '../ui/button/button.svelte';
	import { addTodoItem, removeTodoItem } from '$lib/stores/todoStore';
	import { MessageSquare, CircleX } from 'lucide-svelte';

	let inProgress = false;

	let div;
	let autoscroll = false;

	onMount(() => {
		const textarea = document.getElementById('autoExpand');
		autosize(textarea);

		textarea.addEventListener('autosize:resized', function () {
			console.log(textarea.scrollHeight);
			if (textarea.scrollHeight > 150) {
				textarea.style.height = '150px';
				textarea.style.overflowY = 'scroll'; // Add scroll when max height is reached
			} else {
				textarea.style.overflowY = 'hidden'; // Hide scroll if under max height
			}
		});
	});

	beforeUpdate(() => {
		if (div) {
			const scrollableDistance = div.scrollHeight - div.offsetHeight;
			autoscroll = div.scrollTop > scrollableDistance - 20;
		}
	});

	afterUpdate(() => {
		if (autoscroll) {
			div.scrollTo(0, div.scrollHeight);
		}
	});

	let messages = [systemMessage];
	let currentInput = '';
	let todos;

	let showChat = false;

	todoStore.subscribe((value) => {
		// console.log('value', value);
		todos = value;
	});

	const handleResponse = (data) => {
		const reply = {
			role: 'assistant',
			content: data.content
		};
		messages = [...messages, reply];
		const actions = data.actions || [];

		actions.forEach((action) => {
			const actionType = action.action;
			const todo = action.todo;
			if (actionType === 'add') {
				addTodoItem(todo.description, todo.urgent, todo.important);
			} else if (actionType === 'remove') {
				removeTodoItem(todo.id);
			} else if (actionType === 'update') {
				console.log('DEBUG Chatbox: update');
				// updateTodoItem(todo.id, todo.urgent, todo.important);
			}
		});
	};

	async function fetchResponse(messagesProp) {
		const response = await fetch('api/chat', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ messages: messagesProp })
		});
		console.log(response);
		const data = await response.json();
		console.log(data);
		if (data.content) {
			handleResponse(data);
		} else {
			console.error('No response from server');
			messages = [
				...messages,
				{
					role: 'assistant',
					content: 'Sorry, everything went black for a second. Can you try that again?'
				}
			];
		}
	}

	async function handleKeydown(event) {
		// Check if Enter is pressed without Shift (prevent newline insertion)
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault(); // Prevents the default newline character
			if (currentInput.trim() !== '') {
				// Ensure there's text to send
				const userMessage = {
					role: 'user',
					content: currentInput.trim(),
					todos: todos
				};
				const serverUserMessage = {
					role: 'user',
					content: appendTodoToMessage(currentInput.trim(), todos)
				};
				const tmp_messages = [...messages, serverUserMessage];
				messages = [...messages, userMessage];
				currentInput = '';
				inProgress = true;
				await fetchResponse(tmp_messages);
				inProgress = false;
			}
		}
	}
</script>

<div class={`${!showChat ? 'visible' : 'invisible'} fixed bottom-4 right-4`}>
	<Button
		size="icon"
		on:click={() => {
			showChat = !showChat;
			console.log(showChat);
		}}><MessageSquare /></Button
	>
</div>
<div
	class={`${showChat ? 'visible' : 'invisible'} add-box-shadow fixed bottom-2 right-2 flex h-[540px] w-[720px] flex-col items-center rounded-md bg-slate-800`}
>
	<div
		class="bg-slate relative flex w-full flex-auto flex-col overflow-y-auto p-4 pr-6"
		bind:this={div}
	>
		<header class="sticky mb-4 flex h-16 items-center justify-between">
			<h2
				class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
			>
				AI Eisen
			</h2>
			<Button variant="outlined" size="icon" on:click={() => (showChat = false)} class="-mt-2"
				><CircleX /></Button
			>
		</header>
		<div class="h-16" />

		{#each messages as message}
			<article
				class={`my-2 ${message.role == 'user' ? 'text-right' : message.role == 'system' ? 'hidden' : ''}`}
			>
				<span
					class={`inline-block max-w-lg break-words rounded-lg px-4 py-2 ${
						message.role === 'user'
							? 'rounded-br-none bg-blue-500 text-white'
							: 'rounded-bl-none bg-stone-100 text-black'
					}`}>{message.content}</span
				>
			</article>
		{/each}
	</div>

	<div id="input-container" class="w-full overflow-x-hidden p-4">
		<Textarea
			on:keydown={handleKeydown}
			placeholder="Type your message..."
			class="w-fulls max-h-40 resize-none overflow-x-hidden rounded-lg border p-2 text-base focus:border-stone-500 focus:outline-none"
			bind:value={currentInput}
			id="autoExpand"
			disabled={inProgress}
		/>
	</div>
</div>

<style>
	.container {
		background: linear-gradient(135deg, #0d0d19, #0a0a14);
	}
	.add-box-shadow {
		box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
	}
</style>
