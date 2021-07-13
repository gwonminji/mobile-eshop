$(function () {
    //뷰포트 계산
    var vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
    window.addEventListener('resize', () => {
        var vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty('--vh', `${vh}px`)
    })
    tab();
    layout();
    pageTop();
    //deviceCheck();
    isMobileApp();
});

//공통 다이얼로그 띄우기
/*
    param : 띄울 다이얼로그 div의 id값
    tabIdx : tab 메뉴 선택하여 띄울 때 tab 메뉴의 index값
    msg : 다이얼로그 내용
*/
function openCommDialog(param, tabIdx, msg){
    overflowHidden();

    if(param.length > 0){
        var layerID = param;
        $("#" + layerID).addClass("show");
        // $(".layer.dialog").addClass("show");
        var targetTab = tabIdx;
        if(targetTab.length > 0){
            $(".tabs li").each(function(i){
                if(i == targetTab){
                    $(this).addClass("active");
                    $(this).siblings().removeClass("active");
                }
            });
        }
        var dialogMSG = msg;
        if(dialogMSG.length > 0){
            $(".dialog-body .msg").text(dialogMSG);
        }
    }else{
        // alert("받은 param 없음");
    }
}
//공통 다이얼로그 닫기
/*
    param : 닫을 다이얼로그 div의 id값
*/
function closeCommDialog(param){
    overflowHiddenRemove();

    // $(".layer.dialog").removeClass("show");
    if(param.length > 0){
        var layerID = param;
        $("#" + layerID).removeClass("show");
        // overflowHiddenRemove();
        // $(".layer.dialog").addClass("show");
    }
}

//팝업 호출 시 부모 레이어 스크롤 막기
// var parentScrollHeight = 0;
function overflowHidden(){
    // parentScrollHeight = $(window).scrollTop();
    // console.log("이동한 스크롤" + parentScrollHeight);

    // $(".layer").animate({
    //     scrollTop: parentScrollHeight
    // }, 0);

    $(".wrap").addClass("hidden");
}

//팝업 종료 시 부모 레이어 스크롤 풀기
function overflowHiddenRemove(){
    $(".wrap").removeClass("hidden");
}

//tab
function tab(){
    $(".tabs li").click(function(){
        var idx = $(this).index();
        var target = idx + 1;

        $(".tabs li").removeClass("active");
        $(".tabs li:nth-child(" + target + ")").toggleClass("active");
        $(".tab-content").removeClass("active");
        $(".tab-content:nth-child(" + target + ")").toggleClass("active");
    });
}

//메뉴바 인터랙션
function layout(){
    var position = $(".wrap").scrollTop(); 

    $(".wrap").scroll(function () {
        var scrollValue = $(".wrap").scrollTop();

        if(scrollValue > position){//scroll down
            var scrollValue = $(".wrap").scrollTop();
            // console.log(scrollValue);                       

            if(scrollValue > 30){
                $(".menubar").addClass("hide");
                $(".btn-top").addClass("show");
                $(".qck-pane").addClass("move");

                // $(".search-list-box .search-top").addClass("fixed");
                if(scrollValue > 50){
                    $(".search-list-box .search-top").addClass("fixed");
                }
            }
        }else{//scroll up
            $(".menubar").removeClass("hide");
            if(scrollValue <= 50){
                $(".search-list-box .search-top").removeClass("fixed");
                $(".btn-top").removeClass("show");
                $(".qck-pane").removeClass("move");
            }
        }
        position = scrollValue;
    });   
}

//top 버튼
function pageTop(){
    $(".btn-top").on("click", function(){
        $(".wrap").animate({
            scrollTop : 0
        }, 0);
        return false;
    });
}

//접속정보체크
function deviceCheck(){
    var userAgent = navigator.userAgent; //접속정보

    if(userAgent.indexOf("venusapp-ios")>-1){//아이폰 앱으로 접속하는 경우
        $(".menubar").addClass("venusapp-ios");
    }
}

function isMobileApp() {
    var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
    if (varUA.match('android') != null) {
        //안드로이드 일때 처리
        try {
            version = window.AppInterfaceMain.getVersion();
        } catch (e) {
            return false;
        }
    } else if (varUA.indexOf("iphone")>-1||varUA.indexOf("ipad")>-1||varUA.indexOf("ipod")>-1) {
        //IOS 일때 처리
        var message = {
            command: 'getversion',
            name: '',
            value: ''
        };
        try {
            window.webkit.messageHandlers.venus.postMessage(message);
        } catch (ex) {
            return false
        }
    } else {
        //아이폰, 안드로이드 외 처리
    }
    return true;
}
