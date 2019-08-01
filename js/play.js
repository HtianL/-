window.onload = function() {
    //获取元素
    let cd = $('.cd')[0];
    let img = $('.img')[0];
    let start = $('.start')[0];
    let end = $('.end')[0];
    let move = $('.move')[0];
    let ball = $('.ball')[0];
    let play = $('.play')[0];
    let back = $('.back')[0];
    let progress = $('.progress')[0];
    let bar = $('.bar')[0];
    let lyric = $('.lyric')[0];
    let comment = $('.comment')[0];
    let play_lyric = $('.play_lyric')[0];
    let mark = false;

    (function(str) {
        if (!str.includes('?')) return;
        let arr = str.split('?')[1].split('&');
        arr.forEach((item, index) => {
            let id = item.split('=');
            if (id[0] == "id") {
                localStorage.setItem(id[0], id[1]);
            }
        })

    })(location.href)
    // 常见一个对象
    let datas = {};
    // 将本地id提取出来放到datas中
    datas.id = localStorage.getItem('id');
    //创建audio节点
    window._audio = document.createElement('audio');
    //获取歌曲详情
    $.get(
        `http://localhost:3000/song/detail?ids=${datas.id}`,
        function({ songs: [{ al: { picUrl } }] }) {
            console.log(datas.id)
            img.innerHTML = `
                <img src="${picUrl }" alt="">
            `
        }
    );
    $.get(
        `http://localhost:3000/song/url?id=${datas.id}`,
        function({ data: [{ url }] }) {
            console.log(url);
            cd.style.animation = 'rotate 10s linear infinite';
            _audio.src = url;
            _audio.play();

            //监听是否播放结束
            _audio.addEventListener('ended', function() {
                cd.style.animation = '';
            });
            _audio.addEventListener('timeupdate', function() {
                nowTime();
            });
        }
    );

    function nowTime() {
        //时间
        end.innerHTML = time(_audio.duration);
        start.innerHTML = time(_audio.currentTime);

        //进度条
        let n = _audio.currentTime / _audio.duration;
        // console.log(n);
        let value = n * (bar.offsetWidth);
        move.style.width = value + "px";
        // console.log(bar.offsetWidth)
        ball.style.left = value + "px";
    }

    function time(time) {
        time = parseInt(time);
        let m = zero(Math.floor(time % 3600 / 60));
        let s = zero(Math.floor(time % 60))

        return ` ${m}:${s}`;
    }

    function zero(num) {
        return num < 10 ? '0' + num : '' + num;
    }
    play.onclick = function() {
        let str = '';
        let animation = '';
        if (!mark) {
            _audio.pause();
            str = 'icon-bofang';
        } else {
            _audio.play();
            str = 'icon-pause';
            animation = 'rotate 10s linear infinite';
        }
        mark = !mark;
        this.innerHTML = `<i class="iconfont ${str}"></i>`;
        cd.style.animation = animation;
        return false;
    }
    back.onclick = function() {
            window.location = "listSong.html"
        }
        //点击出现歌词
    lyric.onclick = function() {
        cd.style.display = "none";
        comment.style.display = "none";
        $.get(
            `http://localhost:3000/lyric?id=${datas.id}`,
            function({ lrc: { lyric } }) {
                // console.log(lyric)
                let data = lyric.split('[');
                // console.log(data)
                data.forEach((item, index) => {
                    //将时间与歌词分离开始
                    let data2 = item.split(']');
                    // console.log(data2)
                    let time = data2[0].split('.')[0];
                    // console.log(time);
                    let Lyric = data2[1];
                    //将时间与歌词分离结束
                    // console.log(Lyric);
                    let time2 = time.split(':');
                    // console.log(time2);
                    let timer = time2[0] * 60 + time2[1] * 1;
                    // console.log(timer);
                    //将事件转换为毫秒数

                    //创建p标签
                    let p = document.createElement('p');
                    p.id = 'lyric' + timer;
                    p.className = "lyric_p";
                    p.innerHTML = Lyric;
                    play_lyric.appendChild(p);
                })

                let pArr = ([...$('.lyric_p')]);
                // console.log(pArr);

                _audio.addEventListener('timeupdate', function() {
                    let currentTime = parseInt(_audio.currentTime);
                    // console.log(currentTime)
                    pArr.forEach((item, index) => {
                        if (item.id == 'lyric' + currentTime) {
                            play_lyric.style.marginTop = -(item.offsetTop / 100) + 'rem';
                            if (index > 0) {
                                pArr[index - 1].style.color = "#8e8484";
                            }
                            item.style.color = "#fff";
                        }
                    })
                })
            }
        )
    }
}