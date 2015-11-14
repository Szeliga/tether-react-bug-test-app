import React from 'react';
import TetherElement from 'react-tether';
import {render} from 'react-dom';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.onAddClick = this.onAddClick.bind(this);
    this.state = {
      items: [],
    };
  }

  onAddClick() {
    const items = this.state.items;
    items.push('1');
    this.setState({items: items});
  }

  renderItems() {
    const items = this.state.items;
    return items.map((item, i) => {return this.renderItem(item, i);});
  }

  renderItem(item, i) {
    return (
      <div key={i}>
        <div
          style={{width: 100, height: 100, backgroundColor: '#ddd'}}
          ref={target => { this[`target${i}`] = target; }}
        >
          This is a div
        </div>
        <TetherElement target={this[`target${i}`]}
          options={{
            attachment: `top right`,
            targetAttachment: `top left`,
            constraints: [
              {
                to: 'scrollParent',
                attachment: 'together',
              },
            ],
          }}>
          <div>This is a dropdown</div>
        </TetherElement>
      </div>
    );
  }

  render() {
    return (
      <div>
        <button onClick={this.onAddClick}>Add new item</button>
        {this.renderItems()}
      </div>
    );
  }
}

render(
  <App/>,
  document.getElementById('app')
);
