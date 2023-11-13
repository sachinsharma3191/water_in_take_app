import { sql } from "@vercel/postgres";
import { EnumData, WaterIntakeHistory } from "@/app/lib/definitions";

export async function fetchWaterIntakeHistory(user_id: string) {
  try {
    const data = await sql<WaterIntakeHistory>`SELECT 
            measuring_unit,
            quantity_of_water_intake,
            quantity_of_measuring_unit,
            total_water_in_take,
            added_for
            FROM water_in_take 
            where user_id = ${`%${user_id}%`}`;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch Water In Take history data.");
  }
}

async function fetchEnum() {
  try {
    const data =
      await sql<EnumData>`SELECT  type.typname AS name,string_agg(enum.enumlabel, ',') AS value
                FROM pg_enum AS enum
                JOIN pg_type AS type
                ON (type.oid = enum.enumtypid)
                GROUP BY type.typname;`;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch enum data.");
  }
}

export async function fetchMeasuringUnitValues(): Promise<string[]> {
  try {
    const enumData = await fetchEnum();
    const filterEnumData = enumData.filter((e) => e.name === "measuring_unit");
    return filterEnumData.length > 0 ? filterEnumData[0].value.split(",") : [];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to MeasuringUnit Values data.");
  }
}
