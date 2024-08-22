import Stripe from 'stripe';
import { SECRET_STRIPE_KEY } from '$env/static/private';

// Initialize Stripe
const stripe = new Stripe(SECRET_STRIPE_KEY);
export async function POST() {
	// console.log(SECRET_STRIPE_KEY);
	const paymentIntent = await stripe.paymentIntents.create({
		amount: 2000,
		currency: 'usd',
		payment_method_types: ['card']
	});

	return new Response(JSON.stringify({ client_secret: paymentIntent.client_secret }), {
		status: 200
	});
}
