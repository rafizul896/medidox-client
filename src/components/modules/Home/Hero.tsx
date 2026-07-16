"use client";

import {
  Search,
  Calendar,
  Star,
  ShieldCheck,
  Clock,
  Stethoscope,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SparkleIcon } from "@/assets/icons/SparkleIcon";
import Link from "next/link";

export function Hero() {
  return (
    <div className="w-full relative">
      {/* Radial Gradient Background from Bottom */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 90%, #fff 30%, #155DFC 100%)",
        }}
      />

      {/* Content Container */}
      <div className="w-full px-4 py-8 md:px-8 lg:px-16 relative">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Left Column - Hero Content */}
            <div className="flex flex-col justify-center space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-3 self-start rounded-full bg-white px-4 py-2">
                <SparkleIcon />
                <span className="text-[11.9px] font-medium text-blue-700">
                  AI-Powered Healthcare
                </span>
              </div>

              {/* Heading */}
              <div className="space-y-2">
                <h1 className="text-[51px] leading-[60px]">
                  Find Your Perfect
                </h1>
                <h1 className="text-[51px] leading-[60px]">
                  Doctor with AI
                </h1>
              </div>

              {/* Description */}
              <div className="space-y-1 text-[17px] leading-7 text-gray-600">
                <p>Our advanced AI technology analyzes your symptoms, medical</p>
                <p>history, and preferences to match you with the best-fit doctors</p>
                <p>in seconds.</p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href={"/consultation"}>
                  <Button className="h-[63.622px] gap-3 rounded-xl bg-blue-600 px-8 text-[15.3px] hover:bg-blue-700">
                    <Search className="size-5" />
                    Find Your Doctor
                  </Button>
                </Link>
                <Link href={"/dashboard/my-appointments"}>
                  <Button
                    variant="outline"
                    className="h-[63.622px] gap-3 rounded-xl border-blue-600 px-8 text-[15.3px] text-blue-600 hover:bg-blue-50"
                  >
                    <Calendar className="size-5" />
                    My Appointments
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <p className="text-[25.5px] leading-9">50K+</p>
                  </div>
                  <p className="text-[13.6px] leading-6 text-gray-600">
                    Patients Served
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <p className="text-[25.5px] leading-9">1000+</p>
                  </div>
                  <p className="text-[13.6px] leading-6 text-gray-600">
                    Expert Doctors
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <p className="text-[25.5px] leading-9">4.9</p>
                    <Star className="size-6 fill-yellow-400 stroke-yellow-400" />
                  </div>
                  <p className="text-[13.6px] leading-6 text-gray-600">
                    Patient Rating
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Feature Highlights Panel */}
            <div className="flex items-center justify-center lg:justify-end">
              <div className="w-full max-w-[559.929px] rounded-2xl bg-white/80 p-8 shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] backdrop-blur-sm">
                <div className="mb-6">
                  <h2 className="text-[20.4px] leading-6">
                    Why patients choose us
                  </h2>
                  <p className="mt-2 text-[13.6px] leading-6 text-gray-600">
                    Everything you need to get matched with the right care,
                    fast.
                  </p>
                </div>

                <div className="space-y-5">
                  <div className="flex items-start gap-4 rounded-xl border border-gray-100 p-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                      <Stethoscope className="size-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-[15.3px] leading-6">
                        Specialist Matching
                      </p>
                      <p className="text-[13.6px] leading-5 text-gray-600">
                        Matched with the right specialist based on your
                        symptoms.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 rounded-xl border border-gray-100 p-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                      <Clock className="size-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-[15.3px] leading-6">
                        Instant Availability
                      </p>
                      <p className="text-[13.6px] leading-5 text-gray-600">
                        See real-time openings and book in under a minute.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 rounded-xl border border-gray-100 p-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                      <ShieldCheck className="size-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-[15.3px] leading-6">
                        Verified Doctors
                      </p>
                      <p className="text-[13.6px] leading-5 text-gray-600">
                        Every doctor is licensed, vetted, and reviewed.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}