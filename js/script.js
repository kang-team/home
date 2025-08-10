$(function () {
    // 🔹 서브메뉴 호버 이벤트
    $("nav").mouseenter(function () {
        $(".submenu, .mbg").stop().slideDown(200);
    });
    $("nav").mouseleave(function () {
        $(".submenu, .mbg").stop().slideUp(200);
    });

    // 🔹 AOS 초기화
    AOS.init();

    // 🔹 브랜드 섹션 인터랙션
    $(".brand .pic").hover(
        function () {
            $(this).find(".txt2").css({ display: "block", color: "white" });
        },
        function () {
            $(this).find(".txt2").css("display", "none");
        }
    );

    // 🔹 상태 변수
    let brandAnimated = false;
    const topButton = document.getElementById("topButton");

    // 🔶 브랜드 애니메이션 처리
    function handleBrandAnimation(scrollTop, isMobile) {
        if (brandAnimated) return;

        const offsetVal = isMobile ? 300 : 500;
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

    // 🔶 TOP 버튼 표시/숨김 처리
    function handleTopButton(scrollTop, isMobile) {
        if (!topButton) return;

        const threshold = isMobile ? 10 : 200;
        const isVisible = topButton.classList.contains("visible");
        const shouldShow = scrollTop > threshold;

        if (shouldShow && !isVisible) {
            topButton.classList.remove("hidden");
            topButton.classList.add("visible");

            const rect = topButton.getBoundingClientRect();
            console.log(
                `TOP 버튼 표시됨 - 위치(x: ${Math.round(rect.left)}, y: ${Math.round(rect.top)}), 크기(width: ${Math.round(rect.width)}, height: ${Math.round(rect.height)})`
            );
        } else if (!shouldShow && isVisible) {
            topButton.classList.remove("visible");
            topButton.classList.add("hidden");
            console.log("TOP 버튼 숨김");
        }
    }

    // 🔁 스크롤 이벤트 처리
    let ticking = false;
    function handleScroll() {
        if (ticking) return;
        ticking = true;

        requestAnimationFrame(function () {
            const scrollTop = $(window).scrollTop();
            const winW = window.innerWidth;
            const isMobile = winW <= 768;

            handleBrandAnimation(scrollTop, isMobile);
            handleTopButton(scrollTop, isMobile);

            ticking = false;
        });
    }

    // 🔁 스크롤 이벤트 등록
    $(window).on("scroll", handleScroll);
    handleScroll(); // 초기 상태 설정

    // ✨ TOP 버튼 클릭 이벤트 및 강제 표시
    if (topButton) {
        function handleTopButtonClick(e) {
            e.preventDefault();

            $("html, body").animate({ scrollTop: 0 }, 500);

            $(topButton).css("transform", "scale(0.9)");
            setTimeout(() => {
                $(topButton).css("transform", "");
            }, 150);

            topButton.classList.add("pulse");
            setTimeout(() => {
                topButton.classList.remove("pulse");
            }, 2000);

            console.log("TOP 버튼 클릭됨");
        }

        topButton.addEventListener("click", handleTopButtonClick);
        topButton.addEventListener("touchend", handleTopButtonClick);

        // 🔧 TOP 버튼 강제 표시
        topButton.classList.remove("hidden");
        topButton.classList.add("visible");
        topButton.style.display = "block";
        topButton.style.visibility = "visible";
        topButton.style.opacity = "1";
        topButton.style.zIndex = "10000";
        console.log("TOP 버튼 강제 표시됨");

        console.log("TOP 버튼 요소:", topButton);
        console.log("초기 클래스:", topButton.className);
    } else {
        console.error("TOP 버튼을 찾을 수 없습니다!");
    }

    // 📱 리사이즈 이벤트
    $(window).on("resize", function () {
        setTimeout(handleScroll, 100);

        if (window.innerWidth > 768) {
            if (typeof hamburger !== "undefined" && typeof mobileMenu !== "undefined") {
                hamburger.classList.remove("active");
                mobileMenu.classList.remove("active");
            }
        }
    });
});
