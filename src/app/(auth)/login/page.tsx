import { isAppInDemoMode } from "@/lib/config";
import { LoginForm } from "./login-form";

export const metadata = {
  title: "Giriş Yap — Kargovo DM Asistanı",
};

interface LoginPageProps {
  searchParams: Promise<{ callbackUrl?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const callbackUrl = params.callbackUrl ?? "/dashboard";

  return <LoginForm callbackUrl={callbackUrl} isDemoMode={isAppInDemoMode} />;
}
