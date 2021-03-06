import { Component } from "react";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: "Oops! Something went wrong." };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Ideally would log the error to an error reporting service
    console.log({ error, errorInfo });
    this.setState({error})
  }

  render() {
    if (this.state.hasError) {
      return <h1>{this.state.error}</h1>;
    }

    return this.props.children;
  }
}
