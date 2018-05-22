import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Menu, Icon, Button, Confirm, Header } from 'semantic-ui-react';
import { Link } from 'react-router';
import NaoApi from '../../../services/naoClass';

import {BehaviorSetLoading, NaoShutdown, NaoStopAllBehavior} from '../../../actions';

import logo from 'assets/img/header.png';


class HeaderContainer extends Component {

  constructor() {
    super();
    this.state = {
      shutdown: false
    };
    this.handleCancel = this.handleCancel.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleClickShutdown = this.handleClickShutdown.bind(this);
    this.stop = this.stop.bind(this);
  }

  handleClickShutdown() {
    this.setState({
      shutdown: true
    });
  }

  handleCancel() {
    this.setState({
      shutdown: false
    });
  }

  handleConfirm() {
    this.setState({
      shutdown: false
    });
    this.props.actions.NaoShutdown();
  }

  stop() {
    this.props.actions.BehaviorSetLoading(false);
    this.props.actions.NaoStopAllBehavior();
  }


  render() {
    let batteryhtml = null;
    if (this.props.battery > 80) {
      batteryhtml = (<Icon fitted name="battery full" style={{fontSize: "2.5em"}} color="green"/>);
    } else if (this.props.battery > 60) {
      batteryhtml = (<Icon fitted name="battery high" style={{fontSize: "2.5em"}} color="olive"/>);
    } else if (this.props.battery > 40) {
      batteryhtml = (<Icon fitted name="battery medium" style={{fontSize: "2.5em"}} color="orange"/>);
    } else if (this.props.battery > 20) {
      batteryhtml = (<Icon name="battery low" style={{fontSize: "2.5em"}} color="red"/>);
    } else if (this.props.battery > 0) {
      batteryhtml = (<Icon name="battery empty" style={{fontSize: "2.5em"}} color="red"/>);
    } else {
      batteryhtml = (<Icon.Group style={{fontSize: "2.5em"}}>
        <Icon name='battery empty' />
        <Icon color='red' name='dont'/>
      </Icon.Group>);
    }
    return (
      <div>
        <Menu inverted fixed="top" borderless>
          <Menu.Item><img src={logo} title="Knock Knock !" className="header_logo"/></Menu.Item>
          <Menu.Item><h1 className="header_title">NAOBOX V2</h1></Menu.Item>
          <Menu.Item><div className="batteryPourcent">{this.props.battery}%</div>{batteryhtml}</Menu.Item>
          <Menu.Item>
            <Button icon='window close' labelPosition='right' content="Arrêter l'action" onClick={this.stop} disabled={!this.props.processing} negative={this.props.processing} />
          </Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item><Button as={Link} to="admin" inverted icon="wrench" title="Zone administrateur"/></Menu.Item>
            <a href="../assets/Manuel_utilisation.pdf" className="doc" target = "_blank" title="Manuel d'utilisation"><Menu.Item><Button inverted icon="book"/></Menu.Item></a>
            <Menu.Item>
              <Button inverted icon="power" color="red" title="Cliquez pour éteindre le robot" onClick={this.handleClickShutdown}/>
              <Confirm
                content={(<Header as="h3">Voulez vous vraiment éteindre nao ?</Header>)}
                open={this.state.shutdown}
                onCancel={this.handleCancel}
                onConfirm={this.handleConfirm}
                cancelButton='Non'
                confirmButton="Oui"
              />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}

HeaderContainer.propTypes = {
  actions: PropTypes.shape({}),
  battery: PropTypes.string,
  processing: PropTypes.string,
};

function mapStateToProps(state) { // eslint-disable-line no-unused-vars
  return {
    battery: state.app.nao.battery,
    processing: state.app.nao.processing,
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    NaoShutdown,
    BehaviorSetLoading,
    NaoStopAllBehavior
  };
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
