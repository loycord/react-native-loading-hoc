import * as React from 'react';

export type LoadingState = 'pending' | 'fulfilled' | 'rejected' | 'settled';

export interface State {
  state: LoadingState;
  start: () => void;
  end: (state?: LoadingState) => void;
  apply: (callback: () => Promise<any>) => void;
}

export const initialState: State = {
  state: 'settled',
  start: () => {},
  end: () => {},
  apply: () => {}
};

export default React.createContext(initialState);
