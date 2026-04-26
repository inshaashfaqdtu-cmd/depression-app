import bcrypt from 'bcryptjs';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';

export async function GET() {
	try {
		const users = await db.query.user.findMany();

		return new Response(JSON.stringify(users), {
			headers: { 'Content-Type': 'application/json' },
			status: 200
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Kunne ikke hente brugere' }), {
			status: 500
		});
	}
}

export async function POST({ request }) {
	try {
		const { username, password } = await request.json();

		if (!username || !password) {
			return new Response(JSON.stringify({ error: 'Manglende brugernavn eller password' }), {
				status: 400
			});
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		await db.insert(user).values({
			username,
			password: hashedPassword
		});

		return new Response(JSON.stringify({ message: 'Bruger oprettet' }), {
			status: 201
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Kunne ikke oprette bruger' }), {
			status: 500
		});
	}
}

export async function DELETE({ request }) {
	try {
		const { id } = await request.json();

		if (!id) {
			return new Response(JSON.stringify({ error: 'Manglende id' }), {
				status: 400
			});
		}

		await db.delete(user).where(eq(user.id, id));

		return new Response(JSON.stringify({ message: 'Bruger slettet' }), {
			status: 200
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Kunne ikke slette bruger' }), {
			status: 500
		});
	}
}