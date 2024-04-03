import {videoModel} from "../models/videoModel";
import { respDto } from "../../api/dtos/response";

export default class VideoRepository {
    constructor() {
    }
    async saveVideo(data: respDto): Promise<void> {
        try {
            const video = new videoModel(data);
            await video.save();
        } catch (error) {
            console.error(`Error saving to database:`, error);
        }
    }

    async getVideos(options: any): Promise<respDto[] | null> {
        try {
            let query: any = {};

            if (options.title) {
                query.title = { $regex: options.title, $options: 'i' };
            }

            if (options.description) {
                query.description = { $regex: options.description, $options: 'i' };
            }
            let resultQuery = videoModel.find(query);
            if  (options.nextPageToken) {
                resultQuery = resultQuery.skip(parseInt(options.nextPageToken));
            }
            console.log(`printing query : ${resultQuery}`);
            const result = await videoModel.find(resultQuery).limit(10).sort({publishedAt: -1});
            return result as unknown as respDto[] | [];

        } catch (err) {
            console.error(err);
            return null;
        }
    }
}