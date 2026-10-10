
import React, { useState, type FormEvent } from "react";
import { ArrowRightCircle, CheckCircle2, Mail } from "lucide-react";
import { supabase } from "../supabase";

export const BetaSignup: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setSuccess(false);

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (
      cleanName.length < 1 ||
      cleanName.length > 100 ||
      /[\u0000-\u001F\u007F]/.test(cleanName)
    ) {
      setMessage("Please enter a valid name (up to 100 characters).");
      return;
    }

    if (
      cleanEmail.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)
    ) {
      setMessage("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from("beta_signups")
        .insert({ name: cleanName, email: cleanEmail });

      if (error) {
        if (error.code === "23505") {
          setMessage("This email is already registered for the beta.");
        } else {
          console.error("Beta signup failed:", error.message);
          setMessage("We couldn't complete your signup. Please try again.");
        }
        return;
      }

      setSuccess(true);
      setMessage("You're on the list! Thanks for joining ON SETTLE.");
      setName("");
      setEmail("");
    } catch {
      setMessage("Unable to connect right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="beta-signup"
      className="relative w-full overflow-hidden bg-[#F2F2EE] px-5 py-20 text-[#192837] sm:px-8 sm:py-24"
    >
      <div className="mx-auto grid max-w-[1280px] items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#7342E2]/20 bg-[#7342E2]/5 px-3 py-1.5 text-xs font-semibold text-[#7342E2]">
            <span className="h-2 w-2 rounded-full bg-[#7342E2]" />
            ON SETTLE BETA ACCESS
          </div>

          <h2
            className="max-w-xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Compliance that holds.
            <span className="mt-1 block text-[#7342E2]">
              Get in early.
            </span>
          </h2>

          <p
            className="mt-5 max-w-lg text-base leading-7 text-[#192837]/75 sm:text-lg"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Join the ON SETTLE beta and follow our work on
            rule-enforced token transfers built with Solana Token-2022.
          </p>

          <div className="mt-7 flex flex-wrap gap-2 text-xs font-medium text-[#192837]/75">
            <span className="rounded-full border border-[#192837]/10 bg-white/60 px-3 py-2">
              Solana ecosystem
            </span>
            <span className="rounded-full border border-[#192837]/10 bg-white/60 px-3 py-2">
              Transfer Hook architecture
            </span>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="rounded-3xl border border-[#192837]/10 bg-white/80 p-6 shadow-[0_12px_45px_rgba(25,40,55,0.07)] sm:p-9">
            <div className="mb-7 flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#7342E2]/10 text-[#7342E2]">
                <Mail size={23} />
              </div>
              <div>
                <h3
                  className="text-xl font-bold sm:text-2xl"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Join the beta
                </h3>
                <p className="mt-1 text-sm leading-6 text-[#192837]/60">
                  Register your interest in early access.
                </p>
              </div>
            </div>

            {success ? (
              <div
                role="status"
                aria-live="polite"
                className="rounded-2xl border border-emerald-600/20 bg-emerald-50 p-5"
              >
                <CheckCircle2
                  className="mb-3 text-emerald-700"
                  size={28}
                />
                <p className="font-semibold text-emerald-900">
                  You're on the list!
                </p>
                <p className="mt-1 text-sm leading-6 text-emerald-800">
                  {message}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="beta-name"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Full name
                  </label>
                  <input
                    id="beta-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    maxLength={100}
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-[#192837]/15 bg-[#F2F2EE]/50 px-4 py-3.5 text-sm text-[#192837] outline-none transition placeholder:text-[#192837]/40 focus:border-[#7342E2] focus:ring-2 focus:ring-[#7342E2]/15"
                  />
                </div>

                <div>
                  <label
                    htmlFor="beta-email"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Email address
                  </label>
                  <input
                    id="beta-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={254}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-[#192837]/15 bg-[#F2F2EE]/50 px-4 py-3.5 text-sm text-[#192837] outline-none transition placeholder:text-[#192837]/40 focus:border-[#7342E2] focus:ring-2 focus:ring-[#7342E2]/15"
                  />
                </div>

                {message && (
                  <p
                    role="alert"
                    aria-live="polite"
                    className="text-sm text-red-700"
                  >
                    {message}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-between gap-4 rounded-full border-none bg-[#7342E2] px-6 py-4 font-semibold text-white shadow-[0_4px_24px_rgba(115,66,226,0.22)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span>{loading ? "Joining..." : "Request Beta Access"}</span>
                  <ArrowRightCircle size={20} className="shrink-0" />
                </button>

                <p className="text-center text-xs leading-5 text-[#192837]/55">
                  We'll use your details to manage beta access and share
                  relevant project updates.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BetaSignup;
