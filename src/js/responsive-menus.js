/**@license Copyright (c) 2015 Cesar Candela
* www.cssguy4hire.com 
*/

var debug = false;

$(document).ready(function () {

    ///////////////////////////////////////////////////
    //SET BREAKING POINTS                            
    ///////////////////////////////////////////////////
    
    var breakingPoints = [
        'x-small',
        'small',
        'medium',
        'large'//,
        //'x-small-landscape',
        //'small-landscape',
        //'medium-landscape',
        //'large-landscape'
    ];
    
    //create dummies for each breaking point
    for (var i=0; i<breakingPoints.length; i++) {
        
        var newTag = document.createElement('DIV');
        $(newTag).attr('id', breakingPoints[i]);
        
        $('body').append($(newTag));
    }
    
    ///////////////////////////////////////////////////
    //EXPLORER DETECTION
    ///////////////////////////////////////////////////
    if (navigator.appName.indexOf('Explorer') > -1 && (
         navigator.userAgent.indexOf('MSIE 6') > -1 || 
         navigator.userAgent.indexOf('MSIE 7') > -1 ||
         navigator.userAgent.indexOf('MSIE 8') > -1 ||
         navigator.userAgent.indexOf('MSIE 9') > -1
        )) {
        browserIE = true;
    }
    else {
        browserIE = false;
    }


    ///////////////////////////////////////////////////
    //SET RESPONSIVE USER INTERFACE ITEMS
    ///////////////////////////////////////////////////
    
    var responsiveUI = false,
        fitRM_count = 0,
        responsiveButtons = $('#responsiveButtons')
     ;
     
    // responsive menu menus
    var rmItems = [
        ['#mainMenu', 'r_mainMenu'],
        ['#headerMenu', 'r_headerMenu'],
        ['#navMenu', 'r_navMenu'],
        ['#footer #footerMenu', 'r_footerMenu'],
        ['#footer .socialNetworks', 'r_socialNetworks']
    ];
    
    showRM = null;
    
    // ENABLE/DISABLE responsiveUI elements
    setRUI = function() {
        
        //set RM and contentUI_items widths and heights on the fly
        var fitRM = function(triggerEvent) {
            
            $(responsiveMenu).css({'height' : $(rmWrapper).height()});
            
            if($(responsiveMenu).data('expanded') != true) {
                $('body').removeAttr('style');
            }
            
            if($('body').height() < $(document).height()) {
                $('body').height($(document).height());
            }
            
            if($('body').height() > $(responsiveMenu).height()){
                $(responsiveMenu).height($(document).height());
            }

            fitRM_count += 1;
                
            console_log(
                'fitRM(' + triggerEvent + ')\n' +
                'responsive menu expendad = ' + $(responsiveMenu).data('expanded') + '\n' +
                'responsiveMenu Height = ' + $(responsiveMenu).height() + '\n' +
                'rmWrapper Height = ' + $(rmWrapper).height() + '\n' +
                'body height = ' + $('body').height() + '\n' +
                'document height = ' + $(document).height() + '\n' +
                'fitting responsive menu'
            );
                
        }
        
        //check if RESPONSIVE MENU is open
        if(typeof(responsiveMenu) != 'undefined' && $(responsiveMenu).data('expanded') == true) {
            fitRM('resizeRm');
        }

        //RESPONSIVE MENU
        if($('body').css('outline-style') == 'none' && showRM != false && showRM != null) {//DETACH responsive menu ONECE
            
            showRM = false;
            
            console_log(
                'DETACH responsive menu ONECE' + '\n' +
                'showRM = ' + showRM
            );
            
            // detach  menu Icon
            if(typeof(rmmenu_Icon) != 'undefined') {
                $(rmmenu_Icon).detach();
            }
                
            // show original menus
            for (var i=0; i<rmItems.length; i++) {
                $(rmItems[i][0]).show();
            }


            // restore rmParent position if menu was open
            if($(responsiveMenu).data('expanded') == true) {
                
                console_log('CLOSING RM ON NEW MQUERY')
                
                // assure BODY NO horizontal scrolling overflow
                $('body').css({
                    'overflow-x' : 'hidden'
                });
                
                $(rmParent).transition({
                    x : 0
                },{
                    duration: rmSpeed, 
                    easing: rmEasing,
                    complete: function(){
            
                        // detach responsive menu
                        $(responsiveMenu).data('expanded', false).css({
                            'height' : '0px'
                        }).detach();
                        
                        // reset content items position (closed rmenu)
                        $('body').removeAttr('style');
                        
                    }
                });
            }
            
        }
        else if ($('body').css('outline-style') != 'none' && showRM != true) {//ATTACH responsive menu ONECE
            
            rmParent = $('#container')
            showRM = true;
            rmWidth = 220;
            rmSpeed = 400;
            rmEasing = 'ease'
            
            // RESPONSIVE MENU
            
            // hide original menus
            for (var i=0; i<rmItems.length; i++) {
                $(rmItems[i][0]).hide();
            }
            
            //create menu Icon and responsive menu
            if(typeof(rmmenu_Icon) == 'undefined') {
                
                //create Icon
                console_log(
                    'ATTACH responsive menu Icon ONECE' + '\n' +
                    'showRM = ' + showRM
                );
                
                rmmenu_Icon = document.createElement('DIV');

                $(rmmenu_Icon).attr({
                    'id' : 'rmmenu_Icon',
                    'title' : 'Menu'
                }).text('Menu').prependTo($(rmParent));
                
                //attach behavior
                $(rmmenu_Icon).on({
                    'click' : function(event) {
                        openCloseRM(null);

                        $(this).addClass('running');

                    }
                });
                
                //create responsive menu
                console_log('ATTACH responsive MENUS ONECE');
                
                responsiveMenu = document.createElement('DIV');
                rmWrapper = document.createElement('NAV');
                
                $(responsiveMenu).attr('id', 'responsiveMenu').prependTo($(rmParent));
                $(rmWrapper).attr('id', 'rmWrapper').prependTo($(responsiveMenu));
                
                $(responsiveMenu).css({
                    'right' : (-rmWidth) + 'px',
                    'width' : rmWidth + 'px'
                }).data('expanded', false);
                
                //add menu contents
                for (var i=0; i<rmItems.length; i++) {
                    
                    //duplicate and insert each menu
                    if($(rmItems[i][0]).length) {
                        $(rmItems[i][0]).hide().clone().removeAttr('id').attr('id', rmItems[i][1]).show().appendTo($(rmWrapper));
                    }
                }
                
                //show hidden menus headings
                $('h3', rmWrapper).removeClass('hide');
                
                console_log('responsive menu created');

            }
            else {
                console_log('menu Icon and responsive menu created before');
                
                //reattach responsive menu
                $(rmmenu_Icon).removeClass('running open').prependTo($(rmParent));
                $(responsiveMenu).prependTo($(rmParent));
                $(rmWrapper).prependTo($(responsiveMenu));

                
            }
            
            //open/close responsive menu
            openCloseRM = function () {
                
                var targetWidth = $(responsiveMenu).data('expanded') != true ? rmWidth : 0;
                
                $(responsiveMenu).css({
                    'height' : '100%',
                    'display':'block'
                }).data({
                    'targetWidth' : targetWidth
                });
                
                console_log(
                    'open/close rmenu\n' +
                    'targetWidth = ' + targetWidth
                );

                $(rmParent).show().transition({
                    x: -targetWidth
                },{
                    duration: rmSpeed, 
                    easing: rmEasing,
                    complete: function () {

                        //toggle rmmenu_Icon class
                        $(rmmenu_Icon).toggleClass('open');

                        //set tracking active
                        removeRunning = setTimeout(function() {

                            $(rmmenu_Icon).removeClass('running');

                            console_log('removing running class');

                            clearTimeout(removeRunning);

                        }, rmSpeed / 2 );

                        console_log(
                            'open/close rmenu FINISHED\n' +
                            'targetWidth = ' + targetWidth + '\n' + 
                            'rmWidth = ' + rmWidth
                        );

                        if(targetWidth == rmWidth) {
                            $(responsiveMenu).data('expanded', true);

                            fitRM('openedRm');
                        }
                        else {
                            $(responsiveMenu).hide().data('expanded', false);
                            
                            $('body').removeAttr('style');
                            $(responsiveMenu).css({'height' : 'auto'});
                        }

                    }
                });

            }
            
        }

    }


    ///////////////////////////////////////////////////
    //SOFT SCROLL
    ///////////////////////////////////////////////////
    function softScroll(softScrollItems) {
        
        for (var i=0; i<softScrollItems.length; i++) {
            
            if($(softScrollItems[i][0]).length) {

                $(softScrollItems[i][0]).each(function(j) {
                    
                    var scrollTrigger = $(this),
                        scrollTarget = $(this).attr('href'),
                        offsetTarget = $(scrollTarget).offset(),
                        scrollPos = (offsetTarget != null) ? offsetTarget.top : 0
                    ;
                    

                    $(scrollTrigger).on({
                        'click': function(event) {
                            event.preventDefault();
                            
                            console_log(scrollPos);
                            
                            $('html, body').animate({
                                scrollTop: scrollPos
                            }, 'slow', 'swing');
                            
                        }    
                    });
                    
                });
                
            }    
        }
    
    }
    
    var softScrollItems = [
        ['#footer #top a']
    ];
    
    softScroll(softScrollItems); 

    ///////////////////////////////////////////////////
    //SET BREAKING POINT EXPLANATION
    ///////////////////////////////////////////////////
    function set_bpExplanation(bPoint, bp_visible) {



        $('#bp_value').text(bPoint);
        
        if(bp_visible == true) {
            $('#bp_visible').text('not');
            $('#bp_output span').show();
        }
        else {
            $('#bp_visible').text('');
            $('#bp_output span').hide();
        }

    }


    ///////////////////////////////////////////////////
    //FIT ALL
    ///////////////////////////////////////////////////
    var throttleSpeed = 50,
        fitCount = 0
    ;

    function fitAll(trigger) {
            
        console_log('FIT ALL(' +  trigger + ')');
            
        //ENABLE/DISABLE responsiveUI elements
        setRUI();

        
        //set dummy classes for BreakingPoints detection
        for (var i=0; i<breakingPoints.length; i++) {
            
            if($('#' + breakingPoints[i]).css('visibility') == 'visible') {
                
                if(!$('body').hasClass(breakingPoints[i])) {
                    $('body').attr('class', '');
                    $('body').addClass(breakingPoints[i]);
                    
                    console_log('NEW dummy class [' + breakingPoints[i] + '] is visible');
                    
                
                    //reset previous opened elements if needed
                    switch (breakingPoints[i]) {
        
                        case 'large' :
                            
                            console_log('reseting with: large');

                            // set breaking point explanation
                            set_bpExplanation(breakingPoints[i], false);
                            
                        break;
        
                        case 'medium' :
                            
                            console_log('reseting with: medium');

                            // set breaking point explanation
                            set_bpExplanation(breakingPoints[i], false);
                            
                        break;
        
                        case 'small' :
                            
                            console_log('reseting with: small');

                            // set breaking point explanation
                            set_bpExplanation(breakingPoints[i], true);

                        break;
        
                        case 'x-small':

                            console_log('reseting with: x-small');

                            // set breaking point explanation
                            set_bpExplanation(breakingPoints[i], true);
                            
                        break;
                        
                    }
                    
                    
                }
                
        
        
            }
            
        }
       
        
        
        fitCount += 1;
    

        //test
        // testVars(
        //    'MATCHBODYSIZE', [
        //        'FIT ALL',
        //        'fitCount = ' + fitCount,
        //        'window width = ' + $(window).width(),
        //        'window height = ' + $(window).height(),
        //        'window innerWidth = ' + window.innerWidth,
        //        'window innerHeight = ' + window.innerHeight,
        //        'window outerWidth = ' + window.outerWidth,
        //        'window outerHeight = ' + window.outerHeight,
        //        'screen availHeight = ' + screen.availHeight,
        //        'screen availWidth = ' + screen.availWidth,
        //        'document width = ' + $(document).width(),
        //        'document height = ' + $(document).height(),
        //        'body width = ' + $('body').width(),
        //        'body height = ' + $('body').height(),
        //        'body clientWidth = ' + $('body').prop('clientWidth'),
        //        'body clientHeight = ' + $('body').prop('clientHeight'),
        //        'body STYLE = ' + $('body').attr('style')
        //    ]
        // );
        
        
    }

   
    //window events
    $(window).on({
        'load' : function(event) {
            wLoad = true;
            fitAll('wEVENT');
            
        },
        'resize' : 

            $.throttle(throttleSpeed, function (event) {
                wResize = true;
                fitAll('wEVENT');
            })
        
    });
    
    
});



///////////////////////////////////////////////////
//TEST VARS
///////////////////////////////////////////////////
    
    
//TEST (whatever)
function testVars(testing, testParams) {
    
    var outPutVars = ''
        + '<strong>' + testing + '</strong><br>'

        //TEST
        + '<strong>'
    ;
    
    for (var i=0; i<testParams.length; i++) {
        outPutVars += testParams[i] + '<br>'
    }
    
    outPutVars += '<br><strong>';
    
    if($('#testVars').length == 0) {
        $('<div/>', {'id': 'testVars'}).html(outPutVars).css({
            'left' : '0px',
            'top' : '0px',
            'color' : '#000000',
            'height' : 'auto',
            'font-size' : '11px',
            'position' : 'fixed',
            'z-index' : '1120',
            'background-color' : 'rgba(255, 255, 255, 0.8)'
        }).prependTo('body');
    }
    else {
        $('#testVars').html(outPutVars);
    }
     
};

//LOG
if (debug) {
    var console_log = console.log.bind(window.console);
}
else {
    console_log = function(){}
}
