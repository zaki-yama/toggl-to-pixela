import { TimeEntry } from "./types";
import fetch from "node-fetch";

const TOGGL_URL = "https://api.track.toggl.com/api/v8/time_entries";

// eslint-disable-next-line node/no-unsupported-features/node-builtins
const params = new URLSearchParams({
  start_date: "2021-07-23T00:00:00+09:00",
  end_date: "2021-07-25T00:00:00+09:00",
});

const basicAuth = Buffer.from(`${process.env.TOGGL_TOKEN}:api_token`).toString(
  "base64"
);

const response = await fetch(`${TOGGL_URL}?${params.toString()}`, {
  method: "GET",
  headers: {
    Authorization: `Basic ${basicAuth}`,
  },
});
const timeEntries: TimeEntry[] = await response.json();
console.log(timeEntries);
