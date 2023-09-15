import { HttpResponse } from "@interfaces/http";
import { get } from "@utils/http";

export const searchVideo = async (params: {
  search: string;
}): Promise<HttpResponse> => get({ endpoint: `/v1/video/search`, params });

export const fetchVideo = async (videoId: string): Promise<HttpResponse> =>
  get({ endpoint: `/v1/video/fetch/${videoId}` });

export const fetchPlaylist = async (
  playlistId: string
): Promise<HttpResponse> =>
  get({ endpoint: `/v1/video/playlist/${playlistId}` });

export const fetchPlaylistItems = async (
  playlistId: string
): Promise<HttpResponse> =>
  get({ endpoint: `/v1/video/playlist/items/${playlistId}` });
