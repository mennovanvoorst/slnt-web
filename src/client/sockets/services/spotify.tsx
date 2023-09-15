import { Socket } from "socket.io-client";
import { Session } from "@interfaces/session";

export const playSong = (
  socket: Socket,
  {
    deviceId,
    offset = 0,
    track
  }: { deviceId: string; offset?: number; track?: string }
): void => {
  socket.emit("action", {
    type: "playSpotify",
    payload: { deviceId, offset, track }
  });
};

export const pauseSong = (
  socket: Socket,
  { deviceId }: { deviceId: string }
): void => {
  socket.emit("action", {
    type: "pauseSpotify",
    payload: { deviceId }
  });
};

export const changeVolume = (
  socket: Socket,
  { volume, deviceId }: { volume: number; deviceId: string }
): void => {
  socket.emit("action", {
    type: "volumeSpotify",
    payload: { volume, deviceId }
  });
};

export const seekPosition = (
  socket: Socket,
  { timestamp, deviceId }: { timestamp: number; deviceId: string }
): void => {
  socket.emit("action", {
    type: "positionSpotify",
    payload: { timestamp, deviceId }
  });
};

export const transferDevice = (
  socket: Socket,
  { deviceId, play }: { deviceId: string; play: boolean }
): void => {
  socket.emit("action", {
    type: "transferSpotify",
    payload: { deviceId, play }
  });
};
