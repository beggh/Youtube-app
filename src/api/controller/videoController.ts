
import express, { Request, Response } from 'express';
import YoutubeService from '../services/youtube-service';

const service = new YoutubeService();
const router = express.Router();

router.get('/search', async (req: Request, res: Response) => {
  try {
    const itemsObj = await service.search(req.query);
    res.status(200).json({data: itemsObj.data, nextPageToken: itemsObj.nextPageToken });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
