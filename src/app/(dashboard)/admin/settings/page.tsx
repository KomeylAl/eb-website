"use client";

import Header from "../../_components/layout/Header";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

import BackupRestoreSection from "../../_components/BackupRestoreSection";

import {
  useBackupDoctors,
  useBackupClients,
  useBackupPosts,
  useBackupCategoties,
  useBackupTags,
  useBackupWorkshops,
  useBackupAbout,
  useBackupAdmins,
} from "@/hooks/useBackup";

import {
  useRestoreDoctors,
  useRestoreClients,
  useRestorePosts,
  useRestoreCategories,
  useRestoreTags,
  useRestoreWorkshops,
  useRestoreAbout,
  useRestoreAdmins,
} from "@/hooks/useRestore";

export default function Settings() {
  return (
    <div className="w-full h-full flex flex-col">
      <Header searchFn={() => {}} isShowSearch={false} />

      <div className="p-12 space-y-6">
        <h2 className="font-bold text-2xl">تنظیمات</h2>

        <Accordion type="multiple" className="space-y-4">
          {/* رواندرمانگران */}
          <AccordionItem value="doctors">
            <AccordionTrigger>رواندرمانگران</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <BackupRestoreSection
                title="رواندرمانگران"
                backupHook={useBackupDoctors}
                restoreHook={useRestoreDoctors}
              />
            </AccordionContent>
          </AccordionItem>

          {/* مراجعان */}
          <AccordionItem value="clients">
            <AccordionTrigger>مراجعان</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <BackupRestoreSection
                title="مراجعان"
                backupHook={useBackupClients}
                restoreHook={useRestoreClients}
              />
            </AccordionContent>
          </AccordionItem>

          {/* محتوا */}
          <AccordionItem value="content">
            <AccordionTrigger>محتوا</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <BackupRestoreSection
                title="مقالات"
                backupHook={useBackupPosts}
                restoreHook={useRestorePosts}
              />
              <BackupRestoreSection
                title="دسته‌بندی‌ها"
                backupHook={useBackupCategoties}
                restoreHook={useRestoreCategories}
              />
              <BackupRestoreSection
                title="برچسب‌ها"
                backupHook={useBackupTags}
                restoreHook={useRestoreTags}
              />
              <BackupRestoreSection
                title="کارگاه‌ها"
                backupHook={useBackupWorkshops}
                restoreHook={useRestoreWorkshops}
              />
              <BackupRestoreSection
                title="درباره‌ی مرکز"
                backupHook={useBackupAbout}
                restoreHook={useRestoreAbout}
              />
            </AccordionContent>
          </AccordionItem>

          {/* مدیران */}
          <AccordionItem value="admins">
            <AccordionTrigger>مدیران</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <BackupRestoreSection
                title="مدیران"
                backupHook={useBackupAdmins}
                restoreHook={useRestoreAdmins}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
