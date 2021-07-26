import { TimeEntry } from "./types";
import fetch from "node-fetch";

const TOGGL_URL = "https://api.track.toggl.com/api/v8/time_entries";

const PIXELA_USERNAME = "zaki-yama";
const PIXELA_USER_TOKEN = process.env.PIXELA_TOKEN;

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

const graphId = "playground";
const pixel = await fetch(
  `https://pixe.la/v1/users/${PIXELA_USERNAME}/graphs/${graphId}`,
  {
    method: "POST",
    headers: {
      "X-USER-TOKEN": `${PIXELA_USER_TOKEN}`,
    },
    body: JSON.stringify({
      date: "20210718",
      quantity: "25",
    }),
  }
);
console.log(pixel.status);
console.log(await pixel.json());
