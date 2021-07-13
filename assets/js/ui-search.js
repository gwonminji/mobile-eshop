$(function () {
    textRolling();
    search();
    searchLayer();
    filterLayer();
    searchResult();
});

//인기 검색어 텍스트 롤링 효과
function textRolling(){
    $(".rolling").removeClass("start");

    setTimeout(function() {
        $(".r01").addClass("start");
    }, 100);
    setTimeout(function() {
        $(".r02").toggleClass("start");
    }, 1000);
    setTimeout(function() {
        $(".r03").toggleClass("start");
    }, 2000);
    setTimeout(function() {
        $(".r04").toggleClass("start");
    }, 3000);
    setTimeout(function() {
        $(".r05").toggleClass("start");
    }, 4000);     
    setTimeout(function() {
        $(".r06").toggleClass("start");
    }, 5000);
    setTimeout(function() {
        $(".r07").toggleClass("start");
    }, 6000);  
    setTimeout(function() {
        $(".r08").toggleClass("start");
    }, 7000);     
    setTimeout(function() {
        $(".r09").toggleClass("start");
    }, 8000);
    setTimeout(function() {
        $(".r10").toggleClass("start");
    }, 9000);
}

setInterval(function() {
    textRolling();
}, 10000);

//검색영역 공통
function search(){
    //키워드 클리어 버튼 클릭시 텍스트 제거
    $(".layer.search .btn-clear").on("click", function(){
        $(".ip-keyword").val("");
        $(".ip-keyword").focus();

        if($(this).hasClass("show")){
            $(this).removeClass("show");
            $(".type-auto").removeClass("show");
        }
    });

    //키워드 클리어 버튼 show/hide
    $(".ip-keyword").on("keyup", function(){
        var length = $(".ip-keyword").val().length;

        if(length > 0){
            $(".btn-clear").addClass("show");
        }else{
            $(".btn-clear").removeClass("show");
        }
    });

    //검색버튼 이벤트 : 검색어 미입력시 다이얼로그 창 호출
    $(".layer.search .btn-search").on("click", function(){
        var length = $(".ip-keyword").val().length;

        if(length == 0){
            openCommDialog('alertLayer', '', '검색어를 입력해주세요.');
        }
    });
    
    //검색버튼 이벤트 : 검색어 미입력시 다이얼로그 창 호출
    $(".layer.filter .filter-foot").on("click", function(){
        var ipBox = $("body").children().find(".ip-keyword").length;
        if(ipBox > 0){
            var length = $(".ip-keyword").val().length;
            if(length == 0){
                $(".layer.filter").removeClass("show");
                $(".layer.filter .layer-box").removeClass("open");
                openCommDialog('alertLayer', '', '검색어를 입력해주세요.');
            }
        }
    });

    //검색레이어 : 자동완성
    // $("#ip-auto").on("keyup", function(){
    //     var length = $("#ip-auto").val().length;

    //     console.log(length);

    //     if(length == 0){
    //         $(".type-auto").removeClass("show");
    //     }else{
    //         $(".type-auto").addClass("show");

    //         sameText();
    //     }
    // });

    //검색 텍스트 일치하면 텍스트 강조
    // function sameText(){
    //     var keyword = $("#ip-auto").val();

    //     $(".auto-li .li a:contains('" + keyword + "')").each(function(){ //검색할영역 지정
    //         var regex = new RegExp(keyword, 'gi');
    //         $(this).html($(this).text().replace(regex, "<em>"+keyword+"</em>"));
    //     });
    // }

    $("#ip-auto").on("keyup", function () {
        var len = $("#ip-auto").val().length;
        if (len > 0) {
            $(".layer.search").addClass("hidden");
        } else {
            $(".layer.search").removeClass("hidden");
        }
    });
}

//검색레이어
function searchLayer(){
    //최근 검색어 선택삭제
    $(".slide-keyword li .btn-item-del span").on("click", function(){
        // alert($(this).closest("li").children('a')[0].innerText);
        var selectkeyword = $(this).closest("li").children('a')[0].innerText;
        var keywordlist = getCookie("keywordlist");
        var savedataarray = keywordlist.split(",");
        for(var i = 0; i < savedataarray.length; i++){
            if (savedataarray[i] == ''){
                savedataarray.splice(i,1);
                continue;
            }
            if (selectkeyword == savedataarray[i]){
                savedataarray.splice(i,1);
            }
        }
        var modifydata = '';
        for (var i = 0; i < savedataarray.length; i++) {
            if(modifydata == ''){
                modifydata = savedataarray[i];
            }else {
                modifydata += ',' + savedataarray[i];
            }
        }
        setCookie('keywordlist', modifydata);

        $(this).closest("li").remove();
        // alert();
    });

    //최근 검색어 전체 삭제
    $(".btn-allitem-del").on("click", function(){
        delCookie("keywordlist");
        $(".slide-keyword").remove();
    });
}

//필터 레이어
function filterLayer(){
    //필터 레이어 열기
    $(".btn-filter-layer").on("click", function(){
        $(".layer.filter").addClass("show");
        $(".layer.filter .layer-box").addClass("open");
        $(".wrap").addClass("hidden");
    });

    //필터 레이어 닫기
    $(".filter-head .btn-close").on("click", function(){
        $(".layer.filter .layer-box").removeClass("open");
        $(".wrap").removeClass("hidden");
        setTimeout(function() {
            $(".layer.filter").removeClass("show");
        }, 200);
    });

    //필터 리스트 아코디언
    $(".filter-acc.dep01 .item-li").on("click", function(){
        $(this).children(".filter-acc.dep02").toggleClass("show");
        $(this).children(".arr").toggleClass("up");
    });  
    $(".filter-acc.dep02").on("click", function(e){
        e.stopPropagation();        
    });

    //필터 초기화 버튼
    $(".filter-head .btn-reset").on("click", function(){
        //브랜드 초기화
        $("input:checkbox[name=cb-brand]").each(function(index){
            $("input:checkbox[name=cb-brand]").prop("checked", false);
            $(".selected-txt.txt-b").text("");
        });

        // 할인구분 초기화
        $("input:checkbox[name=cb-classcode]").each(function (index) {
            $("input:checkbox[name=cb-classcode]").prop("checked", false);
            $(".selected-txt.txt-s").text("");
        });

        //색상 초기화
        $("input:checkbox[name=cb-colorchip]").each(function(index){
            $("input:checkbox[name=cb-colorchip]").prop("checked", false);
            $(".selected-txt.txt-c").text("");
        });

        // 가격 초기화
        $('#minCost').val('');
        $('#maxCost').val('');

        //컵 초기화
        $("input:checkbox[name=cup-radio]").each(function(index){
            $("input:checkbox[name=cup-radio]").prop("checked", false);
        });
        //사이즈 초기화
        $("input:checkbox[name=size-radio]").each(function(index){
            $("input:checkbox[name=size-radio]").prop("checked", false);
        });
    });
    
    //브랜드 : 선택된 옵션 텍스트 
    $($("input:checkbox[name=cb-brand]")).on("change", function(){
        var checkedObj = "";
        var checkedLength = $("input:checkbox[name=cb-brand]:checked").length;

        if(checkedLength > 0){
            $("input:checkbox[name=cb-brand]:checked").each(function(index){
                if(index != 0){
                    checkedObj += ', ';
                }
                checkedObj += $(this).val();
                $(".selected-txt.txt-b").text(checkedObj);
            });
        }else{
            $(".selected-txt.txt-b").text("");
        }
    });

    //할인구분 : 선택된 옵션 텍스트
    $($("input:checkbox[name=cb-classcode]")).on("change", function(){
        var checkedObj = "";
        var checkedLength = $("input:checkbox[name=cb-classcode]:checked").length;
        if(checkedLength > 0){
            $("input:checkbox[name=cb-classcode]:checked").each(function(index){
                if(index != 0){
                    checkedObj += ', ';
                }
                checkedObj += $(this).val();
                $(".selected-txt.txt-s").text(checkedObj);
            });
        }else{
            $(".selected-txt.txt-s").text("");
        }
    });

    //색상 : 선택된 옵션 텍스트 
    $($("input:checkbox[name=cb-colorchip]")).on("change", function(){
        var checkedObj = "";
        var checkedLength = $("input:checkbox[name=cb-colorchip]:checked").length;

        if(checkedLength > 0){
            $("input:checkbox[name=cb-colorchip]:checked").each(function(index){
                if(index != 0){
                    checkedObj += ', ';
                }
                checkedObj += $(this).val();
                $(".selected-txt.txt-c").text(checkedObj);
            });
        }else{
            $(".selected-txt.txt-c").text("");
        }
    });

    // 필터 : 선택된 옵션 텍스트
    $($(".btn-filter-layer")).on("click", function () {
        var checkedBrand = "";
        var checkedColorLength = $("input:checkbox[name=cb-brand]:checked").length;
        if (checkedColorLength > 0) {
            $("input:checkbox[name=cb-brand]:checked").each(function (index) {
                if (index != 0) {
                    checkedBrand += ', ';
                }
                checkedBrand += $(this).val();
                $(".selected-txt.txt-b").text(checkedBrand);
            });
        } else {
            $(".selected-txt.txt-b").text("");
        }
        var checkedColor = "";
        var checkedColorLength = $("input:checkbox[name=cb-colorchip]:checked").length;
        if (checkedColorLength > 0) {
            $("input:checkbox[name=cb-colorchip]:checked").each(function (index) {
                if (index != 0) {
                    checkedColor += ', ';
                }
                checkedColor += $(this).val();
                $(".selected-txt.txt-c").text(checkedColor);
            });
        } else {
            $(".selected-txt.txt-c").text("");
        }

        var checkedClass = "";
        var checkedClassLength = $("input:checkbox[name=cb-classcode]:checked").length;
        if(checkedClassLength > 0){
            $("input:checkbox[name=cb-classcode]:checked").each(function(index){
                if(index != 0){
                    checkedClass += ', ';
                }
                checkedClass += $(this).val();
                $(".selected-txt.txt-s").text(checkedClass);
            });
        }else{
            $(".selected-txt.txt-s").text("");
        }
    });
    $( "#minCost" ).keyup(function () {
        checkIsNum( "minCost" );
        var minCost = uncomma($('#minCost').val());
        if(Number(minCost) > 500000 ){
            $('#minCost').val('500,000');
        }
    });
    $( "#maxCost" ).keyup(function () {
        checkIsNum( "maxCost" );
        var maxCost = uncomma($('#maxCost').val());
        if(Number(maxCost) > 500000 ){
            $('#maxCost').val('500,000');
        }
    });
    $("#minCost").bind('keyup keydown',function(){
        this.value = comma(uncomma(this.value));
    });
    $("#maxCost").bind('keyup keydown',function(){
        this.value = comma(uncomma(this.value));
    });
    //숫자만 입력 가능.
    var checkIsNum = function (val_id) {
        var regexp = /[^0-9]/gi;
        var v = $("#" + val_id).val();
        if (regexp.test(v)) {
            $($("#" + val_id)).val(v.replace(regexp, ''));
        }
    };
}

//리스트
function searchResult(){
    //리스트 보기 토글 버튼
    $(".btn-filter").on("click", function(){
        if(!$(this).hasClass("type-other") && $(this).hasClass("post")){
            $(this).removeClass("post");
            $(this).addClass("grid");

            if($(".search-list").parents().hasClass("tab-content")){
                $(".tab-content.active .search-list").toggleClass("show");
            }else{
                $(".search-list").toggleClass("show");
            }

        }else if(!$(this).hasClass("type-other") && $(this).hasClass("grid")){
            $(this).removeClass("grid");
            $(this).addClass("post");

            if($(".search-list").parents().hasClass("tab-content")){
                $(".tab-content.active .search-list").toggleClass("show");
            }else{
                $(".search-list").toggleClass("show");
            }
        }else if($(this).hasClass("type-other")){
            if($(this).hasClass("list")){
                $(this).removeClass("list");
                $(this).addClass("post");
                if($(".search-list").parents().hasClass("tab-content")){
                    $(".tab-content.active .search-list").toggleClass("show");
                }else{
                    $(".search-list").toggleClass("show");
                }
            }else{
                $(this).addClass("list");
                $(this).removeClass("post");
                if($(".search-list").parents().hasClass("tab-content")){
                    $(".tab-content.active .search-list").toggleClass("show");
                }else{
                    $(".search-list").toggleClass("show");
                }
            }
        }
    });

    //리스트 정렬 버튼
    $(".orderby.dep01 > li").on("click", function(){
        $(".orderby.dep02 > li").each(function () {
            var txt = $(this).children().text();
            console.log($('#sortname').text() + "," + txt);
            if ($('#sortname').text() == txt) {
                $(this).addClass("on");
            } else {
                $(this).removeClass("on");
            }
        });

        if($(this).parents().hasClass("tab-content")){
            $(".tab-content.active .orderby.dep02").toggleClass("show");
            $(this).children().toggleClass("up");
        }else{
            $(".orderby.dep02").toggleClass("show");
            $(this).children().toggleClass("up");
        }
    });

    //리스트 정렬 텍스트
    $(".orderby.dep02 > li").on("click", function(){
        if($(this).parents().hasClass("tab-content")){
            $(".tab-content.active .orderby.dep02 > li").removeClass("on");
            $(this).addClass("on");
            var txt = $(this).children().text();
            $(".tab-content.active .orderby.dep02").removeClass("show");
            $(".tab-content.active .orderby.dep01 > li > a").removeClass("up");
            $(".tab-content.active .orderby.dep01 > li > a").html(txt+"<span></span>");
        }else{
            $(".orderby.dep02 > li").removeClass("on");
            $(this).addClass("on");
            var txt = $(this).children().text();
            $(".orderby.dep02").removeClass("show");
            $(".orderby.dep01 > li > a").removeClass("up");
            $(".orderby.dep01 > li > a").html(txt+"<span></span>");
        }
    });

    //사이즈리스트
    // $(".size-box > span").on("click", function(){
    //     if($(this).children().hasClass("up")){
    //         $(this).children().removeClass("up");
    //         $(this).siblings().removeClass("show");
    //     }else{
    //         $(".size-box .ico-arr").removeClass("up");
    //         $(".size-layer").removeClass("show");
    //         $(this).children().addClass("up");
    //         $(this).siblings().addClass("show");
    //     }
    //     return false;
    // });
    $(document).on("click", ".size-box > span", function(){
        // alert();
        if($(this).children().hasClass("up")){
            $(this).children().removeClass("up");
            $(this).siblings().removeClass("show");
        }else{
            $(".size-box .ico-arr").removeClass("up");
            $(".size-layer").removeClass("show");
            $(this).children().addClass("up");
            $(this).siblings().addClass("show");
        }
        return false;
    });
}

//콤마찍기
function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

//콤마풀기
function uncomma(str) {
    str = String(str);
    return str.replace(/[^\d]+/g, '');
}

function delCookie(name) {
    var expdate = new Date();
    expdate.setTime(expdate.getTime() -1200); // 10일
    document.cookie = name + "=; path=/; expires=" + expdate.toGMTString();
}
function getCookie(Name) {
    var search = Name + "=";
    if (document.cookie.length > 0) { // 쿠키가 설정되어 있다면
        var offset = document.cookie.indexOf(search);
        if (offset != -1) { // 쿠키가 존재하면
            offset += search.length;
            // set index of beginning of value
            var end = document.cookie.indexOf(";", offset);
            // 쿠키 값의 마지막 위치 인덱스 번호 설정
            if (end == -1){
                end = document.cookie.length;
            }
            return unescape(document.cookie.substring(offset, end));
        } else {
            return "";
        }
    } else {
        return "";
    }
}
function setCookie(name, value) {
    var expdate = new Date();
    expdate.setTime(expdate.getTime() + 1000 * 3600 * 24 * 10); // 10일
    document.cookie = name + "=" + escape(value) +
        "; path=/; expires=" + expdate.toGMTString();
}