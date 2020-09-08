import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class Layout extends Component {


  render() {

    return (
      <div>
      <Segment inverted>
        <Menu inverted secondary>
          <Menu.Item
            name='home'
          />
          <Menu.Item
            name='messages'
          />
          <Menu.Item
            name='friends'
          />
        </Menu>
      </Segment>
      {this.props.children}
      </div>
    )
  }
}

export default Layout