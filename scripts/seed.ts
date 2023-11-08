import {db, VercelPoolClient} from '@vercel/postgres';
import {users} from '@/app/lib/placeholder-data';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config()

async function seedUsers(client:  VercelPoolClient) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        // Create the "invoices" table if it doesn't exist
        const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(1024) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
        created_at_utc TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at_utc TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );
    `;

        console.log(`Created "users" table`);

        // Insert data into the "users" table
        const insertedUsers = await Promise.all(
            users.map(async (user) => {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
            }),
        );

        console.log(`Seeded ${insertedUsers.length} users`);

        return {
            createTable,
            users: insertedUsers,
        };
    } catch (error) {
        console.error('Error seeding users:', error);
        throw error;
    }
}


async function seedMeasuringUnitEnum(client:  VercelPoolClient) {
    try {
        const createTable = await client.sql`
       CREATE TYPE measuring_unit AS ENUM ('OUNCE', 'MILLILITER', 'LITRE');
    `;
        console.log(`Created "measuring_unit" enum`);
        return createTable;
    } catch (error) {
        console.error('Error seeding Enum:', error);
        throw error;
    }
}

async function seedWaterInTake(client:  VercelPoolClient) {
    try {
        const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS water_in_take (
        id BIGSERIAL PRIMARY KEY,
        user_id VARCHAR(1024) NOT NULL,
        measuring_unit measuring_unit NOT NULL,
        quantity_of_water_intake decimal NOT NULL,
        quantity_of_measuring_unit decimal NOT NULL,
        total_water_in_take decimal NOT NULL,
        added_for TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
        added_for_utc TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
        created_at_utc TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at_utc TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );
    `;
        console.log(`Created "water_in_take" table`);
        return createTable;
    } catch (error) {
        console.error('Error seeding WaterInTake:', error);
        throw error;
    }
}

async function deleteEnum(client:  VercelPoolClient) {
    try {
        const deleteEnums = await client.sql`
        DROP TYPE IF Exists measuring_unit CASCADE;
    `;
        console.log(`Deleted Enums `);
        return deleteEnums;
    } catch (error) {
        console.error('Error deleting Enum:', error);
        throw error;
    }
}

async function deleteAll(client:  VercelPoolClient) {
    try {
        const deleteTables = await client.sql`
           DROP table If Exists users;
           DROP table If Exists water_in_take;
    `;
        console.log(`Deleted All Tables `);
        return deleteTables;
    } catch (error) {
        console.error('Error deleting All Tables:', error);
        throw error;
    }
}

async function main() {
    const client = await db.connect();

    await deleteEnum(client);
    await deleteAll(client)
    await seedUsers(client);
    await seedMeasuringUnitEnum(client);
    await seedWaterInTake(client)

    await client.release();
}

main().catch((err) => {
    console.error(
        'An error occurred while attempting to seed the database:',
        err,
    );
});