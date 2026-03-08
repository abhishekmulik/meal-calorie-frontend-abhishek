import { SignupForm } from "@/components/auth/signup-form"
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Register",
};


export default function page() {
  return <SignupForm />
}