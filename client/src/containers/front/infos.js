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
      name:"tempCPU", libelle:"Température CPU", value: this.props.cpu + "°C", alert: "40°C",
    };
    let battery = {
      name:"battery", libelle:"Niveau de la batterie", value: this.props.battery, alert: "20%",
    };
    sensors.push(cpu_temp);
    sensors.push(battery);


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
};

function mapStateToProps(state) { // eslint-disable-line no-unused-vars
  return {
    robot: getRobotDefault(state),
    cpu: state.app.nao.cpu,
    battery: state.app.nao.battery
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
  };
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
