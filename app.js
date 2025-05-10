// public/app.js
console.log('app.js loaded');

const input = document.getElementById('messageInput');
const btn   = document.getElementById('sendBtn');
const log   = document.getElementById('chatLog');

btn.addEventListener('click', async () => {
  console.log('sendBtn clicked');
  const text = input.value.trim();
  console.log('Value to send:', text);
  if (!text) return;

  // Вместо backticks — простая конкатенация
  log.innerHTML += '<p><strong>Вы:</strong> ' + text + '</p>';
  input.value = '';
  btn.disabled = true;

  try {
    const resp = await fetch('/chatWithGemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    const json = await resp.json();
    if (json.error) throw new Error(json.error);

    console.log('Got reply:', json.reply);
    log.innerHTML += '<p><strong>Бот:</strong> ' + json.reply + '</p>';
  } catch (e) {
    console.error('Error calling function:', e);
    log.innerHTML += '<p style="color:red;"><strong>Ошибка:</strong> ' + e.message + '</p>';
  } finally {
    btn.disabled = false;
    log.scrollTop = log.scrollHeight;
  }
});
