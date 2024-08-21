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
			<Button variant="outlined" class="mr-4"><a href="/">Home</a></Button>
			<Button variant="outlined" class="mr-4"><a href="/about">About</a></Button>
			<Button variant="outlined" class="mr-4"><a href="/contact">Contact</a></Button>
			<Button variant="outlined" class="mr-4"><a href="/pricing">Pricing</a></Button>
			<Button variant="outlined" class="mr-4"><a href="/login">Login</a></Button>
			<Button variant="contained"><a href="/signup">Sign Up</a></Button>
		</div>
		<div>
			<User size="24" />
		</div>
	</div>
</nav>