import bcrypt from 'bcryptjs';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';

export async function POST({ request, cookies }) {
	try {
		const { username, password } = await request.json();

		console.log('LOGIN USERNAME:', username);

		if (!username || !password) {
			return new Response(JSON.stringify({ error: 'Manglende brugernavn eller password' }), {
				status: 400
			});
		}

		const userData = await db.query.user.findFirst({
			where: eq(user.username, username)
		});

		console.log('FOUND USER:', userData);

		if (!userData) {
			return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
		}

		const valid = await bcrypt.compare(password, userData.password);

		if (!valid) {
			return new Response(JSON.stringify({ error: 'Wrong password' }), { status: 401 });
		}

		cookies.set('session', userData.id.toString(), {
			path: '/',
			httpOnly: true,
			maxAge: 60 * 60
		});

		return new Response(JSON.stringify({ message: 'Login successful' }), { status: 200 });
	} catch (error) {
		console.error(error);
		return new Response(JSON.stringify({ error: 'Login failed' }), { status: 500 });
	}
}