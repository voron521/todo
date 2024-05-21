import { Component } from 'react';

import './footer.css';
import Filter from './Filter';

export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  buttonIsAtive = (key) => {
    const { changeViewTask } = this.props;
    changeViewTask(key);
  };

  deleteComplete = () => {
    const { onDeleted } = this.props;
    onDeleted('deleteComplete');
  };

  render() {
    const { taskState, todoCount } = this.props;
    const filters = taskState.map((filterItem) => (
      <Filter key={filterItem.key} filter={filterItem} buttonIsAtive={this.buttonIsAtive} />
    ));

    const countTodo = todoCount;

    return (
      <footer className="footer">
        <span className="todo-count">{countTodo} items left</span>
        <ul className="filters">{filters}</ul>
        <button type="button" className="clear-completed" onClick={this.deleteComplete}>
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
  return undefined;
};

Footer.propTypes = {
  changeViewTask: isFunction,
  onDeleted: isFunction,
  taskState: (props, propName, componentName) => {
    const value = props[propName];
    if (!Array.isArray(value)) {
      return new TypeError(`В компоненте ${componentName}: ${propName} должен быть массивом объектов`);
    }
    return undefined;
  },
  todoCount: (props, propName, componentName) => {
    const value = props[propName];

    if (typeof value !== 'number') {
      return new TypeError(`В компоненте ${componentName}: ${propName} должен быть числом`);
    }
    return undefined;
  },
};
