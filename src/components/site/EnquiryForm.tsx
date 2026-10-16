import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { api, ApiError } from "@/lib/api/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().max(20).optional(),
  grade: z.string().trim().max(20).optional(),
  message: z.string().trim().min(5, "Tell us a little more").max(1000),
});

/** Submits to POST /enquiries (Admissions owns the enquiry lifecycle). */
export function EnquiryForm({ withGrade = false }: { withGrade?: boolean }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const m = useMutation({
    mutationFn: (data: z.infer<typeof schema>) => api.post("/enquiries", data),
    onSuccess: () => toast.success("Thank you — our admissions team will contact you."),
    onError: (e) => {
      if (e instanceof ApiError && e.errors) setErrors(Object.fromEntries(Object.entries(e.errors).map(([k, v]) => [k, v[0] ?? ""])));
      toast.error((e as Error).message);
    },
  });
  return (
    <form
      className="space-y-4 rounded-xl border bg-card p-6 shadow-card"
      onSubmit={(e) => {
        e.preventDefault();
        const fd = Object.fromEntries(new FormData(e.currentTarget));
        const r = schema.safeParse(fd);
        if (!r.success) { setErrors(Object.fromEntries(r.error.issues.map((i) => [String(i.path[0]), i.message]))); return; }
        setErrors({});
        m.mutate(r.data, { onSuccess: () => (e.target as HTMLFormElement).reset() });
      }}
    >
      {([["name", "Full name"], ["email", "Email"], ["phone", "Phone"], ...(withGrade ? [["grade", "Grade applying for"]] : [])] as [string, string][]).map(([k, l]) => (
        <div key={k}><Label htmlFor={k}>{l}</Label><Input id={k} name={k} className="mt-1" />{errors[k] && <p className="mt-1 text-xs text-destructive">{errors[k]}</p>}</div>
      ))}
      <div><Label htmlFor="message">Message</Label><Textarea id="message" name="message" className="mt-1" rows={4} />{errors["message"] && <p className="mt-1 text-xs text-destructive">{errors["message"]}</p>}</div>
      <Button type="submit" disabled={m.isPending} className="w-full">{m.isPending ? "Sending…" : "Send enquiry"}</Button>
    </form>
  );
}
