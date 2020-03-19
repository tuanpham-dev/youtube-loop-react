import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Header extends Component {
  static propTypes = {
    isPlaying: PropTypes.bool,
    showPrevNext: PropTypes.bool,
    onPlay: PropTypes.func,
    onStop: PropTypes.func,
    onAddVideo: PropTypes.func,
    onNextVideo: PropTypes.func,
    onPreviousVideo: PropTypes.func
  }

  static defaultProps = {
    isPlaying: false,
    showPrevNext: false,
    onPlay: () => {},
    onStop: () => {},
    onAddVideo: (videoId) => {},
    onNextVideo: () => {},
    onPreviousVideo: () => {}
  }

  constructor(props) {
    super(props)

    this.state = {
      input: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange(event) {
    this.setState({
      input: event.target.value
    })
  }

  getYouTubeVideoId(url) {
    let videoId = ''
    const parsedUrl = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/)

    if (parsedUrl[2] !== undefined) {
      videoId = parsedUrl[2].split(/[^0-9a-z_-]/i)
      videoId = videoId[0]
    } else {
      videoId = parsedUrl
    }

    return videoId
  }

  handleSubmit() {
    const videoId = this.getYouTubeVideoId(this.state.input)

    if (videoId) {
      this.props.onAddVideo(videoId)
    }
  }

  render() {
    return (
      <header className="sticky-top navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand font-weight-bold text-uppercase" href="/">Youtube Loop</a>
          <div className="ml-3 d-flex">
            {!this.props.isPlaying ?
              <button className="btn btn-secondary mr-1" onClick={this.props.onPlay}>Play</button>
              :
              <button className="btn btn-secondary mr-1" onClick={this.props.onStop}>Stop</button>
            }
            {this.props.showPrevNext &&
              <>
                <button className="btn btn-secondary mr-1" onClick={this.props.onPreviousVideo}>Previous</button>
                <button className="btn btn-secondary mr-1" onClick={this.props.onNextVideo}>Next</button>
              </>
            }
          </div>
          <div className="ml-5 input-group">
            <input className="form-control" type="text" placeholder="Enter YouTube URL or Video ID" value={this.state.value} onChange={this.handleInputChange} />
            <div className="input-group-append">
              <button className="btn btn-primary" type="button" onClick={this.handleSubmit}>Go Loop!</button>
            </div>
          </div>
        </div>
      </header>
    )
  }
}
