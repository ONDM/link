document.addEventListener('DOMContentLoaded', function()
{
  var odkazy = document.querySelectorAll('.odkaz');
  odkazy.forEach(function(odkaz)
  {
    odkaz.addEventListener('click', function(event)
    {
      event.preventDefault();
      var url = odkaz.getAttribute('data-url');
      var nazev = odkaz.getAttribute('data-nazev');
      showTab(url, nazev);
    });
  });
});

function showTab(url, nazev)
{
  var qrCodeUrl = 'https://api.qrserver.com/v1/create-qr-code/?data=' + encodeURIComponent(url) + '&size=100x100';
  var obTab = `
    <table>
      <tr>
        <td><a href="${url}">${nazev}</a></td>
      </tr>
      <tr>
        <td><img src="${qrCodeUrl}" alt="QR kód"></td>
      </tr>
    </table>
  `;
  document.getElementById('infocont').innerHTML = obTab;
  document.getElementById('infotab').style.display = 'block';
}

function closeTab()
{
  document.getElementById('infotab').style.display = 'none';
}

// SW
if ('serviceWorker' in navigator)
{
  navigator.serviceWorker.register('sw.js').then(() =>
    {
      console.log('Service Worker úspěšně spuštěn. Offline režim aktivován.');
    }).catch(error =>
    {
      console.log('Registrace Service Workera selhala:', error);
    });
}
