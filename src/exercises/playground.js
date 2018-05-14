import React from 'react'
import {Switch} from '../switch'

class Toggle extends React.Component {
  state = {on: false}

  toggle = () => {
    this.setState(
      ({on}) => ({on: !on}),
      () => {
        this.props.onToggle()
      },
    )
  }

  getStateAndHelpers = () => ({
    on: this.state.on,
    onToggle: this.toggle,
  })

  render() {
    return this.props.children(this.getStateAndHelpers())
  }
}

class Implementation extends React.Component {
  render() {
    return (
      <Toggle onToggle={() => console.log('Toggled...')}>
        {({on, onToggle}) => (
          <React.Fragment>
            <h1>Hello world!</h1>
            <Switch on={on} onClick={onToggle} />
            <p>{ on ? 'Toggle is on :)' : 'Toggle is off :('}</p>
          </React.Fragment>
        )}
      </Toggle>
    )
  }
}

export default Implementation
