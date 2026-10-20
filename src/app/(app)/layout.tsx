import AuthProvider from "@/components/AuthProvider";
import BottomNav from "@/components/BottomNav";
import Header from "@/components/Header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className="min-h-screen pb-32">
        <Header />
        <main className="mx-auto max-w-5xl px-6 py-10 md:px-12">{children}</main>
        <BottomNav />
      </div>
    </AuthProvider>
  );
}
