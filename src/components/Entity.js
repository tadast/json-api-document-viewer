import React from 'react';
// import Attributes from './Attributes';

class Entity extends React.Component {
  componentWillMount() {
    this.setState({
      attributes: this.props.data._attributes || [],
      relationships: this.props.data._relationships || [],
      isExpanded: false
    });
  }

  componentWillUpdate() {
    this.setState({
      attributes: this.props.data._attributes || [],
      relationships: this.props.data._relationships || []
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
        <div>type: {this.props.data._type}</div>
        <div>id: {this.props.data.id}</div>
        <div className="attributes">
          Attributes:
          {
            this.state.attributes.map((attr, index) => (
              <div key={index}>&nbsp;&nbsp;{attr}: {this.props.data[attr]}</div>
            ))
          }
        </div>
        <div>
          <strong>Relationships:</strong>
          {
            this.state.relationships.map((relationshipName, idx) => (
              this.ensureArray(this.props.data[relationshipName]).map((relationship, index) => (
                <Entity key={`${idx}-${index}`} data={relationship} />
              ))
            ))
          }
        </div>
      </div>
    );
  }

  expand() {
    this.setState({
      isExpanded: true
    });
  }

  collapsed() {
    return (
      <div className="entity">
        <div>type: {this.props.data._type}</div>
        <div>id: {this.props.data.id}</div>
        <button onClick={() => this.expand()}>Expand</button>
      </div>
    );
  }

  render() {
    console.log('Will render: ', this.props.data._type, this.props.data.id);
    return (this.state.isExpanded ? this.expanded() : this.collapsed());
  }
}

Entity.propTypes = {
  data: React.PropTypes.object.isRequired
};

export default Entity;
