import dotenv from 'dotenv';

if (process.env.NODE_ENV !== "prod") {
  const configFile = `./.env.${process.env.NODE_ENV}`;
  dotenv.config({ path: configFile });
} else {
  dotenv.config();
}

export const dbConfig = {
  uri: "mongodb+srv://singprak:%23VZnvVQzGNdAwK9@cluster0.4wl8kmb.mongodb.net/YoutubeVideos",
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
} as unknown as Record<string,any>;
// module.exports = {
//   PORT: process.env.PORT,
//   DB_URL: process.env.MONGODB_URI,
// };
