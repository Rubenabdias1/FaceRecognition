import React, { Component } from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai'
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import 'tachyons';

const app = new Clarifai.App({
  apiKey: "0c71a6cbca4d4800a4f9e990e5728c73"
});

const particlesOptions = {
  particles: {
    number: {
      value: 44,
      density: {
        enable: true,
        value_area: 700
      }
    }
  }
}


class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imgUrl: '',
      boxes: []
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFaces = data.outputs[0].data.regions.map((boundingbox) => boundingbox.region_info.bounding_box);
    return clarifaiFaces.map((box) => {
      return {
      "top_row": box.top_row * 100 + "%",
      "left_col": box.left_col * 100 + "%",
      "bottom_row": 100 - box.bottom_row * 100 + "%",
      "right_col": 100 - box.right_col * 100 + "%"}
    });
  }

  displayFaceBox = (boxes) => {
    this.setState({boxes: boxes});
  }
  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onSubmit = (event) => {
    this.setState({imgUrl: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
     .then( (response) => this.calculateFaceLocation(response))
     .then( (boxes) => this.displayFaceBox(boxes))
     .catch(err => console.log(err));

  }
  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions}/>
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onSubmit} />
        <FaceRecognition imgUrl={this.state.imgUrl} boxes={this.state.boxes}/>
      </div>
    );
  }
}

export default App;
