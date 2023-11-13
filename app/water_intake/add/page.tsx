import AddWaterInTakeForm from "@/app/water_intake/add/AddWaterInTakeForm";
import { fetchMeasuringUnitValues } from "@/app/lib/data";

export default async function Page() {
  const measuringUnits = await fetchMeasuringUnitValues();

  return <AddWaterInTakeForm measuringUnits={measuringUnits} />;
}
