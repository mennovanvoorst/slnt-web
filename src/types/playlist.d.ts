import { Video } from "@interfaces/video";

export interface Playlist {
  id: number;
  user_id: number;
  title: string;
  duration: number;
  videos: Video[];
}
