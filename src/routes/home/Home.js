import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {

  render() {

    /* todo birta mismunandi upplýsingar ef innskráður notandi eða ekki */

    return (
      <div className="home">
        <h2>Velkomin á bókasafnið</h2>
        <p>Til að njóta bókasafnsins til fullnstu mælum við með að <Link to="/login">skrá sig inn</Link>.
        Þangað til getur þú skoðað <Link to="/books">allar bækrunar</Link>.</p>
      </div>
    );
  }
}

/* todo setja upp tengingu við redux til að vita stöðu notanda */
export default Home;
