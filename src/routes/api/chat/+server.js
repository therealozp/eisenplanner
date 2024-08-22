import { OPENROUTER_API_KEY } from '$env/static/private';

export const POST = async ({ request }) => {
	const body = await request.json();
	const { messages } = body;

	try {
		const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${OPENROUTER_API_KEY}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				model: 'meta-llama/llama-3.1-8b-instruct:free',
				messages: messages
			})
		});

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const data = await response.json();
		const content = data.choices[0].message.content;
		// console.log(content);
		const completion = JSON.parse(content);
		// console.log(completion);

		return new Response(
			JSON.stringify({
				content: completion.content,
				actions: completion.actions
			}),
			{
				status: 200,
				headers: { 'Content-Type': 'application/json' }
			}
		);
	} catch (error) {
		return new Response(
			JSON.stringify({
				error: 'An error occurred while processing the request.' + error.message
			}),
			{
				status: 500,
				headers: { 'Content-Type': 'application/json' }
			}
		);
	}
};
