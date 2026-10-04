import { AuthPage } from "@/features/records/auth";
export const metadata = { title: "Forgot password" };
export default function Page() {
  return <AuthPage mode="forgot" />;
}
