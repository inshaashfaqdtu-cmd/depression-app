import { db } from '$lib/server/db';
import { moodLog } from '$lib/server/db/schema.js';
import { eq, desc } from 'drizzle-orm';

export async function GET({ url }) {
	try {
		const userId = Number(url.searchParams.get('userId'));

		if (!userId) {
			return new Response(JSON.stringify({ error: 'Manglende userId' }), { status: 400 });
		}

		const moods = await db.query.moodLog.findMany({
			where: eq(moodLog.userId, userId)
		});

		return new Response(JSON.stringify(moods), {
			headers: { 'Content-Type': 'application/json' },
			status: 200
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Kunne ikke hente mood-data' }), {
			status: 500
		});
	}
}

export async function POST({ request }) {
	try {
		const { userId, mood, time, date } = await request.json();

		if (!userId || !mood || !date) {
			return new Response(JSON.stringify({ error: 'Manglende data' }), { status: 400 });
		}

		await db.insert(moodLog).values({
			userId,
			mood,
			time,
			date
		});

		return new Response(JSON.stringify({ message: 'Mood gemt' }), { status: 201 });
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Kunne ikke gemme mood' }), {
			status: 500
		});
	}
}