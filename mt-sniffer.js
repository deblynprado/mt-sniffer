// ==UserScript==
// @name         MT Sniffer
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  A Tool for Modern Tribe
// @author       Deblyn Prado
// @match        http://*/*
// @include      https://*/*
// @downloadURL  
// @grant        none
// @require http://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==

(function(){
  'use strict';
  var $ = window.jQuery;

  if($("body[class~='tribe-theme-']")) {
    function addCss(cssString) {
      var head = document.getElementsByTagName('head')[0];
      var newCss = document.createElement('style');
      newCss.type = "text/css";
      newCss.innerHTML = cssString;
      head.appendChild(newCss);
    }

    addCss(
      '.mt-support-check { position: fixed; top: 25%; left: 0; border: none; border-radius: 4px; background: rgba(51,74,255,.95); border: 1px solid #313df5; color: #fff; padding: 11px 20px; font-family: Helvetica Neue,Helvetica,-apple-system,BlinkMacSystemFont,Roboto,Arial,sans-serif; font-size: 14px; line-height: 1.62; font-weight: 700; text-align: center; transition: background-color .2s ease; }' +
      '.mt-support-check span { color: #fff; }'
      );

      $('body').append("<a href='#' class='mt-support-check'><span>Get Support Information</span></a>");

      $('.mt-support-check').click(function(e){
        e.preventDefault();
        var msg="";
        var bp=document.getElementsByClassName('tribe-common--breakpoint-xsmall');
        var sc=document.getElementsByClassName('tribe-events-view--shortcode');
        var ed=document.getElementsByClassName('tribe-blocks-editor');
        var sng=document.getElementsByClassName('tribe-events-single');
        var bodyClasses = document.getElementsByTagName('body')[0].className;
        var res = bodyClasses.split(" ");
        var scripts = document.getElementsByTagName('script');
        var links = document.getElementsByTagName('link');
        var prods = ['WordPress','TEC V1', 'TEC V2', 'ECP','Filter Bar','ET','ET+','WooCommerce'];
        var csss = ['wp-block-library-css','tribe-events-calendar-style-css','tribe-events-views-v2-skeleton-css','tribe-events-calendar-pro-style-css','tribe-filterbar-styles-css','event-tickets-tickets-css-css','event-tickets-plus-tickets-css-css','woocommerce-general-css'];
        var caching = ['WP-Super-Cache','WP Fastest Cache','W3 Total Cache','Hummingbird','WP Rocket'];
        var prevSib=document.lastChild.previousSibling.nodeValue;
        var lastChi=document.lastChild.nodeValue;
        var i,sorc,cacher='not found',theme="couldn't identify";
        var ecsb=document.getElementsByClassName('ecs-event-list');
        var ect=document.getElementById('ect-events-list-content');

        msg = 'Single event view: ';
        if(sng.length>0){
          msg+="YES\nEditor: ";
          if(ed.length>0){
            msg+="Block";
          }
          else{
            msg+="Classic";
          }
        }
        else{
          msg+="NO\nDesign: ";
          if(bp.length>0){
            msg+='V2';
          }
          else{
            msg+='V1';
          }
        }
        msg+="\nShortcode: ";
        if(sc.length>0){
          msg+="YES";
        }
        else{
          if(ecsb.length>0){
            msg+="The Events Calendar Shortcode & Block";
          }
          else if(ect!=null) {
            msg+="The Events Calendar Shortcode and Templates Addon";
          }
          else {
            msg+="NO";
          }
        }
        msg+='\n------\n';
        for ( i=0; i < links.length; i++) {
          sorc = links[i].getAttribute("href");
          if( sorc != null ) {
            if (sorc.search('autoptimize')>0){
              console.log(sorc.substr(sorc.indexOf("=")+1));
              msg+="AUTOPTIMIZE FOUND!";
              msg+="\n------------------\n";
              break;
            }
          }
        }
        msg+="Theme: ";
        for (i=0; i < res.length; i++) {
          if(res[i].startsWith("tribe-theme-")) {
            theme= res[i].substr(12);
          }
        }
        msg+=theme;

        for(i=0;i<csss.length;i++) {
          var x=document.getElementById(csss[i]);
          if(x != null) x= x.getAttribute("href");
          msg+="\n"+prods[i]+": "
          if(x!=null){
            msg+= x.substr(x.indexOf("=")+1);
          }
          else{
            msg +='not found';
          }
        }

        msg+='\n------\nCaching:\n';

        if(prevSib!=null){
          for(i=0;i<caching.length;i++){
            if(prevSib.search(caching[i])>0){
              cacher=caching[i];
            }
          }
        }
        if(lastChi!=null) {
          for(i=0;i<caching.length;i++){
            if(lastChi.search(caching[i])>0){
              cacher=caching[i];
            }
          }
        }
        msg+=cacher;

        alert(msg);
      });

    } //ENDIF body[class^='tribe-theme-']
  })();