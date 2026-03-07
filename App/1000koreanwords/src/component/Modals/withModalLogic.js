import React from 'react';

const withModalLogic = (WrappedComponent) => {
  return class extends React.Component {
    componentDidMount() {
      document.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
      document.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        this.props.onClose();
      }
    }

    handleBackgroundClick = (event) => {
      if (event.target.className && event.target.className.includes('modal-background')) {
        this.props.onClose();
      }
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          handleBackgroundClick={this.handleBackgroundClick}
        />
      );
    }
  };
};

export default withModalLogic;