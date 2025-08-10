$(function () {
  // 메뉴 이벤트 핸들링
  function handleMenuEvents() {
    const windowWidth = window.innerWidth;
    
    // 모든 이벤트 제거 후 재등록
    $("nav").off('mouseenter mouseleave');
    $('.hamburger').off('click');
    $('.mobile-main-menu').off('click');
    
    if (windowWidth > 864) {
      // 데스크톱 메뉴: 호버 이벤트
      $("nav").on('mouseenter', function () {
        $(".submenu, .mbg").stop().slideDown(200);
      }).on('mouseleave', function () {
        $(".submenu, .mbg").stop().slideUp(200);
      });
      
      // 모바일 메뉴 숨기기
      $('.mobile-menu').removeClass('active');
      $('.hamburger').removeClass('active');
    } else {
      // 모바일 메뉴: 클릭 이벤트
      
      // 햄버거 메뉴 토글 - 더 구체적인 셀렉터 사용
      $('.hamburger').on('click touchstart', function (e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('햄버거 클릭/터치됨'); // 디버깅용
        
        $(this).toggleClass('active');
        $('.mobile-menu').toggleClass('active');
      });
      
      // 모바일 서브메뉴 토글
      $('.mobile-main-menu').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        
        const $parentLi = $(this).parent();
        const $submenu = $parentLi.find('.mobile-submenu');
        const isActive = $parentLi.hasClass('active');
        
        // 다른 서브메뉴들 닫기
        $('.mobile-menu > ul > li').removeClass('active')
          .find('.mobile-submenu').removeClass('active');
        
        // 현재 서브메뉴 토글
        if (!isActive) {
          $parentLi.addClass('active');
          $submenu.addClass('active');
        }
      });
      
      // 모바일에서는 .mbg 강제 숨김
      $('.mbg').hide();
      
      // 모바일 메뉴 외부 클릭 시 닫기
      $(document).on('click', function(e) {
        if (!$(e.target).closest('.mobile-menu, .hamburger').length) {
          $('.mobile-menu').removeClass('active');
          $('.hamburger').removeClass('active');
        }
      });
    }
  }
  
  // 초기 실행
  handleMenuEvents();
  
  // 리사이즈 이벤트 - 디바운스 적용
  let resizeTimer;
  $(window).on('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(handleMenuEvents, 100);
  });
  
  // AOS 초기화
  if (typeof AOS !== 'undefined') {
    AOS.init();
  }
  
  // 브랜드 호버 효과
  $(".brand .pic").on('mouseenter', function () {
    $(this).find(".txt2").css({ "display": "block", "color": "white" });
  }).on('mouseleave', function () {
    $(this).find(".txt2").css("display", "none");
  });
  
  // 스크롤 시 배경 퍼짐 효과
  $(window).on('scroll', function () {
    const scrollTop = $(window).scrollTop();
    const offsetVal = 500;
    const brandOffset = $('.brand').length ? $('.brand').offset().top - offsetVal : 0;
    
    if (scrollTop >= brandOffset) {
      $('.bg_con').addClass('on');
    }
  });
});