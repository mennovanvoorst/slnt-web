import { EventProps } from "@interfaces/sockets";
import sockets from "@services/socket";
import user from "@services/user";
import { User as UserInterface } from "@interfaces/user";
import { add, isPast } from "date-fns";
import refresh from "passport-oauth2-refresh";
import { updateToken } from "@services/passport";
import axios, { AxiosError } from "axios";
import config from "@config";

const fetchAccessToken = async (userId: string): Promise<string> => {
  const u = await user.fetchById({ id: userId });

  if (!("spotify" in u.providers)) return;
  const expirationDate = u.providers["spotify"].expiresIn as unknown as string;

  if (isPast(new Date(expirationDate))) {
    refresh.requestNewAccessToken(
      "spotify",
      u.providers["spotify"].refreshToken,
      async (err, accessToken, refreshToken) => {
        if (err) console.log(err);

        await updateToken(
          { user: u },
          accessToken,
          add(new Date(), { seconds: 3600 }),
          "spotify"
        );

        return accessToken;
      }
    );
  } else {
    return u.providers["spotify"].token as unknown as string;
  }
};

const playSpotify = async ({
  io,
  socket,
  payload
}: EventProps): Promise<void> => {
  if (!("passport" in socket.request.session)) return;

  const userId = socket.request.session.passport.user;
  const { track, offset, deviceId } = payload;

  const body = {};
  if (track) body["uris"] = [track];

  try {
    await axios.put(
      `${config.spotify.api_url}/v1/me/player/play?device_id=${deviceId}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${await fetchAccessToken(userId)}`
        }
      }
    );
  } catch (e) {
    console.log("play");
    console.log(e.response.data);
  }
};

const pauseSpotify = async ({
  io,
  socket,
  payload
}: EventProps): Promise<void> => {
  if (!("passport" in socket.request.session)) return;

  const userId = socket.request.session.passport.user;
  const { deviceId } = payload;

  try {
    await axios.put(
      `${config.spotify.api_url}/v1/me/player/pause?device_id=${deviceId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${await fetchAccessToken(userId)}`
        }
      }
    );
  } catch (e) {
    console.log("pause");
    console.log(e.response.data);
  }
};

const volumeSpotify = async ({
  io,
  socket,
  payload
}: EventProps): Promise<void> => {
  if (!("passport" in socket.request.session)) return;

  const userId = socket.request.session.passport.user;
  const { deviceId, volume } = payload;

  try {
    await axios.put(
      `${config.spotify.api_url}/v1/me/player/volume?device_id=${deviceId}&volume_percent=${volume}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${await fetchAccessToken(userId)}`
        }
      }
    );
  } catch (e) {
    console.log("volume");
    console.log(e.response.data);
  }
};

const transferSpotify = async ({
  io,
  socket,
  payload
}: EventProps): Promise<void> => {
  if (!("passport" in socket.request.session)) return;

  const userId = socket.request.session.passport.user;
  const { deviceId, play } = payload;

  console.log(play);
  try {
    await axios.put(
      `${config.spotify.api_url}/v1/me/player`,
      { device_ids: [deviceId], play },
      {
        headers: {
          Authorization: `Bearer ${await fetchAccessToken(userId)}`
        }
      }
    );
  } catch (e) {
    console.log("transfer");
    console.log(e.response.data);
  }
};

const positionSpotify = async ({
  io,
  socket,
  payload
}: EventProps): Promise<void> => {
  if (!("passport" in socket.request.session)) return;

  const userId = socket.request.session.passport.user;
  const { deviceId, timestamp } = payload;

  try {
    await axios.put(
      `${config.spotify.api_url}/v1/me/player/seek?device_id=${deviceId}&position_ms=${timestamp}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${await fetchAccessToken(userId)}`
        }
      }
    );
  } catch (e) {
    console.log("seek");
    console.log(e.response.data);
  }
};

export default {
  playSpotify,
  pauseSpotify,
  volumeSpotify,
  transferSpotify,
  positionSpotify
};
