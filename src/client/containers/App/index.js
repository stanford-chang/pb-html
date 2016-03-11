import React from 'react';
import $ from 'jquery';

import Header from '../../components/Header';
import MainSection from '../../components/MainSection';
import Footer from '../../components/Footer';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      clientName: null
    };
  }

  chat(input) {

    this.setState({
      messages: this.state.messages.concat({ bot: false, text: input })
    });

    const postData = {
      input: input
    };

    if (this.state.clientName) {
      postData.clientName = this.state.clientName;
    }

    $.ajax({
      method: 'POST',
      url: '/',
      data: postData,
      success: data => {
        
        const newState = {
          messages: this.state.messages.concat({ bot: true, text: data.text })
        };

        if (data.clientName) {
          newState.clientName = data.clientName;
        }

        this.setState(newState);
      }
    });
  }

  render() {
    return (
      <div>
        <Header />
        <MainSection messages={this.state.messages} />
        <Footer chat={::this.chat} />
      </div>
    );
  }
}

export default App;
