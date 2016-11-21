import React from 'react';

class CourseThumbnail extends React.Component {
  render() {
    return (
        <div className="col-xs-6 col-md-3">
          <div className="thumbnail">
            <div className="caption">
            <h3>{this.props.course.name}</h3>
            <h6>Created at: {this.props.course.created_at}</h6>
            <p>{this.props.course.description}</p>
            <p><a href="#" className="btn btn-primary" role="button">Button</a> <a href="#" className="btn btn-default" role="button">Button</a></p>
          </div>
          </div>
        </div>
    );
  }
}

export default CourseThumbnail;
