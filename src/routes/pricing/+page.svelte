<script>
	import { loadStripe } from '@stripe/stripe-js';
	import { Elements, PaymentElement } from 'svelte-stripe';
	import { onMount } from 'svelte';
	import { PUBLIC_STRIPE_KEY } from '$env/static/public';

	let stripe = null;
	let clientSecret = null; // This will be set when the component mounts
	let elements = null;

	onMount(async () => {
		stripe = await loadStripe(PUBLIC_STRIPE_KEY);
		// Fetch client secret from your server
		clientSecret = await createPaymentIntent();
	});

	const createPaymentIntent = async () => {
		const response = await fetch('/create-payment-intent', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({})
		});
		const data = await response.json();
		return data.client_secret;
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: 'https://your-site.com/return-url'
			}
		});

		if (error) {
			console.error('Payment failed', error);
		}
	};
</script>

{#if clientSecret}
	<form on:submit|preventDefault={handleSubmit}>
		<Elements {stripe} {clientSecret} bind:elements>
			<PaymentElement />
		</Elements>
		<button type="submit">Pay</button>
	</form>
{:else}
	<p>Loading...</p>
{/if}
