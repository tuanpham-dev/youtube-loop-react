import React, { Component } from 'react'
import PropTypes from 'prop-types'
import loadYoutubeAPI from './loadYouTubeAPI'

export default class YouTube extends Component {
  static propTypes = {
    videoId: PropTypes.string,
    isPlaying: PropTypes.bool,
    onReady: PropTypes.func,
    onPlay: PropTypes.func,
    onPause: PropTypes.func,
    onEnd: PropTypes.func,
  }

  static defaultProps = {
    isPlaying: false,
    onReady: () => {},
    onPlay: () => {},
    onPause: () => {},
    onEnd: () => {}
  }

  constructor(props) {
    super(props)

    this.container = React.createRef()
    this.handleReady = this.handleReady.bind(this)
  }

  handleReady() {
    if (this.props.isPlaying) {
      this.playerInstance.playVideo()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (typeof this.playerInstance === 'object' && typeof this.playerInstance.playVideo === 'function') {
      if (nextProps.isPlaying) {
        this.playerInstance.playVideo()
      } else {
        this.playerInstance.stopVideo()
      }
    }
  }

  componentDidMount() {
    this.player = loadYoutubeAPI().then(YT => {
      this.playerInstance = new YT.Player(this.container.current, {
        videoId: this.props.videoId,
        events: {
          onReady: this.handleReady,
          onStateChange: (event) => {
            if (event.data === YT.PlayerState.PLAYING) {
              this.props.onPlay()
            } else if (event.data === YT.PlayerState.PAUSED) {
              this.props.onPause()
            } else if (event.data === YT.PlayerState.ENDED) {
              this.props.onEnd()
            }
          }
        }
      })
    })
  }

  render() {
    return (
      <div ref={this.container} />
    )
  }
}
