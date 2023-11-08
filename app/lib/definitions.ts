// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
};

export type WaterIntakeHistory = {
    user_id: string;
    measuring_unit: MeasuringUnit;
    quantity_of_water_intake: number;
    quantity_of_measuring_unit: number;
    total_water_in_take: number;
}


export type WaterIntake = {
    user_id: string;
    measuring_unit: MeasuringUnit;
    quantity_of_water_intake: number;
    quantity_of_measuring_unit: number;
}

export enum MeasuringUnit {
    OUNCE = 'OUNCE', MILLILITER = 'MILLILITER', LITRE = 'LITRE'
}