# YouTube Comments Scraper — Comments & Replies Export — Apify Actor usage guide

[![Run on Apify](https://img.shields.io/badge/Apify-Run%20this%20Actor-24C1E0)](https://apify.com/leadsbrary/youtube-comments-replies-export?fpr=aupara)
[![Try Apify free](https://img.shields.io/badge/Apify-Try%20it%20free-24C1E0)](https://console.apify.com/sign-up?fpr=aupara)

YouTube comments scraper that exports comments and full reply threads from videos, Shorts, playlists and channels: text, author, likes, parentId, pinned/hearted flags, time estimate. JSON, CSV, Excel. From $0.20 per 1,000 results.

> **This repository does not contain the Actor's source code.** The Actor is closed-source and
> runs on Apify's infrastructure. This repo is documentation plus ready-to-run client examples
> (curl, Python, JavaScript) that call the hosted Actor with **your own** Apify API token.

**Run it on Apify →** [https://apify.com/leadsbrary/youtube-comments-replies-export?fpr=aupara](https://apify.com/leadsbrary/youtube-comments-replies-export?fpr=aupara)

## What it does

This YouTube comments scraper collects the public comments **and their reply threads** from YouTube videos, Shorts, playlists and channels, and returns one flat row per comment or reply. Every row links back to its parent (`parentId`, `threadDepth`), so conversations are easy to rebuild. Results can be downloaded as JSON, CSV, Excel, XML or HTML, or read through the Apify API.

It uses YouTube's own public web responses. No login, no cookies and no YouTube API key are needed. Only comments visible to any visitor are collected.

## Use cases

- Sentiment analysis of comments on a product review or launch video
- Competitor audience research across a channel's latest videos
- Building comment/reply datasets for LLM fine-tuning, RAG or topic clustering
- Giveaway entry and brand-mention extraction from comment threads
- Finding creator-hearted and pinned comments to understand creator engagement


## Input

| Field | Type | Required | Description |
|---|---|---|---|
| `startUrls` | array | yes | YouTube video URLs (watch, youtu.be, Shorts, embed), bare 11-character video IDs, playlist URLs, or channel URLs (@handle, /channel/UC…). Playlists and channels expand to their latest videos. |
| `maxVideosPerSource` | integer | no | For playlist and channel inputs: how many videos to expand (latest first for channels). |
| `maxCommentsPerVideo` | integer | no | Maximum top-level comments collected per video (replies are counted separately). |
| `includeReplies` | boolean | no | Fetch the reply thread under each top-level comment. |
| `maxRepliesPerComment` | integer | no | Maximum replies fetched per top-level comment (0 = none). |
| `sortBy` | string | no | Comment ordering as offered by YouTube. |
| `maxResults` | integer | no | Hard cap on total dataset rows (comments + replies) for the whole run. Also protects your spending. |
| `language` | string | no | Interface language (hl) sent to YouTube, e.g. en. Absolute time estimates are only computed for English. |
| `proxyConfiguration` | object | no | Apify datacenter proxy by default. Switch to residential only if YouTube shows consent or 'unusual traffic' pages. |

The full input form (with defaults and validation) is on the [Actor page](https://apify.com/leadsbrary/youtube-comments-replies-export?fpr=aupara).


## Output (sample item)

Sample trimmed for readability (long texts and lists are shortened) — a real run returns the complete data.

```json
{
  "type": "comment",
  "commentId": "UgzuC3zzpRZkjc5Qzsd4AaABAg",
  "parentId": null,
  "threadDepth": 0,
  "videoId": "jNQXAC9IVRw",
  "videoUrl": "https://www.youtube.com/watch?v=jNQXAC9IVRw",
  "videoTitle": "Me at the zoo",
  "sourceUrl": "https://www.youtube.com/watch?v=jNQXAC9IVRw",
  "text": "We're so honored that the first ever YouTube video was filmed here!",
  "authorName": "@SanDiegoZoo",
  "authorChannelId": "UCC5NfQ6Mf0dq_eEwv4P_hWA",
  "authorChannelUrl": "https://www.youtube.com/channel/UCC5NfQ6Mf0dq_eEwv4P_hWA",
  "isChannelOwner": false,
  "isVerifiedAuthor": true,
  "isMember": false,
  "likeCount": 4800000,
  "replyCount": 985,
  "isHeartedByCreator": true,
  "isPinned": true,
  "isEdited": false,
  "publishedTimeText": "6 years ago",
  "publishedAtEstimate": "2020-10-04T00:00:00.000Z",
  "threadText": "@SanDiegoZoo: We're so honored that the first ever YouTube video was filmed here!\n@TheGreekPianist: San Diego Zoo That’s so awesome! I’m so glad the first YouTube video featured cute animals in it! 😊🐘\n@twitchgraal9030: Very cool!\n@simboca: cool",
  "position": 1,
  "sortBy": "top",
  "scrapedAt": "2026-10-04T07:44:20.368Z",
  "error": null
}
```

## Pricing

Pay only for results: about **$0.30 per 1,000 results** on the Apify Free plan, down to **$0.20 per 1,000** on paid Apify plans.

Apify platform usage (compute) is billed by Apify on top of the per-result price — about **$0.01 per 1,000 results** in our measured test runs (estimate, varies with input). Tip: keep only the output formats and options you need to reduce it.

Prices can change — the [Actor page](https://apify.com/leadsbrary/youtube-comments-replies-export?fpr=aupara) always shows the current pricing.

## Quick start

You need an Apify account and an API token (Apify Console → **Settings → API & Integrations**).
Never commit your token: export it as the `APIFY_TOKEN` environment variable.

### cURL

```bash
curl -X POST "https://api.apify.com/v2/acts/leadsbrary~youtube-comments-replies-export/run-sync-get-dataset-items" \
  -H "Authorization: Bearer $APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d @- <<'JSON'
{
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
}
JSON
```

### Python (`apify-client`)

```python
import os
from apify_client import ApifyClient

client = ApifyClient(os.environ["APIFY_TOKEN"])

run_input = {
    "startUrls": [
        "https://www.youtube.com/watch?v=jNQXAC9IVRw"
    ],
    "maxVideosPerSource": 3,
    "maxCommentsPerVideo": 20,
    "includeReplies": True,
    "maxRepliesPerComment": 5,
    "sortBy": "top",
    "maxResults": 3,
    "language": "en",
    "proxyConfiguration": {
        "useApifyProxy": True
    }
}

run = client.actor("leadsbrary/youtube-comments-replies-export").call(run_input=run_input)
for item in client.dataset(run["defaultDatasetId"]).iterate_items():
    print(item)
```

### JavaScript (`apify-client`)

```javascript
import { ApifyClient } from 'apify-client';

const client = new ApifyClient({ token: process.env.APIFY_TOKEN });

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
const { items } = await client.dataset(run.defaultDatasetId).listItems();
console.log(items);
```

Runnable versions live in [`examples/`](./examples).

## Troubleshooting

- **401 / "User was not found or authentication token is not valid"** — check that `APIFY_TOKEN` is set and copied completely.
- **The run finished but the dataset is empty** — widen your search input or check the run log on the Apify Console.
- **Run stops early** — you may have reached the maximum cost per run you set in Apify; raise it in the run options.
- **Need something else?** Open an issue in this repository or use the Issues tab on the Actor page.

## Don't have an Apify account yet?

[Sign up here](https://console.apify.com/sign-up?fpr=aupara) — new accounts get $5 of free platform usage every month, enough to try most Actors without paying upfront.
Browse the full [Apify Store](https://apify.com/store?fpr=aupara) or [all Actors from this developer](https://apify.com/leadsbrary?fpr=aupara).

## Links

- Actor page: [https://apify.com/leadsbrary/youtube-comments-replies-export?fpr=aupara](https://apify.com/leadsbrary/youtube-comments-replies-export?fpr=aupara)
- All Actors from this developer: [https://apify.com/leadsbrary?fpr=aupara](https://apify.com/leadsbrary?fpr=aupara)
- Apify API reference: [https://docs.apify.com/api/v2](https://docs.apify.com/api/v2)

## Keywords

youtube comments scraper, youtube replies scraper, youtube comments export, youtube comment replies, export youtube comments to csv, youtube comments sentiment dataset, youtube comments api alternative, youtube shorts comments scraper, youtube pinned comment, youtube comments json, youtube comment thread extractor

#youtube #youtubecomments #commentscraper #sentimentanalysis #sociallistening #webscraping #dataset #llm #apify

## License

The example code in this repository is released under the MIT License — see [LICENSE](./LICENSE).
It does not cover the Actor itself, which remains closed-source and is operated by its developer on Apify.
