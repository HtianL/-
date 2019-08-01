window.onload = function() {
    let swiper = $('.banner')[0];
    let songList = $('.container')[2];
    let newSongList = $('.container')[4];
    console.log(swiper)
    console.log(songList)
    console.log(newSongList)
    $.get(
        'http://localhost:3000/banner',
        function({ banners }) {
            console.log(banners);
            let swiperWrap = '';
            banners.forEach((item, index) => {
                swiperWrap += `
                <div class="swiper-slide">
                    <img src="${item.imageUrl}" class="banner-img">
                    <span class="banner-imgtype" style="background-color:${item.titleColor};">${item.typeTitle}</span>
                </div>`;
            })

            swiper.innerHTML = `
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        ${swiperWrap}
                </div>
                <!-- Add Pagination -->
                <div class="swiper-pagination"></div>
            `;

            new Swiper('.swiper-container', {
                autoplay: 2000,
                pagination: '.swiper-pagination',
                paginationClickable: true
            });
        }
    )
    $.get(
        'http://localhost:3000/personalized',
        function({ result }) {
            console.log(result)
            songList.innerHTML = '';
            result.forEach((item, index) => {
                if (index < 6) {
                    songList.innerHTML += `
                    <div class="list">
                        <a>
                            <div class="img">
                                <img src="${item.picUrl}" alt="">
                            </div>
                            <div class="play">
                                <i class="iconfont icon-bofang2"></i>
                                <span>${item.playCount}</span>
                            </div>
                            <div class="text">${item.name}</div>
                        </a>
                     </div>
                    `;
                }
            })
        }
    )
    $.get(
        'http://localhost:3000/personalized',
        function({ result }) {
            console.log(result)
            newSongList.innerHTML = '';
            result.forEach((item, index) => {
                if (index > 6 && index < 13) {
                    newSongList.innerHTML += `
                    <div class="list">
                        <a>
                            <div class="img">
                                <img src="${item.picUrl}" alt="">
                            </div>
                            <div class="text">${item.name}</div>
                        </a>
                     </div>
                    `;
                }
            })
        }
    )
}