export async function GET({ cookies }) {
	const session = cookies.get('session');

	if (!session) {
		return new Response(JSON.stringify({ error: 'Ikke logget ind' }), {
			status: 401
		});
	}

	return new Response(JSON.stringify({ userId: Number(session) }), {
		headers: { 'Content-Type': 'application/json' },
		status: 200
	});
}