import Header from "@/components/header";
import Footer from "@/components/footer";
import AuthGuard from "@/components/auth-guard";

export default function IeltsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <Header />
      {children}
      <Footer />
    </AuthGuard>
  );
}
