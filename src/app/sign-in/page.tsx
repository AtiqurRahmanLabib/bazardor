
"use client";

import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "../lib/auth-client";

export default function LoginPage() {
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const userData = {
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
    };

    const toastId = toast.loading("সাইন ইন হচ্ছে...");

    try {
      const { error } = await authClient.signIn.email(userData);

      if (error) {
        toast.error(error.message || "সাইন ইন করা যায়নি", {
          id: toastId,
        });
        return;
      }

      toast.success("সফলভাবে সাইন ইন হয়েছে!", {
        id: toastId,
      });

      router.replace("/");
      router.refresh();
    } catch {
      toast.error("সাইন ইন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।", {
        id: toastId,
      });
    }
  };

  const handleSocialLogin = async (
    provider: "google" | "github",
  ) => {
    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
        errorCallbackURL: "/sign-in",
      });

      if (error) {
        toast.error(error.message || "সোশ্যাল লগইন করা যায়নি");
      }
    } catch {
      toast.error("লগইন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-[#EFF4EF] text-[#1D271F]">
      <section className="mt-10 flex flex-1 flex-col items-center px-4 pb-12 pt-7">
        <h1 className="text-center text-[32px] font-bold leading-tight">
          সাইন ইন
        </h1>

        <p className="mt-2 text-center text-sm text-[#1D271F]/70">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>

        <div className="mt-5 box-border min-h-[458px] w-full max-w-[516px] rounded-xl border border-[#DFE8DF] bg-[#FAFCFA] p-6 sm:p-8">
          <Form
            className="flex w-full flex-col gap-4"
            onSubmit={onSubmit}
          >
            <TextField
              name="email"
              type="email"
              isRequired
              className="flex w-full flex-col gap-2"
            >
              <Label className="text-[21px] font-medium text-[#1D271F]">
                ইমেইল
              </Label>

              <Input
                name="email"
                type="email"
                placeholder="you@example.com"
                className="h-10 w-full rounded-lg border border-[#E1E9E1] bg-white px-3 text-sm outline-none focus:border-[#118344]"
              />

              <FieldError className="text-xs text-red-600" />
            </TextField>

            <TextField
              name="password"
              type="password"
              isRequired
              className="flex w-full flex-col gap-2"
            >
              <Label className="text-[21px] font-medium text-[#1D271F]">
                পাসওয়ার্ড
              </Label>

              <Input
                name="password"
                type="password"
                placeholder="আপনার পাসওয়ার্ড লিখুন"
                className="h-10 w-full rounded-lg border border-[#E1E9E1] bg-white px-3 text-sm outline-none focus:border-[#118344]"
              />

              <FieldError className="text-xs text-red-600" />
            </TextField>

            <div className="flex items-center justify-between gap-3 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="remember"
                  className="accent-[#108541]"
                />
                <span>আমাকে মনে রাখুন</span>
              </label>

              <Link
                href="/forgot-password"
                className="font-medium text-[#108541] hover:underline"
              >
                পাসওয়ার্ড ভুলে গেছেন?
              </Link>
            </div>

            <Button
              type="submit"
              className="mt-1 h-10 w-full rounded-lg bg-[#05893E] text-[19px] font-semibold text-white shadow-sm hover:bg-[#0C7137]"
            >
              সাইন ইন
            </Button>
          </Form>

          <div className="my-5 flex items-center gap-3 text-xs text-[#788078]">
            <div className="h-px flex-1 bg-[#DDE5DD]" />
            অথবা
            <div className="h-px flex-1 bg-[#DDE5DD]" />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => handleSocialLogin("google")}
              className="flex h-10 items-center justify-center gap-2 rounded-lg border border-[#E1E8E1] text-[15px] font-semibold text-[#1D271F] hover:bg-[#F0F5F0]"
            >
              <span className="font-bold text-[#4285F4]">G</span>
              Google দিয়ে চালিয়ে যান
            </button>

            <button
              type="button"
              onClick={() => handleSocialLogin("github")}
              className="flex h-10 items-center justify-center gap-2 rounded-lg border border-[#E1E8E1] text-[15px] font-semibold text-[#1D271F] hover:bg-[#F0F5F0]"
            >
              <span>◉</span>
              GitHub দিয়ে চালিয়ে যান
            </button>
          </div>

          <p className="mt-5 text-center text-xs text-[#687269]">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/sign-up"
              className="font-semibold text-[#108541] hover:underline"
            >
              সাইন আপ করুন
            </Link>
          </p>
        </div>

        <Link
          href="/"
          className="mt-5 text-xs text-[#778078] hover:text-[#108541]"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </section>
    </main>
  );
}
