import React, { useEffect, useMemo, useState } from 'react';
import json2mq from 'json2mq';
import { useTheme } from '@material-ui/core/styles';

type MediaQueries = {
  [key: string]: string;
};

export type MediaMatches = {
  [key: string]: boolean;
}

export default () => {
  const { breakpoints } = useTheme();
  const mediaQueries = useMemo<MediaQueries>(() => breakpoints.keys.reduce((result: MediaQueries, key: string) => {
    const width = breakpoints.values[key];
  
    return {
      ...result,
      [`${key}Up`]: json2mq({
        minWidth: width,
      }),
      [`${key}Down`]: json2mq({
        maxWidth: width,
      })
    };
  }, {}), []);

  const getMediaQueryMatches = (): MediaMatches => {
    return Object.assign({}, ...Object.entries(mediaQueries).map(([ key, mediaQuery ]) => ({
      [key]: window.matchMedia(mediaQuery).matches
    })));
  };

  const [mediaMatches, setMediaMatches] = useState<MediaMatches>(getMediaQueryMatches());

  useEffect(() => {
    const handleResize = () => {
      setMediaMatches(getMediaQueryMatches());
    }
  
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  return mediaMatches;
}