import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Footer extends Component {
  render() {
    return (
      <footer>
        <div style={{textAlign: 'center', margin: 50}}>
          3iL &copy; 2018
        </div>
      </footer>
    );
  }
}

Footer.propTypes = {
  actions: PropTypes.shape({})
};

function mapStateToProps(state) { // eslint-disable-line no-unused-vars
  return {};
}

function mapDispatchToProps(dispatch) {
  const actions = {};
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
