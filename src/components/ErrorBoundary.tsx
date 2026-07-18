import React, { Component, ReactNode } from 'react';
import ErrorPage from './ErrorPage';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {

  state: State = {
    hasError: false
  };


  static getDerivedStateFromError() {
    return {
      hasError: true
    };
  }


  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(
      'Erro capturado:',
      error,
      errorInfo
    );
  }


  resetError = () => {
    this.setState({
      hasError: false
    });
  };


  render() {

    if (this.state.hasError) {
      return (
        <ErrorPage 
          resetError={this.resetError}
        />
      );
    }


    return this.props.children;
  }
}

export default ErrorBoundary;