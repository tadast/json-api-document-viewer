import React from 'react';
import Entity from './Entity';
import JsonApiDataStore from 'jsonapi-datastore';

class App extends React.Component {
  componentWillMount() {
    const store = new JsonApiDataStore.JsonApiDataStore();
    this.setState({
      docString: JSON.stringify(this.props.doc, null, 2),
      store: store.sync(this.props.doc),
      jsonState: 'valid'
    });
  }

  handleChange(event) {
    const jsonInput = event.target.value;
    this.setState({ docString: jsonInput });
    try {
      const store = new JsonApiDataStore.JsonApiDataStore();
      const updatedStore = store.sync(JSON.parse(jsonInput));
      let arrayStore;

      if (updatedStore instanceof Array) {
        arrayStore = updatedStore.slice();
      } else {
        arrayStore = [updatedStore].slice();
      }

      this.setState({
        store: arrayStore,
        jsonState: 'valid'
      });
    } catch (e) {
      this.setState({
        jsonState: `invalid ${e}`
      });
    }
  }

  render() {
    return (
      <div>
        <header>
          <h1>{'{json:api}'} document viewer</h1>
        </header>
        <div className="json-input">
          <label>{'{json:api}'} document:</label>
          <textarea onChange={(e) => this.handleChange(e)} value={this.state.docString} />
          <span className="state">
            Current state: <strong>{this.state.jsonState}</strong>
          </span>
        </div>
        <section>
          {this.state.store.map((entity, idx) => (<Entity key={idx} data={entity} />))}
        </section>
      </div>
    );
  }

}

App.propTypes = { doc: React.PropTypes.object.isRequired };

export default App;
