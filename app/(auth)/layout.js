import LoginHeader from "@/components/Auth/LoginHeader";

export default function AuthLayout({ children }) {
  return (
    <div>
      <div>
        <LoginHeader/>
      </div>
      {children}
    </div>
  );
}
