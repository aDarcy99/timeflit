let originalTime = Number(self.name) || new Date().getTime();

self.postMessage({
  orginalTime: originalTime,
  timeElapsed: 0,
});

setInterval(() => {
  const timeElapsed = new Date().getTime() - originalTime;

  self.postMessage({
    orginalTime: originalTime,
    timeElapsed,
  });
}, 100);
