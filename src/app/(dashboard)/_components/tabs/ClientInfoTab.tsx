import Label from "@/components/common/Label";
import CustomDatePicker from "@/components/ui/custom/DatePicker";
import { Input } from "@/components/ui/input";
import { dateConvert } from "@/lib/utils";
import React from "react";

interface ClientInfoTabProps {
  client: any;
}

const ClientInfoTab = ({ client }: ClientInfoTabProps) => {
  return (
    <div>
      {client && (
        <div className="">
          <div className="w-full mt-4 flex items-center justify-between gap-3">
            <div className="w-full">
              <Label>نام و نام خانوادگی</Label>
              <Input
                type="text"
                className="bg-white"
                value={client.name}
                onChange={() => {}}
              />
            </div>
            <div className="w-full">
              <Label>شماره تلفن</Label>
              <Input
                type="text"
                className="bg-white"
                value={client.phone}
                onChange={() => {}}
              />
            </div>
          </div>
          <div className="w-full mt-4 flex items-center justify-center gap-3">
            <div className="w-full">
              <Label>تاریخ تولد</Label>
              <CustomDatePicker value={dateConvert(client.birth_date)} />
            </div>
            <div className="w-full">
              <Label>آدرس</Label>
              <Input
                type="text"
                className="bg-white"
                value={client.address}
                onChange={() => {}}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientInfoTab;
