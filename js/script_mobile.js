
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




        // 햄버거 메뉴 토글
        const hamburger = document.querySelector('.hamburger');
        const mobileMenu = document.querySelector('.mobile-menu');

        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        // 모바일 서브메뉴 토글
        const mobileMainMenus = document.querySelectorAll('.mobile-main-menu');
        
        mobileMainMenus.forEach(menu => {
            menu.addEventListener('click', function(e) {
                e.preventDefault();
                
                const parentLi = this.parentElement;
                const submenu = parentLi.querySelector('.mobile-submenu');
                
                // 현재 메뉴가 활성화되어 있는지 확인
                const isActive = parentLi.classList.contains('active');
                
                // 모든 서브메뉴 닫기
                document.querySelectorAll('.mobile-menu > ul > li').forEach(li => {
                    li.classList.remove('active');
                    const sub = li.querySelector('.mobile-submenu');
                    if (sub) {
                        sub.classList.remove('active');
                    }
                });
                
                // 클릭한 메뉴가 비활성화 상태였다면 열기
                if (!isActive) {
                    parentLi.classList.add('active');
                    submenu.classList.add('active');
                }
            });
        });

        // 브랜드 호버 효과
        const brandPics = document.querySelectorAll('.brand .pic');
        brandPics.forEach(pic => {
            pic.addEventListener('mouseenter', function() {
                const txt2 = this.nextElementSibling;
                if (txt2 && txt2.classList.contains('txt2')) {
                    txt2.style.display = 'block';
                }
            });
            
            pic.addEventListener('mouseleave', function() {
                const txt2 = this.nextElementSibling;
                if (txt2 && txt2.classList.contains('txt2')) {
                    txt2.style.display = 'none';
                }
            });
        });

        // 반응형 체크 함수
        function checkResponsive() {
            const width = window.innerWidth;
            console.log('Current width:', width);
            
            if (width <= 480) {
                console.log('Mobile view');
            } else if (width <= 768) {
                console.log('Tablet view');
            } else {
                console.log('Desktop view');
            }
        }

        // 윈도우 리사이즈 시 체크
        window.addEventListener('resize', checkResponsive);
        
        // 초기 로드 시 체크
        checkResponsive();      
    // header.html 먼저 불러온 뒤에 이벤트 바인딩
    // $('#header').load('header.html', function () {
    //   // 서브메뉴 호버 이벤트
    //   $("nav").mouseenter(function () {
    //     $(".submenu, .mbg").stop().slideDown(200);
    //   });

    //   $("nav").mouseleave(function () {
    //     $(".submenu, .mbg").stop().slideUp(200);
    //   });

    //   // AOS 초기화
    //   AOS.init();
    // });

    // // footer는 일반적으로 이벤트가 필요 없으니 별도 콜백 없어도 OK
    // $('#footer').load('footer.html');

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