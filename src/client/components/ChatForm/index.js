import React from 'react';

class ChatForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const input = this.refs.input;
    this.props.chat(input.value);
    input.value = '';
  }

  render() {
    return (
      <form>
        <input ref="input" placeholder="Say something" />
        <button type="submit" onClick={::this.handleSubmit}>Say it!</button>
      </form>
    )
  }

}

export default ChatForm;
