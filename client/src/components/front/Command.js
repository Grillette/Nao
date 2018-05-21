import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import getCommandByRobotId from "../../selectors/getCommandByRobotId";
import {connect} from "react-redux";

class Command extends React.Component {

  render() {
    return (
      <Button disabled={this.props.processing} style={{margin: 5}} size="massive" onClick={(e) => this.props.onClick(this.props.data.action) }>{this.props.data.name}</Button>
    );
  }

}

Command.propTypes = {
  data: PropTypes.object,
  onClick: PropTypes.any,
  processing: PropTypes.any,
};

function mapStateToProps(state) { // eslint-disable-line no-unused-vars
  return {
    processing: state.app.nao.processing
  };
}

export default connect(mapStateToProps)(Command);
