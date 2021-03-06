'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSameDay = isSameDay;
exports.isSameUtcOffset = isSameUtcOffset;
exports.isDayInRange = isDayInRange;
exports.isDayDisabled = isDayDisabled;
exports.allDaysDisabledBefore = allDaysDisabledBefore;
exports.allDaysDisabledAfter = allDaysDisabledAfter;
exports.getEffectiveMinDate = getEffectiveMinDate;
exports.getEffectiveMaxDate = getEffectiveMaxDate;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isSameDay(moment1, moment2) {
  if (moment1 && moment2) {
    return moment1.isSame(moment2, 'day');
  } else {
    return !moment1 && !moment2;
  }
}

function isSameUtcOffset(moment1, moment2) {
  if (moment1 && moment2) {
    return moment1.utcOffset() === moment2.utcOffset();
  } else {
    return !moment1 && !moment2;
  }
}

function isDayInRange(day, startDate, endDate) {
  var before = startDate.clone().startOf('day').subtract(1, 'seconds');
  var after = endDate.clone().startOf('day').add(1, 'seconds');
  return day.clone().startOf('day').isBetween(before, after);
}

function isDayDisabled(day) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      minDate = _ref.minDate,
      maxDate = _ref.maxDate,
      excludeDates = _ref.excludeDates,
      includeDates = _ref.includeDates,
      filterDate = _ref.filterDate;

  return minDate && day.isBefore(minDate, 'day') || maxDate && day.isAfter(maxDate, 'day') || excludeDates && excludeDates.some(function (excludeDate) {
    return isSameDay(day, excludeDate);
  }) || includeDates && !includeDates.some(function (includeDate) {
    return isSameDay(day, includeDate);
  }) || filterDate && !filterDate(day.clone()) || false;
}

function allDaysDisabledBefore(day, unit) {
  var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      minDate = _ref2.minDate,
      includeDates = _ref2.includeDates;

  var dateBefore = day.clone().subtract(1, unit);
  return minDate && dateBefore.isBefore(minDate, unit) || includeDates && includeDates.every(function (includeDate) {
    return dateBefore.isBefore(includeDate, unit);
  }) || false;
}

function allDaysDisabledAfter(day, unit) {
  var _ref3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      maxDate = _ref3.maxDate,
      includeDates = _ref3.includeDates;

  var dateAfter = day.clone().add(1, unit);
  return maxDate && dateAfter.isAfter(maxDate, unit) || includeDates && includeDates.every(function (includeDate) {
    return dateAfter.isAfter(includeDate, unit);
  }) || false;
}

function getEffectiveMinDate(_ref4) {
  var minDate = _ref4.minDate,
      includeDates = _ref4.includeDates;

  if (includeDates && minDate) {
    return _moment2.default.min(includeDates.filter(function (includeDate) {
      return minDate.isSameOrBefore(includeDate, 'day');
    }));
  } else if (includeDates) {
    return _moment2.default.min(includeDates);
  } else {
    return minDate;
  }
}

function getEffectiveMaxDate(_ref5) {
  var maxDate = _ref5.maxDate,
      includeDates = _ref5.includeDates;

  if (includeDates && maxDate) {
    return _moment2.default.max(includeDates.filter(function (includeDate) {
      return maxDate.isSameOrAfter(includeDate, 'day');
    }));
  } else if (includeDates) {
    return _moment2.default.max(includeDates);
  } else {
    return maxDate;
  }
}
