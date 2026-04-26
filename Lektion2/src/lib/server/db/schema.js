import { pgTable, serial, text, integer, boolean, timestamp } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
	id: serial('id').primaryKey(),
	username: text('username').notNull().unique(),
	password: text('password').notNull()
});

export const profile = pgTable('profile', {
	id: serial('id').primaryKey(),
	userId: integer('user_id').notNull(),
	name: text('name').notNull(),
	phone: text('phone'),
	email: text('email')
});

export const moodLog = pgTable('mood_log', {
	id: serial('id').primaryKey(),
	userId: integer('user_id').notNull(),
	mood: text('mood').notNull(),
	time: text('time'),
	date: text('date').notNull()
});

export const medicinePlan = pgTable('medicine_plan', {
	id: serial('id').primaryKey(),
	userId: integer('user_id').notNull(),
	medicineName: text('medicine_name').notNull(),
	dose: text('dose').notNull(),
	defaultTime: text('default_time'),
	active: boolean('active').notNull().default(true)
});

export const medicineIntake = pgTable('medicine_intake', {
	id: serial('id').primaryKey(),
	userId: integer('user_id').notNull(),
	medicinePlanId: integer('medicine_plan_id').notNull(),
	date: text('date').notNull(),
	time: text('time').notNull(),
	taken: boolean('taken').notNull().default(true)
});

export const statusLog = pgTable('status_log', {
	id: serial('id').primaryKey(),
	userId: integer('user_id').notNull(),
	medicineTakenToday: text('medicine_taken_today'),
	moodToday: text('mood_today'),
	updatedAt: timestamp('updated_at').defaultNow()
});