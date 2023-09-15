import { Application } from "express";
import { Strategy as TwitchStrategy } from "twitch-oauth-passport";
import { Strategy as YoutubeStrategy } from "passport-youtube-v3";
import { Strategy as SpotifyStrategy } from "passport-spotify";
import refresh from "passport-oauth2-refresh";
import config from "@config";
import { handleAuthentication } from "@services/passport";

import passport from "passport";
import user from "@models/user";
import { add } from "date-fns";

export default ({ app }: { app: Application }): void => {
  const twitchStrategy = new TwitchStrategy(
    {
      clientID: config.twitch.client_id as string,
      clientSecret: config.twitch.secret as string,
      callbackURL: `${config.server_url}${config.api.prefix}/v1/auth/authenticate/twitch/callback`,
      scope: config.twitch.scopes,
      passReqToCallback: true
    },
    async (req, accessToken, refreshToken, profile, done) => {
      const res = await handleAuthentication(
        req,
        {
          id: profile.id,
          login: profile.displayName,
          avatar: profile.profileImageUrl
        },
        accessToken,
        refreshToken,
        null,
        "twitch"
      );

      done(null, res);
    }
  );

  const youtubeStrategy = new YoutubeStrategy(
    {
      clientID: config.youtube.client_id as string,
      clientSecret: config.youtube.secret as string,
      callbackURL: `${config.server_url}${config.api.prefix}/v1/auth/authenticate/youtube/callback`,
      scope: config.youtube.scopes,
      passReqToCallback: true
    },
    async (req, accessToken, refreshToken, profile, done) => {
      if (!profile.id) return done(new Error("invalid account"), null);

      const res = await handleAuthentication(
        req,
        {
          id: profile.id,
          login: profile.displayName,
          avatar: JSON.parse(profile._raw).items[0].snippet.thumbnails.high.url
        },
        accessToken,
        refreshToken,
        null,
        "youtube"
      );

      done(null, res);
    }
  );

  const spotifyStrategy = new SpotifyStrategy(
    {
      clientID: config.spotify.client_id as string,
      clientSecret: config.spotify.secret as string,
      callbackURL: `${config.server_url}${config.api.prefix}/v1/auth/authenticate/spotify/callback`,
      scope: [
        "user-read-email",
        "user-read-private",
        "streaming",
        "user-read-playback-state",
        "user-modify-playback-state"
      ],
      passReqToCallback: true
    },
    async (req, accessToken, refreshToken, expiresIn, profile, done) => {
      if (!profile.id) return done(new Error("invalid account"), null);

      let expirationDate = new Date();
      expirationDate = add(expirationDate, { seconds: expiresIn });

      const res = await handleAuthentication(
        req,
        {
          id: profile.id,
          login: profile.displayName,
          avatar: profile.photos[0].value
        },
        accessToken,
        refreshToken,
        expirationDate,
        "spotify"
      );

      done(null, res);
    }
  );

  passport.use(twitchStrategy);
  passport.use(youtubeStrategy);
  passport.use(spotifyStrategy);

  refresh.use(spotifyStrategy);

  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: string, done) => {
    const u = await user.findById(id);

    if (u) done(null, u);
  });
};
