"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IceCream, Eye, EyeOff, LogIn, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { saveAdminToken } from "@/lib/cart-store";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { login } from "@/lib/api";

export default function AdminLoginPage() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPwd, setShowPwd] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			const token = await login(email, password);
			saveAdminToken(token);
			router.push("/admin");
		} catch (err) {
			setError("Login ou senha inválidos. Tente: admin / senha");
		} finally {
			setLoading(false);
		}
	};

	return (
		<main className="min-h-screen bg-cream-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
			{/* Abstract Background Shapes */}
			<div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
				<div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-cream-200/50 blur-[100px]" />
				<div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-brand-100/50 blur-[120px]" />
			</div>

			{/* Back Button */}
			<div className="absolute top-6 left-6 z-10">
				<Link href="/">
					<Button variant="ghost" className="text-brand-700 hover:text-brand-900 hover:bg-brand-100/50 gap-2">
						<ArrowLeft className="w-4 h-4" />
						Voltar à Página Principal
					</Button>
				</Link>
			</div>

			<div className="w-full max-w-sm z-10 relative animate-in fade-in slide-in-from-bottom-4 duration-500">
				{/* Logo */}
				<div className="flex flex-col items-center mb-8">
					<div className="w-16 h-16 rounded-4xl bg-brand-600 flex items-center justify-center shadow-xl shadow-brand-500/20 mb-6 transform rotate-3 hover:rotate-6 transition-transform cursor-default">
						<IceCream className="w-8 h-8 text-white -rotate-3" />
					</div>
					<h1 className="text-3xl font-black text-brand-900 tracking-tight">Área Restrita</h1>
					<p className="text-brand-700 font-medium mt-1">Acesso administrativo</p>
				</div>

				<Card className="border-cream-100 shadow-2xl bg-white/80 backdrop-blur-sm overflow-hidden">
					<form onSubmit={handleLogin}>
						<CardContent className="pt-6 pb-4 space-y-5">
							<div className="space-y-2">
								<Label htmlFor="email" className="text-brand-800 font-bold ml-1">Login</Label>
								<Input
									id="email"
									type="text"
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="admin"
									className="bg-cream-50 border-cream-200 focus-visible:ring-brand-500 text-brand-900 rounded-2xl h-12 px-4 shadow-inner"
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="password" className="text-brand-800 font-bold ml-1">Senha</Label>
								<div className="relative">
									<Input
										id="password"
										type={showPwd ? "text" : "password"}
										required
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										placeholder="••••••••"
										className="bg-cream-50 border-cream-200 focus-visible:ring-brand-500 text-brand-900 rounded-2xl h-12 px-4 shadow-inner pr-11"
									/>
									<button
										type="button"
										onClick={() => setShowPwd((v) => !v)}
										className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-500 hover:text-brand-700 transition-colors p-1"
									>
										{showPwd ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
									</button>
								</div>
							</div>

							{error && (
								<div className="bg-destructive/10 text-destructive text-sm font-medium rounded-xl px-4 py-3 border border-destructive/20 animate-in fade-in zoom-in-95">
									{error}
								</div>
							)}
						</CardContent>

						<CardFooter className="flex flex-col gap-5 pb-6">
							<Button
								type="submit"
								disabled={loading}
								className="w-full bg-brand-600 hover:bg-brand-700 text-white rounded-full h-12 text-base font-bold shadow-lg shadow-brand-500/30 hover:shadow-brand-500/40 transition-all flex items-center justify-center gap-2"
							>
								{loading ? (
									<svg className="animate-spin w-5 h-5 opacity-80" viewBox="0 0 24 24" fill="none">
										<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
										<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
									</svg>
								) : (
									<LogIn className="w-5 h-5" />
								)}
								{loading ? "Autenticando..." : "Acessar Sistema"}
							</Button>
						</CardFooter>
					</form>
				</Card>
			</div>
		</main>
	);
}
