import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function PersonalData() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  const isFormValid =
    firstName.trim() !== "" && lastName.trim() !== "" && phone.trim() !== "";

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8">
      {/* Form Section */}
      <div className="max-w-[823px] w-full">
        {/* Title */}
        <div className="mb-14">
          <h1 className="text-[56px] font-bold text-content-primary mb-5">
            Введите свои данные
          </h1>
          <p className="text-[32px] text-content-secondary">
            Данные необходимы для обратной связи тренера с Вами
          </p>
        </div>

        {/* Form */}
        <div className="space-y-5">
          <Input
            type="text"
            placeholder="Имя"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="bg-[#F6F7FA] w-full h-[134px] text-[32px] lg:text-3xl px-8 rounded-[40px] focus:border-accent-primary"
          />

          <Input
            type="text"
            placeholder="Фамилия"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="bg-[#F6F7FA] w-full h-[134px] text-[32px] lg:text-3xl px-8 rounded-[40px] focus:border-accent-primary"
          />

          <Input
            type="tel"
            placeholder="+79999999999"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="bg-[#F6F7FA] w-full h-[134px] text-[32px] lg:text-3xl px-8 rounded-[40px] focus:border-accent-primary"
          />
        </div>

        {/* Continue Button */}
        <div className="mt-12">
          <Button
            className="w-full h-[116px] text-[32px] font-semibold rounded-[40px] bg-accent-primary hover:bg-accent-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            size="lg"
            disabled={!isFormValid}
          >
            Далее
          </Button>
        </div>
      </div>
    </div>
  );
}
