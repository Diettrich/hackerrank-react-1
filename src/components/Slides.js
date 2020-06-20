import React from 'react';

class Slides extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      slideIndex: 0
    }
    this.lastSlide = props.slides.length;
  }

  componentDidMount() {
    document.getElementById("prev").disabled = true;
    document.getElementById("reset").disabled = true;
  }

  buttonDisable = () => {
    if (this.state.slideIndex === 0) {
      document.getElementById("prev").disabled = true;
      document.getElementById("reset").disabled = true;
    } else if (this.state.slideIndex === this.lastSlide - 1) {
      document.getElementById("next").disabled = true;
    } else {
      document.getElementById("next").disabled = false;
      document.getElementById("prev").disabled = false;
      document.getElementById("reset").disabled = false;
    }
  }

  goNext = async () => {
    try {
      await this.setState({ slideIndex: this.state.slideIndex + 1 })
      await this.buttonDisable()
    } catch (error) {
      console.error(error)
    }
  }

  goPrevious = async () => {
    try {
      await this.setState({ slideIndex: this.state.slideIndex - 1 })
      await this.buttonDisable()
    } catch (error) {
      console.error(error)
    }
  }

  reset = async () => {
    try {
      await this.setState({ slideIndex: 0 })
      await this.buttonDisable()
    } catch (error) {
      console.error(error)
    }
  }


  render() {
    const { slides } = this.props;

    return (
      <div>
        <div id="navigation">
          <button id="reset" data-testid="button-restart" onClick={this.reset}>Restart</button>
          <button id="prev" data-testid="button-prev" onClick={this.goPrevious}>Prev</button>
          <button id="next" data-testid="button-next" onClick={this.goNext}>Next</button>
        </div>
        <div id="slide">
          <h1 data-testid="title">{slides[this.state.slideIndex].title}</h1>
          <p data-testid="text">{slides[this.state.slideIndex].text}</p>
        </div>
      </div>
    );
  }
}

export default Slides;
