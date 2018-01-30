$(document).ready(function(){

  function hamburgerActivator(){
    var hamElement = $('.btnMenu');
    !hamElement.hasClass('activeBurger') ? hamElement.addClass('activeBurger') : hamElement.removeClass('activeBurger')
  }
  $('.hamburger').on('click touchstart', function(eBurger){
    hamburgerActivator();
    eBurger.preventDefault();
  });

$(window).on('scroll load', function(){
  var position = $(window).scrollTop();
  $('.firstSection').css(
    'background-position-y', 0 + position*-0.5
  );
});

activeBtn(".btnMenu li a", "activeBtn");
  function activeBtn(element, classadd) {
    $(element).click(function(event) {
      $(element).removeClass(classadd);
      $(this).addClass(classadd);
      event.preventDefault();
    });
  }

  Hideexchange(".Bitcoin",".exchangeInputs.B","click");
  Hideexchange(".Ethereum",".exchangeInputs.E","click");

  function Hideexchange(element, hideel, listener){
    $(element).on(listener, function(){
      $(hideel).slideToggle("slow");
    });
  }

  var menuBtnObj =  [{"positionTo":".firstSection"},{"positionTo":".btnPlace"},{"positionTo":".header"},{"positionTo":".formContainer"}];
  $(function direct(){
    $('.btnMenu a').on('click', function(eventD){
      var position = $(this).attr('data-btn');
        $("html, body").animate({
          scrollTop: $(menuBtnObj[position].positionTo).offset().top
        }, 700);
      eventD.preventDefault();
    });
  });

  $('.Contact').on('click', function(event){
    if(!$(this).hasClass('disabled')){
      $(this).prev().removeClass('inactive');
      event.preventDefault();
    }
  });

  //https://api.coinmarketcap.com/v1/ticker/
  $.get('https://api.coinmarketcap.com/v1/ticker/?limit=2', function(data){
     var bitcoinPrice = data[0].price_usd,
         bitcoinName = data[0].name;
     var etheriumPrice = data[1].price_usd,
         etheriumName = data[1].name;

       ChangeVal('input#amountBitcoin','.B .numberResult', bitcoinPrice);
       ChangeVal('input#amountEthereum','.E .numberResult', etheriumPrice);

       function ChangeVal(inputAmount, result, Price){
         $(result).text(0);
         $(inputAmount).val(0);
           $(inputAmount).keyup(function(){
              $(result).text($(this).val()*Price);
              if(isNaN($(this).val()*Price)){
                $(result).text(0);
              }
           });
       }

      completeEx(".B .Exchange","Input#amountBitcoin", bitcoinPrice, bitcoinName);
      completeEx(".E .Exchange","Input#amountEthereum", etheriumPrice, etheriumName);

       function completeEx(button, val, cryptoPrize, cryptoName){
         $(button).on('click', function(event){
           if(!$(button).hasClass('disabled')){
             var inputVal = $(val).val();
             var result = inputVal*cryptoPrize;
             $('<div class="msgCont">\
                 <p class="msgtext">You have Exchanget '+ inputVal +' '+ cryptoName +' for '+ result +' USD</p>\
                 <button class="btn btn-primary msgBtn">OK</button>\
             </div>\
             <div class="overflow">\
             </div>').insertBefore('.mainCont');
             $('.msgBtn, .overflow').on('click', function(){
               $('.overflow').fadeOut(200, function(){
                 $(this).remove();
               });
               $('.msgCont').fadeOut(200, function(){
                 $(this).remove();
               });
             });
         }
         event.preventDefault();
         });
       }
  });
});// End document ready
