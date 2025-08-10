
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



    // // 🔶 브랜드 섹션 인터랙션
    // $(".brand .pic").mouseenter(function () {
    //   $(this).find(".txt2").css({
    //     "display": "block",
    //     "color": "white"
    //   });
    // });

    // $(".brand .pic").mouseleave(function () {
    //   $(this).find(".txt2").css("display", "none");
    // });

    // // 🔶 노란 PNG 퍼지기 스크롤 이벤트
    // $(window).on('scroll', function () {
    //   var $wt = $(window).scrollTop(); // 현재 스크롤 위치
    //   var winW = window.innerWidth;   // 현재 윈도우 가로 폭

    //   var offsetVal = 500;
    //   var $pot = $('.brand').offset().top - offsetVal;

    //   if ($wt >= $pot) {
    //     $('.bg_con').addClass('on');
    //   }
    // });


    // ✨ 새로운 TOP 버튼 기능 (모바일 최적화)
    const topButton = document.getElementById('topButton');
    let isScrolling = false;
    let ticking = false;

    // TOP 버튼 클릭 이벤트 (터치 최적화)
    if (topButton) {
        // 터치와 클릭 모두 지원
        const handleTopButtonClick = function(e) {
            e.preventDefault();
            
            // 부드러운 스크롤
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // 터치 피드백
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // 클릭 시 펄스 효과 (선택사항)
            this.classList.add('pulse');
            setTimeout(() => {
                this.classList.remove('pulse');
            }, 2000);
        };
        
        topButton.addEventListener('click', handleTopButtonClick);
        topButton.addEventListener('touchend', handleTopButtonClick);
    }

    // 스크롤에 따른 TOP 버튼 표시/숨김 (성능 최적화)
    function toggleTopButton() {
        if (!ticking) {
            requestAnimationFrame(function() {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                if (scrollTop > 200) { // 모바일에서는 200px로 줄임
                    topButton.classList.remove('hidden');
                    topButton.classList.add('visible');
                } else {
                    topButton.classList.remove('visible');
                    topButton.classList.add('hidden');
                }
                
                ticking = false;
            });
            ticking = true;
        }
    }

    // 스크롤 이벤트 리스너
    window.addEventListener('scroll', toggleTopButton, { passive: true });
    
    // 초기 상태 설정
    toggleTopButton();

    // 리사이즈 이벤트 (기존 코드 유지)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });    
  });