var iImgUrl = imgUrl+'index/';
$(function(){
    $('#mySlide').edslider({
        width: '100%',
        height: 'auto',
        position: 1,
        interval: 5000,
        duration: 500,
        animation: true,
        paginator: false,
        navigator: true,
        progress: false,
        loadImgSrc: imgUrl+'load.gif',
        skin: 'edslider'
    });
})