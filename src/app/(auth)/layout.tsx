import { MessageCircle } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[var(--navy-950)] px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <MessageCircle className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-white">Kargovo DM Asistanı</h1>
            <p className="text-sm text-white/50">
              Instagram DM ve sipariş yönetim paneli
            </p>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
