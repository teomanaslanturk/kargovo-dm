import { Crown } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex min-h-screen w-full items-center justify-center px-4 py-10"
      style={{
        background:
          "radial-gradient(ellipse at top left, #10131d 0%, #05060a 55%, #000000 100%)",
      }}
    >
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-2xl"
            style={{ backgroundColor: "var(--kargovo-gold-soft)" }}
          >
            <Crown className="h-6 w-6" style={{ color: "var(--kargovo-gold)" }} />
          </div>
          <div>
            <h1
              className="text-lg font-extrabold tracking-widest text-white"
              style={{ color: "var(--kargovo-gold)" }}
            >
              KARGOVO
            </h1>
            <p className="text-sm text-white/50">DM Asistanı — Yönetim Paneli</p>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
