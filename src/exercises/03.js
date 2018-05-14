// Flexible Compound Components with context

import React from 'react'
import {Switch} from '../switch'

const ToggleContext = React.createContext()

const ToggleConsumer = props => {
  return (
    <ToggleContext.Consumer>
      {context => {
        if (!context) {
          throw new Error(
            "Toggle compound components can not be rendered outside of the Toggle's context",
          )
        }

        return props.children(context)
      }}
    </ToggleContext.Consumer>
  )
}

class Toggle extends React.Component {
  static On = props => (
    <ToggleConsumer>
      {({on}) => (on ? props.children : null)}
    </ToggleConsumer>
  )

  static Off = props => (
    <ToggleConsumer>
      {({on}) => (on ? null : props.children)}
    </ToggleConsumer>
  )

  static Button = props => (
    <ToggleConsumer>
      {({on, toggle}) => (
        <Switch on={on} onClick={toggle} {...props} />
      )}
    </ToggleConsumer>
  )

  toggle = () =>
    this.setState(
      ({on}) => ({on: !on}),
      () => this.props.onToggle(this.state.on),
    )

  state = {on: false, toggle: this.toggle}

  render() {
    return (
      <ToggleContext.Provider
        value={this.state}
      >
        {this.props.children}
      </ToggleContext.Provider>
    )
  }
}

// 💯 Extra credit: rather than having a default value, make it so the consumer
// will throw an error if there's no context value to make sure people don't
// attempt to render one of the compound components outside the Toggle.
// 💯 Extra credit: avoid unecessary re-renders of the consumers by not
// creating a new `value` object ever render and instead passing an object
// which only changes when the state changes.

// Don't make changes to the Usage component. It's here to show you how your
// component is intended to be used and is used in the tests.
// You can make all the tests pass by updating the Toggle component.
function Usage({
  onToggle = (...args) => console.log('onToggle', ...args),
}) {
  return (
    <Toggle onToggle={onToggle}>
      <Toggle.On>The button is on</Toggle.On>
      <Toggle.Off>The button is off</Toggle.Off>
      <div>
        <Toggle.Button />
      </div>
    </Toggle>
  )
}

Usage.title = 'Flexible Compound Components'

export {Toggle, Usage as default}
