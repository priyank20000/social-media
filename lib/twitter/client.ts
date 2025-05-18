import { TwitterApi } from 'twitter-api-v2';

if (!process.env.TWITTER_BEARER_TOKEN) {
  throw new Error('TWITTER_BEARER_TOKEN is required');
}

export const twitterClient = new TwitterApi(process.env.TWITTER_BEARER_TOKEN);