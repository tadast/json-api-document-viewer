import React from 'react';
import Attributes from './Attributes';

class Entity extends React.Component {
  componentWillMount() {
    this.setState({
      attributes: [...this.props.data._attributes] || [],
      relationships: [...this.props.data._relationships] || [],
      isExpanded: false
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      attributes: [...nextProps.data._attributes] || [],
      relationships: [...nextProps.data._relationships] || [],
      isExpanded: false
    });
  }

  ensureArray(object) {
    if (object instanceof Array) {
      return object;
    }
    return [object];
  }

  expanded() {
    return (
      <div className="entity">
        {this.overview()}
        <button onClick={() => this.collapse()}>Collapse</button>
        <Attributes attributeNames={this.state.attributes} data={this.props.data} />
        <div>
          <strong>Relationships:</strong>
          {
            this.state.relationships.map((relationshipName, idx) => (
              this.ensureArray(this.props.data[relationshipName]).filter(
                (e) => (e)
              ).map((relationship, index) => (
                <Entity key={`${idx}-${index}`} data={relationship} relName={relationshipName} />
              ))
            ))
          }
        </div>
      </div>
    );
  }

  overview() {
    return (
      <div>
        <strong>{this.props.relName}</strong>
        <div className="attributes">
          <div>Type: {this.props.data._type}</div>
          <div>ID: {this.props.data.id}</div>
        </div>
      </div>
    );
  }

  expand() {
    this.setState({
      isExpanded: true
    });
  }

  collapse() {
    this.setState({
      isExpanded: false
    });
  }

  collapsed() {
    return (
      <div className="entity">
        {this.overview()}
        <button onClick={() => this.expand()}>Expand</button>
      </div>
    );
  }

  render() {
    return (this.state.isExpanded ? this.expanded() : this.collapsed());
  }
}

Entity.propTypes = {
  data: React.PropTypes.object.isRequired,
  relName: React.PropTypes.string
};

export default Entity;
