import React, { Component } from 'react';
import './footer.css';
import Filter from './Filter';

export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  buttonIsAtive = (key) => {
    this.props.changeViewTask(key);
  };
  deleteComplete = () => {
    this.props.onDeleted('deleteComplete');
  };
  render() {
    const filters = this.props.taskState.map((filterItem) => {
      return <Filter key={filterItem.key} filter={filterItem} buttonIsAtive={this.buttonIsAtive} />;
    });

    const countTodo = this.props.todoCount;

    return (
      <footer className="footer">
        <span className="todo-count">{countTodo} items left</span>
        <ul className="filters">{filters}</ul>
        <button className="clear-completed" onClick={this.deleteComplete}>
          Clear completed
        </button>
      </footer>
    );
  }
}

Footer.defaultProps = {
  changeViewTask: () => {},
  onDeleted: () => {},
  taskState: [{ label: 'All', className: 'selected', key: 1 }],
  todoCount: 'значения нет',
};

const isFunction = (props, propName, componentName) => {
  const value = props[propName];
  if (typeof value !== 'function') {
    return new TypeError(`В компоненте ${componentName}: ${propName} должна быть функцией`);
  }
};

Footer.propTypes = {
  changeViewTask: isFunction,
  onDeleted: isFunction,
  taskState: (props, propName, componentName) => {
    const value = props[propName];
    if (!Array.isArray(value)) {
      return new TypeError(`В компоненте ${componentName}: ${propName} должен быть массивом объектов`);
    }
  },
  todoCount: (props, propName, componentName) => {
    const value = props[propName];

    if (typeof value !== 'number') {
      return new TypeError(`В компоненте ${componentName}: ${propName} должен быть числом`);
    }
  },
};
