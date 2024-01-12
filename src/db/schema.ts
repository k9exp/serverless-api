import { doublePrecision, pgTable, serial, text } from 'drizzle-orm/pg-core';

export const product = pgTable('product', {
	id: serial('id').primaryKey(),
	name: text('name'),
	description: text('description'),
	price: doublePrecision('price'),
});
