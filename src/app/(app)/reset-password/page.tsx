import { AuthPage } from "@/features/records/auth";
export const metadata = { title: "Reset password" };
export default function Page() {
  return <AuthPage mode="reset" />;
}
