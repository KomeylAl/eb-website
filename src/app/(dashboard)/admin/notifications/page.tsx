"use client";

import Header from "../../_components/layout/Header";
import { useCallback, useState } from "react";
import { debounce } from "lodash";
import { useGetNotifications, useMarkNotif } from "@/hooks/useNotifications";
import { Tab, Tabs } from "../../_components/Tabs";
import AllNotifications from "../../_components/tabs/AllNotifications";
import UnreadNotifications from "../../_components/tabs/UnreadNotifications";

const Notifications = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <Header searchFn={() => {}} isShowSearch={false} />
      <div className="w-full flex flex-col p-12">
        <div className="w-full h-full space-y-6">
          <h2 className="font-bold text-2xl">اعلانات</h2>
          <Tabs>
            <Tab defaultTab label="همه اعلانات">
              <AllNotifications />
            </Tab>
            <Tab label="خوانده نشده">
              <UnreadNotifications />
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
