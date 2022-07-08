// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
  if (window?.gtag) {
    window.gtag('config', process.env.GA_TRACKING_ID, {
      page_path: url,
    });
  }
};
