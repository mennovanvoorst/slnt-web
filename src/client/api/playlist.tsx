import { HttpResponse } from "@interfaces/http";
import { get, post } from "@utils/http";
import { Playlist } from "@interfaces/playlist";

export const fetchUserPlaylists = async (): Promise<HttpResponse> =>
  get({ endpoint: `/v1/playlists/user` });

export const updatePlaylist = async (data: Playlist): Promise<HttpResponse> =>
  post({ endpoint: `/v1/playlists/update`, data });

export const deletePlaylist = async (id: string): Promise<HttpResponse> =>
  post({ endpoint: `/v1/playlists/delete`, data: { id } });
