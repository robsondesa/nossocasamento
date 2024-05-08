// Add your javascript here
// Don't forget to add it into respective layouts where this js file is needed
$(document).ready(function() {
  AOS.init({
    // uncomment below for on-scroll animations to played only once
    // once: true
  }); // initialize animate on scroll library
});

// Smooth scroll for links with hashes
$("a.smooth-scroll").click(function(event) {
  // On-page links
  if (
    location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") &&
    location.hostname == this.hostname
  ) {
    // Figure out element to scroll to
    var target = $(this.hash);
    target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
    // Does a scroll target exist?
    if (target.length) {
      // Only prevent default if animation is actually gonna happen
      event.preventDefault();
      $("html, body").animate(
        {
          scrollTop: target.offset().top
        },
        2000,
        function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) {
            // Checking if the target was focused
            return false;
          } else {
            $target.attr("tabindex", "-1"); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          }
        }
      );
    }
  }
});

// Photo Filter
var activeFilter = "all";

$(".ww-filter-button").on("click", function(e) {
  // remove btn-primary from all buttons first
  $(".ww-filter-button").removeClass("btn-primary");
  $(".ww-filter-button").addClass("btn-outline-primary");

  // add btn-primary to active button
  var button = $(this);
  button.removeClass("btn-outline-primary");
  button.addClass("btn-primary");
  filterItems(button.data("filter"));
  e.preventDefault();
});

function filterItems(filter) {
  if (filter === activeFilter) {
    return;
  }

  activeFilter = filter;
  $(".ww-gallery .card").each(function() {
    var card = $(this);
    var groups = card.data("groups");
    var show = false;
    if (filter === "all") {
      show = true;
    } else {
      for (var i = 0; i < groups.length; i++) {
        if (groups[i] === filter) {
          show = true;
        }
      }
    }
    // hide everything first
    card.fadeOut(400);
    setTimeout(function() {
      if (show && !card.is(":visible")) {
        card.fadeIn(400);
      }
    }, 500);
  });
}

// Defina a data do casamento (ano, mês (zero indexado), dia, hora, minuto, segundo)
var weddingDate = new Date(2025, 3, 21, 18, 0, 0); // 21 de abril de 2025, às 18:00

function updateCountdown() {
  var now = new Date();
  
  // Verifique se o casamento já ocorreu
  if (now >= weddingDate) {
    document.getElementById('countdown').innerHTML = 'O casamento está ocorrendo!';
  } else {
    var timeDifference = weddingDate - now;
    var days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    var hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    
    document.getElementById('countdown').innerHTML = days + 'D ' + hours + 'H ' + minutes + 'M ' + seconds + 'S';
  }
  
  // Verifique se o casamento já terminou
  if (now > new Date(weddingDate.getFullYear(), weddingDate.getMonth(), weddingDate.getDate(), 23, 59, 59)) {
    document.getElementById('countdown').innerHTML = 'O casamento já terminou!';
  }
}

// Atualize a contagem regressiva a cada segundo
setInterval(updateCountdown, 1000);

// Fechar o menu após clicar em um item do menu e rolar diretamente para a seção correspondente
$('.navbar-nav>li>a').on('click', function(event) {
  // Fecha o menu
  $('.navbar-collapse').collapse('hide');

  // Verifica se o link tem um hash (#) no href
  if (this.hash !== "") {
    event.preventDefault(); // Previne o comportamento padrão de clicar no link

    // Armazena o hash (#) do link clicado
    var hash = this.hash;

    // Obtem a posição da seção correspondente
    var targetOffset = $(hash).offset().top;

    // Define a posição de rolagem diretamente para a seção correspondente
    $('html, body').scrollTop(targetOffset);

    // Adiciona o hash (#) ao URL após a rolagem (opcional)
    window.location.hash = hash;
  }
});



// Light Box
$(document).on("click", '[data-toggle="lightbox"]', function(event) {
  event.preventDefault();
  $(this).ekkoLightbox();
});
