window.onload = function() {
    let header = $('.header')[0];
    let songList = $('.listSong')[0];
    let play = $('.play')[0];
    console.log(songList)
    $.get(
        'http://localhost:3000/banner',
        function({ banners }) {
            // console.log(banners);
            banners.forEach((item, index) => {
                header.style.background = `url(${item.imageUrl}) no-repeat 0 0 / auto 100%`
            });

        }
    );
    let imgList = [];
    let idList = [];
    let nameList = [];
    $.get(
        'http://localhost:3000/personalized/newsong',
        function({ result }) {
            console.log(result);
            result.forEach((item, index) => {
                idList.push(item.id);
                imgList.push(item.song.album.picUrl);
                nameList.push(item.name);

                songList.innerHTML += `
                <li>
                    <a href="#" class="playing">
                        <div class="left">
                            <div class="img">
                                <img src="${item.song.album.picUrl}" alt="">
                            </div>
                            <div class="text">
                                <div class="top">${item.name}</div>
                                <div class="bottom">夏日入侵企劃</div>
                            </div>
                        </div>
                        <div class="center"></div>
                        <div class="right">
                            <i class="iconfont icon-bofang1"></i>
                            <i class="iconfont icon-more1170511easyiconnet"></i>
                        </div>
                    </a>
                </li>
            `
            });

            let playing = [...$('.playing')];
            window._audio = document.createElement('audio');
            //獲取播放音樂
            playing.forEach((item, index) => {

                item.index = index;
                item.onclick = function() {
                    play.style.display = "block";
                    $.get(
                        `http://localhost:3000/song/url?id=${idList[this.index]}`,
                        function({ data }) {
                            console.log(data)
                            _audio.src = data[0].url;
                            _audio.play();
                        }
                    );
                    play.innerHTML = `
                            <a href="./play.html?id=${idList[this.index]}">
                                <div class="left">
                                    <div class="img">
                                        <img src="${imgList[this.index]}" alt="">
                                    </div>
                                    <div class="text">
                                        <div class="top"> ${nameList[this.index]}</div>
                                        <div class="bottom">滑动可以切换音乐</div>
                                    </div>
                                </div>
                                <div class="center"></div>
                                <div class="right">
                                    <div class="stop">
                                        <div class="progress"></div>
                                        <i class="iconfont icon-bofang"></i>
                                    </div>
                                    <i class="iconfont icon-bofangliebiao"></i>
                                </div>
                            </a>
                        `
                }
            });
        }
    );
}