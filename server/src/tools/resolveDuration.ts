const resolveDuration = (duration: string) => {
  const array = duration.replace('PT', '').replace(/\D/g, ',').split(',');

  if (array.length < 4) {
    array.unshift('');
  }

  const [hour, minutes, seconds] = array;
  return Number(hour) * 60 + Number(minutes) + Number(seconds) / 60;
};

export { resolveDuration };
