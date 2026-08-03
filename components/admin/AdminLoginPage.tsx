"use client";

import { useEffect, useState } from "react";
import type { User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { signInAdminWithEmail, signOutAdmin, subscribeToAuthStateChanged } from "@/lib/firebase/auth";
import { isAuthorizedAdminIdentity } from "@/lib/firebase/admin";

export function AdminLoginPage() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [isCheckingAuth, setIsCheckingAuth] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		return subscribeToAuthStateChanged((user) => {
			if (!user) {
				setCurrentUser(null);
				setIsCheckingAuth(false);
				return;
			}

			void (async () => {
				const authorized = await isAuthorizedAdminIdentity({ email: user.email, uid: user.uid });

				if (!authorized) {
					await signOutAdmin();
					setCurrentUser(null);
					setError("This Firebase account is not authorized for admin access.");
					setIsCheckingAuth(false);
					return;
				}

				setCurrentUser(user);
				setIsCheckingAuth(false);
			})();
		});
	}, []);

	useEffect(() => {
		if (currentUser) {
			router.replace("/admin/dashboard");
		}
	}, [currentUser, router]);

	const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setError("");
		setIsSubmitting(true);

		try {
			const credential = await signInAdminWithEmail(email.trim(), password);
			const authorized = await isAuthorizedAdminIdentity({ email: credential.user.email, uid: credential.user.uid });

			if (!authorized) {
				await signOutAdmin();
				throw new Error("This Firebase account is not authorized for admin access.");
			}

			setCurrentUser(credential.user);
			router.replace("/admin/dashboard");
		} catch (loginError) {
			setError(loginError instanceof Error ? loginError.message : "Unable to sign in.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<main className="min-h-screen bg-[var(--background)] px-6 py-10 text-[var(--foreground)]">
			<div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
				<section className="rounded-[32px] border border-[rgba(0,0,0,0.06)] bg-white p-6 shadow-[0_18px_44px_rgba(0,0,0,0.06)] md:p-8">
					<p className="font-script text-[22px] font-medium text-[var(--accent)] rotate-[-2deg]">Admin Access</p>
					<h1 className="mt-2 font-heading text-[clamp(2.2rem,5vw,4rem)] font-extrabold uppercase leading-[0.94] tracking-[-0.05em]">
						Firebase Login
					</h1>
					<p className="mt-3 max-w-3xl text-[0.98rem] leading-[1.75] text-[var(--foreground)]/70">
						Sign in with a Firebase Auth account that you manually create and authorize through the environment allowlist or Firestore admins collection.
					</p>
				</section>

				<section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
					<div className="rounded-[32px] border border-[rgba(0,0,0,0.06)] bg-white p-6 shadow-[0_18px_44px_rgba(0,0,0,0.06)] md:p-8">
						{isCheckingAuth ? (
							<p className="text-[0.95rem] leading-[1.7] text-[var(--foreground)]/70">Checking Firebase session...</p>
						) : currentUser ? (
							<div className="space-y-4">
								<div>
									<p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--foreground)]/48">Signed in</p>
									<h2 className="mt-2 font-heading text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.05em]">
										Admin Panel Ready
									</h2>
								</div>

								<div className="space-y-3 rounded-[24px] border border-[rgba(0,0,0,0.05)] bg-[color-mix(in_srgb,var(--surface)_94%,white)] p-4">
									<p className="text-[0.82rem] font-semibold uppercase tracking-[0.22em] text-[var(--foreground)]/48">Email</p>
									<p className="break-all text-[0.96rem] text-[var(--foreground)]">{currentUser.email ?? "Not available"}</p>
									<p className="text-[0.82rem] font-semibold uppercase tracking-[0.22em] text-[var(--foreground)]/48">UID</p>
									<p className="break-all text-[0.96rem] text-[var(--foreground)]">{currentUser.uid}</p>
								</div>
							</div>
						) : (
							<form className="space-y-5" onSubmit={handleLogin}>
								<div>
									<label className="block text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--foreground)]/48">Email</label>
									<input
										value={email}
										onChange={(event) => setEmail(event.target.value)}
										type="email"
										autoComplete="email"
										className="mt-2 h-12 w-full rounded-full border border-[rgba(0,0,0,0.08)] bg-white px-4 text-[0.95rem] outline-none focus:border-[rgba(0,87,255,0.24)]"
										placeholder="admin@example.com"
									/>
								</div>

								<div>
									<label className="block text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--foreground)]/48">Password</label>
									<input
										value={password}
										onChange={(event) => setPassword(event.target.value)}
										type="password"
										autoComplete="current-password"
										className="mt-2 h-12 w-full rounded-full border border-[rgba(0,0,0,0.08)] bg-white px-4 text-[0.95rem] outline-none focus:border-[rgba(0,87,255,0.24)]"
										placeholder="••••••••"
									/>
								</div>

								{error ? (
									<p className="rounded-[20px] border border-[rgba(0,0,0,0.06)] bg-[color-mix(in_srgb,var(--surface)_94%,white)] px-4 py-3 text-[0.9rem] leading-[1.6] text-[var(--foreground)]/72">
										{error}
									</p>
								) : null}

								<button
									type="submit"
									disabled={isSubmitting}
									className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[var(--foreground)] px-5 text-[0.86rem] font-medium text-[var(--background)] transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
								>
									{isSubmitting ? "Signing In..." : "Sign In"}
								</button>
							</form>
						)}
					</div>

					<div className="rounded-[32px] border border-[rgba(0,0,0,0.06)] bg-white p-6 shadow-[0_18px_44px_rgba(0,0,0,0.06)] md:p-8">
						<p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--foreground)]/48">Access control</p>
						<h2 className="mt-2 font-heading text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.05em]">
							Manual Firebase users only
						</h2>
						<p className="mt-3 text-[0.95rem] leading-[1.8] text-[var(--foreground)]/70">
							Create the admin account manually inside Firebase Authentication, then add its email or UID to the allowlist env vars or the admins collection.
						</p>

						<div className="mt-6 grid gap-3 rounded-[24px] border border-[rgba(0,0,0,0.05)] bg-[color-mix(in_srgb,var(--surface)_94%,white)] p-4 text-[0.92rem] leading-[1.7] text-[var(--foreground)]/70">
							<p><span className="font-semibold text-[var(--foreground)]">1.</span> Enable Email/Password provider in Firebase Auth.</p>
							<p><span className="font-semibold text-[var(--foreground)]">2.</span> Create the admin account manually in Firebase.</p>
							<p><span className="font-semibold text-[var(--foreground)]">3.</span> Add the email or UID to the allowlist env vars.</p>
						</div>
					</div>
				</section>
			</div>
		</main>
	);
}