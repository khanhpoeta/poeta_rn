import {DefaultDALCollection} from '@poeta/shared/build/dal';
import * as React from 'react';

export const useDefaultDAL = () => {
  const dalCollection = React.useRef(DefaultDALCollection.getDALCollection());
  return dalCollection.current;
};
