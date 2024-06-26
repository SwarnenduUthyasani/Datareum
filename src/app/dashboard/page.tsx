"use client";

import { useAuth } from "@/context/context";
import { getDashUserData } from "@/utils/helper/helpers";
import { userData } from "@/types/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ApiSection } from "@/components/dash/apiSection";
import ProfileSection from "@/components/dash/profileSection";
import DashHeader from "@/components/headers/dashHeader";
import God from "@/components/dash/godSection";
import { ContributionSection } from "@/components/dash/contributionSection";
import Spinner from "@/components/loaders/spinner";
import { unSigner } from "@/firebase/firebase";

const Dashboard = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<userData | undefined>(undefined);
  const waiter = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsLoading(false);
  };
  const setUserDataHelper = async () => {
    const data = await getDashUserData(user!);
    setUserData(data);
  };

  useEffect(() => {
    waiter();
    if (!user && !isLoading) {
      router.push("/");
    } else {
      setUserDataHelper();
    }
  }, [user, isLoading]);

  return !userData ? (
    <div>
      <Spinner />
      {/* <div
        className="text-black"
        onClick={() => {
          unSigner();
        }}
      >
        unsign
      </div> */}
    </div>
  ) : (
    <div className="relative min-h-screen bg-stone-950 from-stone-950 via-stone-900 to-stone-950">
      {/* <div className="absolute left-0 top-0 -z-10 h-full w-full bg-black">
          <img
            src={waves.src}
            // src="https://ideogram.ai/api/images/direct/w8yTF4rsQWGWyIyIUpJXQQ"
            alt=""
            className="h-full w-full object-cover opacity-20"
          />
        </div> */}
      <DashHeader />
      <div className="bg-pink-95 flex min-h-screen w-full flex-col items-center pt-20">
        <div className="h-full w-full max-w-6xl p-4">
          <ProfileSection userData={userData} refresher={setUserDataHelper} />
          <God userData={userData} refresher={setUserDataHelper} />
          <ApiSection userData={userData} refresher={setUserDataHelper} />
          <ContributionSection userData={userData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
