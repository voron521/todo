// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import './filter.css';

export default class Filter extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.changeActive = this.changeActive.bind(this);
  }

  changeActive() {
    const { buttonIsAtive } = this.props;
    const {
      filter: { key },
    } = this.props;
    buttonIsAtive(key);
    // this.props.buttonIsAtive(key);
  }

  render() {
    const {
      filter: { key, className, label },
    } = this.props;

    return (
      <li>
        <button type="button" key={key} className={className} onClick={this.changeActive}>
          {label}
        </button>
      </li>
    );
  }
}

Filter.defaultProps = {
  buttonIsAtive: () => {},
  changeViewTask: () => {},
  filter: { label: 'кнопки не переданы', className: 'selected', key: 0 },
};


const isFunction = (props, propName, componentName) => {
  const value = props[propName];
  if (typeof value !== 'function') {
    return new TypeError(`В компоненте ${componentName}: ${propName} должна быть функцией`);
  }
};

Filter.propTypes = {
  buttonIsAtive: isFunction,
  // eslint-disable-next-line react/no-unused-prop-types
  changeViewTask: isFunction,

  // eslint-disable-next-line consistent-return
  filter: (props, propName, componentName) => {
    const value = props[propName];
    if (typeof value !== 'object') {
      return new TypeError(`В компоненте ${componentName}: ${propName} должен быть Объектом`);
    }
  },
};
