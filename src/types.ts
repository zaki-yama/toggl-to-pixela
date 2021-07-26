export type TimeEntry = {
  id: number;
  guid: string;
  /** project ID */
  pid?: number;
  /** workspace ID */
  wid?: number;
  /** task ID */
  tid?: number;

  description: string;
  /** the name of your client app */
  created_with?: string;
  billable: boolean;
  start: string; // "2021-07-23T03:23:50+00:00";
  stop: string; // "2021-07-23T03:28:50+00:00";
  duration: number;
  tags?: string[];
  duronly: boolean;
  /** timestamp that is sent in the response, indicates the time item was last updated */
  at: string; // "2021-07-23T03:28:51+00:00";

  uid: number;
};
