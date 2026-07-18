"use client";

import DoctorSevenDays from "@/app/(dashboard)/_components/DoctorSevenDays";
import DoctorThirtyDays from "@/app/(dashboard)/_components/DoctorThirtyDays";
import Header from "@/app/(dashboard)/_components/layout/Header";
import DoctorInfo from "@/app/(dashboard)/_components/tabs/DoctorInfo";
import WithRole from "@/app/(dashboard)/_components/WithRole";
import { useGetDoctor } from "@/hooks/useDoctors";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import DoctorResumeTab from "@/app/(dashboard)/_components/tabs/DoctorResumeTab";

interface Params {
  doctorId: string;
}

interface PageProps {
  params: React.Usable<Params>;
}

const DoctorPanel = ({ params }: PageProps) => {
  const { doctorId } = React.use<Params>(params);
  const { data } = useGetDoctor(doctorId);
  const doctor = data?.data ?? data ?? {};

  return (
    <div className="w-full h-full flex flex-col">
      <Header searchFn={() => {}} isShowSearch={false} />
      <WithRole allowedRoles={["boss", "manager"]}>
        <div className="w-full p-12">
          <div className="w-full h-full space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-2xl">پنل مشاور</h2>
            </div>
            <div className="mt-12 flex-1">
              <Tabs defaultValue="sevenDays" className="w-full overflow-x-auto">
                <TabsList className="gap-4">
                  <TabsTrigger value="sevenDays">
                    نوبت های هفت روز گذشته
                  </TabsTrigger>
                  <TabsTrigger value="thirtyDays">
                    نوبت های سی روز گذشته
                  </TabsTrigger>
                  <TabsTrigger value="info">اطلاعات مشاور</TabsTrigger>
                  <TabsTrigger value="resume">رزومه</TabsTrigger>
                </TabsList>
                <TabsContent value="sevenDays" className="w-full">
                  <DoctorSevenDays doctorId={doctorId} />
                </TabsContent>
                <TabsContent value="thirtyDays" className="w-full">
                  <DoctorThirtyDays doctorId={doctorId} />
                </TabsContent>
                <TabsContent value="info" className="w-full">
                  <DoctorInfo doctor={doctor} doctorId={doctorId} />
                </TabsContent>
                <TabsContent value="resume" className="w-full">
                  <DoctorResumeTab doctorId={doctorId} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </WithRole>
    </div>
  );
};

export default DoctorPanel;
