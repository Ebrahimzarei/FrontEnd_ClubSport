"use strict";

var cleavePN = new Cleave('.phone-number', {
  phone: true,
  phoneRegionCode: 'us'
});
var cleaveC = new Cleave('.currency', {
  numeral: true,
  numeralThousandsGroupStyle: 'thousand'
});
var cleavePC = new Cleave('.purchase-code', {
  delimiter: '-',
  blocks: [4, 4, 4, 4],
  uppercase: true
});
var cleaveI = new Cleave('.invoice-input', {
  prefix: 'پسوند',
  delimiter: '-',
  blocks: [10],
  uppercase: true
});
var cleaveD = new Cleave('.datemask', {
  date: true,
  datePattern: ['Y', 'm', 'd']
});
var cc_last_type;
var cleaveCC = new Cleave('.creditcard', {
  creditCard: true,
  onCreditCardTypeChanged: function (type) {
    if (type !== 'unknown') {
      if (type == 'amex') {
        type = 'americanexpress';
      } else if (type == 'mastercard') {
        type = 'mastercard';
      } else if (type == 'visa') {
        type = 'visa';
      } else if (type == 'diners') {
        type = 'dinersclub';
      } else if (type == 'discover') {
        type = 'discover';
      } else if (type == 'jcb') {
        type = 'jcb';
      }
      $(".creditcard").removeClass(cc_last_type);
      $(".creditcard").addClass(type);
      cc_last_type = type;
    }
  }
});

$(".pwstrength").pwstrength();

$('.daterange-cus').daterangepicker({
  locale: { format: 'YYYY-MM-DD' },
  drops: 'down',
  opens: 'right'
});
$('.daterange-btn').daterangepicker({
  ranges: {
    'امروز': [moment(), moment()],
    'دیروز': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    '7 روز گذشته': [moment().subtract(6, 'days'), moment()],
    '30 روز گذشته': [moment().subtract(29, 'days'), moment()],
    'ماه آینده': [moment().startOf('month'), moment().endOf('month')],
    'ماه گذشته': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
  },
  startDate: moment().subtract(29, 'days'),
  endDate: moment()
}, function (start, end) {
  $('.daterange-btn span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'))
});

$(".colorpickerinput").colorpicker({
  format: 'hex',
  component: '.input-group-append',
});
$(".inputtags").tagsinput('items');
