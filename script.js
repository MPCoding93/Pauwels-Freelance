// Mobile nav toggle
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('mainnav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
  }

  // Contact page: read ?type= from the URL and pre-select it
  var select = document.getElementById('projectType');
  if (select) {
    var params = new URLSearchParams(window.location.search);
    var type = params.get('type');
    if (type) {
      var match = Array.from(select.options).find(function (o) { return o.value === type; });
      if (!match) {
        var temp = document.createElement('option');
        temp.textContent = type;
        temp.value = type;
        select.insertBefore(temp, select.firstChild);
      }
      select.value = type;

      var banner = document.getElementById('tierBanner');
      var bannerText = document.getElementById('tierBannerText');
      if (banner && bannerText) {
        bannerText.textContent = type;
        banner.classList.add('show');
      }
    }
  }

  // Contact form -> mailto fallback (no backend attached yet)
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('name').value;
      var email = document.getElementById('email').value;
      var type = document.getElementById('projectType').value;
      var message = document.getElementById('message').value;
      var subject = encodeURIComponent('New inquiry: ' + type);
      var body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\nInterested in: ' + type + '\n\n' + message);
      window.location.href = 'mailto:info@pauwelsfreelance.com?subject=' + subject + '&body=' + body;
      var status = document.getElementById('formStatus');
      if (status) status.classList.add('show');
    });
  }

  // Auto-calculate experience from the start date
  var exp = document.getElementById('experience');
  if (exp && exp.dataset.start) {
    var start = new Date(exp.dataset.start);
    var now = new Date();

    var totalMonths = (now.getFullYear() - start.getFullYear()) * 12
      + (now.getMonth() - start.getMonth());
    if (now.getDate() < start.getDate()) totalMonths--;
    if (totalMonths < 0) totalMonths = 0;

    var years = Math.floor(totalMonths / 12);
    var months = totalMonths % 12;

    var plural = function (n, word) {
      return n + ' ' + word + (n === 1 ? '' : 's');
    };

    var text;
    if (years === 0 && months === 0) {
      text = 'Just started';
    } else if (years === 0) {
      text = plural(months, 'month');
    } else if (months === 0) {
      text = plural(years, 'year');
    } else {
      text = plural(years, 'year') + ', ' + plural(months, 'month');
    }

    exp.textContent = text;
  }
});
