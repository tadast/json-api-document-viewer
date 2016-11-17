import React from 'react';

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
        <strong>{this.props.relName}</strong>
        <div>type: {this.props.data._type}</div>
        <div>id: {this.props.data.id}</div>
        <div className="attributes">
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
                <Entity key={`${idx}-${index}`} data={relationship} relName={relationshipName} />
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
        <strong>{this.props.relName}</strong>
        <div>type: {this.props.data._type}</div>
        <div>id: {this.props.data.id}</div>
        <button onClick={() => this.expand()}>Show relationships</button>
      </div>
    );
  }

  render() {
    console.log('Will render: ', this.props);
    return (this.state.isExpanded ? this.expanded() : this.collapsed());
  }
}

Entity.propTypes = {
  data: React.PropTypes.object.isRequired,
  relName: React.PropTypes.string
};

export default Entity;
