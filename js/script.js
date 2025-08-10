$(function () {
    // 서브메뉴 호버 이벤트
    $("nav").mouseenter(function () {
        $(".submenu, .mbg").stop().slideDown(200);
    });
    
    $("nav").mouseleave(function () {
        $(".submenu, .mbg").stop().slideUp(200);
    });
    
    // AOS 초기화
    AOS.init();
    
    // 🔶 브랜드 섹션 인터랙션
    $(".brand .pic").mouseenter(function () {
        $(this).find(".txt2").css({
            "display": "block",
            "color": "white"
        });
    });
    
    $(".brand .pic").mouseleave(function () {
        $(this).find(".txt2").css("display", "none");
    });
    
    // 🔶 노란 PNG 퍼지기 스크롤 이벤트 + TOP 버튼 통합
    let brandAnimated = false;
    let ticking = false;
    const topButton = document.getElementById('topButton');
    
    function handleScroll() {
        if (ticking) return;
        
        ticking = true;
        requestAnimationFrame(function() {
            const scrollTop = $(window).scrollTop();
            const winW = window.innerWidth;
            const isMobile = winW <= 768;
            
            // 디버깅 로그
            // console.log('스크롤:', scrollTop, '화면폭:', winW, '모바일:', isMobile);
            
            // 🔶 브랜드 애니메이션 처리
            if (!brandAnimated) {
                const offsetVal = isMobile ? 300 : 500;
                const brandElement = $('.brand');
                
                if (brandElement.length > 0) {
                    const triggerPoint = brandElement.offset().top - offsetVal;
                    
                    if (scrollTop >= triggerPoint) {
                        $('.bg_con').addClass('on');
                        brandAnimated = true;
                        console.log('브랜드 애니메이션 시작!');
                    }
                }
            }
            
            // 🔶 TOP 버튼 표시/숨김 처리 (강화된 로직)
            if (topButton) {
                const threshold = isMobile ? 100 : 200;
                
                // 현재 상태 확인
                const isCurrentlyVisible = topButton.classList.contains('visible');
                const shouldBeVisible = scrollTop > threshold;
                
                // console.log('TOP 버튼 - 스크롤:', scrollTop, '임계값:', threshold, '표시되어야함:', shouldBeVisible, '현재표시:', isCurrentlyVisible);
                
                if (shouldBeVisible && !isCurrentlyVisible) {
                    topButton.classList.remove('hidden');
                    topButton.classList.add('visible');
                    console.log('TOP 버튼 표시됨');
                } else if (!shouldBeVisible && isCurrentlyVisible) {
                    topButton.classList.remove('visible');
                    topButton.classList.add('hidden');
                    console.log('TOP 버튼 숨김');
                }
            } else {
                console.warn('TOP 버튼을 찾을 수 없음');
            }
            
            ticking = false;
        });
    }
    
    // 스크롤 이벤트 등록 (통합)
    $(window).on('scroll', handleScroll);
    
    // 초기 TOP 버튼 상태 설정
    handleScroll();
});

// ✨ TOP 버튼 클릭 이벤트
$(document).ready(function() {
    const topButton = document.getElementById('topButton');
    
    if (topButton) {
        function handleTopButtonClick(e) {
            e.preventDefault();
            
            // 부드러운 스크롤
            $('html, body').animate({
                scrollTop: 0
            }, 500);
            
            // 터치 피드백
            $(topButton).css('transform', 'translateY(0) scale(0.9)');
            setTimeout(() => {
                $(topButton).css('transform', '');
            }, 150);
            
            console.log('TOP 버튼 클릭됨');
        }
        
        topButton.addEventListener('click', handleTopButtonClick);
        topButton.addEventListener('touchend', handleTopButtonClick);
        
        // TOP 버튼 상태 확인 (디버깅)
        console.log('TOP 버튼 요소:', topButton);
        console.log('초기 클래스:', topButton.className);
    } else {
        console.error('TOP 버튼을 찾을 수 없습니다!');
    }
});

// 리사이즈 이벤트 (TOP 버튼 재확인 포함)
$(window).on('resize', function() {
    // 리사이즈 시 TOP 버튼 상태 재확인
    setTimeout(function() {
        handleScroll();
    }, 100);
    
    if (window.innerWidth > 768) {
        if (typeof hamburger !== 'undefined' && typeof mobileMenu !== 'undefined') {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    }
});