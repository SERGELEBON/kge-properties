"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";

export default function ContactFormSection() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setDone(true);
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setSending(false);
  };

  if (done) {
    return (
      <div className="bg-white p-8 text-center">
        <h3 className="text-[22px] mb-3">Thank you for reaching out!</h3>
        <p className="text-[#666666]">
          Your message has been received. A member of our team will contact you shortly.
        </p>
        <button
          type="button"
          onClick={() => setDone(false)}
          className="rgl-btn mt-6"
        >
          SEND ANOTHER MESSAGE
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="bg-white p-6 md:p-8">
      <div className="grid gap-4 md:grid-cols-2">
        <input
          className="rgl-input"
          placeholder="e.g. Kwame Mensah"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          aria-label="Full name"
        />
        <input
          className="rgl-input"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          aria-label="Email address"
        />
        <input
          className="rgl-input md:col-span-2"
          type="tel"
          placeholder="Phone number"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          required
          aria-label="Phone number"
        />
        <textarea
          className="rgl-input md:col-span-2"
          placeholder="Text here"
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
          aria-label="Your message"
        />
      </div>
      {error && <p className="text-[#880000] text-[13px] mt-3">{error}</p>}
      <div className="mt-5">
        <button type="submit" disabled={sending} className="rgl-btn disabled:opacity-70">
          {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          Submit Now
        </button>
      </div>
    </form>
  );
}
