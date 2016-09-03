import React, { PropTypes } from 'react'
import { connect } from 'react-redux';
import NavBar from './NavBar';
import Loading from './Loading';
import VisibleItemList from '../containers/VisibleItemList';
import SaveButton from '../containers/SaveButton';

// import Router, { Link } from 'react-router';
// import Home from './Home';
// import JobBox from './JobBox'
import 'bootstrap/dist/css/bootstrap.css';

const mapStateToProps = (state) => {
  console.log("App MSTP", state)
  return { displayItems: state.displayItems }
}

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { displayItems } = this.props;
    console.log("App props", this.props);
    if (displayItems.isLoading) {
      console.log("Loading...");
    }
    return (
      <div>
        <NavBar />
        {displayItems.isLoading ?
          <Loading /> :
          (<div>
            <SaveButton />
            <VisibleItemList />
          </div>)
        }
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
