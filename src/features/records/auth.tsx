"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Car,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Wrench,
} from "lucide-react";
import { toast } from "sonner";
import { BrandMark, Button } from "@/components/ui/primitives";
export function AuthPage({
  mode = "sign-in",
}: {
  mode?: "sign-in" | "forgot" | "reset";
}) {
  const router = useRouter();
  const [email, setEmail] = useState(
    mode === "sign-in" ? "admin@garagex.demo" : "",
  );
  const [password, setPassword] = useState("garagex");
  const [show, setShow] = useState(false);
  const [done, setDone] = useState(false);
  return (
    <div className="auth-screen">
      <section className="auth-brand-panel">
        <BrandMark />
        <div className="auth-art">
          <div className="auth-garage-grid" />
          <div className="auth-vehicle">
            <Car size={124} strokeWidth={1.1} />
            <i />
          </div>
          <div className="auth-float-card">
            <span>
              <Wrench size={15} />
            </span>
            <div>
              <strong>WO-2026-0291</strong>
              <small>BMW M4 · Brake service</small>
            </div>
            <CheckCircle2 size={16} />
          </div>
          <div className="auth-float-label">
            <i /> Workshop floor · Live
          </div>
        </div>
        <div className="auth-brand-copy">
          <span className="eyebrow">WORKSHOP MANAGEMENT, REIMAGINED</span>
          <h1>
            Every vehicle.
            <br />
            Every detail.
            <br />
            <em>Under control.</em>
          </h1>
          <p>
            Keep customers informed, jobs moving and the workshop running
            smoothly.
          </p>
        </div>
        <small className="auth-copyright">
          © 2026 GarageX · Demo workspace
        </small>
      </section>
      <section className="auth-form-panel">
        <div className="auth-form-wrap">
          <div className="auth-mobile-logo">
            <BrandMark />
          </div>
          <span className="eyebrow">GARAGEX WORKSPACE</span>
          <h2>
            {mode === "sign-in"
              ? "Welcome back"
              : mode === "forgot"
                ? "Reset your password"
                : "Choose a new password"}
          </h2>
          <p>
            {mode === "sign-in"
              ? "Sign in to manage today’s workshop."
              : mode === "forgot"
                ? "Enter the email address on your GarageX account."
                : "Choose a strong password for your account."}
          </p>
          {done ? (
            <div className="auth-success">
              <CheckCircle2 size={28} />
              <strong>Check your inbox</strong>
              <span>
                We sent a password reset link if an account exists for {email}.
              </span>
              <Link href="/sign-in">
                Return to sign in <ArrowRight size={13} />
              </Link>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (mode === "sign-in") {
                  toast.success("Demo sign-in successful.");
                  router.push("/dashboard");
                } else {
                  setDone(true);
                  toast.success("Password reset email prepared in demo mode.");
                }
              }}
            >
              <label>
                Email address
                <span className="auth-input">
                  <Mail size={15} />
                  <input
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@yourgarage.com"
                  />
                </span>
              </label>
              {mode !== "forgot" && (
                <label>
                  Password
                  <span className="auth-input">
                    <LockKeyhole size={15} />
                    <input
                      type={show ? "text" : "password"}
                      autoComplete={
                        mode === "sign-in" ? "current-password" : "new-password"
                      }
                      minLength={6}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      aria-label={show ? "Hide password" : "Show password"}
                      onClick={() => setShow(!show)}
                    >
                      {show ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </span>
                </label>
              )}
              {mode === "sign-in" && (
                <div className="auth-form-options">
                  <label>
                    <input type="checkbox" defaultChecked />
                    Remember me
                  </label>
                  <Link href="/forgot-password">Forgot password?</Link>
                </div>
              )}
              <Button type="submit" variant="primary" className="auth-submit">
                {mode === "sign-in"
                  ? "Sign in"
                  : mode === "forgot"
                    ? "Send reset link"
                    : "Save new password"}
                <ArrowRight size={15} />
              </Button>
            </form>
          )}
          {mode === "sign-in" && (
            <div className="demo-credentials">
              <strong>Explore the demo</strong>
              <span>
                <small>Email</small>
                <code>admin@garagex.demo</code>
              </span>
              <span>
                <small>Password</small>
                <code>garagex</code>
              </span>
              <button
                onClick={() => {
                  setEmail("admin@garagex.demo");
                  setPassword("garagex");
                }}
              >
                Use demo credentials
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
