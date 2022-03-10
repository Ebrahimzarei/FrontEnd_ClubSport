"use strict";

$("#swal-1").click(function () {
  swal('سلام');
});

$("#swal-2").click(function () {
  swal('عالی', 'دکمه را فشار دهید!', 'موفقیت');
});

$("#swal-3").click(function () {
  swal('عالی', 'دکمه را فشار دهید!', 'اخطار');
});

$("#swal-4").click(function () {
  swal('عالی', 'دکمه را فشار دهید!', 'اطلاعات');
});

$("#swal-5").click(function () {
  swal('عالی', 'دکمه را فشار دهید!', 'خطا');
});

$("#swal-6").click(function () {
  swal({
    title: 'آیا مطمئن هستید؟',
    text: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.',
    icon: 'warning',
    buttons: true,
    dangerMode: true,
  })
    .then((willDelete) => {
      if (willDelete) {
        swal('لورم ایپسوم متن ساختگی با تولید سادگی', {
          icon: 'success',
        });
      } else {
        swal('لورم ایپسوم متن ساختگی با تولید سادگی');
      }
    });
});

$("#swal-7").click(function () {
  swal({
    title: 'اسم شما چیست؟',
    content: {
      element: 'input',
      attributes: {
        placeholder: 'نام خود را وارد کنید',
        type: 'text',
      },
    },
  }).then((data) => {
    swal('سلام, ' + data + '!');
  });
});

$("#swal-8").click(function () {
  swal('!لورم ایپسوم متن ساختگی با تولید سادگی', {
    buttons: false,
    timer: 3000,
  });
});