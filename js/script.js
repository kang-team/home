
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

    // 🔶 노란 PNG 퍼지기 스크롤 이벤트
    $(window).on('scroll', function () {
      var $wt = $(window).scrollTop(); // 현재 스크롤 위치
      var winW = window.innerWidth;   // 현재 윈도우 가로 폭

      var offsetVal = 500;
      var $pot = $('.brand').offset().top - offsetVal;

      if ($wt >= $pot) {
        $('.bg_con').addClass('on');
      }
    });
  });