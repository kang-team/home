// DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 AOS 호환 TOP 버튼 시작!');
    
    // 🔹 브랜드 섹션 인터랙션 (jQuery 필요)
    if (typeof $ !== 'undefined') {
        $(".brand .pic").hover(
            function () {
                $(this).find(".txt2").css({ display: "block", color: "white" });
            },
            function () {
                $(this).find(".txt2").css("display", "none");
            }
        );
        console.log('✅ 브랜드 호버 이벤트 등록');
    }
    
    // 🔹 상태 변수
    let brandAnimated = false;
    
    // 기존 TOP 버튼 찾기 (CSS로 스타일된 버튼)
    let topButton = document.querySelector('.top-button') || document.getElementById('topButton');
    
    // TOP 버튼이 없다면 새로 생성
    if (!topButton) {
        topButton = document.createElement('button');
        topButton.className = 'top-button hidden';
        topButton.setAttribute('aria-label', '맨 위로 이동');
        document.body.appendChild(topButton);
        console.log('✅ TOP 버튼 새로 생성');
    } else {
        // 기존 버튼에 hidden 클래스 추가 (초기 숨김 상태)
        topButton.classList.add('hidden');
        console.log('✅ 기존 TOP 버튼 찾음');
    }
    
    // 🔶 브랜드 애니메이션 처리
    function handleBrandAnimation(scrollTop, isMobile) {
        if (brandAnimated) return;

        const offsetVal = isMobile ? 300 : 500;
        
        if (typeof $ !== 'undefined') {
            const brandElement = $(".brand");
            
            if (brandElement.length > 0) {
                const triggerPoint = brandElement.offset().top - offsetVal;
                if (scrollTop >= triggerPoint) {
                    $(".bg_con").addClass("on");
                    brandAnimated = true;
                    console.log("브랜드 애니메이션 시작!");
                }
            }
        }
    }
    
    // 표시/숨김 함수 (CSS 클래스 사용)
    function toggleButtonVisibility(show = false) {
        if (show) {
            topButton.classList.remove('hidden');
            topButton.classList.add('visible');
        } else {
            topButton.classList.remove('visible');
            topButton.classList.add('hidden');
        }
    }
    
    // 스크롤 이벤트
    let isScrolling = false;
    let isVisible = false;
    
    function handleScroll() {
        if (isScrolling) return;
        isScrolling = true;
        
        requestAnimationFrame(function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const isMobile = window.innerWidth <= 768;
            const threshold = isMobile ? 30 : 100;
            
            // TOP 버튼 표시/숨김 처리
            const shouldShow = scrollTop > threshold;
            
            if (shouldShow && !isVisible) {
                toggleButtonVisibility(true);
                isVisible = true;
                console.log('👀 TOP 버튼 표시!', `스크롤: ${scrollTop}px`);
            } else if (!shouldShow && isVisible) {
                toggleButtonVisibility(false);
                isVisible = false;
                console.log('👻 TOP 버튼 숨김!', `스크롤: ${scrollTop}px`);
            }
            
            // 브랜드 애니메이션 처리
            handleBrandAnimation(scrollTop, isMobile);
            
            isScrolling = false;
        });
    }
    
    // 순수 JavaScript 스크롤 애니메이션 (jQuery 없이)
    function smoothScrollToTop() {
        const startY = window.pageYOffset || document.documentElement.scrollTop;
        const startTime = performance.now();
        const duration = 600; // 600ms
        
        function animateScroll(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // easeInOutCubic 이징 함수
            const easeInOutCubic = progress < 0.5 
                ? 4 * progress * progress * progress 
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;
            
            const currentY = startY * (1 - easeInOutCubic);
            window.scrollTo(0, currentY);
            
            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            } else {
                console.log('⬆️ 스크롤 완료!');
            }
        }
        
        requestAnimationFrame(animateScroll);
    }
    
    // 클릭 이벤트
    function handleClick(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('🖱️ TOP 버튼 클릭!');
        
        // 펄스 애니메이션 추가 (CSS에 정의되어 있다면)
        topButton.classList.add('pulse');
        setTimeout(() => {
            topButton.classList.remove('pulse');
        }, 2000);
        
        // 순수 JavaScript로 스크롤 애니메이션
        smoothScrollToTop();
    }
    
    // 이벤트 등록 (passive: true로 성능 최적화, AOS와 충돌 방지)
    window.addEventListener('scroll', handleScroll, { passive: true });
    topButton.addEventListener('click', handleClick);
    
    // 초기 실행
    handleScroll();
    
    // AOS 초기화 (기존 코드 유지)
    if (typeof AOS !== 'undefined') {
        AOS.init();
        console.log('✅ AOS.js 초기화 완료');
        
        // AOS 초기화가 완료된 후 TOP 버튼 재조정
        setTimeout(() => {
            console.log('🔄 AOS 초기화 후 TOP 버튼 재조정');
            handleScroll();
        }, 100);
    } else {
        console.log('⚠️ AOS.js가 로드되지 않음');
    }
    
    console.log('🎉 AOS 호환 TOP 버튼 초기화 완료!');
});