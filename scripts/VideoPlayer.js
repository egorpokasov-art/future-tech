const rootSelector = '[data-js-video-player]'

class VideoPlayer {
  selectors = {
    root: rootSelector,
    video: '[data-js-video-player-video]',
    panel: '[data-js-video-player-panel]',
    playButton: '[data-js-video-player-play-button]',
  }

  stateClasses = {
    isActive: 'is-active',
  }

  constructor(root) {
    this.rootElement = root
    this.videoElement = this.rootElement.querySelector(this.selectors.video)
    this.panelElement = this.rootElement.querySelector(this.selectors.panel)
    this.playButtonElement = this.rootElement.querySelector(this.selectors.playButton)
    this.bindEvents()
  }

  onVideoPause = () => {
    if (this.videoElement.ended || this.videoElement.seeking) return

    this.videoElement.controls = false
    this.panelElement.classList.add(this.stateClasses.isActive)
  }

  onVideoEnded = () => {
    this.videoElement.load()
    this.videoElement.controls = false
    this.panelElement.classList.add(this.stateClasses.isActive)
  }

  onPlayButtonClick = async () => {
    const hasSource = this.videoElement.hasAttribute('src')
    const videoSrc = this.videoElement.dataset.src

    if (!hasSource || !videoSrc) {
      this.videoElement.src = this.videoElement.dataset.src
    }

    try {
      await this.videoElement.play()

      this.videoElement.controls = true
      this.panelElement.classList.remove(this.stateClasses.isActive)
    } catch (error) {
      console.error('Не удалось воспроизвести видео:', error)
    }
  }

  bindEvents() {
    this.playButtonElement.addEventListener('click', this.onPlayButtonClick)
    this.videoElement.addEventListener('pause', this.onVideoPause)
    this.videoElement.addEventListener('ended', this.onVideoEnded)
  }
}

class VideoPlayerCollection {
  constructor() {
    this.init()
  }

  init() {
    document.querySelectorAll(rootSelector)
      .forEach(element => new VideoPlayer(element))
  }
}

export default VideoPlayerCollection