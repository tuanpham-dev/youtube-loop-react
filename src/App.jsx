import React, { Component } from 'react'
import localStorage from 'local-storage'
import Header from './Header'
import YouTube from './YouTube'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      nextId: 0,
      videos: [],
      playingVideo: -1
    }

    this.addVideo = this.addVideo.bind(this)
    this.stopPlaying = this.stopPlaying.bind(this)
    this.playFirstVideo = this.playFirstVideo.bind(this)
    this.playPreviousVideo = this.playPreviousVideo.bind(this)
    this.playNextVideo = this.playNextVideo.bind(this)
  }

  componentDidMount() {
    const savedVideos = localStorage.get('videos')
    const videos = []
    let nextId = 0

    if (savedVideos) {
      savedVideos.forEach(video => {
        videos.push({
          id: nextId,
          video: video.video
        })

        nextId++
      })

      this.setState({
        videos,
        nextId
      })
    }
  }

  addVideo(youtubeVideoId) {
    const videos = [...this.state.videos, {
      id: this.state.nextId,
      video: youtubeVideoId
    }]

    this.setState({
      videos,
      nextId: this.state.nextId + 1,
      playingVideo: this.state.videos.length === 0 ? this.state.nextId : this.state.playingVideo
    })

    localStorage.set('videos', videos)
  }

  removeVideo(i) {
    const videos = [...this.state.videos]
    videos.splice(i, 1)

    this.setState({
      videos,
      playingVideo: this.state.playingVideo === this.state.videos[i].id ? -1 : this.state.playingVideo
    })

    localStorage.set('videos', videos)
  }

  moveVideoUp(i) {
    const videos = [...this.state.videos]
    const currentVideo = videos[i]

    videos.splice(i, 1)
    videos.splice(i - 1, 0, currentVideo)

    console.log(videos)

    this.setState({
      videos
    })
  }

  moveVideoDown(i) {
    const videos = [...this.state.videos]
    const currentVideo = videos[i]

    videos.splice(i, 1)
    videos.splice(i + 1, 0, currentVideo)

    this.setState({
      videos
    })
  }

  stopPlaying() {
    this.setState({
      playingVideo: -1
    })
  }

  playFirstVideo() {
    if (this.state.videos.length > 0) {
      this.setState({
        playingVideo: this.state.videos[0].id
      })
    }
  }

  findPlayingVideoIndex(id) {
    for (let i = 0; i < this.state.videos.length; i++) {
      if (this.state.videos[i].id === this.state.playingVideo) {
        return i
      }
    }

    return 0
  }

  playNextVideo() {
    let playingVideo = -1
    const i = this.findPlayingVideoIndex()

    if (i === this.state.videos.length - 1) {
      playingVideo = this.state.videos[0].id
    } else {
      playingVideo = this.state.videos[i + 1].id
    }

    this.setState({ playingVideo })
  }

  playPreviousVideo() {
    let playingVideo = -1
    const i = this.findPlayingVideoIndex()

    if (i === 0) {
      playingVideo = this.state.videos[this.state.videos.length - 1].id
    } else {
      playingVideo = this.state.videos[i - 1].id
    }

    this.setState({ playingVideo })
  }

  handleVideoPlay(i) {
    this.setState({
      playingVideo: this.state.videos[i].id
    })
  }

  handleVideoEnd(i) {
    this.playNextVideo()
  }

  render() {
    return (
      <>
        <Header
          isPlaying={this.state.playingVideo !== -1}
          showPrevNext={this.state.videos.length > 1}
          onAddVideo={this.addVideo}
          onPlay={this.playFirstVideo}
          onStop={this.stopPlaying}
          onPreviousVideo={this.playPreviousVideo}
          onNextVideo={this.playNextVideo}
        />

        <div className="container mt-5">
          <ol className="video-list">
            {this.state.videos.map((video, i) => (
              <li key={video.id} className="video-item d-flex flex-column justify-content-center align-items-center mb-5">
                <YouTube
                  isPlaying={video.id === this.state.playingVideo}
                  videoId={video.video}
                  onPlay={() => this.handleVideoPlay(i)}
                  onEnd={() => this.handleVideoEnd(i)}
                />

                <div className="text-center mt-3">
                  {i > 0 &&
                    <button className="btn btn-secondary mr-1" onClick={() => this.moveVideoUp(i)}>Move Up</button>
                  }

                  {i < this.state.videos.length - 1 &&
                    <button className="btn btn-secondary mr-1" onClick={() => this.moveVideoDown(i)}>Move Down</button>
                  }

                  <button className="btn btn-danger" onClick={() => this.removeVideo(i)}>Remove Video</button>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </>
    )
  }
}
