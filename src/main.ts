import { TimeEntry } from "./types";
import fetch from "node-fetch";
import debugModule from "debug";
const debug = debugModule("toggl-to-pixela");

const TOGGL_URL = "https://api.track.toggl.com/api/v8/time_entries";
const TOGGLE_PROJECT_ID = process.env.TOGGL_PROJECT_ID;

const PIXELA_USERNAME = process.env.PIXELA_USERNAME;
const PIXELA_TOKEN = process.env.PIXELA_TOKEN;
const PIXELA_GRAPH_ID = process.env.PIXELA_GRAPH_ID;

const today = new Date();
const year = today.getFullYear();
const month = (today.getMonth() + 1).toString().padStart(2, "0");
const day = (today.getDate() - 1).toString().padStart(2, "0");

debug(`target day: ${year}-${month}-${day}`);

// eslint-disable-next-line node/no-unsupported-features/node-builtins
const params = new URLSearchParams({
  start_date: `${year}-${month}-${day}T00:00:00+09:00`,
  end_date: `${year}-${month}-${day}T23:59:59+09:00`,
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
// console.log(timeEntries);

const totalDurationInSec = timeEntries.reduce((acc, curr) => {
  debug(curr);
  if (curr.pid !== Number(TOGGLE_PROJECT_ID)) {
    return acc;
  }
  debug(`add ${curr.duration / 60} minutes`);
  return acc + curr.duration;
}, 0);
debug(`total minutes: ${totalDurationInSec / 60}`);

const pixel = await fetch(
  `https://pixe.la/v1/users/${PIXELA_USERNAME}/graphs/${PIXELA_GRAPH_ID}`,
  {
    method: "POST",
    headers: {
      "X-USER-TOKEN": `${PIXELA_TOKEN}`,
    },
    body: JSON.stringify({
      date: `${year}${month}${day}`,
      quantity: (totalDurationInSec / 60).toString(),
    }),
  }
);
debug(pixel.status);
debug(await pixel.json());
