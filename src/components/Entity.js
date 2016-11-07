import React from 'react';

class Entity extends React.Component {
  componentWillMount() {
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

  render() {
    return (
      <div className="entity">
        <div>type: {this.props.data._type}</div>
        <div>id: {this.props.data.id}</div>
        <div className="attributes">
          Attributes:
          {
            this.state.attributes.map((attr) => (
              <div>&nbsp;&nbsp;{attr}: {this.props.data[attr]}</div>
            ))
          }
        </div>
        <div>
          <strong>Relationships:</strong>
          {console.log(this.props.data['comments'])};
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
}

Entity.propTypes = {
  data: React.PropTypes.object.isRequired
};

export default Entity;
