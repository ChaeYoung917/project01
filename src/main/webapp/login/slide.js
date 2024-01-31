// 슬라이더 요소 선택 및 변수 초기화
const $slider = $('.slider');
let swiper = undefined;
let slideNum = $slider.find('.swiper-slide').length; // 슬라이드 총 개수
let slideInx = 0; // 현재 슬라이드 인덱스

// 디바이스 크기에 따라 화면 유형 설정 ('pc' 또는 'mo')
let oldWChk = window.innerWidth > 767 ? 'pc' : 'mo';
sliderAct(); // 슬라이더 활성화

let resizeTimer;
// 창 크기 변경 시 디바이스 크기 체크 및 슬라이더 재설정
$(window).on('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        let newWChk = window.innerWidth > 767 ? 'pc' : 'mo';
        if (newWChk != oldWChk) {
            oldWChk = newWChk;
            sliderAct();
        }
    }, 300);
});

// 슬라이더 실행 및 설정 함수
function sliderAct() {
    // 슬라이더 초기화 (이미 존재하는 경우)
    if (swiper != undefined) {
        swiper.destroy();
        swiper = undefined;
    }

    // 슬라이드 보기 옵션 설정 (디바이스에 따라 변경)
    let viewNum = oldWChk == 'pc' ? 2 : 1;

    // 슬라이드 수에 따라 무한반복 옵션 설정
    let loopChk = slideNum > viewNum;

    // 슬라이더 구성 및 옵션 설정
    swiper = new Swiper($slider.find('.inner'), {
        slidesPerView: "auto",
        initialSlide: slideInx,
        loop: loopChk,
        centeredSlides: true,
        navigation: {
            prevEl: $slider.find('.btn_prev')[0],
            nextEl: $slider.find('.btn_next')[0],
        },
        on: {
            slideChangeTransitionStart: function() {
                slideInx = this.realIndex; // 현재 슬라이드 인덱스 갱신
                updateClass();
            },
            init: function() {
                updateClass();
            },
        },
    });

    // 슬라이더 클래스 업데이트 함수
    function updateClass() {
        // 화면상 첫 번째 및 마지막 슬라이드에 클래스 추가 및 제거
        $slider.find('.swiper-slide-prev').prev().addClass('first').siblings().removeClass('first');
        $slider.find('.swiper-slide-next').next().addClass('last').siblings().removeClass('last');
    }
}
