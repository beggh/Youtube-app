import { respDto } from "../api/dtos/response";

export function responseConverter(item: Record<string,any>): respDto {
   const videoData: respDto = {
    title: item.snippet.title,
    description: item.snippet.description,
    publishedAt: item.snippet.publishedAt,
    thumbnails: item.snippet.thumbnails.url,
    url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
  };
  return videoData;
}