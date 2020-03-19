/* global window */

function loadYouTubeAPI() {
  return new Promise((resolve, reject) => {
    if (typeof window.YT === 'object' && typeof window.YT.ready === 'function') {
      window.YT.ready(() => {
        resolve(window.YT)
      })

      return
    }

    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    const firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

    window.onYouTubeIframeAPIReady = () => {
      resolve(window.YT)
    }
  })
}

let api = null

export default function getYouTubeAPI() {
  if (!api) {
    api = loadYouTubeAPI()
  }

  return api
}