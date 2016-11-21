import React from 'react';

class Courses extends React.Component {

  render() {
    return (
      <div className="row">
        {this.props.children}
      </div>
    );
  }
}

export default Courses;
