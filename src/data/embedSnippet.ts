export const EMBED_SNIPPET = (businessName: string, botName: string, primaryColor: string = "#10b981") => {
  return `<!-- ================================================================= -->
<!-- 24/7 AI LEAD CAPTURE WIDGET - 1-CLICK HTML/WORDPRESS/SHOPIFY EMBED -->
<!-- Place before closing </body> tag on any client website -->
<!-- ================================================================= -->
<div id="ai-lead-widget" style="position: fixed; bottom: 24px; right: 24px; z-index: 999999; font-family: system-ui, -apple-system, sans-serif;">
  <!-- Toggle Bubble Button -->
  <button id="ai-widget-toggle" onclick="window.toggleAiLeadWidget()" style="display: flex; align-items: center; gap: 8px; background: ${primaryColor}; color: #ffffff; border: none; border-radius: 9999px; padding: 12px 20px; font-weight: 600; font-size: 14px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.3); cursor: pointer; transition: transform 0.2s;">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
    <span>Chat with ${botName}</span>
  </button>

  <!-- Chat Drawer (Hidden by default) -->
  <div id="ai-widget-drawer" style="display: none; width: 380px; height: 560px; max-width: calc(100vw - 32px); max-height: calc(100vh - 100px); background: #0f172a; border: 1px solid #334155; border-radius: 16px; overflow: hidden; flex-direction: column; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);">
    <!-- Header -->
    <div style="background: #1e293b; padding: 14px 18px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #334155;">
      <div>
        <div style="font-weight: 700; color: #f8fafc; font-size: 15px;">${botName}</div>
        <div style="font-size: 12px; color: #94a3b8;">${businessName} 24/7 Assistant</div>
      </div>
      <button onclick="window.toggleAiLeadWidget()" style="background: transparent; border: none; color: #94a3b8; font-size: 20px; cursor: pointer; padding: 4px;">&times;</button>
    </div>

    <!-- Messages Container -->
    <div id="ai-widget-messages" style="flex: 1; padding: 16px; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; font-size: 13px; line-height: 1.5; color: #e2e8f0;">
      <div style="align-self: flex-start; background: #1e293b; border: 1px solid #334155; padding: 10px 14px; border-radius: 12px 12px 12px 2px; max-width: 85%;">
        Hello! How can I assist you with ${businessName} today?
      </div>
    </div>

    <!-- Input Footer -->
    <form id="ai-widget-form" onsubmit="window.handleAiWidgetSubmit(event)" style="padding: 12px; background: #1e293b; border-top: 1px solid #334155; display: flex; gap: 8px;">
      <input id="ai-widget-input" type="text" placeholder="Type your inquiry here..." required style="flex: 1; background: #0f172a; border: 1px solid #334155; border-radius: 8px; padding: 10px 14px; color: #ffffff; font-size: 13px; outline: none;" />
      <button type="submit" style="background: ${primaryColor}; color: #ffffff; border: none; border-radius: 8px; padding: 10px 16px; font-weight: 600; cursor: pointer;">Send</button>
    </form>
  </div>
</div>

<script>
(function() {
  var isWidgetOpen = false;
  var messages = [{ role: 'assistant', content: 'Hello! How can I assist you with ${businessName} today?' }];

  window.toggleAiLeadWidget = function() {
    isWidgetOpen = !isWidgetOpen;
    var drawer = document.getElementById('ai-widget-drawer');
    var btn = document.getElementById('ai-widget-toggle');
    if (isWidgetOpen) {
      drawer.style.display = 'flex';
      btn.style.display = 'none';
      setTimeout(function() { document.getElementById('ai-widget-input').focus(); }, 100);
    } else {
      drawer.style.display = 'none';
      btn.style.display = 'flex';
    }
  };

  window.handleAiWidgetSubmit = async function(e) {
    e.preventDefault();
    var inputEl = document.getElementById('ai-widget-input');
    var text = inputEl.value.trim();
    if (!text) return;

    var container = document.getElementById('ai-widget-messages');
    
    // User message
    var userDiv = document.createElement('div');
    userDiv.style.cssText = 'align-self: flex-end; background: ${primaryColor}; color: white; padding: 10px 14px; border-radius: 12px 12px 2px 12px; max-width: 85%;';
    userDiv.textContent = text;
    container.appendChild(userDiv);
    inputEl.value = '';
    container.scrollTop = container.scrollHeight;

    messages.push({ role: 'user', content: text });

    // Loading indicator
    var loadingDiv = document.createElement('div');
    loadingDiv.id = 'ai-widget-loading';
    loadingDiv.style.cssText = 'align-self: flex-start; background: #1e293b; color: #94a3b8; padding: 10px 14px; border-radius: 12px; font-style: italic;';
    loadingDiv.textContent = '${botName} is typing...';
    container.appendChild(loadingDiv);
    container.scrollTop = container.scrollHeight;

    try {
      var res = await fetch('/api/qualify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          messages: messages,
          businessName: '${businessName}',
          businessType: '${businessName.toLowerCase()}'
        })
      });
      var data = await res.json();
      loadingDiv.remove();

      var botDiv = document.createElement('div');
      botDiv.style.cssText = 'align-self: flex-start; background: #1e293b; border: 1px solid #334155; padding: 10px 14px; border-radius: 12px 12px 12px 2px; max-width: 85%;';
      botDiv.textContent = data.reply || 'Thanks for your message! Our team will contact you shortly.';
      container.appendChild(botDiv);
      messages.push({ role: 'assistant', content: botDiv.textContent });
      container.scrollTop = container.scrollHeight;
    } catch (err) {
      loadingDiv.remove();
      var errDiv = document.createElement('div');
      errDiv.style.cssText = 'align-self: flex-start; color: #f87171; font-size: 11px;';
      errDiv.textContent = 'Could not connect. Please try again or call us directly.';
      container.appendChild(errDiv);
    }
  };
})();
<\/script>`;
};
