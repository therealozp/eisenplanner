<script>
    import { loadStripe } from '@stripe/stripe-js';
    import { Elements, PaymentElement } from 'svelte-stripe';
    import { onMount } from 'svelte';
    import { PUBLIC_STRIPE_KEY } from '$env/static/public';
  
    let stripe;
    let clientSecret = ''; // This will be set when the component mounts
    let elements;
  
    onMount(async () => {
      stripe = await loadStripe(PUBLIC_STRIPE_KEY);
  
      // Fetch client secret from your server
      const response = await fetch('/create-payment-intent', {
        method: 'POST'
      });
      const { clientSecret: secret } = await response.json();
      clientSecret = secret;
    });
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: 'https://your-site.com/return-url',
        },
      });
  
      if (error) {
        console.error('Payment failed', error);
      }
    };
  </script>
  
  <Elements {stripe} {clientSecret} bind:elements>
    <form on:submit|preventDefault={handleSubmit}>
      <PaymentElement />
      <button type="submit">Pay</button>
    </form>
  </Elements>