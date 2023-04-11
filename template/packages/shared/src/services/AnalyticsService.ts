import analytics from '@react-native-firebase/analytics';

type AnalyticsParameter = 'action' | 'category' | 'platform' | 'userMetaData';

export const logScreenView = (screenName: string, screenClass: string) => {
  return analytics().logScreenView({
    screen_name: screenName,
    screen_class: screenClass,
  });
};

export const logEvent = (
  eventName: string,
  params?: {[key in AnalyticsParameter]?: any},
) => {
  return analytics().logEvent(eventName, params);
};
