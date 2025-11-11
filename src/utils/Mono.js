// utils/mono.js
export const loadMonoSDK = () =>
  new Promise((resolve, reject) => {
    if (window.MonoConnect) return resolve(window.MonoConnect);

    // Avoid duplicate script
    if (!document.querySelector('script[src="https://connect.withmono.com/connect.js"]')) {
      const script = document.createElement("script");
      script.src = "https://connect.withmono.com/connect.js";
      script.async = true;
      script.defer = true;
      script.onerror = () => reject("Failed to load Mono SDK");
      document.head.appendChild(script);
    }

    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      if (window.MonoConnect) {
        clearInterval(interval);
        resolve(window.MonoConnect);
      } else if (attempts > 150) { // 150 * 100ms = 15s
        clearInterval(interval);
        reject("Mono SDK initialization timeout");
      }
    }, 100);
  });
