"use client";

import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useDeleteSession } from "@/hooks/useWorkshops";
import { dateConvert } from "@/lib/utils";
import { Modal } from "@/components/common/Modal";
import { useModal } from "@/hooks/useModal";
import EditWorkshopSession from "../forms/EditWorkshopSession";

interface WorkshopSessionsTabProps {
  sessions: Array<any>;
  workshopId: string;
  onSessionDeleted: () => void;
}

const WorkshopSessionsTab = ({
  sessions,
  workshopId,
  onSessionDeleted,
}: WorkshopSessionsTabProps) => {
  const [session, setSession] = useState();
  const { mutate: deleteSession, isPending: deletePending } = useDeleteSession(
    workshopId,
    onSessionDeleted
  );

  const {
    isOpen: editOpen,
    openModal: openEdit,
    closeModal: closeEdit,
  } = useModal();
  return (
    <div className="py-4">
      {sessions.length === 0 && <p>جلسه ای موجود نیست. یک جلسه اضافه کنید.</p>}
      <Accordion type="single" collapsible>
        {sessions &&
          sessions.map((item: any, index: any) => (
            <AccordionItem
              value={`item-${index}`}
              className="bg-white px-4 rounded-md mb-2"
              key={item.id}
            >
              <AccordionTrigger className="hover:no-underline">
                {item.title || `جلسه ${index + 1}`}
              </AccordionTrigger>
              <AccordionContent>
                <div className="w-full flex flex-col items-start gap-4">
                  <p className="text-lg">عنوان جلسه:</p>
                  <p>{item.title}</p>
                  <p className="text-lg">توضیحات جلسه:</p>
                  <p>{item.description}</p>
                  <p className="text-lg">تاریخ برگزاری جلسه:</p>
                  <p>{dateConvert(item.session_date)}</p>
                  <p className="text-lg">زمان شروع جلسه:</p>
                  <p>{item.start_time}</p>
                  <p className="text-lg">زمان پایان جلسه:</p>
                  <p>{item.end_time}</p>
                  <p className="text-lg">مکان برگزاری جلسه:</p>
                  <p>{item.location}</p>
                  <p className="text-lg">لینک جلسه:</p>
                  <p>{item.link}</p>
                  <div className="w-full flex items-center justify-start gap-4">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => {
                        setSession(item);
                        openEdit();
                      }}
                    >
                      ویرایش جلسه
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      disabled={deletePending}
                      onClick={() => deleteSession(item.id)}
                    >
                      حذف جلسه
                    </Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
      </Accordion>
      <Modal
        isOpen={editOpen}
        onClose={closeEdit}
        className="max-w-[700px] bg-white"
        showCloseButton={false}
      >
        <EditWorkshopSession
          onCloseModal={() => {
            closeEdit();
            onSessionDeleted();
          }}
          session={session}
          workshopId={workshopId}
        />
      </Modal>
    </div>
  );
};

export default WorkshopSessionsTab;
