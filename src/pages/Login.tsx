import { SignIn } from "@clerk/clerk-react";

export default function Signup() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-herbal-primary/10 via-herbal-secondary/10 to-herbal-background/80 animate-fade-in">
      <SignIn
        path="/login"
        routing="path"
        appearance={{
          elements: {
            formButtonPrimary: "bg-herbal-primary hover:bg-herbal-primary/90",
            card: "rounded-xl shadow-lg border-herbal-secondary/20",
            // ...add more custom classes
          },
          variables: {
            colorPrimary: "#4CAF50",
            colorText: "#222",
            borderRadius: "12px",
          },
        }}
      />
    </div>
  );
}


