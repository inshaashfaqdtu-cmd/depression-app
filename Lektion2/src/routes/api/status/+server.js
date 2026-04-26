import { db } from '$lib/server/db';
import { profile, moodLog, medicinePlan, medicineIntake } from '$lib/server/db/schema.js';
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

		const now = new Date();
		const day = String(now.getDate()).padStart(2, '0');
		const month = String(now.getMonth() + 1).padStart(2, '0');
		const year = now.getFullYear();
		const hours = String(now.getHours()).padStart(2, '0');
		const minutes = String(now.getMinutes()).padStart(2, '0');

		const today = `${day}-${month}-${year}`;
		const currentMinutes = Number(hours) * 60 + Number(minutes);

		const userProfile = await db.query.profile.findFirst({
			where: eq(profile.userId, userId)
		});

		const latestMood = await db.query.moodLog.findFirst({
			where: eq(moodLog.userId, userId),
			orderBy: [desc(moodLog.id)]
		});

		const todayMood = await db.query.moodLog.findFirst({
			where: and(eq(moodLog.userId, userId), eq(moodLog.date, today)),
			orderBy: [desc(moodLog.id)]
		});

		const activeMedicinePlans = await db.query.medicinePlan.findMany({
			where: and(eq(medicinePlan.userId, userId), eq(medicinePlan.active, true)),
			orderBy: [desc(medicinePlan.id)]
		});

		const todayMedicineIntakes = await db.query.medicineIntake.findMany({
			where: and(eq(medicineIntake.userId, userId), eq(medicineIntake.date, today)),
			orderBy: [desc(medicineIntake.id)]
		});

		const medicines = activeMedicinePlans.map((plan) => {
			const todayIntake = todayMedicineIntakes.find(
				(intake) => intake.medicinePlanId === plan.id
			);

			return {
				id: plan.id,
				medicineName: plan.medicineName,
				dose: plan.dose,
				time: todayIntake?.time ?? plan.defaultTime ?? null,
				taken: todayIntake?.taken ?? false,
				defaultTime: plan.defaultTime ?? null
			};
		});

		const takenCount = medicines.filter((m) => m.taken).length;
		const totalCount = medicines.length;

		let medicineReminder = null;
		let moodReminder = null;

		const overdueMedicines = medicines.filter((medicine) => {
			if (!medicine.defaultTime || medicine.taken) return false;

			const cleanTime = medicine.defaultTime.replace('.', ':');
			const [medHours, medMinutes] = cleanTime.split(':');
			const medicinePlanMinutes = Number(medHours) * 60 + Number(medMinutes);

			return currentMinutes > medicinePlanMinutes;
		});

		if (overdueMedicines.length > 0) {
			medicineReminder = `Du mangler at registrere ${overdueMedicines.length} medicin(er) i dag.`;
		}

		if (!todayMood && currentMinutes >= 20 * 60) {
			moodReminder = 'Hvordan har du det i dag? Husk at registrere dit humør.';
		}

		return new Response(
			JSON.stringify({
				profile: userProfile || null,
				mood: latestMood || null,
				medicines,
				medicineSummary: {
					takenCount,
					totalCount
				},
				reminders: {
					medicine: medicineReminder,
					mood: moodReminder
				}
			}),
			{
				headers: { 'Content-Type': 'application/json' },
				status: 200
			}
		);
	} catch (error) {
		console.error('STATUS ERROR:', error);
		return new Response(JSON.stringify({ error: 'Kunne ikke hente statusdata' }), {
			status: 500
		});
	}
}