import mongoose, { Schema, model, connect, Types, InferSchemaType } from 'mongoose';

interface IVideoData extends Document {
    title: string,
    description: string | null,
    publishedAt: Date,
    thumbnails?: string | null,
    url: string,
}

const schema = new Schema({
    title: {type: String, required: true, index: true},
    description: {type: String, required: false, index: true},
    publishedAt: {type: Date, required: true},
    thumbnails: String,
    url: {type: String, required: true},
}, {
    collection: 'videodata'
});

export const videoModel = mongoose.model<IVideoData>('videodata', schema);