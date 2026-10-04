#!/usr/bin/env bash
# Run the "YouTube Comments Scraper — Comments & Replies Export" Apify Actor synchronously and print the dataset items.
# Usage: export APIFY_TOKEN=your_apify_token && ./run.sh
set -euo pipefail
: "${APIFY_TOKEN:?Set APIFY_TOKEN first (Apify Console > Settings > API & Integrations)}"

curl -sS -X POST "https://api.apify.com/v2/acts/leadsbrary~youtube-comments-replies-export/run-sync-get-dataset-items" \
  -H "Authorization: Bearer ${APIFY_TOKEN}" \
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
