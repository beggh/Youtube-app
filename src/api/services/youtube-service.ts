import VideoRepository from "../../database/repository/video-repository";

export default class YoutubeService {
    private repository: VideoRepository;
    constructor(){
        this.repository = new VideoRepository();
    }

    async search(params: any) {
        try {
            const { title, description, nextPageToken } = params;
            //await YoutubeService.fetchVideos(title || description);
            const repoResp =  await this.repository.getVideos({title: title, description: description, nextPageToken: nextPageToken});
            if(!nextPageToken) {
                return {data: repoResp, nextPageToken: repoResp?.length === 10 ? 10: 0};
            }
            else {
                return {data: repoResp, nextPageToken: parseInt(nextPageToken)+10};
            }
        } catch (error) {
            console.error('Error: ', error);
            throw error;;
        }
    }
}