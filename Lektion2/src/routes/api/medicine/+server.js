import { db } from '$lib/server/db';
import { medicinePlan, medicineIntake } from '$lib/server/db/schema.js';
import { eq, and, desc } from 'drizzle-orm';

export async function GET({ cookies }) {
	try {
		const session = cookies.get('session');

		if (!session) {
			return new Response(JSON.stringify({ error: 'Ikke logget ind' }), {
				status: 401
			});
		}

		const userId = Number(session);

		const plans = await db.query.medicinePlan.findMany({
			where: and(eq(medicinePlan.userId, userId), eq(medicinePlan.active, true)),
			orderBy: [desc(medicinePlan.id)]
		});

		const intakeHistory = await db.query.medicineIntake.findMany({
			where: eq(medicineIntake.userId, userId),
			orderBy: [desc(medicineIntake.id)]
		});

		return new Response(
			JSON.stringify({
				plans,
				history: intakeHistory
			}),
			{
				headers: { 'Content-Type': 'application/json' },
				status: 200
			}
		);
	} catch (error) {
		console.error('MEDICINE GET ERROR:', error);
		return new Response(JSON.stringify({ error: 'Kunne ikke hente medicin' }), {
			status: 500
		});
	}
}

export async function POST({ request, cookies }) {
	try {
		const session = cookies.get('session');

		if (!session) {
			return new Response(JSON.stringify({ error: 'Ikke logget ind' }), {
				status: 401
			});
		}

		const userId = Number(session);
		const { medicineName, dose, defaultTime } = await request.json();

		if (!medicineName || !dose) {
			return new Response(JSON.stringify({ error: 'Manglende data' }), {
				status: 400
			});
		}

		await db.insert(medicinePlan).values({
			userId,
			medicineName,
			dose,
			defaultTime,
			active: true
		});

		return new Response(JSON.stringify({ message: 'Medicinplan gemt' }), {
			status: 201
		});
	} catch (error) {
		console.error('MEDICINE POST ERROR:', error);
		return new Response(JSON.stringify({ error: 'Kunne ikke gemme medicinplan' }), {
			status: 500
		});
	}
}

export async function PATCH({ request, cookies }) {
	try {
		const session = cookies.get('session');

		if (!session) {
			return new Response(JSON.stringify({ error: 'Ikke logget ind' }), {
				status: 401
			});
		}

		const userId = Number(session);
		const { medicinePlanId } = await request.json();

		if (!medicinePlanId) {
			return new Response(JSON.stringify({ error: 'Manglende medicinePlanId' }), {
				status: 400
			});
		}

		const now = new Date();
		const day = String(now.getDate()).padStart(2, '0');
		const month = String(now.getMonth() + 1).padStart(2, '0');
		const year = now.getFullYear();
		const hours = String(now.getHours()).padStart(2, '0');
		const minutes = String(now.getMinutes()).padStart(2, '0');

		const date = `${day}-${month}-${year}`;
		const time = `${hours}:${minutes}`;

		const existingToday = await db.query.medicineIntake.findFirst({
			where: and(
				eq(medicineIntake.userId, userId),
				eq(medicineIntake.medicinePlanId, medicinePlanId),
				eq(medicineIntake.date, date)
			)
		});

		if (existingToday) {
			return new Response(JSON.stringify({ message: 'Denne medicin er allerede registreret i dag' }), {
				status: 200
			});
		}

		await db.insert(medicineIntake).values({
			userId,
			medicinePlanId,
			date,
			time,
			taken: true
		});

		return new Response(JSON.stringify({ message: 'Medicin markeret som taget' }), {
			status: 200
		});
	} catch (error) {
		console.error('MEDICINE PATCH ERROR:', error);
		return new Response(JSON.stringify({ error: 'Kunne ikke registrere medicin' }), {
			status: 500
		});
	}
}