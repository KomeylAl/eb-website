"use client";

import React from "react";
import Header from "../../_components/layout/Header";
import { Tab, Tabs } from "../../_components/Tabs";
import ClassesList from "../../_components/ClassesList";
import WorkShopsList from "../../_components/dashboard/lists/WorkShopsList";

const Classes = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <Header searchFn={() => {}} isShowSearch={false} />
      <div className="w-full flex flex-col p-8">
        <div className="w-full h-full flex flex-col p-4">
          <Tabs>
            <Tab label="کلاس ها">
              <div className="py-4">
                <ClassesList />
              </div>
            </Tab>
            <Tab label="کارگاه ها">
              <div className="py-4">
                <WorkShopsList />
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Classes;
