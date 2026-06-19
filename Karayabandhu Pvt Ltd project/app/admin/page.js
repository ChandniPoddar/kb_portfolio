import { verifyAdminAuth } from "@/app/lib/auth";
import AdminPortal from "./AdminPortal";
import LoginForm from "./LoginForm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin Portal | Karaya Bandhu",
  description: "Secure administrative gateway and control panel for Karaya Bandhu Pvt. Ltd.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  const isAuthenticated = await verifyAdminAuth();

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return <AdminPortal />;
}
