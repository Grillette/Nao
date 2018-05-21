import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Menu,Segment, Container } from 'semantic-ui-react';

import BehaviorInProgress from '../layout/BahaviorInProgress';
import { CommandGet, NaoBehavior} from '../../actions';
import Command from '../../components/front/Command';
import getCommandByRobotId from '../../selectors/getCommandByRobotId';
import forEach from "lodash/forEach";

class Home extends Component {

  constructor() {
    super();

    this.onClickCommand = this.onClickCommand.bind(this);
  }

  componentWillMount() {
    this.props.actions.CommandGet();
  }

  onClickCommand(action) {
    this.props.actions.NaoBehavior(action);
    console.log("processing");
    console.log(this.props.processing);
  }

  render() {
    let commandHtml = this.props.commands.map( (command) => {
      return <Command key={command.id} data={command} onClick={this.onClickCommand} />;
    });

    // Si une action est déjà en cours d'exécution on affiche la pop up
    // Tester getRunningBehaviors si la liste renvoyée n'est pas nul alors une action est en cours
    console.log("not processing");
    console.log(this.props.processing);

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
  runningBehaviors: PropTypes.any,
  processing: PropTypes.any,
};

function mapStateToProps(state) { // eslint-disable-line no-unused-vars
  return {
    mode: state.app.mode,
    commands: getCommandByRobotId(state.app.default)(state),
    runningBehaviors: state.entities.runningBehaviors,
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
