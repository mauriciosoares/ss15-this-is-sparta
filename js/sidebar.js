;(function (root, $) {

  var defaults = {
    users: 0
  };

  function Sidebar (options) {
    this.options = _.extend({}, defaults, options);
    this.prepare();
    this.bind();
  }

  Sidebar.prototype.prepare = function () {
    this.elements = {};
    this.elements.$openers = $(this.options.openers);
    this.elements.$content = $(this.options.content);
    this.elements.$close = $(this.options.close);
    this.elements.$body = $('body');
    this.elements.$html = $('html');
  };

  Sidebar.prototype.bind = function () {
    this.elements.$openers.on('click', this.onClick.bind(this));
    this.elements.$close.on('click', this.hideContent.bind(this));
  };

  Sidebar.prototype.bindClose = function () {
    this.elements.$html.on('keyup', this.onKeyup.bind(this));
  };

  Sidebar.prototype.onKeyup = function (event) {
    if (event.keyCode === 27) {
      this.hideContent();
      this.elements.$html.off('keyup');
    }
  };

  Sidebar.prototype.onClick = function (event) {
    var $item,
        content;

    event && event.preventDefault();

    $item = $(event.target).closest('a'),
      content = this.getContent($item);

    this.hideContent();

    $item.toggleClass('is-active');

    this.showContent(content);
  };

  Sidebar.prototype.getContent = function ($item) {
    return $item.data('content-opener');
  };

  Sidebar.prototype.showContent = function (content) {
    this.elements.$body.addClass(this.options.visibleClass);
    this.elements.$content.find('[data-content="'+ content +'"]').addClass('is-visible');
    this.bindClose();
  };

  Sidebar.prototype.hideContent = function () {
    this.elements.$body.removeClass(this.options.visibleClass);
    this.elements.$content.find('[data-content]').removeClass('is-visible');
    this.elements.$openers.removeClass('is-active');
  };

  root.Sidebar = Sidebar;

} (window, jQuery));
