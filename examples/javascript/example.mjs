// Run the "YouTube Comments Scraper — Comments & Replies Export" Apify Actor and print its results.
// Setup: npm install  &&  export APIFY_TOKEN=your_apify_token  &&  node example.mjs
// This repository only documents the Actor; its source code runs on Apify's infrastructure.
import { ApifyClient } from 'apify-client';

const token = process.env.APIFY_TOKEN;
if (!token) {
    console.error('Set the APIFY_TOKEN environment variable first (Apify Console > Settings > API & Integrations).');
    process.exit(1);
}

const client = new ApifyClient({ token });

const runInput = {
  "startUrls": [
    "https://www.youtube.com/watch?v=jNQXAC9IVRw"
  ],
  "maxVideosPerSource": 3,
  "maxCommentsPerVideo": 20,
  "includeReplies": true,
  "maxRepliesPerComment": 5,
  "sortBy": "top",
  "maxResults": 3,
  "language": "en",
  "proxyConfiguration": {
    "useApifyProxy": true
  }
};

const run = await client.actor('leadsbrary/youtube-comments-replies-export').call(runInput);
console.log(`Run finished with status: ${run.status}`);
const { items } = await client.dataset(run.defaultDatasetId).listItems();
console.log(JSON.stringify(items, null, 2));
