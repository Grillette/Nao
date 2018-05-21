import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Menu,Segment, Container } from 'semantic-ui-react';

import BehaviorInProgress from '../layout/BahaviorInProgress';
import { CommandGet, NaoBehavior } from '../../actions';
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
  }

  render() {
    let commandHtml = this.props.commands.map( (command) => {
      return <Command key={command.id} data={command} onClick={this.onClickCommand}/>;
    });

    let options = [
      {
        key: 'test',
        value: 'test',
        text: 'test',
      }
    ];

    console.log("runningBehaviors");
    console.log(this.props.runningBehaviors);

    forEach(this.props.runningBehaviors, (behavior) => {
      options.push({
        key: behavior,
        value: behavior,
        text: behavior
      });
    });

    // Si une action est déjà en cours d'exécution on affiche la pop up
    // Tester getRunningBehaviors si la liste renvoyée n'est pas nul alors une action est en cours
    console.log("runningBehaviors");
    console.log(this.props.runningBehaviors);
      return (
        <Container fluid>
          <BehaviorInProgress />
          {commandHtml}
        </Container>
      );
  }
}


Home.propTypes = {
  actions: PropTypes.shape({}),
  mode: PropTypes.any,
  commands: PropTypes.any,
  runningBehaviors: PropTypes.any
};

function mapStateToProps(state) { // eslint-disable-line no-unused-vars
  return {
    mode: state.app.mode,
    commands: getCommandByRobotId(state.app.default)(state),
    runningBehaviors: state.entities.runningBehaviors,
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    CommandGet,
    NaoBehavior
  };
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
