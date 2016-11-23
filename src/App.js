import React, { Component } from 'react';
import EventListener from "react-event-listener";
import KeyHandler from "react-key-handler";
import { SelectableGroup, createSelectable } from "react-selectable";
import StackGrid from "react-stack-grid";
import Card from "./Card";

const SelectableCard = createSelectable(Card);

const isNodeInRoot = (node, root) => {
  while (node) {
    if (node === root) {
      return true;
    }
    node = node.parentNode;
  }

  return false;
};


class App extends Component {
  state = {
    multiple: false,
    selectedKeys: [],
    items: (() => {
      const array = [];
      for (let i = 0; i < 30; i++) {
        array.push({
          id: i + 1,
          height: Math.floor(Math.random() * (500 - 100) + 100)
        });
      }
      return array;
    })()
  }

  handleSelection = keys => {
    const { selectedKeys, multiple } = this.state;
    const newSelectedKeys = !multiple
      ? keys
      : selectedKeys.concat(keys).filter((key, i, self) => self.indexOf(key) === i && i === self.lastIndexOf(key));

    this.setState({ selectedKeys: newSelectedKeys });
  }

  clearSelection = e => {
    console.log(e.target, this.refs.selectable);
    if(!isNodeInRoot(e.target, this.refs.selectable)) {
      this.setState({ selectedKeys: [] });
    }
  }

  enableMultiple = () => {
    this.setState({ multiple: true });
  }

  disableMultiple = () => {
    this.setState({ multiple: false });
  }

  render() {
    return (
      <div className="App">
        {/* Global listener */}
        <EventListener target="document" onClick={this.clearSelection} />

        {/* Keymap */}
        <KeyHandler keyEventName="keydown" keyValue="Escape" onKeyHandle={this.clearSelection} />
        <KeyHandler keyEventName="keydown" keyValue="Shift" onKeyHandle={this.enableMultiple} />
        <KeyHandler keyEventName="keyup" keyValue="Shift" onKeyHandle={this.disableMultiple} />

        {/* Component */}
        <SelectableGroup
          ref="selectable"
          onSelection={this.handleSelection}
          tolerance={0}
          selectOnMouseMove={false}
        >
          <StackGrid
            columnWidth="20%"
            appearDelay={40}
          >
            {this.state.items.map(item =>
              <SelectableCard
                key={item.id}
                selectableKey={item.id}
                selected={this.state.selectedKeys.indexOf(item.id) > -1}
                style={{ height: item.height }}
              >
                {item.id}
              </SelectableCard>
            )}
          </StackGrid>
        </SelectableGroup>
      </div>
    );
  }
}

export default App;
