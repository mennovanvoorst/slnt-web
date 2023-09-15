export const logSlider = (position) => {
  // position will be between 0 and 100
  const minp = 0;
  const maxp = 100;

  // The result should be between 100 an 10000000
  const minv = Math.log(1);
  const maxv = Math.log(100);

  // calculate adjustment factor
  const scale = (maxv - minv) / (maxp - minp);
  const value = Math.exp(minv + scale * (position - minp));

  return value > 1 ? value : 0;
};
