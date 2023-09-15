import { Config } from "@interfaces/config";

const config: Config = {
  site_url: process.env.SITE_URL as string,
  app_url: process.env.APP_URL as string,
  server_url: process.env.SERVER_URL as string,
  chrome_extension_url: process.env.CHROME_EXTENSION_URL as string,
  firefox_extension_url: process.env.FIREFOX_EXTENSION_URL as string,
  port: process.env.PORT as string,
  session_key: process.env.SESSION_KEY as string,

  api: {
    prefix: process.env.API_PREFIX as string
  },

  twitch: {
    bot_url: process.env.TWITCH_BOT_URL,
    client_id: process.env.TWITCH_CLIENT_ID,
    secret: process.env.TWITCH_SECRET,
    scopes: process.env.TWITCH_SCOPES as string
  },

  youtube: {
    bot_url: process.env.YOUTUBE_BOT_URL,
    client_id: process.env.YOUTUBE_CLIENT_ID,
    secret: process.env.YOUTUBE_SECRET,
    scopes: ["https://www.googleapis.com/auth/youtube.readonly"],
    key: process.env.YOUTUBE_KEY,

    endpoints: {
      search: `${process.env.YOUTUBE_URL}/search`,
      video: `${process.env.YOUTUBE_URL}/videos`,
      playlists: `${process.env.YOUTUBE_URL}/playlists`,
      playlistItems: `${process.env.YOUTUBE_URL}/playlistItems`
    }
  },

  spotify: {
    client_id: process.env.SPOTIFY_CLIENT_ID,
    secret: process.env.SPOTIFY_SECRET,
    api_url: process.env.SPOTIFY_URL
  },

  db: {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    name: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT || "5000", 10),
    password: process.env.DB_PASSWORD
  }
};

export default config;
