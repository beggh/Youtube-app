import { google, youtube_v3 } from 'googleapis';
import { respDto } from '../../src/api/dtos/response';
import { responseConverter } from './response.converter';
import videoRepository from '../../src/database/repository/video-repository'

export default class VideoScheduler {
    private static instance: VideoScheduler;
    private fetchQuery: string = 'new';
    private index: number = 0;
    private respository: videoRepository;
    private constructor(repository: videoRepository) {
        this.respository = repository;
    }
    public static getInstance(repository: videoRepository) {
        if(!VideoScheduler.instance)
            this.instance = new VideoScheduler(repository);
        return VideoScheduler.instance;
    }
    async fetchVideos() {
        try {
            console.log('Fething videos from cron ....')
            const apiKey = ['AIzaSyCJDpVAMqVf-SCv3UFStGQ3-_oXN8IPEC0', 'AIzaSyDHtzeA0lii7LTJiGz5CBxq8ZCSzmtvtEw', 'AIzaSyCoFin0q093V4sLgvVxlUySBteEf7sU3rc', 'AIzaSyC6hGbtDD-cQ16jk1aSMlQmnYCcUOlumaY', 'AIzaSyDWQi84jvoXMGurwO7zIX2VRjPyKFonZnA'];
            let _size = apiKey.length;
            this.index %= _size; // to prevent Memory overflow
            const youtube = google.youtube({ version: 'v3', auth: apiKey[this.index]});
            console.log(` index :=  ${this.index}`);
    
            const queryParams: youtube_v3.Params$Resource$Search$List = {
                part: ['snippet'],
                q: this.fetchQuery,
                maxResults: 100,
                type: ['videoModel'],
                order: 'date',
            }
            const response: any = await youtube.search.list(queryParams);
    
            const items = response.data.items;
            if (items) {
                items.map(async (item: any) => {
                    const convertedRes: respDto =  responseConverter(item);
                    await this.respository.saveVideo(convertedRes);
                });
            } else {
                throw new Error('No search results found' );
            }
        } catch (error: any) {
            console.log(`Error: ` + JSON.stringify(error))
            if(error.message.includes('exceeded')) {
                console.log('Quota exceeded. Trying with the next API key...');
                this.index++;
                await this.fetchVideos();
            }
            else
                throw error;
        }
    }
}