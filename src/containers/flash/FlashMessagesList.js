import React from 'react';
import FlashMessage from '../../components/flash/FlashMessage';
import { connect } from 'react-redux';
import { deleteFlashMessage } from '../../actions/flashMessages';
import mapValues from 'lodash/mapValues';

class FlashMessagesList extends React.Component {
  render() {

    let messages = [];
    let deleteFlashMessage = this.props.deleteFlashMessage;
    mapValues(this.props.messages, function(o){
      messages.push(<FlashMessage key={o.id} message={o} deleteFlashMessage={deleteFlashMessage} />);
    });

    /*const messages = this.props.messages.map(message =>
      <FlashMessage key={message.id} message={message} deleteFlashMessage={this.props.deleteFlashMessage} />
    );*/
    return (
      <div>
        {messages}
      </div>
    );
  }
}

FlashMessagesList.propTypes = {
  messages: React.PropTypes.object.isRequired,
  deleteFlashMessage: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    messages: state.flashMessages
  }
}

export default connect(mapStateToProps, { deleteFlashMessage })(FlashMessagesList);
