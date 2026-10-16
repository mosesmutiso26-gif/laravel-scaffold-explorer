import { describe, it, expect } from "vitest";
import { demoRequest } from "@/lib/api/demo";

describe("payroll workflow (demo contract)", () => {
  it("cannot approve before preparing, and locks lines once prepared", async () => {
    await expect(demoRequest("POST", "/hr-payroll-runs/1/approve")).rejects.toThrow(/draft|prepared/);
    await expect(demoRequest("POST", "/hr-payroll-runs/1/mark-paid")).rejects.toThrow();
    await demoRequest("POST", "/hr-payroll-runs/1/prepare");
    await expect(demoRequest("POST", "/hr-payroll-runs/1/employees/1/payments", { label: "Bonus", qty: 1, amount: 100 })).rejects.toThrow(/locked/);
    await demoRequest("POST", "/hr-payroll-runs/1/approve");
    const r = await demoRequest<{ status: string }>("GET", "/hr-payroll-runs/current");
    expect(r.status).toBe("approved"); // approved is not paid
  });
});
