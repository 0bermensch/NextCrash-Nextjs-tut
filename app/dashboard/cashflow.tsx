import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { getAnnualCashflow } from "@/data/getAnnualCashflow";

export default async function Cashflow() {
  const cashflow = await getAnnualCashflow(2025);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span>Cashflow</span>
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
