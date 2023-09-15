import { Video } from "@interfaces/video";
import { axiosETAGCache } from "axios-etag-cache";
import { parse, toSeconds } from "iso8601-duration";
import config from "@config";
import { AxiosResponse } from "axios";

const search = (search: string): Promise<Video[]> =>
  axiosETAGCache({
    params: {
      part: "snippet",
      type: "video",
      maxResults: 50,
      q: search,
      key: config.youtube.key
    }
  })
    .get(`${config.youtube.endpoints.search}`)
    .then(async (res: AxiosResponse<any>) => {
      const videos = await fetch(res.data.items.map((item) => item.id.videoId));

      if (!Array.isArray(videos)) return;

      return videos;
    })
    .catch((err: Error) => {
      throw new Error(err.message);
    });

const fetch = (videoId: string | string[]): Promise<Video | Video[]> =>
  axiosETAGCache({
    params: {
      part: "snippet,contentDetails",
      id: typeof videoId === "string" ? videoId : videoId.join(),
      key: config.youtube.key
    }
  })
    .get(`${config.youtube.endpoints.video}`)
    .then((res: AxiosResponse<any>) => {
      if (Array.isArray(videoId)) {
        const videos: Video[] = [];

        res.data.items.forEach((vid) => {
          // We do not yet support livestreams so filter them out
          if (vid.snippet.liveBroadcastContent !== "none") return;

          const video: Video = {
            id: vid.id,
            title: vid.snippet.title,
            channel: vid.snippet.channelTitle,
            duration: toSeconds(parse(vid.contentDetails.duration)),
            thumbnails: {
              default: vid.snippet.thumbnails.default.url,
              medium: vid.snippet.thumbnails.medium.url,
              high: vid.snippet.thumbnails.high.url
            }
          };

          videos.push(video);
        });

        return videos;
      } else {
        const vid = res.data.items[0];

        // We do not yet support livestreams so filter them out
        if (vid.snippet.liveBroadcastContent !== "none")
          throw new Error("No video found");

        const video = {
          id: vid.id,
          title: vid.snippet.title,
          channel: vid.snippet.channelTitle,
          duration: toSeconds(parse(vid.contentDetails.duration)),
          thumbnails: {
            default: vid.snippet.thumbnails.default.url,
            medium: vid.snippet.thumbnails.medium.url,
            high: vid.snippet.thumbnails.high.url
          }
        };

        return video;
      }
    })
    .catch((err: Error) => {
      throw new Error(err.message);
    });

const fetchPlaylist = (playlistId: string): Promise<Video[]> =>
  axiosETAGCache({
    params: {
      part: "snippet,contentDetails",
      id: playlistId,
      key: config.youtube.key
    }
  })
    .get(`${config.youtube.endpoints.playlists}`)
    .then((res: AxiosResponse<any>) => {
      const p = res.data.items[0];

      const playlist = {
        id: p.id,
        title: p.snippet.title,
        channel: p.snippet.channelTitle,
        duration: 0,
        thumbnails: {
          default:
            "default" in p.snippet.thumbnails &&
            p.snippet.thumbnails.default.url,
          medium:
            "medium" in p.snippet.thumbnails && p.snippet.thumbnails.medium.url,
          high: "high" in p.snippet.thumbnails && p.snippet.thumbnails.high.url
        }
      };

      return [playlist];
    })
    .catch((err: Error) => {
      throw new Error(err.message);
    });

const fetchPlaylistItems = async (playlistId: string): Promise<Video[]> => {
  let nextPageToken = "";
  let videos: Video[] = [];

  const fetchItems = async (): Promise<void> => {
    try {
      const response: AxiosResponse<any> = await axiosETAGCache({
        params: {
          part: "snippet",
          maxResults: 50,
          pageToken: nextPageToken,
          playlistId,
          key: config.youtube.key
        }
      }).get(`${config.youtube.endpoints.playlistItems}`);

      nextPageToken = response.data.nextPageToken;

      const videoIds: string[] = [];

      response.data.items.forEach((video) => {
        videoIds.push(video.snippet.resourceId.videoId);
      });

      const allVideos = await fetch(videoIds);

      if (Array.isArray(allVideos)) videos = [...videos, ...allVideos];

      if (nextPageToken) await fetchItems();

      return;
    } catch (e) {
      console.log(e);
    }
  };
  await fetchItems();

  return videos;
};

export default {
  search,
  fetch,
  fetchPlaylist,
  fetchPlaylistItems
};
