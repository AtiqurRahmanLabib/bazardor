"use client";

import { useState } from "react";
import {
  Button,
  Description,
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
import AuthSkeleton from "../components/AuthSkeleton";

type SocialProvider = "google" | "github";

export default function SignupPage() {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [socialLoading, setSocialLoading] =
    useState<SocialProvider | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isBusy = isSubmitting || socialLoading !== null;

  const validateForm = () => {
    if (!name.trim()) {
      toast.error("আপনার নাম লিখুন");
      return false;
    }

    if (!email.trim()) {
      toast.error("আপনার ইমেইল লিখুন");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      toast.error("সঠিক ইমেইল ঠিকানা লিখুন");
      return false;
    }

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return false;
    }

    if (!/[A-Z]/.test(password)) {
      toast.error("পাসওয়ার্ডে অন্তত একটি বড় হাতের অক্ষর দিন");
      return false;
    }

    if (!/[0-9]/.test(password)) {
      toast.error("পাসওয়ার্ডে অন্তত একটি সংখ্যা দিন");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("দুটি পাসওয়ার্ড মিলছে না");
      return false;
    }

    return true;
  };

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    if (isBusy || !validateForm()) return;

    setIsSubmitting(true);

    try {
      const { error } = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      if (error) {
        toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি");
        return;
      }

      toast.success("অ্যাকাউন্ট তৈরি হয়েছে। এবার সাইন ইন করুন।");
      router.replace("/sign-in");
      router.refresh();
    } catch {
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialLogin = async (provider: SocialProvider) => {
    if (isBusy) return;

    setSocialLoading(provider);

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
        errorCallbackURL: "/sign-up",
      });

      if (error) {
        toast.error(
          error.message || `${provider} দিয়ে সাইন ইন করা যায়নি`,
        );
        setSocialLoading(null);
      }
    } catch {
      toast.error("Social login ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");
      setSocialLoading(null);
    }
  };

  return (
    <main className="flex min-h-screen flex-col  text-[#1D271F]">
      <section className="mt-10 flex flex-1 flex-col items-center px-4 pb-12 pt-7">
        <h1 className="text-center text-[32px] font-bold leading-tight">
          অ্যাকাউন্ট তৈরি করুন
        </h1>

        <p className="mt-2 text-center text-sm text-[#1D271F]/70">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>

        <div className="mt-5 box-border w-full max-w-[516px] rounded-xl border border-[#DFE8DF] bg-[#FAFCFA] p-6 sm:p-8">
          <Form
            className="flex w-full flex-col gap-4"
            onSubmit={onSubmit}
          >
            <TextField
              name="name"
              isRequired
              className="flex w-full flex-col gap-2"
            >
              <Label className="text-[21px] font-medium text-[#1D271F]">
                নাম
              </Label>

              <Input
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="যেমন: রহিম উদ্দিন"
                autoComplete="name"
                disabled={isBusy}
                className="h-10 w-full rounded-lg border border-[#E1E9E1] bg-white px-3 text-sm outline-none focus:border-[#118344]"
              />

              <FieldError className="text-xs text-red-600" />
            </TextField>

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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                disabled={isBusy}
                className="h-10 w-full rounded-lg border border-[#E1E9E1] bg-white px-3 text-sm outline-none focus:border-[#118344]"
              />

              <FieldError className="text-xs text-red-600" />
            </TextField>

            <TextField
              name="password"
              type="password"
              isRequired
              minLength={8}
              validate={(value) => {
                if (value.length < 8) {
                  return "কমপক্ষে ৮ অক্ষর দিন";
                }

                if (!/[A-Z]/.test(value)) {
                  return "একটি বড় হাতের অক্ষর দিন";
                }

                if (!/[0-9]/.test(value)) {
                  return "একটি সংখ্যা দিন";
                }

                return null;
              }}
              className="flex w-full flex-col gap-2"
            >
              <Label className="text-[21px] font-medium text-[#1D271F]">
                পাসওয়ার্ড
              </Label>

              <Input
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="কমপক্ষে ৮ অক্ষর"
                autoComplete="new-password"
                disabled={isBusy}
                className="h-10 w-full rounded-lg border border-[#E1E9E1] bg-white px-3 text-sm outline-none focus:border-[#118344]"
              />

              <Description className="text-xs text-[#758077]">
                কমপক্ষে ৮ অক্ষর, ১টি বড় হাতের অক্ষর ও ১টি সংখ্যা।
              </Description>

              <FieldError className="text-xs text-red-600" />
            </TextField>

            <TextField
              name="confirmPassword"
              type="password"
              isRequired
              validate={(value) =>
                value !== password ? "পাসওয়ার্ড মিলছে না" : null
              }
              className="flex w-full flex-col gap-2"
            >
              <Label className="text-[21px] font-medium text-[#1D271F]">
                পাসওয়ার্ড নিশ্চিত করুন
              </Label>

              <Input
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="আবার লিখুন"
                autoComplete="new-password"
                disabled={isBusy}
                className="h-10 w-full rounded-lg border border-[#E1E9E1] bg-white px-3 text-sm outline-none focus:border-[#118344]"
              />

              <FieldError className="text-xs text-red-600" />
            </TextField>

            <Button
              type="submit"
              isDisabled={isBusy}
              className="mt-1 h-10 w-full rounded-lg bg-[#05893E] text-[19px] font-semibold text-white shadow-sm hover:bg-[#0C7137]"
            >
              {isSubmitting
                ? "অ্যাকাউন্ট তৈরি হচ্ছে..."
                : "অ্যাকাউন্ট তৈরি করুন"}
            </Button>
          </Form>

          <div className="my-5 flex items-center gap-3 text-xs text-[#788078]">
            <div className="h-px flex-1 bg-[#DDE5DD]" />
            <span>অথবা</span>
            <div className="h-px flex-1 bg-[#DDE5DD]" />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Button
              type="button"
              variant="outline"
              isDisabled={isBusy}
              onPress={() => handleSocialLogin("google")}
              className="h-10 rounded-lg border-[#E1E8E1] text-[15px] font-semibold text-[#1D271F]"
            >
              <span className="font-bold text-[#4285F4]">G</span>
              {socialLoading === "google"
                ? "Google-এ সংযোগ হচ্ছে..."
                : "Google দিয়ে চালিয়ে যান"}
            </Button>

            <Button
              type="button"
              variant="outline"
              isDisabled={isBusy}
              onPress={() => handleSocialLogin("github")}
              className="h-10 rounded-lg border-[#E1E8E1] text-[15px] font-semibold text-[#1D271F]"
            >
              <span>◉</span>
              {socialLoading === "github"
                ? "GitHub-এ সংযোগ হচ্ছে..."
                : "GitHub দিয়ে চালিয়ে যান"}
            </Button>
          </div>

          <p className="mt-5 text-center text-xs text-[#687269]">
            অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/sign-in"
              className="font-semibold text-[#108541] hover:underline"
            >
              সাইন ইন করুন
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