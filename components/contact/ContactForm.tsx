"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm({ dict }: { dict: Dictionary }) {
  const [status, setStatus] = useState<Status>("idle");
  const f = dict.contactPage.form;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("request_failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
            {f.name}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            minLength={2}
            className="w-full min-h-11 rounded-lg border border-border px-4 py-2.5 text-sm focus:border-gold focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
            {f.email}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full min-h-11 rounded-lg border border-border px-4 py-2.5 text-sm focus:border-gold focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-foreground">
          {f.phone}
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          className="w-full min-h-11 rounded-lg border border-border px-4 py-2.5 text-sm focus:border-gold focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">
          {f.message}
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          rows={5}
          className="w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-gold focus:outline-none"
        />
      </div>

      {/* Honeypot field: hidden from real users via CSS, catches naive bots. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-foreground px-8 text-sm font-medium text-white transition-colors hover:bg-gold-dark disabled:opacity-60"
      >
        {status === "sending" && <Loader2 size={16} className="animate-spin" />}
        {status === "sending" ? f.sending : f.submit}
      </button>

      <AnimatePresence mode="wait">
        {status === "success" && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 text-sm font-medium text-green-700"
          >
            <CheckCircle2 size={18} />
            {f.success}
          </motion.p>
        )}
        {status === "error" && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 text-sm font-medium text-red-700"
          >
            <AlertCircle size={18} />
            {f.error}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
