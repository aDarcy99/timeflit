let currentTime = Number(self.name) || 0;

self.postMessage({
  timeElapsed: currentTime
});

setInterval(() => {
  currentTime += 10;

  self.postMessage({
    timeElapsed: currentTime
  });
}, 100);
