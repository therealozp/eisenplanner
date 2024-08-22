<script>
	import Button from '../ui/button/button.svelte';
	import { User } from 'lucide-svelte';
</script>

<nav>
	<div class="flex h-16 w-screen flex-shrink-0 items-center justify-between p-4">
		<div>
			<img src="/eisen.svg" alt="EisenPlanner" class="h-10" />
		</div>
		<div class="flex items-center">
			<Button variant="outlined" class="mr-4">Home</Button>
			<Button variant="outlined" class="mr-4">About</Button>
			<Button variant="outlined" class="mr-4">Contact</Button>
			<Button variant="outlined" class="mr-4">Login</Button>
			<Button variant="contained">Sign Up</Button>
		</div>
		<div>
			<User size="24" />
		</div>
	</div>
</nav>
