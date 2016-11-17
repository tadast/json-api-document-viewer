import React from 'react';

class Attributes extends React.Component {
  printable(thing) {
    if (typeof thing === 'object') {
      return JSON.stringify(thing);
    }
    return thing;
  }

  render() {
    return (
      <div className="attributes">
        {
          this.props.attributeNames.map((attr, index) => (
            <div key={index}>&nbsp;&nbsp;{attr}: {this.printable(this.props.data[attr])}</div>
          ))
        }
      </div>
    );
  }
}

Attributes.propTypes = {
  data: React.PropTypes.object.isRequired,
  attributeNames: React.PropTypes.array.isRequired
};

export default Attributes;
