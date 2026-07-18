import { Modal } from "@/components/common/Modal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModal";
import { useDeleteParticipant } from "@/hooks/useWorkshops";
import { dateConvert } from "@/lib/utils";
import React, { useState } from "react";
import EditParticipantForm from "../forms/EditParticipantForm";

interface WorkshopParticipantsTabProps {
  participants: Array<any>;
  workshopId: string;
  onParticipnatChanged: () => void;
}

const WorkshopParticipantsTab = ({
  participants,
  workshopId,
  onParticipnatChanged,
}: WorkshopParticipantsTabProps) => {
  const [participant, setParticipant] = useState();
  const { mutate: deleteParticipant, isPending: deletePending } =
    useDeleteParticipant(workshopId, onParticipnatChanged);

  const {
    isOpen: editOpen,
    openModal: openEdit,
    closeModal: closeEdit,
  } = useModal();
  return (
    <div className="py-4">
      {participants && participants.length === 0 && (
        <p>شرکت کننده ای موجود نیست. یک شرکت کننده اضافه کنید.</p>
      )}
      <Accordion type="single" collapsible>
        {participants &&
          participants.map((item: any, index: any) => (
            <AccordionItem
              value={`item-${index}`}
              className="bg-white px-4 rounded-md mb-2"
              key={item.id}
            >
              <AccordionTrigger className="hover:no-underline">
                {item.name || `شرکت کننده ${index + 1}`}
              </AccordionTrigger>
              <AccordionContent>
                <div className="w-full flex flex-col items-start gap-4">
                  <p className="text-lg">نام شرکت کننده:</p>
                  <p>{item.name}</p>
                  <p className="text-lg">نام انگلیسی شرکت کننده:</p>
                  <p>{item.name_en}</p>
                  <p className="text-lg">تلفن شرکت کننده:</p>
                  <p>{item.phone}</p>
                  <p className="text-lg">کد ملی شرکت کننده:</p>
                  <p>{item.national_code}</p>
                  <p className="text-lg">جنسیت شرکت کننده:</p>
                  <p>{item.gender === "male" ? "مرد" : "زن"}</p>
                  <p className="text-lg">وضعیت ثبت نام:</p>
                  <p>{item.approved === 0 ? "تایید نشده" : "تایید شده"}</p>
                  <div className="w-full flex items-center justify-start gap-4">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => {
                        setParticipant(item);
                        openEdit();
                      }}
                    >
                      ویرایش شرکت کننده
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      disabled={deletePending}
                      onClick={() => deleteParticipant(item.id)}
                    >
                      {deletePending ? "در حال حذف..." : "حذف شرکت کننده"}
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
        <EditParticipantForm
          onCloseModal={() => {
            closeEdit();
            onParticipnatChanged();
          }}
          participant={participant}
          workshopId={workshopId}
        />
      </Modal>
    </div>
  );
};

export default WorkshopParticipantsTab;
