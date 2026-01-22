export function track(eventName: string, params?: Record<string, any>) {
    const gtag = (window as any).gtag;
    if (!gtag) return;
  
    gtag("event", eventName, {
      ...params,
    });
  }