import * as React from 'react';
import { ActivityIndicator, Animated, StyleSheet } from 'react-native';
import { State as LoadingState } from './context';
// types
import { Options } from './withLoading';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.85)',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

interface Props {
  loading: LoadingState;
  options: Options;
}

interface State {
  hide: boolean;
  anim: Animated.Value;
}

class LoadingScreen extends React.PureComponent<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      hide: true,
      anim: new Animated.Value(0)
    };
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    if (props.loading.state === 'pending' && state.hide) {
      return { hide: false };
    }
    return null;
  }

  animate() {
    const { state } = this.props.loading;
    const { duration } = this.props.options;

    const loading: boolean = state === 'pending';

    Animated.timing(this.state.anim, {
      toValue: loading ? 1 : 0,
      duration: duration
    }).start(() => {
      if (!loading) {
        this.setState({ hide: true });
      }
    });
  }

  render() {
    if (this.state.hide) return null;
    this.animate();
    const { style, renderSpinner, spinnerColor, spinnerSize } = this.props.options;
    return (
      <Animated.View style={[styles.container, { opacity: this.state.anim }, style]}>
        {renderSpinner ? (
          renderSpinner()
        ) : (
          <ActivityIndicator size={spinnerSize} color={spinnerColor} />
        )}
      </Animated.View>
    );
  }
}

export default LoadingScreen;
