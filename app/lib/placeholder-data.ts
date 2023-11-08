// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data

import {v4 as uuid} from 'uuid';
import {MeasuringUnit} from "./definitions";
import {subtractCurrentDateTimeWithTimeZoneInDateTimeFormat} from "@/app/lib/util";

const user_id: string = uuid();

const users = [
    {
        id: user_id,
        name: 'SACHIN SHARMA',
        email: 'sachinsharma31261@gmail.com',
        password: '123456',
    },
];

const water_in_take = [
    {
        user_id: user_id,
        measuring_unit: MeasuringUnit.MILLILITER,
        quantity_of_measuring_unit: 300,
        quantity_of_water_intake: 3,
        added_date: subtractCurrentDateTimeWithTimeZoneInDateTimeFormat(1, 'days', 'America/Los_Angeles'),
    },
    {
        user_id: user_id,
        measuring_unit: MeasuringUnit.MILLILITER,
        quantity_of_measuring_unit: 300,
        quantity_of_water_intake: 0.5,
        added_date: subtractCurrentDateTimeWithTimeZoneInDateTimeFormat(1, 'days', 'America/Los_Angeles'),
    },
    {
        user_id: user_id,
        measuring_unit: MeasuringUnit.LITRE,
        quantity_of_measuring_unit: 1.2,
        quantity_of_water_intake: 1,
        added_date: subtractCurrentDateTimeWithTimeZoneInDateTimeFormat(1, 'days', 'America/Los_Angeles'),
    }
]


module.exports = {
    users,
    water_in_take
};