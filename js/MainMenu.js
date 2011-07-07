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
      return $(this).toggleClass('ui-state-hover ui-state-active');
    }).click(function() {
      var level, levelName;
      $('#main-menu').dialog('close');
      universe.stop();
      levelName = $(this).text();
      level = new Level(levelName, universe);
      level.initialize(universe);
      return universe.start();
    });
  }
  MainMenu.prototype.show = function() {
    return this.dialog.dialog('open');
  };
  return MainMenu;
})();