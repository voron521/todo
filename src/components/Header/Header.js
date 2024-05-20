import React from 'react';
import './Header.css';
import NewTaskForm from '../Header/NewTaskForm';

export default class Header extends React.Component {
  render() {
    const { addItem } = this.props;
    return (
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm addItem={addItem} />
      </header>
    );
  }
}

Header.defaultProps = {
  addItem: () => {},
};
Header.propTypes = {
  addItem: (props, propName, componentName) => {
    const value = props[propName];
    if (typeof value !== 'function') {
      return new TypeError(`В компоненте ${componentName}: ${propName} должна быть функцией`);
    }
  },
};
