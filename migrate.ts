import { config } from 'dotenv';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';

config({
	path: '.dev.vars',
});

const databaseURL = drizzle(
	postgres(`${process.env.DATABASE_URL}`, {
		ssl: true,
		max: 1,
	})
);

async function main() {
	try {
		await migrate(databaseURL, { migrationsFolder: './drizzle' });

		console.log('Database Migration Complete');
	} catch (error) {
		console.log(error);
	}

	process.exit(0);
}

main();
