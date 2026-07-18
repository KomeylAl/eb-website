export type NavItem = {
  title: string;
  link: string;
};

export type EntityType = {
  label: string;
  value: string;
};

export type WorkshopSessionType = {
  id: string;
  session_date: string;
  start_time: string;
  end_time: string;
  location: string;
  link: string;
  title: string;
  description: string;
};

export type WorkshopParticipantType = {
  id: string;
  name: string;
  english_name: string | null;
  national_code: string | null;
  gender: string;
  phone: string;
  approved: boolean;
};

export type WorkshopType = {
  id: string;
  title: string;
  description?: string;
  content?: string | null;
  organizers: string | null;
  start_date: string;
  end_date: string | null;
  week_day: string | null;
  time: string | null;
  image_url: string | null;
  /** @deprecated use image_url */
  img_path?: string | null;
  sessions?: WorkshopSessionType[];
  participants?: WorkshopParticipantType[];
};
