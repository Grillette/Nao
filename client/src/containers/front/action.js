import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Menu,Segment, Container } from 'semantic-ui-react';

import { CommandGet, NaoBehavior} from '../../actions';
import Command from '../../components/front/Command';
import getCommandByRobotId from '../../selectors/getCommandByRobotId';

class Home extends Component {

  constructor() {
    super();

    this.onClickCommand = this.onClickCommand.bind(this);
  }

  componentWillMount() {
    this.props.actions.CommandGet();
  }

  // Lance l'action au click sur le bouton
  onClickCommand(action) {
    this.props.actions.NaoBehavior(action);
  }

  render() {
    let commandHtml = this.props.commands.map( (command) => {
      return <Command key={command.id} data={command} onClick={this.onClickCommand} />;
    });

    // Ajoute un bouton pour chaque action
    return (
      <Container fluid>
        {commandHtml}
      </Container>
    );
  }
}


Home.propTypes = {
  actions: PropTypes.shape({}),
  mode: PropTypes.any,
  commands: PropTypes.any,
  processing: PropTypes.any,
};

function mapStateToProps(state) { // eslint-disable-line no-unused-vars
  return {
    mode: state.app.mode,
    commands: getCommandByRobotId(state.app.default)(state),
    processing: state.app.nao.processing
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    CommandGet,
    NaoBehavior,
  };
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
