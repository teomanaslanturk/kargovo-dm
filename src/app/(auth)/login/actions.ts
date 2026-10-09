"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/lib/auth";

export interface LoginActionResult {
  error?: string;
}

export async function loginAction(
  _prevState: LoginActionResult | undefined,
  formData: FormData,
): Promise<LoginActionResult> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const callbackUrl = String(formData.get("callbackUrl") ?? "/dashboard");

  if (!email || !password) {
    return { error: "E-posta ve parola alanları zorunludur." };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || "/dashboard",
    });
    return {};
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "E-posta veya parola hatalı." };
    }
    // NextAuth, başarılı girişte redirect için özel bir hata fırlatır (NEXT_REDIRECT).
    // Bu durumda hatayı tekrar fırlatmamız gerekir ki yönlendirme gerçekleşsin.
    throw error;
  }
}
