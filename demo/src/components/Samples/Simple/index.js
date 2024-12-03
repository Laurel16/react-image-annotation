import React, { Component } from 'react';
import Annotation from '../../../../../src';

import Root from '../../Root';
import img from '../../../img.jpeg';

export default class Simple extends Component {
  state = {
    annotations: [],
    annotation: {},
  };

  onChange = (annotation) => {
    console.log('[onChange] Updating current annotation:', annotation);
    this.setState({ annotation });
  };

  onSubmit = (annotation) => {
    const { geometry, data } = annotation;
    console.log('[onSubmit] Annotation submitted:', annotation);
    console.log('[onSubmit] Current state of annotations before update:', this.state.annotations);

    this.setState(
      {
        annotation: {},
        annotations: this.state.annotations.concat({
          geometry,
          data: {
            ...data,
            id: Math.random(),
          },
        }),
      },
      () => {
        // Callback after state update
        console.log('[onSubmit] Updated annotations state:', this.state.annotations);
      }
    );
  };

  render() {
    console.log('[render] Rendering Simple component');
    console.log('[render] Current annotations state:', this.state.annotations);
    console.log('[render] Current annotation state:', this.state.annotation);

    return (
      <Root>
        <Annotation
          src={img}
          alt="Two pebbles anthropomorphized holding hands"
          annotations={this.state.annotations}
          type={this.state.type}
          value={this.state.annotation}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
        />
      </Root>
    );
  }
}
