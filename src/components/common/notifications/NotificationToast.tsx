"use client";

import { useEffect, useRef, useState } from "react";
import { initializeEcho } from "@/lib/echo";
import NotificationContainer, {
  ToastNotification,
} from "@/components/common/notifications/NotificationContainer";

export default function NotificationToast() {
  const notifRef = useRef<any>(null);

  useEffect(() => {
    const getToken = async () => {
      const res = await fetch("/api/auth/token");
      if (!res.ok) throw new Error("Fetch failed");
      const data = await res.json();

      const realToken = data.token ?? data.access_token ?? data;
      const echo = initializeEcho(realToken);

      const channel = echo.private("Admins");
      channel.listen(".NotificationCreated", (data: any) => {
        const notif: ToastNotification = {
          id: data.id,
          title: data.title ?? "نوتیف جدید",
          message: data.message ?? "",
          duration: 3000,
        };

        notifRef.current?.addNotification(notif);
      });

      // cleanup
      return () => {
        echo.leave("Admins");
      };
    };

    getToken();
  }, []);

  return (
    <>
      <NotificationContainer ref={notifRef} />
    </>
  );
}
