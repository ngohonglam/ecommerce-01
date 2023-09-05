// pro
function openCity(evt, cityName) {
  var i, x, tablinks;
  x = document.getElementsByClassName("city");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" color", "");
  }
  document.getElementById(cityName).style.display = "flex";
  evt.currentTarget.className += " color";
}
// timer
var countDownDate = new Date("Jan 5, 2024 15:37:25").getTime();

var x = setInterval(function () {

  var now = new Date().getTime();

  var distance = countDownDate - now;


  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  const timer = document.getElementById("timer")
  if (!timer) return
  timer.innerHTML = hours + " : "
    + minutes + " : " + seconds + "";

  if (distance < 0) {
    clearInterval(x);
    timer.innerHTML = "EXPIRED";
  }
}, 1000);

// back-to-top
let mybutton = document.getElementById("myBtn");

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
// 
let rangeMin = 100;
const range = document.querySelector(".range-selected");
const rangeInput = document.querySelectorAll(".range-input input");
const rangePrice = document.querySelectorAll(".range-price input");
rangeInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minRange = parseInt(rangeInput[0].value);
    let maxRange = parseInt(rangeInput[1].value);
    if (maxRange - minRange < rangeMin) {
      if (e.target.className === "min") {
        rangeInput[0].value = maxRange - rangeMin;
      } else {
        rangeInput[1].value = minRange + rangeMin;
      }
    } else {
      rangePrice[0].value = minRange;
      rangePrice[1].value = maxRange;
      range.style.left = (minRange / rangeInput[0].max) * 100 + "%";
      range.style.right = 100 - (maxRange / rangeInput[1].max) * 100 + "%";
    }
  });
});
rangePrice.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minPrice = rangePrice[0].value;
    let maxPrice = rangePrice[1].value;
    if (maxPrice - minPrice >= rangeMin && maxPrice <= rangeInput[1].max) {
      if (e.target.className === "min") {
        rangeInput[0].value = minPrice;
        range.style.left = (minPrice / rangeInput[0].max) * 100 + "%";
      } else {
        rangeInput[1].value = maxPrice;
        range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
      }
    }
  });
});

// load more
$(document).ready(function () {
  const el = $("#loadMore")
  const initRecords = el.data('init-records')
  const recordsPerpage = el.data('records-per-page')
  $(".load-item").slice(0, initRecords).show();
  const elHidden = $(".load-item:hidden")
  if (elHidden.length == 0) {
    el.text("").addClass("noContent");
  }
  el.on("click", async function (e) {
    e.preventDefault();
    const elHidden = $(".load-item:hidden")
    elHidden.slice(0, recordsPerpage).slideDown();
    // await new Promise(resolve => setTimeout(() => resolve(true), 500))
    if ($(".load-item:hidden").length == 0) {
      el.text("").addClass("noContent");
    }
  });

})
  // $(document).ready(function () {
  //   $(".load-item-blog").slice(0, 2).show();
  //   $("#loadMore-2").on("click", function (e) {
  //     e.preventDefault();
  //     $(".load-item-blog:hidden").slice(0, 2).slideDown();
  //     if ($(".load-item-blog:hidden").length == 0) {
  //       $("#loadMore-2").text("").addClass("noContent");
  //     }
  //   });

  // });

  // 


  (function ($) {
    $.fn.countTo = function (options) {
      options = options || {};

      return $(this).each(function () {
        // set options for current element
        var settings = $.extend({}, $.fn.countTo.defaults, {
          from: $(this).data('from'),
          to: $(this).data('to'),
          speed: $(this).data('speed'),
          refreshInterval: $(this).data('refresh-interval'),
          decimals: $(this).data('decimals')
        }, options);

        // how many times to update the value, and how much to increment the value on each update
        var loops = Math.ceil(settings.speed / settings.refreshInterval),
          increment = (settings.to - settings.from) / loops;

        // references & variables that will change with each update
        var self = this,
          $self = $(this),
          loopCount = 0,
          value = settings.from,
          data = $self.data('countTo') || {};

        $self.data('countTo', data);

        // if an existing interval can be found, clear it first
        if (data.interval) {
          clearInterval(data.interval);
        }
        data.interval = setInterval(updateTimer, settings.refreshInterval);

        // initialize the element with the starting value
        render(value);

        function updateTimer() {
          value += increment;
          loopCount++;

          render(value);

          if (typeof (settings.onUpdate) == 'function') {
            settings.onUpdate.call(self, value);
          }

          if (loopCount >= loops) {
            // remove the interval
            $self.removeData('countTo');
            clearInterval(data.interval);
            value = settings.to;

            if (typeof (settings.onComplete) == 'function') {
              settings.onComplete.call(self, value);
            }
          }
        }

        function render(value) {
          var formattedValue = settings.formatter.call(self, value, settings);
          $self.html(formattedValue);
        }
      });
    };

    $.fn.countTo.defaults = {
      from: 0,               // the number the element should start at
      to: 0,                 // the number the element should end at
      speed: 1000,           // how long it should take to count between the target numbers
      refreshInterval: 100,  // how often the element should be updated
      decimals: 0,           // the number of decimal places to show
      formatter: formatter,  // handler for formatting the value before rendering
      onUpdate: null,        // callback method for every time the element is updated
      onComplete: null       // callback method for when the element finishes updating
    };

    function formatter(value, settings) {
      return value.toFixed(settings.decimals);
    }
  }(jQuery));

jQuery(function ($) {
  // start all the timers
  $('.counter').each(count);

  function count(options) {
    var $this = $(this);
    options = $.extend({}, options || {}, $this.data('countToOptions') || {});
    $this.countTo(options);
  }
});

// 
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
  $('#example').tooltip(options)
})
// 
$(document).ready(function () {
  const mynew = document.getElementsByClassName("details-prod-img")
  for (let i = 0; i < mynew.length; i++) {
    mynew[i].addEventListener("mousemove", onZoom);
    mynew[i].addEventListener("mouseover", onZoom);
    mynew[i].addEventListener("mouseleave", offZoom);
  }

  function onZoom(e) {
    const imgEl = document.querySelector('.details-prod-img.carousel-item.active > .img')
    if (!imgEl) return
    const x = e.offsetX / e.target.offsetWidth * 100
    const y = e.offsetY / e.target.offsetHeight * 100
    imgEl.style.transformOrigin = `${x}% ${y}%`;
    imgEl.style.transform = "scale(1.5)";
  }

  function offZoom(e) {
    const imgEl = document.querySelector('.details-prod-img.carousel-item.active > .img')
    if (!imgEl) return
    imgEl.style.transformOrigin = `center center`;
    imgEl.style.transform = "scale(1)";
  }
  $('#btn-plus').click(function () {
    var qty = $('#i-qty').val();
    qty = parseInt(qty, 10);
    qty = qty + 1;
    $('#i-qty').val(qty)
  })
  $('#btn-minus').click(function () {
    var qty = $('#i-qty').val();
    qty = parseInt(qty, 10);
    qty--;
    if (qty < 1)
      qty = 1;
    $('#i-qty').val(qty);
  })

})
