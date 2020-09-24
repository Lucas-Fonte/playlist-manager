import { resolveDuration } from '../../tools/resolveDuration';

const getResults = (videos: any[]) => {
  const durationArray = videos.map(({ items: [videoData] }: any) =>
    resolveDuration(videoData.contentDetails.duration)
  );

  const totalDuration = durationArray.reduce(
    (current, total) => (total += current)
  );

  return totalDuration;
};

export { getResults };
