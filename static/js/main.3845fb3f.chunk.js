(this["webpackJsonpyoutube-loop-react"]=this["webpackJsonpyoutube-loop-react"]||[]).push([[0],{13:function(e,t,n){e.exports=n(21)},21:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),o=n(12),s=n.n(o),d=(n(18),n(8)),r=n(2),l=n(3),c=n(5),u=n(4),p=n(1),h=n(6),v=n(7),y=n.n(v),m=function(e){function t(e){var n;return Object(r.a)(this,t),(n=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={input:""},n.handleInputChange=n.handleInputChange.bind(Object(p.a)(n)),n.handleSubmit=n.handleSubmit.bind(Object(p.a)(n)),n}return Object(h.a)(t,e),Object(l.a)(t,[{key:"handleInputChange",value:function(e){this.setState({input:e.target.value})}},{key:"getYouTubeVideoId",value:function(e){var t=e.replace(/(>|<)/gi,"").split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);return void 0!==t[2]?t[2].split(/[^0-9a-z_-]/i)[0]:t}},{key:"handleSubmit",value:function(){var e=this.getYouTubeVideoId(this.state.input);e&&this.props.onAddVideo(e)}},{key:"render",value:function(){return i.a.createElement("header",{className:"sticky-top navbar navbar-expand navbar-dark bg-dark"},i.a.createElement("div",{className:"container"},i.a.createElement("a",{className:"navbar-brand font-weight-bold text-uppercase",href:"/"},"Youtube Loop"),i.a.createElement("div",{className:"ml-3 d-flex"},this.props.isPlaying?i.a.createElement("button",{className:"btn btn-secondary mr-1",onClick:this.props.onStop},"Stop"):i.a.createElement("button",{className:"btn btn-secondary mr-1",onClick:this.props.onPlay},"Play"),this.props.showPrevNext&&i.a.createElement(i.a.Fragment,null,i.a.createElement("button",{className:"btn btn-secondary mr-1",onClick:this.props.onPreviousVideo},"Previous"),i.a.createElement("button",{className:"btn btn-secondary mr-1",onClick:this.props.onNextVideo},"Next"))),i.a.createElement("div",{className:"ml-5 input-group"},i.a.createElement("input",{className:"form-control",type:"text",placeholder:"Enter YouTube URL or Video ID",value:this.state.value,onChange:this.handleInputChange}),i.a.createElement("div",{className:"input-group-append"},i.a.createElement("button",{className:"btn btn-primary",type:"button",onClick:this.handleSubmit},"Go Loop!")))))}}]),t}(a.Component);m.defaultProps={isPlaying:!1,showPrevNext:!1,onPlay:function(){},onStop:function(){},onAddVideo:function(e){},onNextVideo:function(){},onPreviousVideo:function(){}};var b=null;function f(){return b||(b=new Promise((function(e,t){if("object"!==typeof window.YT||"function"!==typeof window.YT.ready){var n=document.createElement("script");n.src="https://www.youtube.com/iframe_api";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(n,a),window.onYouTubeIframeAPIReady=function(){e(window.YT)}}else window.YT.ready((function(){e(window.YT)}))}))),b}var g=function(e){function t(e){var n;return Object(r.a)(this,t),(n=Object(c.a)(this,Object(u.a)(t).call(this,e))).container=i.a.createRef(),n.handleReady=n.handleReady.bind(Object(p.a)(n)),n}return Object(h.a)(t,e),Object(l.a)(t,[{key:"handleReady",value:function(){this.props.isPlaying&&this.playerInstance.playVideo()}},{key:"shouldComponentUpdate",value:function(e){return"object"===typeof this.playerInstance&&"function"===typeof this.playerInstance.playVideo&&(e.isPlaying?this.playerInstance.playVideo():this.playerInstance.stopVideo()),e.videoId!==this.props.videoId}},{key:"componentDidMount",value:function(){var e=this;this.player=f().then((function(t){e.playerInstance=new t.Player(e.container.current,{videoId:e.props.videoId,events:{onReady:e.handleReady,onStateChange:function(n){n.data===t.PlayerState.PLAYING?e.props.onPlay():n.data===t.PlayerState.PAUSED?e.props.onPause():n.data===t.PlayerState.ENDED&&e.props.onEnd()}}})}))}},{key:"render",value:function(){return i.a.createElement("div",{ref:this.container})}}]),t}(a.Component);g.defaultProps={isPlaying:!1,onReady:function(){},onPlay:function(){},onPause:function(){},onEnd:function(){}};var V=function(e){function t(e){var n;return Object(r.a)(this,t),(n=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={videos:[],playingVideo:-1},n.nextId=0,n.addVideo=n.addVideo.bind(Object(p.a)(n)),n.stopPlaying=n.stopPlaying.bind(Object(p.a)(n)),n.playFirstVideo=n.playFirstVideo.bind(Object(p.a)(n)),n.playPreviousVideo=n.playPreviousVideo.bind(Object(p.a)(n)),n.playNextVideo=n.playNextVideo.bind(Object(p.a)(n)),n}return Object(h.a)(t,e),Object(l.a)(t,[{key:"getNextId",value:function(){return this.nextId++}},{key:"componentDidMount",value:function(){var e=this,t=y.a.get("videos"),n=[];t&&(t.forEach((function(t){n.push({id:e.getNextId(),video:t.video})})),this.setState({videos:n}))}},{key:"addVideo",value:function(e){var t=this.getNextId(),n=[].concat(Object(d.a)(this.state.videos),[{id:t,video:e}]);this.setState({videos:n,playingVideo:0===this.state.videos.length?t:this.state.playingVideo}),y.a.set("videos",n)}},{key:"removeVideo",value:function(e){var t=Object(d.a)(this.state.videos);t.splice(e,1),this.setState({videos:t,playingVideo:this.state.playingVideo===this.state.videos[e].id?-1:this.state.playingVideo}),y.a.set("videos",t)}},{key:"moveVideoUp",value:function(e){var t=Object(d.a)(this.state.videos),n=t[e];t.splice(e,1),t.splice(e-1,0,n),this.setState({videos:t}),y.a.set("videos",t)}},{key:"moveVideoDown",value:function(e){var t=Object(d.a)(this.state.videos),n=t[e];t.splice(e,1),t.splice(e+1,0,n),this.setState({videos:t}),y.a.set("videos",t)}},{key:"stopPlaying",value:function(){this.setState({playingVideo:-1})}},{key:"playFirstVideo",value:function(){this.state.videos.length>0&&this.setState({playingVideo:this.state.videos[0].id})}},{key:"findPlayingVideoIndex",value:function(e){for(var t=0;t<this.state.videos.length;t++)if(this.state.videos[t].id===this.state.playingVideo)return t;return 0}},{key:"playNextVideo",value:function(){var e=-1,t=this.findPlayingVideoIndex();e=t===this.state.videos.length-1?this.state.videos[0].id:this.state.videos[t+1].id,this.setState({playingVideo:e})}},{key:"playPreviousVideo",value:function(){var e=-1,t=this.findPlayingVideoIndex();e=0===t?this.state.videos[this.state.videos.length-1].id:this.state.videos[t-1].id,this.setState({playingVideo:e})}},{key:"handleVideoPlay",value:function(e){this.setState({playingVideo:this.state.videos[e].id})}},{key:"handleVideoEnd",value:function(e){this.playNextVideo()}},{key:"render",value:function(){var e=this;return i.a.createElement(i.a.Fragment,null,i.a.createElement(m,{isPlaying:-1!==this.state.playingVideo,showPrevNext:this.state.videos.length>1,onAddVideo:this.addVideo,onPlay:this.playFirstVideo,onStop:this.stopPlaying,onPreviousVideo:this.playPreviousVideo,onNextVideo:this.playNextVideo}),i.a.createElement("div",{className:"container mt-5"},i.a.createElement("ol",{className:"video-list"},this.state.videos.map((function(t,n){return i.a.createElement("li",{key:t.id,className:"video-item d-flex flex-column justify-content-center align-items-center mb-5"},i.a.createElement(g,{isPlaying:t.id===e.state.playingVideo,videoId:t.video,onPlay:function(){return e.handleVideoPlay(n)},onEnd:function(){return e.handleVideoEnd(n)}}),i.a.createElement("div",{className:"text-center mt-3"},n>0&&i.a.createElement("button",{className:"btn btn-secondary mr-1",onClick:function(){return e.moveVideoUp(n)}},"Move Up"),n<e.state.videos.length-1&&i.a.createElement("button",{className:"btn btn-secondary mr-1",onClick:function(){return e.moveVideoDown(n)}},"Move Down"),i.a.createElement("button",{className:"btn btn-danger",onClick:function(){return e.removeVideo(n)}},"Remove Video")))})))))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(i.a.createElement(V,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[13,1,2]]]);
//# sourceMappingURL=main.3845fb3f.chunk.js.map