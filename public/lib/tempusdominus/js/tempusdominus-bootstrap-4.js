se;
                this._update();
                return true;
            }

            if (typeof _minDate === 'string') {
                if (_minDate === 'now' || _minDate === 'moment') {
                    _minDate = this.getMoment();
                }
            }

            var parsedDate = this._parseInputDate(_minDate);

            if (!parsedDate.isValid()) {
                throw new TypeError('minDate() Could not parse date parameter: ' + _minDate);
            }
            if (this._options.maxDate && parsedDate.isAfter(this._options.maxDate)) {
                throw new TypeError('minDate() date parameter is after this.options.maxDate: ' + parsedDate.format(this.actualFormat));
            }
            this._options.minDate = parsedDate;
            for (var i = 0; i < this._dates.length; i++) {
                if (this._options.useCurrent && !this._options.keepInvalid && this._dates[i].isBefore(_minDate)) {
                    this._setValue(this._options.minDate, i);
                }
            }
            if (this._viewDate.isBefore(parsedDate)) {
                this._viewDate = parsedDate.clone().add(this._options.stepping, 'm');
            }
            this._update();
        };

        DateTimePicker.prototype.defaultDate = function defaultDate(_defaultDate) {
            if (arguments.length === 0) {
                return this._options.defaultDate ? this._options.defaultDate.clone() : this._options.defaultDate;
            }
            if (!_defaultDate) {
                this._options.defaultDate = false;
                return true;
            }

            if (typeof _defaultDate === 'string') {
                if (_defaultDate === 'now' || _defaultDate === 'moment') {
                    _defaultDate = this.getMoment();
                } else {
                    _defaultDate = this.getMoment(_defaultDate);
                }
            }

            var parsedDate = this._parseInputDate(_defaultDate);
            if (!parsedDate.isValid()) {
                throw new TypeError('defaultDate() Could not parse date parameter: ' + _defaultDate);
            }
            if (!this._isValid(parsedDate)) {
                throw new TypeError('defaultDate() date passed is invalid according to component setup validations');
            }

            this._options.defaultDate = parsedDate;

            if (this._options.defaultDate && this._options.inline || this.input !== undefined && this.input.val().trim() === '') {
                this._setValue(this._options.defaultDate, 0);
            }
        };

        DateTimePicker.prototype.locale = function locale(_locale) {
            if (arguments.length === 0) {
                return this._options.locale;
            }

            if (!moment.localeData(_locale)) {
                throw new TypeError('locale() locale ' + _locale + ' is not loaded from moment locales!');
            }

            this._options.locale = _locale;

            for (var i = 0; i < this._dates.length; i++) {
                this._dates[i].locale(this._options.locale);
            }
            this._viewDate.locale(this._options.locale);

            if (this.actualFormat) {
                this._initFormatting(); // reinitialize formatting
            }
            if (this.widget) {
                this.hide();
                this.show();
            }
        };

        DateTimePicker.prototype.stepping = function stepping(_stepping) {
            if (arguments.length === 0) {
                return this._options.stepping;
            }

            _stepping = parseInt(_stepping, 10);
            if (isNaN(_stepping) || _stepping < 1) {
                _stepping = 1;
            }
            this._options.stepping = _stepping;
        };

        DateTimePicker.prototype.useCurrent = function useCurrent(_useCurrent) {
            var useCurrentOptions = ['year', 'month', 'day', 'hour', 'minute'];
            if (arguments.length === 0) {
                return this._options.useCurrent;
            }

            if (typeof _useCurrent !== 'boolean' && typeof _useCurrent !== 'string') {
                throw new TypeError('useCurrent() expects a boolean or string parameter');
            }
            if (typeof _useCurrent === 'string' && useCurrentOptions.indexOf(_useCurrent.toLowerCase()) === -1) {
                throw new TypeError('useCurrent() expects a string parameter of ' + useCurrentOptions.join(', '));
            }
            this._options.useCurrent = _useCurrent;
        };

        DateTimePicker.prototype.collapse = function collapse(_collapse) {
            if (arguments.length === 0) {
                return this._options.collapse;
            }

            if (typeof _collapse !== 'boolean') {
                throw new TypeError('collapse() expects a boolean parameter');
            }
            if (this._options.collapse === _collapse) {
                return true;
            }
            this._options.collapse = _collapse;
            if (this.widget) {
                this.hide();
                this.show();
            }
        };

        DateTimePicker.prototype.icons = function icons(_icons) {
            if (arguments.length === 0) {
                return $.extend({}, this._options.icons);
            }

            if (!(_icons instanceof Object)) {
                throw new TypeError('icons() expects parameter to be an Object');
            }

            $.extend(this._options.icons, _icons);

            if (this.widget) {
                this.hide();
                this.show();
            }
        };

        DateTimePicker.prototype.tooltips = function tooltips(_tooltips) {
            if (arguments.length === 0) {
                return $.extend({}, this._options.tooltips);
            }

            if (!(_tooltips instanceof Object)) {
                throw new TypeError('tooltips() expects parameter to be an Object');
            }
            $.extend(this._options.tooltips, _tooltips);
            if (this.widget) {
                this.hide();
                this.show();
            }
        };

        DateTimePicker.prototype.useStrict = function useStrict(_useStrict) {
            if (arguments.length === 0) {
                return this._options.useStrict;
            }

            if (typeof _useStrict !== 'boolean') {
                throw new TypeError('useStrict() expects a boolean parameter');
            }
            this._options.useStrict = _useStrict;
        };

        DateTimePicker.prototype.sideBySide = function sideBySide(_sideBySide) {
            if (arguments.length === 0) {
                return this._options.sideBySide;
            }

            if (typeof _sideBySide !== 'boolean') {
                throw new TypeError('sideBySide() expects a boolean parameter');
            }
            this._options.sideBySide = _sideBySide;
            if (this.widget) {
                this.hide();
                this.show();
            }
        };

        DateTimePicker.prototype.viewMode = function viewMode(_viewMode) {
            if (arguments.length === 0) {
                return this._options.viewMode;
            }

            if (typeof _viewMode !== 'string') {
                throw new TypeError('viewMode() expects a string parameter');
            }

            if (DateTimePicker.ViewModes.indexOf(_viewMode) === -1) {
                throw new TypeError('viewMode() parameter must be one of (' + DateTimePicker.ViewModes.join(', ') + ') value');
            }

            this._options.viewMode = _viewMode;
            this.currentViewMode = Math.max(DateTimePicker.ViewModes.indexOf(_viewMode) - 1, this.MinViewModeNumber);

            this._showMode();
        };

        DateTimePicker.prototype.calendarWeeks = function calendarWeeks(_calendarWeeks) {
            if (arguments.length === 0) {
                return this._options.calendarWeeks;
            }

            if (typeof _calendarWeeks !== 'boolean') {
                throw new TypeError('calendarWeeks() expects parameter to be a boolean value');
            }

            this._options.calendarWeeks = _calendarWeeks;
            this._update();
        };

        DateTimePicker.prototype.buttons = function buttons(_buttons) {
            if (arguments.length === 0) {
                return $.extend({}, this._options.buttons);
            }

            if (!(_buttons instanceof Object)) {
                throw new TypeError('buttons() expects parameter to be an Object');
            }

            $.extend(this._options.buttons, _buttons);

            if (typeof this._options.buttons.showToday !== 'boolean') {
                throw new TypeError('buttons.showToday expects a boolean parameter');
            }
            if (typeof this._options.buttons.showClear !== 'boolean') {
                throw new TypeError('buttons.showClear expects a boolean parameter');
            }
            if (typeof this._options.buttons.showClose !== 'boolean') {
                throw new TypeError('buttons.showClose expects a boolean parameter');
            }

            if (this.widget) {
                this.hide();
                this.show();
            }
        };

        DateTimePicker.prototype.keepOpen = function keepOpen(_keepOpen) {
            if (arguments.length === 0) {
                return this._options.keepOpen;
            }

            if (typeof _keepOpen !== 'boolean') {
                throw new TypeError('keepOpen() expects a boolean parameter');
            }

            this._options.keepOpen = _keepOpen;
        };

        DateTimePicker.prototype.focusOnShow = function focusOnShow(_focusOnShow) {
            if (arguments.length === 0) {
                return this._options.focusOnShow;
            }

            if (typeof _focusOnShow !== 'boolean') {
                throw new TypeError('focusOnShow() expects a boolean parameter');
            }

            this._options.focusOnShow = _focusOnShow;
        };

        DateTimePicker.prototype.inline = function inline(_inline) {
            if (arguments.length === 0) {
                return this._options.inline;
            }

            if (typeof _inline !== 'boolean') {
                throw new TypeError('inline() expects a boolean parameter');
            }

            this._options.inline = _inline;
        };

        DateTimePicker.prototype.clear = function clear() {
            this._setValue(null); //todo
        };

        DateTimePicker.prototype.keyBinds = function keyBinds(_keyBinds) {
            if (arguments.length === 0) {
                return this._options.keyBinds;
            }

            this._options.keyBinds = _keyBinds;
        };

        DateTimePicker.prototype.debug = function debug(_debug) {
            if (typeof _debug !== 'boolean') {
                throw new TypeError('debug() expects a boolean parameter');
            }

            this._options.debug = _debug;
        };

        DateTimePicker.prototype.allowInputToggle = function allowInputToggle(_allowInputToggle) {
            if (arguments.length === 0) {
                return this._options.allowInputToggle;
            }

            if (typeof _allowInputToggle !== 'boolean') {
                throw new TypeError('allowInputToggle() expects a boolean parameter');
            }

            this._options.allowInputToggle = _allowInputToggle;
        };

        DateTimePicker.prototype.keepInvalid = function keepInvalid(_keepInvalid) {
            if (arguments.length === 0) {
                return this._options.keepInvalid;
            }

            if (typeof _keepInvalid !== 'boolean') {
                throw new TypeError('keepInvalid() expects a boolean parameter');
            }
            this._options.keepInvalid = _keepInvalid;
        };

        DateTimePicker.prototype.datepickerInput = function datepickerInput(_datepickerInput) {
            if (arguments.length === 0) {
                return this._options.datepickerInput;
            }

            if (typeof _datepickerInput !== 'string') {
                throw new TypeError('datepickerInput() expects a string parameter');
            }

            this._options.datepickerInput = _datepickerInput;
        };

        DateTimePicker.prototype.parseInputDate = function parseInputDate(_parseInputDate2) {
            if (arguments.length === 0) {
                return this._options.parseInputDate;
            }

            if (typeof _parseInputDate2 !== 'function') {
                throw new TypeError('parseInputDate() should be as function');
            }

            this._options.parseInputDate = _parseInputDate2;
        };

        DateTimePicker.prototype.disabledTimeIntervals = function disabledTimeIntervals(_disabledTimeIntervals) {
            if (arguments.length === 0) {
                return this._options.disabledTimeIntervals ? $.extend({}, this._options.disabledTimeIntervals) : this._options.disabledTimeIntervals;
            }

            if (!_disabledTimeIntervals) {
                this._options.disabledTimeIntervals = false;
                this._update();
                return true;
            }
            if (!(_disabledTimeIntervals instanceof Array)) {
                throw new TypeError('disabledTimeIntervals() expects an array parameter');
            }
            this._options.disabledTimeIntervals = _disabledTimeIntervals;
            this._update();
        };

        DateTimePicker.prototype.disabledHours = function disabledHours(hours) {
            if (arguments.length === 0) {
                return this._options.disabledHours ? $.extend({}, this._options.disabledHours) : this._options.disabledHours;
            }

            if (!hours) {
                this._options.disabledHours = false;
                this._update();
                return true;
            }
            if (!(hours instanceof Array)) {
                throw new TypeError('disabledHours() expects an array parameter');
            }
            this._options.disabledHours = this._indexGivenHours(hours);
            this._options.enabledHours = false;
            if (this._options.useCurrent && !this._options.keepInvalid) {
                for (var i = 0; i < this._dates.length; i++) {
                    var tries = 0;
                    while (!this._isValid(this._dates[i], 'h')) {
                        this._dates[i].add(1, 'h');
                        if (tries === 24) {
                            throw 'Tried 24 times to find a valid date';
                        }
                        tries++;
                    }
                    this._setValue(this._dates[i], i);
                }
            }
            this._update();
        };

        DateTimePicker.prototype.enabledHours = function enabledHours(hours) {
            if (arguments.length === 0) {
                return this._options.enabledHours ? $.extend({}, this._options.enabledHours) : this._options.enabledHours;
            }

            if (!hours) {
                this._options.enabledHours = false;
                this._update();
                return true;
            }
            if (!(hours instanceof Array)) {
                throw new TypeError('enabledHours() expects an array parameter');
            }
            this._options.enabledHours = this._indexGivenHours(hours);
            this._options.disabledHours = false;
            if (this._options.useCurrent && !this._options.keepInvalid) {
                for (var i = 0; i < this._dates.length; i++) {
                    var tries = 0;
                    while (!this._isValid(this._dates[i], 'h')) {
                        this._dates[i].add(1, 'h');
                        if (tries === 24) {
                            throw 'Tried 24 times to find a valid date';
                        }
                        tries++;
                    }
                    this._setValue(this._dates[i], i);
                }
            }
            this._update();
        };

        DateTimePicker.prototype.viewDate = function viewDate(newDate) {
            if (arguments.length === 0) {
                return this._viewDate.clone();
            }

            if (!newDate) {
                this._viewDate = (this._dates[0] || this.getMoment()).clone();
                return true;
            }

            if (typeof newDate !== 'string' && !moment.isMoment(newDate) && !(newDate instanceof Date)) {
                throw new TypeError('viewDate() parameter must be one of [string, moment or Date]');
            }

            this._viewDate = this._parseInputDate(newDate);
            this._viewUpdate();
        };

        DateTimePicker.prototype.allowMultidate = function allowMultidate(_allowMultidate) {
            if (typeof _allowMultidate !== 'boolean') {
                throw new TypeError('allowMultidate() expects a boolean parameter');
            }

            this._options.allowMultidate = _allowMultidate;
        };

        DateTimePicker.prototype.multidateSeparator = function multidateSeparator(_multidateSeparator) {
            if (arguments.length === 0) {
                return this._options.multidateSeparator;
            }

            if (typeof _multidateSeparator !== 'string' || _multidateSeparator.length > 1) {
                throw new TypeError('multidateSeparator expects a single character string parameter');
            }

            this._options.multidateSeparator = _multidateSeparator;
        };

        _createClass(DateTimePicker, null, [{
            key: 'NAME',
            get: function get() {
                return NAME;
            }

            /**
             * @return {string}
             */

        }, {
            key: 'DATA_KEY',
            get: function get() {
                return DATA_KEY;
            }

            /**
             * @return {string}
             */

        }, {
            key: 'EVENT_KEY',
            get: function get() {
                return EVENT_KEY;
            }

            /**
             * @return {string}
             */

        }, {
            key: 'DATA_API_KEY',
            get: function get() {
                return DATA_API_KEY;
            }
        }, {
            key: 'DatePickerModes',
            get: function get() {
                return DatePickerModes;
            }
        }, {
            key: 'ViewModes',
            get: function get() {
                return ViewModes;
            }
        }, {
            key: 'Event',
            get: function get() {
                return Event;
            }
        }, {
            key: 'Selector',
            get: function get() {
                return Selector;
            }
        }, {
            key: 'Default',
            get: function get() {
                return Default;
            },
            set: function set(value) {
                Default = value;
            }
        }, {
            key: 'ClassName',
            get: function get() {
                return ClassName;
            }
        }]);

        return DateTimePicker;
    }();

    return DateTimePicker;
}(jQuery, moment);

//noinspection JSUnusedGlobalSymbols
/* global DateTimePicker */
var TempusDominusBootstrap4 = function ($) {
    // eslint-disable-line no-unused-vars
    // ReSharper disable once InconsistentNaming
    var JQUERY_NO_CONFLICT = $.fn[DateTimePicker.NAME],
        verticalModes = ['top', 'bottom', 'auto'],
        horizontalModes = ['left', 'right', 'auto'],
        toolbarPlacements = ['default', 'top', 'bottom'],
        getSelectorFromElement = function getSelectorFromElement($element) {
        var selector = $element.data('target'),
            $selector = void 0;

        if (!selector) {
            selector = $element.attr('href') || '';
            selector = /^#[a-z]/i.test(selector) ? selector : null;
        }
        $selector = $(selector);
        if ($selector.length === 0) {
            return $selector;
        }

        if (!$selector.data(DateTimePicker.DATA_KEY)) {
            $.extend({}, $selector.data(), $(this).data());
        }

        return $selector;
    };

    // ReSharper disable once InconsistentNaming

    var TempusDominusBootstrap4 = function (_DateTimePicker) {
        _inherits(TempusDominusBootstrap4, _DateTimePicker);

        function TempusDominusBootstrap4(element, options) {
            _classCallCheck(this, TempusDominusBootstrap4);

            var _this = _possibleConstructorReturn(this, _DateTimePicker.call(this, element, options));

            _this._init();
            return _this;
        }

        TempusDominusBootstrap4.prototype._init = function _init() {
            if (this._element.hasClass('input-group')) {
                var datepickerButton = this._element.find('.datepickerbutton');
                if (datepickerButton.length === 0) {
                    this.component = this._element.find('[data-toggle="datetimepicker"]');
                } else {
                    this.component = datepickerButton;
                }
            }
        };

        TempusDominusBootstrap4.prototype._getDatePickerTemplate = function _getDatePickerTemplate() {
            var headTemplate = $('<thead>').append($('<tr>').append($('<th>').addClass('prev').attr('data-action', 'previous').append($('<span>').addClass(this._options.icons.previous))).append($('<th>').addClass('picker-switch').attr('data-action', 'pickerSwitch').attr('colspan', '' + (this._options.calendarWeeks ? '6' : '5'))).append($('<th>').addClass('next').attr('data-action', 'next').append($('<span>').addClass(this._options.icons.next)))),
                contTemplate = $('<tbody>').append($('<tr>').append($('<td>').attr('colspan', '' + (this._options.calendarWeeks ? '8' : '7'))));

            return [$('<div>').addClass('datepicker-days').append($('<table>').addClass('table table-sm').append(headTemplate).append($('<tbody>'))), $('<div>').addClass('datepicker-months').append($('<table>').addClass('table-condensed').append(headTemplate.clone()).append(contTemplate.clone())), $('<div>').addClass('datepicker-years').append($('<table>').addClass('table-condensed').append(headTemplate.clone()).append(contTemplate.clone())), $('<div>').addClass('datepicker-decades').append($('<table>').addClass('table-condensed').append(headTemplate.clone()).append(contTemplate.clone()))];
        };

        TempusDominusBootstrap4.prototype._getTimePickerMainTemplate = function _getTimePickerMainTemplate() {
            var topRow = $('<tr>'),
                middleRow = $('<tr>'),
                bottomRow = $('<tr>');

            if (this._isEnabled('h')) {
                topRow.append($('<td>').append($('<a>').attr({
                    href: '#',
                    tabindex: '-1',
                    'title': this._options.tooltips.incrementHour
                }).addClass('btn').attr('data-action', 'incrementHours').append($('<span>').addClass(this._options.icons.up))));
                middleRow.append($('<td>').append($('<span>').addClass('timepicker-hour').attr({
                    'data-time-component': 'hours',
                    'title': this._options.tooltips.pickHour
                }).attr('data-action', 'showHours')));
                bottomRow.append($('<td>').append($('<a>').attr({
                    href: '#',
                    tabindex: '-1',
                    'title': this._options.tooltips.decrementHour
                }).addClass('btn').attr('data-action', 'decrementHours').append($('<span>').addClass(this._options.icons.down))));
            }
            if (this._isEnabled('m')) {
                if (this._isEnabled('h')) {
                    topRow.append($('<td>').addClass('separator'));
                    middleRow.append($('<td>').addClass('separator').html(':'));
                    bottomRow.append($('<td>').addClass('separator'));
                }
                topRow.append($('<td>').append($('<a>').attr({
                    href: '#',
                    tabindex: '-1',
                    'title': this._options.tooltips.incrementMinute
                }).addClass('btn').attr('data-action', 'incrementMinutes').append($('<span>').addClass(this._options.icons.up))));
                middleRow.append($('<td>').append($('<span>').addClass('timepicker-minute').attr({
                    'data-time-component': 'minutes',
                    'title': this._options.tooltips.pickMinute
                }).attr('data-action', 'showMinutes')));
                bottomRow.append($('<td>').append($('<a>').attr({
                    href: '#',
                    tabindex: '-1',
                    'title': this._options.tooltips.decrementMinute
                }).addClass('btn').attr('data-action', 'decrementMinutes').append($('<span>').addClass(this._options.icons.down))));
            }
            if (this._isEnabled('s')) {
                if (this._isEnabled('m')) {
                    topRow.append($('<td>').addClass('separator'));
                    middleRow.append($('<td>').addClass('separator').html(':'));
                    bottomRow.append($('<td>').addClass('separator'));
                }
                topRow.append($('<td>').append($('<a>').attr({
                    href: '#',
                    tabindex: '-1',
                    'title': this._options.tooltips.incrementSecond
                }).addClass('btn').attr('data-action', 'incrementSeconds').append($('<span>').addClass(this._options.icons.up))));
                middleRow.append($('<td>').append($('<span>').addClass('timepicker-second').attr({
                    'data-time-component': 'seconds',
                    'title': this._options.tooltips.pickSecond
                }).attr('data-action', 'showSeconds')));
                bottomRow.append($('<td>').append($('<a>').attr({
                    href: '#',
                    tabindex: '-1',
                    'title': this._options.tooltips.decrementSecond
                }).addClass('btn').attr('data-action', 'decrementSeconds').append($('<span>').addClass(this._options.icons.down))));
            }

            if (!this.use24Hours) {
                topRow.append($('<td>').addClass('separator'));
                middleRow.append($('<td>').append($('<button>').addClass('btn btn-primary').attr({
                    'data-action': 'togglePeriod',
                    tabindex: '-1',
                    'title': this._options.tooltips.togglePeriod
                })));
                bottomRow.append($('<td>').addClass('separator'));
            }

            return $('<div>').addClass('timepicker-picker').append($('<table>').addClass('table-condensed').append([topRow, middleRow, bottomRow]));
        };

        TempusDominusBootstrap4.prototype._getTimePickerTemplate = function _getTimePickerTemplate() {
            var hoursView = $('<div>').addClass('timepicker-hours').append($('<table>').addClass('table-condensed')),
                minutesView = $('<div>').addClass('timepicker-minutes').append($('<table>').addClass('table-condensed')),
                secondsView = $('<div>').addClass('timepicker-seconds').append($('<table>').addClass('table-condensed')),
                ret = [this._getTimePickerMainTemplate()];

            if (this._isEnabled('h')) {
                ret.push(hoursView);
            }
            if (this._isEnabled('m')) {
                ret.push(minutesView);
            }
            if (this._isEnabled('s')) {
                ret.push(secondsView);
            }

            return ret;
        };

        TempusDominusBootstrap4.prototype._getToolbar = function _getToolbar() {
            var row = [];
            if (this._options.buttons.showToday) {
                row.push($('<td>').append($('<a>').attr({
                    href: '#',
                    tabindex: '-1',
                    'data-action': 'today',
                    'title': this._options.tooltips.today
                }).append($('<span>').addClass(this._options.icons.today))));
            }
            if (!this._options.sideBySide && this._hasDate() && this._hasTime()) {
                var title = void 0,
                    icon = void 0;
                if (this._options.viewMode === 'times') {
                    title = this._options.tooltips.selectDate;
                    icon = this._options.icons.date;
                } else {
                    title = this._options.tooltips.selectTime;
                    icon = this._options.icons.time;
                }
                row.push($('<td>').append($('<a>').attr({
                    href: '#',
                    tabindex: '-1',
                    'data-action': 'togglePicker',
                    'title': title
                }).append($('<span>').addClass(icon))));
            }
            if (this._options.buttons.showClear) {
                row.push($('<td>').append($('<a>').attr({
                    href: '#',
                    tabindex: '-1',
                    'data-action': 'clear',
                    'title': this._options.tooltips.clear
                }).append($('<span>').addClass(this._options.icons.clear))));
            }
            if (this._options.buttons.showClose) {
                row.push($('<td>').append($('<a>').attr({
                    href: '#',
                    tabindex: '-1',
                    'data-action': 'close',
                    'title': this._options.tooltips.close
                }).append($('<span>').addClass(this._options.icons.close))));
            }
            return row.length === 0 ? '' : $('<table>').addClass('table-condensed').append($('<tbody>').append($('<tr>').append(row)));
        };

        TempusDominusBootstrap4.prototype._getTemplate = function _getTemplate() {
            var template = $('<div>').addClass('bootstrap-datetimepicker-widget dropdown-menu'),
                dateView = $('<div>').addClass('datepicker').append(this._getDatePickerTemplate()),
                timeView = $('<div>').addClass('timepicker').append(this._getTimePickerTemplate()),
                content = $('<ul>').addClass('list-unstyled'),
                toolbar = $('<li>').addClass('picker-switch' + (this._options.collapse ? ' accordion-toggle' : '')).append(this._getToolbar());

            if (this._options.inline) {
                template.removeClass('dropdown-menu');
            }

            if (this.use24Hours) {
                template.addClass('usetwentyfour');
            }
            if (this._isEnabled('s') && !this.use24Hours) {
                template.addClass('wider');
            }

            if (this._options.sideBySide && this._hasDate() && this._hasTime()) {
                template.addClass('timepicker-sbs');
                if (this._options.toolbarPlacement === 'top') {
                    template.append(toolbar);
                }
                template.append($('<div>').addClass('row').append(dateView.addClass('col-md-6')).append(timeView.addClass('col-md-6')));
                if (this._options.toolbarPlacement === 'bottom' || this._options.toolbarPlacement === 'default') {
                    template.append(toolbar);
                }
                return template;
            }

            if (this._options.toolbarPlacement === 'top') {
                content.append(toolbar);
            }
            if (this._hasDate()) {
                content.append($('<li>').addClass(this._options.collapse && this._hasTime() ? 'collapse' : '').addClass(this._options.collapse && this._hasTime() && this._options.viewMode === 'times' ? '' : 'show').append(dateView));
            }
            if (this._options.toolbarPlacement === 'default') {
                content.append(toolbar);
            }
            if (this._hasTime()) {
                content.append($('<li>').addClass(this._options.collapse && this._hasDate() ? 'collapse' : '').addClass(this._options.collapse && this._hasDate() && this._options.viewMode === 'times' ? 'show' : '').append(timeView));
            }
            if (this._options.toolbarPlacement === 'bottom') {
                content.append(toolbar);
            }
            return template.append(content);
        };

        TempusDominusBootstrap4.prototype._place = function _place(e) {
            var self = e && e.data && e.data.picker || this,
                vertical = self._options.widgetPositioning.vertical,
                horizontal = self._options.widgetPositioning.horizontal,
                parent = void 0;
            var position = (self.component && self.component.length ? self.component : self._element).position(),
                offset = (self.component && self.component.length ? self.component : self._element).offset();
            if (self._options.widgetParent) {
                parent = self._options.widgetParent.append(self.widget);
            } else if (self._element.is('input')) {
                parent = self._element.after(self.widget).parent();
            } else if (self._options.inline) {
                parent = self._element.append(self.widget);
                return;
            } else {
                parent = self._element;
                self._element.children().first().after(self.widget);
            }

            // Top and bottom logic
            if (vertical === 'auto') {
                //noinspection JSValidateTypes
                if (offset.top + self.widget.height() * 1.5 >= $(window).height() + $(window).scrollTop() && self.widget.height() + self._element.outerHeight() < offset.top) {
                    vertical = 'top';
                } else {
                    vertical = 'bottom';
                }
            }

            // Left and right logic
            if (horizontal === 'auto') {
                if (parent.width() < offset.left + self.widget.outerWidth() / 2 && offset.left + self.widget.outerWidth() > $(window).width()) {
                    horizontal = 'right';
                } else {
                    horizontal = 'left';
                }
            }

            if (vertical === 'top') {
                self.widget.addClass('top').removeClass('bottom');
            } else {
                self.widget.addClass('bottom').removeClass('top');
            }

            if (horizontal === 'right') {
                self.widget.addClass('float-right');
            } else {
                self.widget.removeClass('float-right');
            }

            // find the first parent element that has a relative css positioning
            if (parent.css('position') !== 'relative') {
                parent = parent.parents().filter(function () {
                    return $(this).css('position') === 'relative';
                }).first();
            }

            if (parent.length === 0) {
                throw new Error('datetimepicker component should be placed within a relative positioned container');
            }

            self.widget.css({
                top: vertical === 'top' ? 'auto' : position.top + self._element.outerHeight() + 'px',
                bottom: vertical === 'top' ? parent.outerHeight() - (parent === self._element ? 0 : position.top) + 'px' : 'auto',
                left: horizontal === 'left' ? (parent === self._element ? 0 : position.left) + 'px' : 'auto',
                right: horizontal === 'left' ? 'auto' : parent.outerWidth() - self._element.outerWidth() - (parent === self._element ? 0 : position.left) + 'px'
            });
        };

        TempusDominusBootstrap4.prototype._fillDow = function _fillDow() {
            var row = $('<tr>'),
                currentDate = this._viewDate.clone().startOf('w').startOf('d');

            if (this._options.calendarWeeks === true) {
                row.append($('<th>').addClass('cw').text('#'));
            }

            while (currentDate.isBefore(this._viewDate.clone().endOf('w'))) {
                row.append($('<th>').addClass('dow').text(currentDate.format('dd')));
                currentDate.add(1, 'd');
            }
            this.widget.find('.datepicker-days thead').append(row);
        };

        TempusDominusBootstrap4.prototype._fillMonths = function _fillMonths() {
            var spans = [],
                monthsShort = this._viewDate.clone().startOf('y').startOf('d');
            while (monthsShort.isSame(this._viewDate, 'y')) {
                spans.push($('<span>').attr('data-action', 'selectMonth').addClass('month').text(monthsShort.format('MMM')));
                monthsShort.add(1, 'M');
            }
            this.widget.find('.datepicker-months td').empty().append(spans);
        };

        TempusDominusBootstrap4.prototype._updateMonths = function _updateMonths() {
            var monthsView = this.widget.find('.datepicker-months'),
                monthsViewHeader = monthsView.find('th'),
                months = monthsView.find('tbody').find('span'),
                self = this;

            monthsViewHeader.eq(0).find('span').attr('title', this._options.tooltips.prevYear);
            monthsViewHeader.eq(1).attr('title', this._options.tooltips.selectYear);
            monthsViewHeader.eq(2).find('span').attr('title', this._options.tooltips.nextYear);

            monthsView.find('.disabled').removeClass('disabled');

            if (!this._isValid(this._viewDate.clone().subtract(1, 'y'), 'y')) {
                monthsViewHeader.eq(0).addClass('disabled');
            }

            monthsViewHeader.eq(1).text(this._viewDate.year());

            if (!this._isValid(this._viewDate.clone().add(1, 'y'), 'y')) {
                monthsViewHeader.eq(2).addClass('disabled');
            }

            months.removeClass('active');
            if (this._getLastPickedDate().isSame(this._viewDate, 'y') && !this.unset) {
                months.eq(this._getLastPickedDate().month()).addClass('active');
            }

            months.each(function (index) {
                if (!self._isValid(self._viewDate.clone().month(index), 'M')) {
                    $(this).addClass('disabled');
                }
            });
        };

        TempusDominusBootstrap4.prototype._getStartEndYear = function _getStartEndYear(factor, year) {
            var step = factor / 10,
                startYear = Math.floor(year / factor) * factor,
                endYear = startYear + step * 9,
                focusValue = Math.floor(year / step) * step;
            return [startYear, endYear, focusValue];
        };

        TempusDominusBootstrap4.prototype._updateYears = function _updateYears() {
            var yearsView = this.widget.find('.datepicker-years'),
                yearsViewHeader = yearsView.find('th'),
                yearCaps = this._getStartEndYear(10, this._viewDate.year()),
                startYear = this._viewDate.clone().year(yearCaps[0]),
                endYear = this._viewDate.clone().year(yearCaps[1]);
            var html = '';

            yearsViewHeader.eq(0).find('span').attr('title', this._options.tooltips.prevDecade);
            yearsViewHeader.eq(1).attr('title', this._options.tooltips.selectDecade);
            yearsViewHeader.eq(2).find('span').attr('title', this._options.tooltips.nextDecade);

            yearsView.find('.disabled').removeClass('disabled');

            if (this._options.minDate && this._options.minDate.isAfter(startYear, 'y')) {
                yearsViewHeader.eq(0).addClass('disabled');
            }

            yearsViewHeader.eq(1).text(startYear.year() + '-' + endYear.year());

            if (this._options.maxDate && this._options.maxDate.isBefore(endYear, 'y')) {
                yearsViewHeader.eq(2).addClass('disabled');
            }

            html += '<span data-action="selectYear" class="year old' + (!this._isValid(startYear, 'y') ? ' disabled' : '') + '">' + (startYear.year() - 1) + '</span>';
            while (!startYear.isAfter(endYear, 'y')) {
                html += '<span data-action="selectYear" class="year' + (startYear.isSame(this._getLastPickedDate(), 'y') && !this.unset ? ' active' : '') + (!this._isValid(startYear, 'y') ? ' disabled' : '') + '">' + startYear.year() + '</span>';
                startYear.add(1, 'y');
            }
            html += '<span data-action="selectYear" class="year old' + (!this._isValid(startYear, 'y') ? ' disabled' : '') + '">' + startYear.year() + '</span>';

            yearsView.find('td').html(html);
        };

        TempusDominusBootstrap4.prototype._updateDecades = function _updateDecades() {
            var decadesView = this.widget.find('.datepicker-decades'),
                decadesViewHeader = decadesView.find('th'),
                yearCaps = this._getStartEndYear(100, this._viewDate.year()),
                startDecade = this._viewDate.clone().year(yearCaps[0]),
                endDecade = this._viewDate.clone().year(yearCaps[1]);
            var minDateDecade = false,
                maxDateDecade = false,
                endDecadeYear = void 0,
                html = '';

            decadesViewHeader.eq(0).find('span').attr('title', this._options.tooltips.prevCentury);
            decadesViewHeader.eq(2).find('span').attr('title', this._options.tooltips.nextCentury);

            decadesView.find('.disabled').removeClass('disabled');

            if (startDecade.year() === 0 || this._options.minDate && this._options.minDate.isAfter(startDecade, 'y')) {
                decadesViewHeader.eq(0).addClass('disabled');
            }

            decadesViewHeader.eq(1).text(startDecade.year() + '-' + endDecade.year());

            if (this._options.maxDate && this._options.maxDate.isBefore(endDecade, 'y')) {
                decadesViewHeader.eq(2).addClass('disabled');
            }

            if (startDecade.year() - 10 < 0) {
                html += '<span>&nbsp;</span>';
            } else {
                html += '<span data-action="selectDecade" class="decade old" data-selection="' + (startDecade.year() + 6) + '">' + (startDecade.year() - 10) + '</span>';
            }

            while (!startDecade.isAfter(endDecade, 'y')) {
                endDecadeYear = startDecade.year() + 11;
                minDateDecade = this._options.minDate && this._options.minDate.isAfter(startDecade, 'y') && this._options.minDate.year() <= endDecadeYear;
                maxDateDecade = this._options.maxDate && this._options.maxDate.isAfter(startDecade, 'y') && this._options.maxDate.year() <= endDecadeYear;
                html += '<span data-action="selectDecade" class="decade' + (this._getLastPickedDate().isAfter(startDecade) && this._getLastPickedDate().year() <= endDecadeYear ? ' active' : '') + (!this._isValid(startDecade, 'y') && !minDateDecade && !maxDateDecade ? ' disabled' : '') + '" data-selection="' + (startDecade.year() + 6) + '">' + startDecade.year() + '</span>';
                startDecade.add(10, 'y');
            }
            html += '<span data-action="selectDecade" class="decade old" data-selection="' + (startDecade.year() + 6) + '">' + startDecade.year() + '</span>';

            decadesView.find('td').html(html);
        };

        TempusDominusBootstrap4.prototype._fillDate = function _fillDate() {
            var daysView = this.widget.find('.datepicker-days'),
                daysViewHeader = daysView.find('th'),
                html = [];
            var currentDate = void 0,
                row = void 0,
                clsName = void 0,
                i = void 0;

            if (!this._hasDate()) {
                return;
            }

            daysViewHeader.eq(0).find('span').attr('title', this._options.tooltips.prevMonth);
            daysViewHeader.eq(1).attr('title', this._options.tooltips.selectMonth);
            daysViewHeader.eq(2).find('span').attr('title', this._options.tooltips.nextMonth);

            daysView.find('.disabled').removeClass('disabled');
            daysViewHeader.eq(1).text(this._viewDate.format(this._options.dayViewHeaderFormat));

            if (!this._isValid(this._viewDate.clone().subtract(1, 'M'), 'M')) {
                daysViewHeader.eq(0).addClass('disabled');
            }
            if (!this._isValid(this._viewDate.clone().add(1, 'M'), 'M')) {
                daysViewHeader.eq(2).addClass('disabled');
            }

            currentDate = this._viewDate.clone().startOf('M').startOf('w').startOf('d');

            for (i = 0; i < 42; i++) {
                //always display 42 days (should show 6 weeks)
                if (currentDate.weekday() === 0) {
                    row = $('<tr>');
                    if (this._options.calendarWeeks) {
                        row.append('<td class="cw">' + currentDate.week() + '</td>');
                    }
                    html.push(row);
                }
                clsName = '';
                if (currentDate.isBefore(this._viewDate, 'M')) {
                    clsName += ' old';
                }
                if (currentDate.isAfter(this._viewDate, 'M')) {
                    clsName += ' new';
                }
                if (this._options.allowMultidate) {
                    var index = this._datesFormatted.indexOf(currentDate.format('YYYY-MM-DD'));
                    if (index !== -1) {
                        if (currentDate.isSame(this._datesFormatted[index], 'd') && !this.unset) {
                            clsName += ' active';
                        }
                    }
                } else {
                    if (currentDate.isSame(this._getLastPickedDate(), 'd') && !this.unset) {
                        clsName += ' active';
                    }
                }
                if (!this._isValid(currentDate, 'd')) {
                    clsName += ' disabled';
                }
                if (currentDate.isSame(this.getMoment(), 'd')) {
                    clsName += ' today';
                }
                if (currentDate.day() === 0 || currentDate.day() === 6) {
                    clsName += ' weekend';
                }
                row.append('<td data-action="selectDay" data-day="' + currentDate.format('L') + '" class="day' + clsName + '">' + currentDate.date() + '</td>');
                currentDate.add(1, 'd');
            }

            daysView.find('tbody').empty().append(html);

            this._updateMonths();

            this._updateYears();

            this._updateDecades();
        };

        TempusDominusBootstrap4.prototype._fillHours = function _fillHours() {
            var table = this.widget.find('.timepicker-hours table'),
                currentHour = this._viewDate.clone().startOf('d'),
                html = [];
            var row = $('<tr>');

            if (this._viewDate.hour() > 11 && !this.use24Hours) {
                currentHour.hour(12);
            }
            while (currentHour.isSame(this._viewDate, 'd') && (this.use24Hours || this._viewDate.hour() < 12 && currentHour.hour() < 12 || this._viewDate.hour() > 11)) {
                if (currentHour.hour() % 4 === 0) {
                    row = $('<tr>');
                    html.push(row);
                }
                row.append('<td data-action="selectHour" class="hour' + (!this._isValid(currentHour, 'h') ? ' disabled' : '') + '">' + currentHour.format(this.use24Hours ? 'HH' : 'hh') + '</td>');
                currentHour.add(1, 'h');
            }
            table.empty().append(html);
        };

        TempusDominusBootstrap4.prototype._fillMinutes = function _fillMinutes() {
            var table = this.widget.find('.timepicker-minutes table'),
                currentMinute = this._viewDate.clone().startOf('h'),
                html = [],
                step = this._options.stepping === 1 ? 5 : this._options.stepping;
            var row = $('<tr>');

            while (this._viewDate.isSame(currentMinute, 'h')) {
                if (currentMinute.minute() % (step * 4) === 0) {
                    row = $('<tr>');
                    html.push(row);
                }
                row.append('<td data-action="selectMinute" class="minute' + (!this._isValid(currentMinute, 'm') ? ' disabled' : '') + '">' + currentMinute.format('mm') + '</td>');
                currentMinute.add(step, 'm');
            }
            table.empty().append(html);
        };

        TempusDominusBootstrap4.prototype._fillSeconds = function _fillSeconds() {
            var table = this.widget.find('.timepicker-seconds table'),
                currentSecond = this._viewDate.clone().startOf('m'),
                html = [];
            var row = $('<tr>');

            while (this._viewDate.isSame(currentSecond, 'm')) {
                if (currentSecond.second() % 20 === 0) {
                    row = $('<tr>');
                    html.push(row);
                }
                row.append('<td data-action="selectSecond" class="second' + (!this._isValid(currentSecond, 's') ? ' disabled' : '') + '">' + currentSecond.format('ss') + '</td>');
                currentSecond.add(5, 's');
            }

            table.empty().append(html);
        };

        TempusDominusBootstrap4.prototype._fillTime = function _fillTime() {
            var toggle = void 0,
                newDate = void 0;
            var timeComponents = this.widget.find('.timepicker span[data-time-component]');

            if (!this.use24Hours) {
                toggle = this.widget.find('.timepicker [data-action=togglePeriod]');
                newDate = this._getLastPickedDate().clone().add(this._getLastPickedDate().hours() >= 12 ? -12 : 12, 'h');

                toggle.text(this._getLastPickedDate().format('A'));

                if (this._isValid(newDate, 'h')) {
                    toggle.removeClass('disabled');
                } else {
                    toggle.addClass('disabled');
                }
            }
            timeComponents.filter('[data-time-component=hours]').text(this._getLastPickedDate().format('' + (this.use24Hours ? 'HH' : 'hh')));
            timeComponents.filter('[data-time-component=minutes]').text(this._getLastPickedDate().format('mm'));
            timeComponents.filter('[data-time-component=seconds]').text(this._getLastPickedDate().format('ss'));

            this._fillHours();
            this._fillMinutes();
            this._fillSeconds();
        };

        TempusDominusBootstrap4.prototype._doAction = function _doAction(e, action) {
            var lastPicked = this._getLastPickedDate();
            if ($(e.currentTarget).is('.disabled')) {
                return false;
            }
            action = action || $(e.currentTarget).data('action');
            switch (action) {
                case 'next':
                    {
                        var navFnc = DateTimePicker.DatePickerModes[this.currentViewMode].NAV_FUNCTION;
                        this._viewDate.add(DateTimePicker.DatePickerModes[this.currentViewMode].NAV_STEP, navFnc);
                        this._fillDate();
                        this._viewUpdate(navFnc);
                        break;
                    }
                case 'previous':
                    {
                        var _navFnc = DateTimePicker.DatePickerModes[this.currentViewMode].NAV_FUNCTION;
                        this._viewDate.subtract(DateTimePicker.DatePickerModes[this.currentViewMode].NAV_STEP, _navFnc);
                        this._fillDate();
                        this._viewUpdate(_navFnc);
                        break;
                    }
                case 'pickerSwitch':
                    this._showMode(1);
                    break;
                case 'selectMonth':
                    {
                        var month = $(e.target).closest('tbody').find('span').index($(e.target));
                        this._viewDate.month(month);
                        if (this.currentViewMode === this.MinViewModeNumber) {
                            this._setValue(lastPicked.clone().year(this._viewDate.year()).month(this._viewDate.month()), this._getLastPickedDateIndex());
                            if (!this._options.inline) {
                                this.hide();
                            }
                        } else {
                            this._showMode(-1);
                            this._fillDate();
                        }
                        this._viewUpdate('M');
                        break;
                    }
                case 'selectYear':
                    {
                        var year = parseInt($(e.target).text(), 10) || 0;
                        this._viewDate.year(year);
                        if (this.currentViewMode === this.MinViewModeNumber) {
                            this._setValue(lastPicked.clone().year(this._viewDate.year()), this._getLastPickedDateIndex());
                            if (!this._options.inline) {
                                this.hide();
                            }
                        } else {
                            this._showMode(-1);
                            this._fillDate();
                        }
                        this._viewUpdate('YYYY');
                        break;
                    }
                case 'selectDecade':
                    {
                        var _year = parseInt($(e.target).data('selection'), 10) || 0;
                        this._viewDate.year(_year);
                        if (this.currentViewMode === this.MinViewModeNumber) {
                            this._setValue(lastPicked.clone().year(this._viewDate.year()), this._getLastPickedDateIndex());
                            if (!this._options.inline) {
                                this.hide();
                            }
                        } else {
                            this._showMode(-1);
                            this._fillDate();
                        }
                        this._viewUpdate('YYYY');
                        break;
                    }
                case 'selectDay':
                    {
                        var day = this._viewDate.clone();
                        if ($(e.target).is('.old')) {
                            day.subtract(1, 'M');
                        }
                        if ($(e.target).is('.new')) {
                            day.add(1, 'M');
                        }

                        var selectDate = day.date(parseInt($(e.target).text(), 10)),
                            index = 0;
                        if (this._options.allowMultidate) {
                            index = this._datesFormatted.indexOf(selectDate.format('YYYY-MM-DD'));
                            if (index !== -1) {
                                this._setValue(null, index); //deselect multidate
                            } else {
                                this._setValue(selectDate, this._getLastPickedDateIndex() + 1);
                            }
                        } else {
                            this._setValue(selectDate, this._getLastPickedDateIndex());
                        }

                        if (!this._hasTime() && !this._options.keepOpen && !this._options.inline && !this._options.allowMultidate) {
                            this.hide();
                        }
                        break;
                    }
                case 'incrementHours':
                    {
                        var newDate = lastPicked.clone().add(1, 'h');
                        if (this._isValid(newDate, 'h')) {
                            this._setValue(newDate, this._getLastPickedDateIndex());
                        }
                        break;
                    }
                case 'incrementMinutes':
                    {
                        var _newDate = lastPicked.clone().add(this._options.stepping, 'm');
                        if (this._isValid(_newDate, 'm')) {
                            this._setValue(_newDate, this._getLastPickedDateIndex());
                        }
                        break;
                    }
                case 'incrementSeconds':
                    {
                        var _newDate2 = lastPicked.clone().add(1, 's');
                        if (this._isValid(_newDate2, 's')) {
                            this._setValue(_newDate2, this._getLastPickedDateIndex());
                        }
                        break;
                    }
                case 'decrementHours':
                    {
                        var _newDate3 = lastPicked.clone().subtract(1, 'h');
                        if (this._isValid(_newDate3, 'h')) {
                            this._setValue(_newDate3, this._getLastPickedDateIndex());
                        }
                        break;
                    }
                case 'decrementMinutes':
                    {
                        var _newDate4 = lastPicked.clone().subtract(this._options.stepping, 'm');
                        if (this._isValid(_newDate4, 'm')) {
                            this._setValue(_newDate4, this._getLastPickedDateIndex());
                        }
                        break;
                    }
                case 'decrementSeconds':
                    {
                        var _newDate5 = lastPicked.clone().subtract(1, 's');
                        if (this._isValid(_newDate5, 's')) {
                            this._setValue(_newDate5, this._getLastPickedDateIndex());
                        }
                        break;
                    }
                case 'togglePeriod':
                    {
                        this._setValue(lastPicked.clone().add(lastPicked.hours() >= 12 ? -12 : 12, 'h'), this._getLastPickedDateIndex());
                        break;
                    }
                case 'togglePicker':
                    {
                        var $this = $(e.target),
                            $link = $this.closest('a'),
                            $parent = $this.closest('ul'),
                            expanded = $parent.find('.show'),
                            closed = $parent.find('.collapse:not(.show)'),
                            $span = $this.is('span') ? $this : $this.find('span');
                        var collapseData = void 0;

                        if (expanded && expanded.length) {
                            collapseData = expanded.data('collapse');
                            if (collapseData && collapseData.transitioning) {
                                return true;
                            }
                            if (expanded.collapse) {
                                // if collapse plugin is available through bootstrap.js then use it
                                expanded.collapse('hide');
                                closed.collapse('show');
                            } else {
                                // otherwise just toggle in class on the two views
                                expanded.removeClass('show');
                                closed.addClass('show');
                            }
                            $span.toggleClass(this._options.icons.time + ' ' + this._options.icons.date);

                            if ($span.hasClass(this._options.icons.date)) {
                                $link.attr('title', this._options.tooltips.selectDate);
                            } else {
                                $link.attr('title', this._options.tooltips.selectTime);
                            }
                        }
                    }
                    break;
                case 'showPicker':
                    this.widget.find('.timepicker > div:not(.timepicker-picker)').hide();
                    this.widget.find('.timepicker .timepicker-picker').show();
                    break;
                case 'showHours':
                    this.widget.find('.timepicker .timepicker-picker').hide();
                    this.widget.find('.timepicker .timepicker-hours').show();
                    break;
                case 'showMinutes':
                    this.widget.find('.timepicker .timepicker-picker').hide();
                    this.widget.find('.timepicker .timepicker-minutes').show();
                    break;
                case 'showSeconds':
                    this.widget.find('.timepicker .timepicker-picker').hide();
                    this.widget.find('.timepicker .timepicker-seconds').show();
                    break;
                case 'selectHour':
                    {
                        var hour = parseInt($(e.target).text(), 10);

                        if (!this.use24Hours) {
                            if (lastPicked.hours() >= 12) {
                                if (hour !== 12) {
                                    hour += 12;
                                }
                            } else {
                                if (hour === 12) {
                                    hour = 0;
                                }
                            }
                        }
                        this._setValue(lastPicked.clone().hours(hour), this._getLastPickedDateIndex());
                        if (!this._isEnabled('a') && !this._isEnabled('m') && !this._options.keepOpen && !this._options.inline) {
                            this.hide();
                        } else {
                            this._doAction(e, 'showPicker');
                        }
                        break;
                    }
                case 'selectMinute':
                    this._setValue(lastPicked.clone().minutes(parseInt($(e.target).text(), 10)), this._getLastPickedDateIndex());
                    if (!this._isEnabled('a') && !this._isEnabled('s') && !this._options.keepOpen && !this._options.inline) {
                        this.hide();
                    } else {
                        this._doAction(e, 'showPicker');
                    }
                    break;
                case 'selectSecond':
                    this._setValue(lastPicked.clone().seconds(parseInt($(e.target).text(), 10)), this._getLastPickedDateIndex());
                    if (!this._isEnabled('a') && !this._options.keepOpen && !this._options.inline) {
                        this.hide();
                    } else {
                        this._doAction(e, 'showPicker');
                    }
                    break;
                case 'clear':
                    this.clear();
                    break;
                case 'close':
                    this.hide();
                    break;
                case 'today':
                    {
                        var todaysDate = this.getMoment();
                        if (this._isValid(todaysDate, 'd')) {
                            this._setValue(todaysDate, this._getLastPickedDateIndex());
                        }
                        break;
                    }
            }
            return false;
        };

        //public


        TempusDominusBootstrap4.prototype.hide = function hide() {
            var transitioning = false;
            if (!this.widget) {
                return;
            }
            // Ignore event if in the middle of a picker transition
            this.widget.find('.collapse').each(function () {
                var collapseData = $(this).data('collapse');
                if (collapseData && collapseData.transitioning) {
                    transitioning = true;
                    return false;
                }
                return true;
            });
            if (transitioning) {
                return;
            }
            if (this.component && this.component.hasClass('btn')) {
                this.component.toggleClass('active');
            }
            this.widget.hide();

            $(window).off('resize', this._place());
            this.widget.off('click', '[data-action]');
            this.widget.off('mousedown', false);

            this.widget.remove();
            this.widget = false;

            this._notifyEvent({
                type: DateTimePicker.Event.HIDE,
                date: this._getLastPickedDate().clone()
            });

            if (this.input !== undefined) {
                this.input.blur();
            }

            this._viewDate = this._getLastPickedDate().clone();
        };

        TempusDominusBootstrap4.prototype.show = function show() {
            var currentMoment = void 0;
            var useCurrentGranularity = {
                'year': function year(m) {
                    return m.month(0).date(1).hours(0).seconds(0).minutes(0);
                },
                'month': function month(m) {
                    return m.date(1).hours(0).seconds(0).minutes(0);
                },
                'day': function day(m) {
                    return m.hours(0).seconds(0).minutes(0);
                },
                'hour': function hour(m) {
                    return m.seconds(0).minutes(0);
                },
                'minute': function minute(m) {
                    return m.seconds(0);
                }
            };

            if (this.input !== undefined) {
                if (this.input.prop('disabled') || !this._options.ignoreReadonly && this.input.prop('readonly') || this.widget) {
                    return;
                }
                if (this.input.val() !== undefined && this.input.val().trim().length !== 0) {
                    this._setValue(this._parseInputDate(this.input.val().trim()), 0);
                } else if (this.unset && this._options.useCurrent) {
                    currentMoment = this.getMoment();
                    if (typeof this._options.useCurrent === 'string') {
                        currentMoment = useCurrentGranularity[this._options.useCurrent](currentMoment);
                    }
                    this._setValue(currentMoment, 0);
                }
            } else if (this.unset && this._options.useCurrent) {
                currentMoment = this.getMoment();
                if (typeof this._options.useCurrent === 'string') {
                    currentMoment = useCurrentGranularity[this._options.useCurrent](currentMoment);
                }
                this._setValue(currentMoment, 0);
            }

            this.widget = this._getTemplate();

            this._fillDow();
            this._fillMonths();

            this.widget.find('.timepicker-hours').hide();
            this.widget.find('.timepicker-minutes').hide();
            this.widget.find('.timepicker-seconds').hide();

            this._update();
            this._showMode();

            $(window).on('resize', { picker: this }, this._place);
            this.widget.on('click', '[data-action]', $.proxy(this._doAction, this)); // this handles clicks on the widget
            this.widget.on('mousedown', false);

            if (this.component && this.component.hasClass('btn')) {
                this.component.toggleClass('active');
            }
            this._place();
            this.widget.show();
            if (this.input !== undefined && this._options.focusOnShow && !this.input.is(':focus')) {
                this.input.focus();
            }

            this._notifyEvent({
                type: DateTimePicker.Event.SHOW
            });
        };

        TempusDominusBootstrap4.prototype.destroy = function destroy() {
            this.hide();
            //todo doc off?
            this._element.removeData(DateTimePicker.DATA_KEY);
            this._element.removeData('date');
        };

        TempusDominusBootstrap4.prototype.disable = function disable() {
            this.hide();
            if (this.component && this.component.hasClass('btn')) {
                this.component.addClass('disabled');
            }
            if (this.input !== undefined) {
                this.input.prop('disabled', true); //todo disable this/comp if input is null
            }
        };

        TempusDominusBootstrap4.prototype.enable = function enable() {
            if (this.component && this.component.hasClass('btn')) {
                this.component.removeClass('disabled');
            }
            if (this.input !== undefined) {
                this.input.prop('disabled', false); //todo enable comp/this if input is null
            }
        };

        TempusDominusBootstrap4.prototype.toolbarPlacement = function toolbarPlacement(_toolbarPlacement) {
            if (arguments.length === 0) {
                return this._options.toolbarPlacement;
            }

            if (typeof _toolbarPlacement !== 'string') {
                throw new TypeError('toolbarPlacement() expects a string parameter');
            }
            if (toolbarPlacements.indexOf(_toolbarPlacement) === -1) {
                throw new TypeError('toolbarPlacement() parameter must be one of (' + toolbarPlacements.join(', ') + ') value');
            }
            this._options.toolbarPlacement = _toolbarPlacement;

            if (this.widget) {
                this.hide();
                this.show();
            }
        };

        TempusDominusBootstrap4.prototype.widgetPositioning = function widgetPositioning(_widgetPositioning) {
            if (arguments.length === 0) {
                return $.extend({}, this._options.widgetPositioning);
            }

            if ({}.toString.call(_widgetPositioning) !== '[object Object]') {
                throw new TypeError('widgetPositioning() expects an object variable');
            }
            if (_widgetPositioning.horizontal) {
                if (typeof _widgetPositioning.horizontal !== 'string') {
                    throw new TypeError('widgetPositioning() horizontal variable must be a string');
                }
                _widgetPositioning.horizontal = _widgetPositioning.horizontal.toLowerCase();
                if (horizontalModes.indexOf(_widgetPositioning.horizontal) === -1) {
                    throw new TypeError('widgetPositioning() expects horizontal parameter to be one of (' + horizontalModes.join(', ') + ')');
                }
                this._options.widgetPositioning.horizontal = _widgetPositioning.horizontal;
            }
            if (_widgetPositioning.vertical) {
                if (typeof _widgetPositioning.vertical !== 'string') {
                    throw new TypeError('widgetPositioning() vertical variable must be a string');
                }
                _widgetPositioning.vertical = _widgetPositioning.vertical.toLowerCase();
                if (verticalModes.indexOf(_widgetPositioning.vertical) === -1) {
                    throw new TypeError('widgetPositioning() expects vertical parameter to be one of (' + verticalModes.join(', ') + ')');
                }
                this._options.widgetPositioning.vertical = _widgetPositioning.vertical;
            }
            this._update();
        };

        TempusDominusBootstrap4.prototype.widgetParent = function widgetParent(_widgetParent) {
            if (arguments.length === 0) {
                return this._options.widgetParent;
            }

            if (typeof _widgetParent === 'string') {
                _widgetParent = $(_widgetParent);
            }

            if (_widgetParent !== null && typeof _widgetParent !== 'string' && !(_widgetParent instanceof $)) {
                throw new TypeError('widgetParent() expects a string or a jQuery object parameter');
            }

            this._options.widgetParent = _widgetParent;
            if (this.widget) {
                this.hide();
                this.show();
            }
        };

        //static


        TempusDominusBootstrap4._jQueryHandleThis = function _jQueryHandleThis(me, option, argument) {
            var data = $(me).data(DateTimePicker.DATA_KEY);
            if ((typeof option === 'undefined' ? 'undefined' : _typeof(option)) === 'object') {
                $.extend({}, DateTimePicker.Default, option);
            }

            if (!data) {
                data = new TempusDominusBootstrap4($(me), option);
                $(me).data(DateTimePicker.DATA_KEY, data);
            }

            if (typeof option === 'string') {
                if (data[option] === undefined) {
                    throw new Error('No method named "' + option + '"');
                }
                if (argument === undefined) {
                    return data[option]();
                } else {
                    return data[option](argument);
                }
            }
        };

        TempusDominusBootstrap4._jQueryInterface = function _jQueryInterface(option, argument) {
            if (this.length === 1) {
                return TempusDominusBootstrap4._jQueryHandleThis(this[0], option, argument);
            }
            return this.each(function () {
                TempusDominusBootstrap4._jQueryHandleThis(this, option, argument);
            });
        };

        return TempusDominusBootstrap4;
    }(DateTimePicker);

    /**
    * ------------------------------------------------------------------------
    * jQuery
    * ------------------------------------------------------------------------
    */


    $(document).on(DateTimePicker.Event.CLICK_DATA_API, DateTimePicker.Selector.DATA_TOGGLE, function () {
        var $target = getSelectorFromElement($(this));
        if ($target.length === 0) {
            return;
        }
        TempusDominusBootstrap4._jQueryInterface.call($target, 'toggle');
    }).on(DateTimePicker.Event.CHANGE, '.' + DateTimePicker.ClassName.INPUT, function (event) {
        var $target = getSelectorFromElement($(this));
        if ($target.length === 0) {
            return;
        }
        TempusDominusBootstrap4._jQueryInterface.call($target, '_change', event);
    }).on(DateTimePicker.Event.BLUR, '.' + DateTimePicker.ClassName.INPUT, function (event) {
        var $target = getSelectorFromElement($(this)),
            config = $target.data(DateTimePicker.DATA_KEY);
        if ($target.length === 0) {
            return;
        }
        if (config._options.debug || window.debug) {
            return;
        }
        TempusDominusBootstrap4._jQueryInterface.call($target, 'hide', event);
    }).on(DateTimePicker.Event.KEYDOWN, '.' + DateTimePicker.ClassName.INPUT, function (event) {
        var $target = getSelectorFromElement($(this));
        if ($target.length === 0) {
            return;
        }
        TempusDominusBootstrap4._jQueryInterface.call($target, '_keydown', event);
    }).on(DateTimePicker.Event.KEYUP, '.' + DateTimePicker.ClassName.INPUT, function (event) {
        var $target = getSelectorFromElement($(this));
        if ($target.length === 0) {
            return;
        }
        TempusDominusBootstrap4._jQueryInterface.call($target, '_keyup', event);
    }).on(DateTimePicker.Event.FOCUS, '.' + DateTimePicker.ClassName.INPUT, function (event) {
        var $target = getSelectorFromElement($(this)),
            config = $target.data(DateTimePicker.DATA_KEY);
        if ($target.length === 0) {
            return;
        }
        if (!config._options.allowInputToggle) {
            return;
        }
        TempusDominusBootstrap4._jQueryInterface.call($target, 'show', event);
    });

    $.fn[DateTimePicker.NAME] = TempusDominusBootstrap4._jQueryInterface;
    $.fn[DateTimePicker.NAME].Constructor = TempusDominusBootstrap4;
    $.fn[DateTimePicker.NAME].noConflict = function () {
        $.fn[DateTimePicker.NAME] = JQUERY_NO_CONFLICT;
        return TempusDominusBootstrap4._jQueryInterface;
    };

    return TempusDominusBootstrap4;
}(jQuery);

}();
