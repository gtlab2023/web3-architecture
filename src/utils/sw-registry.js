// src/sw-register.js
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(registration => {
        console.log('SW registered: ', registration);

        // 检测更新
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed') {
              if (confirm('发现新版本，是否立即更新？')) {
                window.location.reload();
              }
            }
          });
        });
      })
      .catch(error => {
        console.log('SW registration failed: ', error);
      });
  });
}
