import { Hono } from 'hono';
import { Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { product } from './db/schema';

export type Env = {
	DATABASE_URL: string;
};

const app = new Hono<{ Bindings: Env }>();

app.get('/', async (c) => {
	try {
		const client = new Pool({ connectionString: c.env.DATABASE_URL });
		const db = drizzle(client);

		const result = await db.select().from(product);

		return c.json({
			result,
		});
	} catch (error) {
		console.log(error);
		return c.json(
			{
				error,
			},
			400
		);
	}
});

app.post('/', async (c) => {
	try {
		const client = new Pool({ connectionString: c.env.DATABASE_URL });
		const db = drizzle(client);

		await db.insert(product).values({
			name: 'New Product',
			description: 'The description of the product',
			price: 99.99,
		});

		return c.text('Added product\n', 200);
	} catch (error) {
		console.log(error);
		return c.json(
			{
				error,
			},
			400
		);
	}
});

export default app;
