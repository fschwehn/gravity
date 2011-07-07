var MainMenu;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
MainMenu = (function() {
  function MainMenu() {
    $('#but-main-menu').button({
      icons: {
        primary: 'ui-icon-circle-arrow-s'
      }
    }).click(__bind(function() {
      return this.show();
    }, this));
    this.dialog = $('#main-menu');
    this.dialog.dialog({
      title: 'choose a level'
    });
    this.dialog.find('li').hover(function() {
      return $(this).addClass('ui-state-hover').removeClass('ui-state-active');
    }, function() {
      return $(this).addClass('ui-state-active').removeClass('ui-state-hover');
    }).click(function() {
      $('#main-menu').dialog('close');
      return universe.setLevel(new Level($(this).text(), function() {
        return universe.start();
      }));
    });
  }
  MainMenu.prototype.show = function() {
    return this.dialog.dialog('open');
  };
  return MainMenu;
})();