$(function () {
  // 윈도우 크기에 따라 다른 메뉴 이벤트를 바인딩
  function handleMenuEvents() {
    // 윈도우 너비를 확인
    const windowWidth = window.innerWidth;
    
    // 데스크톱 환경 (768px 초과)
    if (windowWidth > 768) {
      // 데스크톱 메뉴 호버 이벤트 바인딩
      $("nav").off('mouseenter mouseleave'); // 기존 이벤트 제거
      $("nav").on('mouseenter', function () {
        $(".submenu, .mbg").stop().slideDown(200);
      });
      $("nav").on('mouseleave', function () {
        $(".submenu, .mbg").stop().slideUp(200);
      });

      // 모바일 메뉴 이벤트를 비활성화
      $('.hamburger').off('click');
      $('.mobile-main-menu').off('click');

    } else { // 모바일/태블릿 환경 (768px 이하)
      // 데스크톱 메뉴 호버 이벤트를 비활성화
      $("nav").off('mouseenter mouseleave');
      
      // 햄버거 메뉴 토글
      const hamburger = document.querySelector('.hamburger');
      const mobileMenu = document.querySelector('.mobile-menu');

      // 기존 이벤트 리스너가 있다면 제거
      if (hamburger && mobileMenu) {
        hamburger.removeEventListener('click', toggleMobileMenu);
        hamburger.addEventListener('click', toggleMobileMenu);
      }
      function toggleMobileMenu() {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
      }

      // 모바일 서브메뉴 토글
      const mobileMainMenus = document.querySelectorAll('.mobile-main-menu');
      mobileMainMenus.forEach(menu => {
          menu.removeEventListener('click', toggleSubmenu);
          menu.addEventListener('click', toggleSubmenu);
      });
      function toggleSubmenu(e) {
          e.preventDefault();
          const parentLi = this.parentElement;
          const submenu = parentLi.querySelector('.mobile-submenu');
          
          const isActive = parentLi.classList.contains('active');
          
          document.querySelectorAll('.mobile-menu > ul > li').forEach(li => {
              li.classList.remove('active');
              const sub = li.querySelector('.mobile-submenu');
              if (sub) {
                  sub.classList.remove('active');
              }
          });
          
          if (!isActive) {
              parentLi.classList.add('active');
              submenu.classList.add('active');
          }
      }
    }
  }

  // 초기 로드와 리사이즈 시 이벤트 핸들러를 실행
  handleMenuEvents();
  $(window).on('resize', handleMenuEvents);

  // 나머지 코드들
  AOS.init();

  // 브랜드 호버 효과 (jQuery 버전으로 통일하는 것이 좋습니다.)
  $(".brand .pic").mouseenter(function () {
      $(this).find(".txt2").css({"display": "block", "color": "white"});
  });
  $(".brand .pic").mouseleave(function () {
      $(this).find(".txt2").css("display", "none");
  });

  // 노란 PNG 퍼지기 스크롤 이벤트
  $(window).on('scroll', function () {
      var $wt = $(window).scrollTop();
      var winW = window.innerWidth;
      var offsetVal = 500;
      var $pot = $('.brand').offset().top - offsetVal;
      if ($wt >= $pot) {
          $('.bg_con').addClass('on');
      }
  });

});