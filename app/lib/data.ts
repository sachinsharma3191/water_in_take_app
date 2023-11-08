import {sql} from '@vercel/postgres';
import {WaterIntakeHistory} from "@/app/lib/definitions";

export async function fetchWaterIntakeHistory(user_id: string) {
    try {
        const data = await sql<WaterIntakeHistory>`SELECT * FROM water_in_take where user_id = ${`%${user_id}%`}`;
        return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch revenue data.');
    }

}