"use client";
import { FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { authClient } from "../lib/auth-client";

const page = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries()) as {
      name: string;
    };

    await authClient.updateUser({
      ...userData
    });
  };
  return (
    <div className="bg-[#EFF4EF]">
      <div className="max-w-6xl mx-auto mt-10 min-h-screen ">
        <div className="w-200 mx-auto">
          <h1 className="font-bold text-[24px] text-[#1D271F]">
            আমার প্রোফাইল
          </h1>
          <p className="text-[#1D271F]/70 text-[14px]">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>
        <div className="">
          <div className="bg-[#FAFCFA] w-200 h-30 rounded-4xl flex items-center justify-between mx-auto mt-10 p-5">
            <div className="flex items-center gap-5">
              <div className="w-[80px] h-[70px] rounded-4xl border"></div>

              <div>
                <h1 className="text-[#1D271F] text-[20px] font-semibold">
                  {user?.name}
                </h1>
                <p className="text-[#1D271F]/70 text-[16px]">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={() => handleSignOut()}
              className="text-[#D03739] text-[14px] w-[118px] h-[40px] rounded-[8px] border border-[#D03739]"
            >
              ↩ সাইন আউট
            </button>
          </div>
          <div className="bg-[#FAFCFA] w-200 h-[251px] rounded-4xl  mx-auto mt-10 p-10">
            <h1 className="text-[#1D271F] font-semibold text-[18px]">তথ্য</h1>
            <Form
              className="flex w-[646px] mx-auto mt-5 flex-col gap-4"
              onSubmit={onSubmit}
            >
              <TextField
                name="name"
                isRequired
                className="flex w-full flex-col gap-2"
              >
                <Label className="text-[16px] font-medium text-[#1D271F]">
                  নাম
                </Label>

                <Input
                  name="name"
                  className="h-10 w-full rounded-lg border border-[#E1E9E1] bg-white px-3 text-sm outline-none focus:border-[#118344]"
                />

                <FieldError className="text-xs text-red-600" />
              </TextField>
            </Form>
            <div className="mx-auto w-[646px] mt-5">
              <button
                type="submit"
                className="bg-[#05893E] text-[#F3FBF4] text-[14px] font-semibold rounded-[8px] w-[646px] h-[40px] "
              >
                আপডেট
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
