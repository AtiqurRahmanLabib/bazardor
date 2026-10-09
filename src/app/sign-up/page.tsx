"use client";

import { Suspense } from "react";
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
import { authClient } from "../lib/auth-client";

function SignupForm() {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries()) as {
      name: string;
      email: string;
      password: string;
    };

    const { data, error } = await authClient.signUp.email({
      ...userData,
    });

    console.log(data);
    console.log(error);
  };

  const handleGoogleLogin = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
    console.log(data);
  };

  const handleGithubLogin = async () => {
    const data = await authClient.signIn.social({
      provider: "github",
    });
    console.log(data);
  };

  return (
    <main className="flex min-h-screen flex-col bg-[#EFF4EF] text-[#1D271F]">
      <section className="mt-10 flex flex-1 flex-col items-center px-4 pb-12 pt-7">
        <h1 className="text-center text-[32px] font-bold leading-tight">
          অ্যাকাউন্ট তৈরি করুন
        </h1>

        <p className="mt-2 text-center text-sm text-[#1D271F]/70">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>

        <div className="mt-5 box-border min-h-[638px] w-full max-w-[516px] rounded-xl border border-[#DFE8DF] bg-[#FAFCFA] p-6 sm:p-8">
          <Form className="flex w-full flex-col gap-4" onSubmit={onSubmit}>
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
                placeholder="যেমন: রহিম উদ্দিন"
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
                placeholder="you@example.com"
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
                placeholder="কমপক্ষে ৮ অক্ষর"
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
              //   validate={(value, form) =>
              //     value === form.get("password")
              //       ? null
              //       : "পাসওয়ার্ড দুটি মিলছে না"
              //   }
              className="flex w-full flex-col gap-2"
            >
              <Label className="text-[21px] font-medium text-[#1D271F]">
                পাসওয়ার্ড নিশ্চিত করুন
              </Label>

              <Input
                name="confirmPassword"
                type="password"
                placeholder="আবার লিখুন"
                className="h-10 w-full rounded-lg border border-[#E1E9E1] bg-white px-3 text-sm outline-none focus:border-[#118344]"
              />

              <FieldError className="text-xs text-red-600" />
            </TextField>

            <Button
              type="submit"
              className="mt-1 h-10 w-full rounded-lg bg-[#05893E] text-[19px] font-semibold text-white shadow-sm hover:bg-[#0C7137]"
            >
              অ্যাকাউন্ট তৈরি করুন
            </Button>
          </Form>

          <div className="my-5 flex items-center gap-3 text-xs text-[#788078]">
            <div className="h-px flex-1 bg-[#DDE5DD]" />
            <span>অথবা</span>
            <div className="h-px flex-1 bg-[#DDE5DD]" />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              onClick={() => handleGoogleLogin()}
              type="button"
              className="flex h-10 items-center justify-center gap-2 rounded-lg border border-[#E1E8E1] text-[15px] font-semibold text-[#1D271F] hover:bg-[#F0F5F0]"
            >
              <span className="font-bold text-[#4285F4]">G</span>
              Google দিয়ে চালিয়ে যান
            </button>

            <button
              type="button"
              onClick={() => handleGithubLogin()}
              className="flex h-10 items-center justify-center gap-2 rounded-lg border border-[#E1E8E1] text-[15px] font-semibold text-[#1D271F] hover:bg-[#F0F5F0]"
            >
              <span>◉</span>
              GitHub দিয়ে চালিয়ে যান
            </button>
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

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#EFF4EF]" />}>
      <SignupForm />
    </Suspense>
  );
}
