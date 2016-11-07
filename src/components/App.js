import React from 'react';
import { version } from '../../package.json';
import Entity from './Entity';
import JsonApiDataStore from 'jsonapi-datastore';

class App extends React.Component {
  componentWillMount() {
    const store = new JsonApiDataStore.JsonApiDataStore();
    this.setState({
      store: store.sync(this.props.doc)
    });
  }

  entities() {
    if (this.state.store instanceof Array) {
      return this.state.store;
    }
    return [this.state.store];
  }

  render() {
    return (
      <div>
        <header>
          <h1>json:api document viewer {version}</h1>
        </header>
        <section>
          {this.entities().map((entity, idx) => (<Entity key={idx} data={entity} />))}
        </section>
      </div>
    );
  }

}

App.propTypes = { doc: React.PropTypes.object.isRequired };

export default App;
