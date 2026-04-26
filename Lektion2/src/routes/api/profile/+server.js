import { db } from '$lib/server/db';
import { profile } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';

export async function GET({ url }) {
	try {
		const userId = Number(url.searchParams.get('userId'));

		if (!userId) {
			return new Response(JSON.stringify({ error: 'Manglende userId' }), { status: 400 });
		}

		const userProfile = await db.query.profile.findFirst({
			where: eq(profile.userId, userId)
		});

		return new Response(JSON.stringify(userProfile || null), {
			headers: { 'Content-Type': 'application/json' },
			status: 200
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Kunne ikke hente profil' }), {
			status: 500
		});
	}
}

export async function POST({ request }) {
	try {
		const { userId, name, phone, email } = await request.json();

		if (!userId || !name) {
			return new Response(JSON.stringify({ error: 'Manglende data' }), { status: 400 });
		}

		const existingProfile = await db.query.profile.findFirst({
			where: eq(profile.userId, userId)
		});

		if (existingProfile) {
			await db
				.update(profile)
				.set({ name, phone, email })
				.where(eq(profile.userId, userId));
		} else {
			await db.insert(profile).values({
				userId,
				name,
				phone,
				email
			});
		}

		return new Response(JSON.stringify({ message: 'Profil gemt' }), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Kunne ikke gemme profil' }), {
			status: 500
		});
	}
}