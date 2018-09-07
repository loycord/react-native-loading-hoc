import * as React from "react";
import Context from "./context";
import LoadingScreen from "./LoadingScreen";

export interface Options {
  style?: {};
  spinnerSize?: number | "small" | "large";
  spinnerColor?: string;
  duration?: number;
  renderSpinner?: () => Element;
}

const initialOptions: Options = {
  spinnerSize: "large",
  spinnerColor: "#043B40",
  duration: 1500
};

function withLoading(
  Component: React.ComponentClass<any> | any,
  options: Options = initialOptions
) {
  options = { ...initialOptions, ...options };
  return class extends React.Component<{ screenProps?: any }> {
    public render() {
      let screenProps = {};
      if (this.props.screenProps) {
        screenProps = this.props.screenProps;
      }
      return (
        <Context.Consumer>
          {loading => (
            <React.Fragment>
              <Component
                {...this.props}
                loading={loading}
                screenProps={{ ...screenProps, loading }}
              />
              <LoadingScreen
                {...this.props}
                loading={loading}
                options={options}
              />
            </React.Fragment>
          )}
        </Context.Consumer>
      );
    }
  };
}

export default withLoading;
