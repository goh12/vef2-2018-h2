import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Home extends Component {
  render() {
    const { isAuthenticated } = this.props;

    if(isAuthenticated) {
      return (
      <div className="home">
        <h2>Velkomin á bókasafnið</h2>
        <p>Þú ert skráður notandi og getur því <Link to="/books/new">skráð bækur</Link> og breytt <Link to="/books">þeim sem til eru</Link>.</p>
        <p>Einnig getur þú skoðað <Link to="/users">aðra notendur</Link>.</p>
      </div>
      );
    } else {
      return (
        <div className="home">
          <h2>Velkomin á bókasafnið</h2>
          <p>Til að njóta bókasafnsins til fullnstu mælum við með að <Link to="/login">skrá sig inn</Link>.
          Þangað til getur þú skoðað <Link to="/books">allar bækrunar</Link>.</p>
        </div>
      );
    }
  }
}

/* todo setja upp tengingu við redux til að vita stöðu notanda */
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  }
}

export default connect(mapStateToProps)(Home);
