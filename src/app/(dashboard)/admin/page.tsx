"use client";

import React from "react";
import Header from "../_components/layout/Header";
import { Tab, Tabs } from "../_components/Tabs";
import ToDaysList from "../_components/TodaysList";
import { ClientsList } from "../_components/ClientsList";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/common/Modal";
import AddAppForm from "../_components/AddAppForm";

const AdminDashboard = () => {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div className="flex-1 h-screen overflow-y-auto flex flex-col">
      <Header isShowSearch={false} searchFn={() => {}} />

      <div className="flex-1 p-8 flex flex-col">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-xl">داشبورد مدیریت</h2>
          <button 
            onClick={openModal}
            className="px-12 py-2 bg-blue-600 rounded-sm text-white text-center cursor-pointer">
            افزودن نوبت
          </button>
        </div>
        
        <div className="mt-12 flex-1">
          <Tabs>
            <Tab label="نوبت های امروز" defaultTab>
              <div className="py-4">
                <ToDaysList />
              </div>
            </Tab>
            <Tab label="مراجعان" defaultTab={false}>
              <div className="py-4">
                <ClientsList />
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        showCloseButton={false}
        className="max-w-[700px] bg-white"
      >
        <AddAppForm
          onCloseModal={closeModal}
          onAddedAppointment={() => {
            closeModal();
          }}
        />
      </Modal>
    </div>
  );
};

export default AdminDashboard;
