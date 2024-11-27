import React, { Component } from 'react';
const isMouseHovering = (key = 'isMouseHovering') => (DecoratedComponent) => {
  class IsMouseHovering extends Component {
    constructor() {
      super();
      this.el = null; // Initialisation explicite.
      this.state = {
        isHoveringOver: false,
      };
    }

    componentDidMount() {
      document.addEventListener('mousemove', this.onMouseMove);
    }

    componentWillUnmount() {
      document.removeEventListener('mousemove', this.onMouseMove);
    }

    onMouseMove = (e) => {
      if (!this.el) {
        return; // Évitez l'erreur si `this.el` est `null`.
      }

      this.setState({
        isHoveringOver: isMouseOverElement({ elem: this.el, e }),
      });
    };

    render() {
      const hocProps = {
        [key]: {
          innerRef: (el) => {
            this.el = el; // Mise à jour correcte de la référence.
          },
          isHoveringOver: this.state.isHoveringOver,
        },
      };

      return <DecoratedComponent {...this.props} {...hocProps} />;
    }
  }

  IsMouseHovering.displayName = `IsMouseHovering(${DecoratedComponent.displayName})`;

  return IsMouseHovering;
};

export default isMouseHovering;
