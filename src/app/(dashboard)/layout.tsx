import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { demoConversations } from "@/lib/demo-data";
import { isAppInDemoMode } from "@/lib/config";
import { auth } from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Not: Gerçek veritabanı bağlandığında bu sayım conversations tablosundan
  // sorgulanacaktır. Şimdilik demo konuşmalardan hesaplanıyor.
  const unreadCount = demoConversations.filter((c) => c.isUnread).length;
  const session = await auth();

  const user = {
    name: session?.user?.name ?? "Kullanıcı",
    email: session?.user?.email ?? "",
    isDemoUser: Boolean(session?.user?.isDemoUser),
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <Sidebar unreadCount={unreadCount} isDemoMode={isAppInDemoMode} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar unreadCount={unreadCount} user={user} />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 p-4 sm:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
