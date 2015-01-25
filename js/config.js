(function(root, $) {
  function Config(editor, options) {
    this.editor = editor;
    this.options = options;

    this.prepare();
  }

  Config.prototype.prepare = function() {
    this.$el = $(this.options.el);

    if(!localStorage.getItem('configs')) {
      this.setLocalStorage();
    } else {
      this.loadLocalStorage();
    }

    this.bind();
  };

  Config.prototype.bind = function() {
    this.$el.find('[data-config]').on('change', this.setConfig.bind(this));
  };

  Config.prototype.setConfig = function(e) {
    var $el = (e.target) ? $(e.target) : $(e);

    if($el[0].type === 'checkbox') {
      this.editor.setOption($el.data('config'), $el.is(':checked'));
    } else {
      if($el.data('config') === 'theme') {
        this.editor.setTheme($el.val());
      } else {
        this.editor.setOption($el.data('config'), $el.val());
      }
    }

    this.setLocalStorage();
  };

  Config.prototype.setLocalStorage = function() {
    var map = this.$el.find('[data-config]').map(this.itemsMap);

    localStorage.setItem('configs', JSON.stringify(map.toArray()));
  };

  Config.prototype.loadLocalStorage = function() {
    var configs = localStorage.getItem('configs');

    JSON.parse(configs).forEach(this.parseConfig.bind(this));
  };

  Config.prototype.parseConfig = function(e) {
    var $el = this.$el.find('[data-config="' + e.item + '"]');

    if($el[0].type === 'checkbox') {
      $el[0].checked = e.value;
    } else {
      $el.val(e.value);
    }

    this.setConfig($el);
  };

  Config.prototype.itemsMap = function(i, e) {
    var $el = $(e),
      item = $el.data('config'),
      val = ($el.val() === 'on') ? $el.is(':checked') : $el.val();

    return {item: item, value: val};
  };

  root.Config = Config;
} (window, jQuery));