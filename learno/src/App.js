


import React from 'react';
import CustomLayout from './containers/Layout';
import { BrowserRouter as Router } from 'react-router-dom'
import AllRoutes from './routes'
import { connect } from 'react-redux'

class App extends React.Component {

  componentDidMount(){
  }
  
  render(){return (
    <div className="App">
      <Router>
        <CustomLayout {...this.props}>
            <AllRoutes/>
        </CustomLayout>
      </Router>
    </div>
    );
  }}
  


  
export default App