;(function (root, $) {

  var defaults = {
  };

  function LibrariesManager (options) {
    this.options = _.extend({}, defaults, options);
    this.prepare();
    this.bind();
  }

  LibrariesManager.prototype.prepare = function () {
    this.elements = {};
    this.elements.$form = $(this.options.form);
  };


  LibrariesManager.prototype.bind = function () {
    this.elements.$form.on('submit', this.onSubmit.bind(this));
  };

  LibrariesManager.prototype.onSubmit = function (event) {
    var source,
        script;

    event && event.preventDefault();

    source = this.getLib();

    if (!_.isEmpty(source)) {
      script = this.createScript(source);
      this.insert(script);
    }
  };

  LibrariesManager.prototype.insert = function (script) {
    this.options.editor.insert(script);
  };

  LibrariesManager.prototype.getLib = function () {
    return this.elements.$form.find('[name="library"]').val();
  };

  LibrariesManager.prototype.createScript = function (source) {
    return '<scri' + 'pt src="'+ source +'"> </scri' + 'pt>';

  };

  root.LibrariesManager = LibrariesManager;

} (window, jQuery));
