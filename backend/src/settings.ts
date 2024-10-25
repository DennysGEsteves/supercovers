import { resolve } from 'path';

const settings = {
  JWT_SECRET: process.env.JWT_SECRET,
  YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
  AUDIOSCROBBLER_API_KEY: process.env.AUDIOSCROBBLER_API_KEY,
  ROOT_PATH: resolve(__dirname),
};

export type EnvsProps = {
  [Property in keyof typeof settings]: string;
};

export default () => ({
  settings,
});
