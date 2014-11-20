var fillArray = function(year, month) {

	var firstDay = new Date(year, month - 1, 1).getDay(),
		lastDay = new Date(year, month, 0).getDate(),
		days = lastDay,
		arr = new Array(42);

	for (var i=0, j=firstDay; i<days; i++, j++) {
		arr[j] = year + '-' + month + '-' + (i + 1);
	}

	return arr;

};

var nextMonth = function(year, month, date) {
	month = month + 1;
	if (month > 12) {
		year += 1;
		month = 1;
	}

	var arr = fillArray(year, month);

	drawCalendar(year, month, date, arr);
}

var prevMonth = function(year, month, date) {
	month = month - 1;
	if (month < 0) {
		year -= 1;
		month = 12;
	}

	var arr = fillArray(year, month);

	drawCalendar(year, month, date, arr);
}

var nextYear = function(year, month, date) {
	year = year + 1;
	var arr = fillArray(year, month);

	drawCalendar(year, month, date, arr);
}

var prevYear = function(year, month, date) {
	year = year - 1;
	var arr = fillArray(year, month);

	drawCalendar(year, month, date, arr);
}


var drawCalendar = function(year, month, date, arr) {
	var fDatepicker = document.getElementById('fDatepicker');
	if (fDatepicker) {
		fDatepicker.parentNode.removeChild(fDatepicker);
	}
	
	var body = document.getElementsByTagName('body')[0],
		a = document.createElement('a'),
		thead = document.createElement('div'),
		calendar = document.createElement('div');

	body.insertBefore(calendar, null);
	calendar.setAttribute('id', 'fDatepicker');
	calendar.className = 'fDatepicker';

	var args = year + ',' + month + ',' + date,
		preYear = '<span class="ybn" onclick="prevYear(' + args + ')"><<</span>',
		nextYear = '<span class="ybn" onclick="nextYear(' + args + ')">>></span>',
		preMonth = '<span class="ybn" onclick="prevMonth(' + args + ')"><</span>',
		nextMonth = '<span class="ybn" onclick="nextMonth(' + args + ')">></span>',
		str = new Date(args.replace(/,/g, '/')).toLocaleDateString();

	thead.innerHTML = preYear + '&nbsp;&nbsp;&nbsp;&nbsp;' + preMonth + '&nbsp;&nbsp;&nbsp;&nbsp;' + str + '&nbsp;&nbsp;&nbsp;&nbsp;' + nextMonth + '&nbsp;&nbsp;&nbsp;&nbsp;' + nextYear;
	calendar.appendChild(thead);

	var weeks = '日一二三四五六'.split('');
	for (var i=0; i<7; i++) {
		var th = a.cloneNode();

		th.innerHTML = weeks[i];
		th.className = 'week';
		calendar.appendChild(th);
	}

	for (var i=0; i<arr.length; i++) {
		var td = a.cloneNode();

		if (arr[i] == undefined) {
			calendar.appendChild(td);
		} else {
			var html = arr[i].split('-')[2];

			td.innerHTML = html;
			td.className = 'day';
			if (date && html == date) {
				td.className = td.className + ' current';
			}
			if (i % 7 == 0 || i % 7 == 6) {
				td.className = td.className + ' weekend';
			}

			td.onclick = (function(i) {
				return function() {
					alert(i);
				}
			})(arr[i]);

			calendar.appendChild(td);
		}
	}
};


window.onload = function() {
	var now = new Date(),
		date = now.getDate(),
		month = now.getMonth() + 1,
		year = now.getFullYear(),
		arr = fillArray(year, month);

	drawCalendar(year, month, date, arr);
}















