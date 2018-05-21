import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Container, Header } from 'semantic-ui-react';
import ReactTable from 'react-table';
import getRobotDefault from "../../selectors/getRobotDefault";

class Home extends Component {

  render() {

    let sensors = [];
    //console.log(this.props);
    let cpu_temp = {
      name:"tempCPU", libelle:"Température CPU", value: this.props.cpu + "°C", alert: "90°C",
    };
    let battery = {
      name:"battery", libelle:"Niveau de la batterie", value: this.props.battery + "%", alert: "20%",
    };
    let lFoot_weight = {
      name:"lFootWeight", libelle:"Poids du pied gauche", value: this.props.lFootWeight + " kg", alert: "5kg",
    };
    let rFoot_weight = {
      name: "rFootWeight", libelle:"Poids du pied droit", value: this.props.rFootWeight + " kg", alert: "5kg",
    };
    let lShoulder_temp = {
      name:"lSoulderTemperature", libelle:"Température de l'épaule gauche", value: this.props.lShoulderTemp + "°C", alert: "60°C",
    };
    let rShoulder_temp = {
      name:"rShoulderTemperature", libelle:"Température de l'épaule droite", value: this.props.rShoulderTemp + "°C", alert: "60°C",
    };
    let lKnee_temp = {
      name: "lKneeTemperature", libelle: "Température du genou gauche", value: this.props.lKneeTemp + "°C", alert: "60°C",
    };
    let rKnee_temp = {
      name: "rKneeTemperature", libelle: "Température du genou droit", value: this.props.rKneeTemp + "°C", alert: "60°C",
    };
    let lElbow_temp = {
      name: "lElbowTemperature", libelle: "Température du coude gauche", value: this.props.lElbowTemp + "°C", alert: "60°C",
    };
    let rElbow_temp = {
      name: "rElbowTemperature", libelle: "Température du coude droit", value: this.props.rElbowTemp + "°C", alert: "60°C",
    };
    let lHip_temp = {
      name: "lHipTemperature", libelle: "Température de la hanche gauche", value: this.props.lHipTemp + "°C", alert: "60°C",
    };
    let rHip_temp = {
      name: "rHipTemperature", libelle: "Température de la hanche droite", value: this.props.rHipTemp + "°C", alert: "60°C",
    };
    sensors.push(cpu_temp);
    sensors.push(battery);
    sensors.push(lFoot_weight);
    sensors.push(rFoot_weight);
    sensors.push(lShoulder_temp);
    sensors.push(rShoulder_temp);
    sensors.push(lKnee_temp);
    sensors.push(rKnee_temp);
    sensors.push(lElbow_temp);
    sensors.push(rElbow_temp);
    sensors.push(lHip_temp);
    sensors.push(rHip_temp);


    const columns = [
      {
        header: 'NOM LOGIQUE DU CAPTEUR',
        accessor: 'name',
        minWidth: 80
      }, {
        minWidth: 80,
        header: 'LIBELLE DU CAPTEUR',
        accessor: 'libelle'
      }, {
        minWidth: 80,
        header: 'VALEUR',
        accessor: 'value'
      }, {
        minWidth: 80,
        header: 'SEUIL D\'ALERTE',
        accessor: 'alert',
      }
    ];

    return (
      <Container fluid textAlign="center">
        <Header as="h3" >Informations concernant le robot {this.props.robot.name}</Header>
        <br/>
        <ReactTable
          defaultPageSize="20"
          data={sensors}
          columns={columns}
          defaultSorting={[{id: 'name', asc: true}]}
          previousText="Précédent"
          nextText="Suivant"
          loadingText="Chargement..."
          noDataText="Aucune données"
          pageText="Page"
          ofText="sur"
          rowsText="lignes"
        />
      </Container>
    );
  }
}

Home.propTypes = {
  actions: PropTypes.shape({}),
  mode: PropTypes.any,
  robot: PropTypes.any,
  processing: PropTypes.any,
  cpu: PropTypes.string,
  battery: PropTypes.string,
  lFootWeight: PropTypes.string,
  rFootWeight: PropTypes.string,
  lShoulderTemp: PropTypes.string,
  rShoulderTemp: PropTypes.string,
  lKneeTemp: PropTypes.string,
  rKneeTemp: PropTypes.string,
  lElbowTemp: PropTypes.string,
  rElbowTemp: PropTypes.string,
  lHipTemp: PropTypes.string,
  rHipTemp: PropTypes.string,
};

function mapStateToProps(state) { // eslint-disable-line no-unused-vars
  return {
    robot: getRobotDefault(state),
    cpu: state.app.nao.cpu,
    battery: state.app.nao.battery,
    lFootWeight: state.app.nao.lFootWeight,
    rFootWeight: state.app.nao.rFootWeight,
    lShoulderTemp: state.app.nao.lShoulderTemp,
    rShoulderTemp: state.app.nao.rShoulderTemp,
    lKneeTemp: state.app.nao.lKneeTemp,
    rKneeTemp: state.app.nao.rKneeTemp,
    lElbowTemp: state.app.nao.lElbowTemp,
    rElbowTemp: state.app.nao.rElbowTemp,
    lHipTemp: state.app.nao.lHipTemp,
    rHipTemp: state.app.nao.rHipTemp,
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
  };
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
