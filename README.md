# Loading HOC

## Usage

```jsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import withLoading, { Provider as LoadingProvider } from 'react-native-loading-hoc';

class Example extends React.Component {
  componentDidMount() {
    this.props.loading.apply(this.wait);
  }

  wait() {
    return new Promise(r => setTimeout(() => r(), 3000));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}

const ExampleWithHOC = withLoading(Example);

export default class App extends React.Component {
  render() {
    return (
      <LoadingProvider>
        <ExampleWithHOC />
      </LoadingProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
```

## Reference

### Options

```javascript
style?: {};
spinnerSize?: number | 'small' | 'large';
spinnerColor?: string;
duration?: number;
renderSpinner?: () => Element;
```

### Method

**this.props.loading**

#### start()

```javascript
this.props.loading.start();
```

#### end()

```javascript
this.props.loading.end(); // 'settled'
this.props.loading.end('fulfilled');
this.props.loading.end('rejected');
```

#### apply()

```javascript
const wait = () => new Promise(r => setTimeout(() => r(), 3000));
this.props.loading.apply(wait);

// start -> wait -> end
```

## Support

### [react-navigation](https://reactnavigation.org/)

```javascript
withLoading(createBottomTabNavigator({
  Home: HomeScreen,
  Settings: SettingsScreen,
});

// Home, Settings -> screenProps.loading
```
