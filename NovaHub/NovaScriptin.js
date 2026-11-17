(function () {
  // Run previous instance's cleanup (restores any inline dark-mode styles etc.)
  if (window.__novaCleanup) {
    try { window.__novaCleanup(); } catch (e) {}
  }

  // Clean up any existing host or page-level styles
  ['novascriptin-host', 'nova-fdark', 'novascriptin-global'].forEach(function (i) {
    var e = document.getElementById(i);
    if (e) e.remove();
  });
  document.documentElement.classList.remove('n-inv');
  document.body.contentEditable = 'false';

  // Create isolated Shadow DOM host
  var host = document.createElement('div');
  host.id = 'novascriptin-host';
  host.style.cssText = 'position:fixed;top:0;left:0;width:0;height:0;z-index:2147483647;pointer-events:none;';
  document.documentElement.appendChild(host);
  var shadow = host.attachShadow({ mode: 'open' });

  // Global page styles (only for page-level effects like Reverse Contrast)
  var gCss = document.createElement('style');
  gCss.id = 'novascriptin-global';
  gCss.textContent = 'html.n-inv{filter:invert(1) hue-rotate(180deg);transition:filter .4s}html.n-inv img,html.n-inv video,html.n-inv canvas,html.n-inv #novascriptin-host{filter:invert(1) hue-rotate(180deg)}';
  document.head.appendChild(gCss);

  var fdark = document.createElement('style');
  fdark.id = 'nova-fdark';
  document.head.appendChild(fdark);

  var el = function (t, p, c) {
    var n = document.createElement(t);
    if (p)
      Object.keys(p).forEach(function (k) {
        if (k === 'c') n.className = p[k];
        else if (k === 't') n.textContent = p[k];
        else if (k.indexOf('data-') === 0) n.setAttribute(k, p[k]);
        else n[k] = p[k];
      });
    if (c)
      c.forEach(function (x) {
        if (x) n.appendChild(x);
      });
    return n;
  };

  var card = function (h, d, id, did, extraElements) {
    var controlGroup = [el('input', { type: 'checkbox', id: id }), el('span', { c: 'nova-sl' })];
    var topChildren = [
      el('div', 0, [el('h4', { t: h }), el('p', { id: did || '', t: d })]),
      el('label', { c: 'nova-sw' }, controlGroup)
    ];
    var innerCardChildren = [el('div', { c: 'nova-ctop' }, topChildren)];
    if (extraElements) {
      innerCardChildren.push(el('div', { style: 'margin-top:10px;' }, extraElements));
    }
    return el('div', { c: 'nova-card' }, innerCardChildren);
  };

  // Scoped Shadow DOM styles with safely escaped inner single quotes for SVGs
  var css = el('style', {
    id: 'novascriptin-css',
    t: ':host{all:initial;font-family:sans-serif}@keyframes nPop{0%{opacity:0}100%{opacity:1}}@keyframes nFade{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}@keyframes nSpin{to{transform:rotate(360deg)}}.nova-box{pointer-events:auto;--bg:#e0e5ec;--txt:#3182ce;--sub:#718096;--s1:rgba(163,177,198,.7);--s2:rgba(255,255,255,.85);--ac:#3182ce;background:var(--bg);color:var(--txt);font-family:sans-serif;user-select:none;box-sizing:border-box;transition:background .35s,color .35s,box-shadow .35s;line-height:normal;letter-spacing:normal;text-transform:none}.nova-box *{box-sizing:border-box;font-family:inherit}.nova-box.dark{--bg:#1e2229;--txt:#b794f4;--sub:#a0aec0;--s1:rgba(11,13,16,.85);--s2:rgba(46,52,64,.6);--ac:#b794f4}#nova-ldr{position:fixed;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;z-index:1000000;transition:opacity .4s}#nova-spin{width:46px;height:46px;border-radius:50%;border:4px solid var(--s1);border-top-color:var(--ac);animation:nSpin .8s linear infinite}#novascriptin-hub{position:fixed;width:50vw;height:50vh;min-width:260px;min-height:220px;border-radius:22px;box-shadow:9px 9px 18px var(--s1),-9px -9px 18px var(--s2);z-index:999999;padding:20px;display:none;flex-direction:column;animation:nPop .3s ease forwards}.nova-hdr{display:flex;justify-content:space-between;align-items:center;cursor:grab;padding-bottom:12px;margin-bottom:14px;border-bottom:1px solid rgba(150,150,150,.2);flex-shrink:0}.nova-hdr:active{cursor:grabbing}.nova-ttl{font-weight:800;font-size:17px}.nova-hbtns{display:flex;gap:8px;align-items:center}.nova-cls,.nova-min{width:26px;height:26px;border-radius:50%;border:none;background:var(--bg);box-shadow:4px 4px 8px var(--s1),-4px -4px 8px var(--s2);font-weight:700;cursor:pointer;transition:transform .2s;display:flex;align-items:center;justify-content:center;padding:0}.nova-cls{color:#e53e3e}.nova-min{color:var(--ac);font-size:16px;line-height:1}.nova-cls:hover,.nova-min:hover{transform:scale(1.1)}#nova-toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);padding:10px 18px;border-radius:14px;box-shadow:6px 6px 12px var(--s1),-6px -6px 12px var(--s2);font-size:13px;font-weight:700;z-index:1000001;opacity:0;pointer-events:none;transition:opacity .3s}.nova-tabs{display:flex;gap:8px;margin-bottom:18px;flex-shrink:0}.nova-tbtn{flex:1;padding:9px 6px;border:none;border-radius:12px;background:var(--bg);box-shadow:5px 5px 10px var(--s1),-5px -5px 10px var(--s2);font-weight:600;font-size:13px;color:var(--sub);cursor:pointer;transition:.25s}.nova-tbtn.active{box-shadow:inset 4px 4px 8px var(--s1),inset -4px -4px 8px var(--s2);color:var(--ac)}.nova-body{flex:1;overflow-y:auto;overflow-x:hidden;padding-right:2px}.nova-body::-webkit-scrollbar{width:4px}.nova-body::-webkit-scrollbar-thumb{background:var(--sub);border-radius:4px}.nova-sec{display:none}.nova-sec.active{display:block;animation:nFade .3s ease forwards}.nova-card{padding:14px 16px;margin-bottom:14px;border-radius:15px;background:var(--bg);box-shadow:5px 5px 10px var(--s1),-5px -5px 10px var(--s2);transition:transform .25s}.nova-card:hover{transform:translateY(-2px)}.nova-ctop{display:flex;justify-content:space-between;align-items:center;gap:10px}.nova-card h4{margin:0 0 3px;font-size:14.5px;font-weight:700}.nova-card p{margin:0;font-size:11.5px;color:var(--sub)}.nova-grid{display:flex;gap:10px}.nova-col{flex:1}.nova-col label{display:block;font-size:11px;font-weight:600;margin-bottom:5px;color:var(--sub)}.nova-sw{position:relative;display:inline-block;width:48px;height:26px;flex-shrink:0}.nova-sw input{opacity:0;width:0;height:0;margin:0}.nova-sl{position:absolute;cursor:pointer;inset:0;background:var(--bg);border-radius:26px;box-shadow:inset 3px 3px 6px var(--s1),inset -3px -3px 6px var(--s2);transition:.3s}.nova-sl:before{position:absolute;content:"";height:18px;width:18px;left:4px;bottom:4px;background:var(--sub);border-radius:50%;transition:.35s cubic-bezier(.68,-.55,.265,1.55)}input:checked+.nova-sl:before{transform:translateX(22px);background:var(--ac)}.nova-in,.nova-kbtn,.nova-select{width:100%;padding:8px 10px;border:none;border-radius:10px;background:var(--bg);box-shadow:inset 3px 3px 6px var(--s1),inset -3px -3px 6px var(--s2);color:var(--txt);font-size:12.5px;outline:none;box-sizing:border-box}.nova-kbtn{box-shadow:3px 3px 6px var(--s1),-3px -3px 6px var(--s2);cursor:pointer;font-weight:600;text-align:center;transition:background 0.2s, color 0.2s}.nova-kbtn:active{box-shadow:inset 2px 2px 4px var(--s1),inset -2px -2px 4px var(--s2)}.nova-kbtn.recording{background:var(--ac);color:var(--bg);box-shadow:inset 3px 3px 6px var(--s1),inset -3px -3px 6px var(--s2)}#nova-res{position:absolute;right:6px;bottom:6px;width:16px;height:16px;cursor:nwse-resize;border-right:3px solid var(--sub);border-bottom:3px solid var(--sub);border-bottom-right-radius:6px;opacity:.7;z-index:10}#nova-res:hover{opacity:1;border-color:var(--ac)}#nova-ovl{position:fixed;top:20px;right:20px;padding:10px 16px;border-radius:14px;box-shadow:6px 6px 12px var(--s1),-6px -6px 12px var(--s2);font-family:monospace;font-size:13px;font-weight:700;z-index:999998;display:none;align-items:center;gap:10px;cursor:grab;animation:nPop .3s ease forwards}#nova-ac-ovl{position:fixed;top:90px;right:20px;width:265px;padding:16px;border-radius:18px;box-shadow:7px 7px 14px var(--s1),-7px -7px 14px var(--s2);z-index:999999;display:none;animation:nPop .3s ease forwards}#nova-ai-ovl{position:fixed;bottom:20px;right:20px;width:320px;height:430px;border-radius:20px;box-shadow:8px 8px 16px var(--s1),-8px -8px 16px var(--s2);z-index:999999;display:none;flex-direction:column;padding:16px;animation:nPop .3s ease forwards}.ai-chat-area{flex:1;overflow-y:auto;margin-bottom:10px;padding-right:2px;display:flex;flex-direction:column;gap:8px}.ai-msg{max-width:85%;padding:8px 12px;border-radius:12px;font-size:12.5px;word-break:break-word;user-select:text}.ai-msg.user{align-self:flex-end;background:var(--ac);color:var(--bg)}.ai-msg.bot{align-self:flex-start;background:var(--s1);color:var(--txt);border:1px solid rgba(150,150,150,0.1)}.ai-msg.system{align-self:center;font-size:11px;color:var(--sub);background:transparent;text-align:center}.ai-controls{display:flex;flex-direction:column;gap:6px;margin-bottom:10px;flex-shrink:0}.ai-input-wrap{display:flex;gap:6px;flex-shrink:0}.ai-input-wrap input{flex:1}',
  });
  css.textContent +=
    '.nova-rng{width:100%;accent-color:var(--ac);margin:0;cursor:pointer}' +
    '.nova-ta{width:100%;padding:8px 10px;border:none;border-radius:10px;background:var(--bg);box-shadow:inset 3px 3px 6px var(--s1),inset -3px -3px 6px var(--s2);color:var(--txt);font-size:12px;font-family:monospace;outline:none;resize:vertical;box-sizing:border-box;user-select:text}' +
    '#nova-clk{position:fixed;top:70px;left:20px;padding:10px 16px;border-radius:14px;box-shadow:6px 6px 12px var(--s1),-6px -6px 12px var(--s2);font-family:monospace;font-size:15px;font-weight:700;z-index:999998;display:none;cursor:grab;animation:nPop .3s ease forwards}' +
    '#nova-note{position:fixed;bottom:20px;left:20px;width:260px;height:220px;border-radius:18px;box-shadow:7px 7px 14px var(--s1),-7px -7px 14px var(--s2);z-index:999999;display:none;flex-direction:column;padding:14px;animation:nPop .3s ease forwards}' +
    '#nova-note textarea{flex:1;resize:none;font-family:sans-serif}' +
    '#nova-xh{position:fixed;left:50%;top:50%;width:0;height:0;z-index:999990;display:none;pointer-events:none}' +
    '.nova-pop{position:fixed;width:250px;max-height:80vh;overflow-y:auto;padding:16px;border-radius:18px;box-shadow:7px 7px 14px var(--s1),-7px -7px 14px var(--s2);z-index:1000000;display:none;animation:nPop .3s ease forwards}' +
    '.nova-clr{width:100%;height:30px;border:none;border-radius:8px;background:transparent;padding:0;cursor:pointer}' +
    '.nova-chk{display:flex;align-items:center;gap:8px;font-size:12px;font-weight:600;color:var(--sub);margin-bottom:10px;cursor:pointer}' +
    '.nova-chk input{accent-color:var(--ac);margin:0}.nova-hint{font-size:11px;color:var(--sub);margin:0 0 10px}' +
    '.nova-hdr,#nova-ovl,#nova-clk,#nova-res,.nova-fab,#nova-tgt{touch-action:none}.nova-sw{-webkit-touch-callout:none}' +
    '.nova-fab{position:fixed;width:48px;height:48px;border-radius:50%;box-shadow:5px 5px 10px var(--s1),-5px -5px 10px var(--s2);display:none;align-items:center;justify-content:center;font-size:11px;font-weight:800;z-index:999997;cursor:pointer;-webkit-tap-highlight-color:transparent}' +
    '.nova-fab.on{background:var(--ac);color:var(--bg)}' +
    '#nova-tgt{position:fixed;width:44px;height:44px;border-radius:50%;border:2px dashed #e53e3e;background:rgba(229,62,62,.15);z-index:999996;display:none;pointer-events:auto}' +
    '#nova-tgt:after{content:"";position:absolute;left:50%;top:50%;width:6px;height:6px;margin:-3px 0 0 -3px;border-radius:50%;background:#e53e3e}' +
    '@media (pointer:coarse){#nova-res{width:30px;height:30px}.nova-in,.nova-ta,.nova-select{font-size:16px}.nova-cls,.nova-min{width:34px;height:34px}}' +
    '@media (max-width:640px){#novascriptin-hub{width:min(92vw,380px);height:62vh}#nova-ai-ovl{width:min(92vw,320px);height:min(60vh,430px)}#nova-ac-ovl{width:min(70vw,265px)}.nova-pop{width:min(86vw,260px)}}';
  shadow.appendChild(css);

  var toast = el('div', { id: 'nova-toast', c: 'nova-box dark' });
  shadow.appendChild(toast);

  var ldr = el('div', { id: 'nova-ldr', c: 'nova-box dark' }, [
    el('div', { id: 'nova-spin' }),
    el('div', { style: 'font-weight:800;font-size:18px', t: 'Loading NovaScriptin...' }),
  ]);
  shadow.appendChild(ldr);

  var hdr = el('div', { c: 'nova-hdr' }, [
    el('span', { c: 'nova-ttl', t: 'NovaScriptin' }),
    el('div', { c: 'nova-hbtns' }, [
      el('button', { id: 'nova-min', c: 'nova-min', t: '-' }),
      el('button', { id: 'nova-cls', c: 'nova-cls', t: 'X' }),
    ]),
  ]);

  var tabs = el('div', { c: 'nova-tabs' }, [
    el('button', { c: 'nova-tbtn active', 'data-tab': 'scripts', t: 'Scripts' }),
    el('button', { c: 'nova-tbtn', 'data-tab': 'page', t: 'Page' }),
    el('button', { c: 'nova-tbtn', 'data-tab': 'settings', t: 'Settings' }),
  ]);

  // Reactive state management tracking keys and assignments independently
  var st = {
    ac: 0,
    ms: 100,
    acKey: '`',       // AutoClicker operational execution toggle keybind
    acHideKey: '3',   // Toggle visibility on AutoClicker macro options screen
    hubKey: '1',      // Toggle framework main control dashboard visibility
    aiKey: '2',       // Interactive dynamic panel chatbot assistant toggle keybind
    currentRecording: null, // Tracks which functional element is binding a key
    id: 0,
    x: 0,
    y: 0,
    st: 0,
    rid: 0,
    pid: 0,
    hid: 0,
    tid: 0,
    sid: 0,
    cid: 0,
    groqKey: '',
  };

  // Button components structured into modern interactive dynamic key selectors instead of drops
  var btnAcKey = el('button', { c: 'nova-kbtn', t: st.acKey.toUpperCase() });
  var btnAcHideKey = el('button', { c: 'nova-kbtn', t: st.acHideKey.toUpperCase() });
  var btnHubKey = el('button', { c: 'nova-kbtn', t: st.hubKey.toUpperCase() });
  var btnAiKey = el('button', { c: 'nova-kbtn', t: st.aiKey.toUpperCase() });

  var sTab = el('div', { id: 'tab-scripts', c: 'nova-sec active' }, [
    card('AutoClicker', 'Toggle overlay dashboard panel', 'tg-ac', 'ac-lbl'),
    card('Stats Overlay', 'Draggable FPS & Google Ping', 'tg-st'),
    card('Groq Chatbot', 'AI Companion Overlay Panel', 'tg-ai'),
    card('Auto Scroller', 'Scrolls the page down for you (speed below)', 'tg-scroll', '', [
      el('input', { type: 'range', id: 'rg-scroll', c: 'nova-rng', min: '1', max: '30', value: '3' }),
    ]),
    card('Clock', 'Draggable live clock overlay', 'tg-clk'),
    card('Scratchpad', 'Draggable notepad overlay (kept until you close Nova)', 'tg-note'),
    card('Crosshair', 'Screen-center crosshair | Right-click switch for settings', 'tg-xh'),
    card('Fake Typer', 'Types text with human mistakes | Right-click switch for settings', 'tg-ty'),
  ]);

  var pTab = el('div', { id: 'tab-page', c: 'nova-sec' }, [
    card('Edit Page', 'Click text on site to edit', 'tg-edit'),
    card('Smart Dark Mode', 'Only recolors elements that actually have a background', 'tg-fdark'),
    card('Reverse Contrast', 'Invert page colors', 'tg-inv'),
    card('Unlock Copy & Right-Click', 'Re-enables selecting, copying, pasting, context menu', 'tg-unl'),
    card('Show Passwords', 'Reveal password fields as plain text', 'tg-pw'),
    card('Remove Elements', 'Click anything on the page to delete it', 'tg-rm'),
    card('Highlight Links', 'Outline every link on the page', 'tg-hl'),
    card('Page Zoom', 'Zoom the page content (slider below)', 'tg-zoom', '', [
      el('input', { type: 'range', id: 'rg-zoom', c: 'nova-rng', min: '50', max: '200', value: '100' }),
    ]),
    card('Custom CSS', 'Inject your own CSS into the page', 'tg-css', '', [
      el('textarea', { id: 'ta-css', c: 'nova-ta', rows: 4, placeholder: 'body { font-family: monospace; }' }),
    ]),
  ]);

  var hAcKeyCard = el('div', { c: 'nova-card' }, [
    el('div', { c: 'nova-ctop' }, [
      el('div', 0, [
        el('h4', { t: 'AutoClicker Activation' }),
        el('p', { t: 'Keybind assignment to fire macro loop' }),
      ]),
      el('div', { style: 'width:90px;flex-shrink:0' }, [btnAcKey]),
    ])
  ]);

  var hAcHideCard = el('div', { c: 'nova-card' }, [
    el('div', { c: 'nova-ctop' }, [
      el('div', 0, [
        el('h4', { t: 'Hide AutoClicker Window' }),
        el('p', { t: 'Toggle visibility on AutoClicker panel overlay' }),
      ]),
      el('div', { style: 'width:90px;flex-shrink:0' }, [btnAcHideKey]),
    ])
  ]);

  var hHubKeyCard = el('div', { c: 'nova-card' }, [
    el('div', { c: 'nova-ctop' }, [
      el('div', 0, [
        el('h4', { t: 'Hide Hub Window' }),
        el('p', { t: 'Toggle visual dashboard configuration' }),
      ]),
      el('div', { style: 'width:90px;flex-shrink:0' }, [btnHubKey]),
    ])
  ]);

  var hAiKeyCard = el('div', { c: 'nova-card' }, [
    el('div', { c: 'nova-ctop' }, [
      el('div', 0, [
        el('h4', { t: 'Hide Chatbot Panel' }),
        el('p', { t: 'Toggle visibility on Groq Assistant window' }),
      ]),
      el('div', { style: 'width:90px;flex-shrink:0' }, [btnAiKey]),
    ])
  ]);

  var stTab = el('div', { id: 'tab-settings', c: 'nova-sec' }, [
    card('Dark Mode', 'Switch neumorphic theme', 'tg-dark'),
    hAcKeyCard,
    hAcHideCard,
    hHubKeyCard,
    hAiKeyCard,
  ]);

  var bodyWrap = el('div', { c: 'nova-body' }, [sTab, pTab, stTab]);
  var res = el('div', { id: 'nova-res' });
  var hub = el(
    'div',
    { id: 'novascriptin-hub', c: 'nova-box dark' },
    [hdr, tabs, bodyWrap, res]
  );
  shadow.appendChild(hub);

  // AutoClicker Panel Setup
  var acStatE = el('span', {
      id: 'ac-stat',
      style: 'font-size:11px;color:#e53e3e;font-weight:800',
      t: 'OFF',
    }),
    acHdr = el('div', { c: 'nova-hdr' }, [
      el('span', { c: 'nova-ttl', style: 'font-size:14.5px', t: 'AutoClicker' }),
      acStatE,
    ]);

  var acBody = el('div', { c: 'nova-grid' }, [
    el('div', { c: 'nova-col' }, [
      el('label', { t: 'Interval (ms)' }),
      el('input', { type: 'number', id: 'in-ms', c: 'nova-in', value: '100', min: '10' }),
    ])
  ]);

  var acOvl = el('div', { id: 'nova-ac-ovl', c: 'nova-box dark' }, [acHdr, acBody]);
  shadow.appendChild(acOvl);

  // Performance Elements Setup
  var fpsE = el('span', { id: 'n-fps', t: 'FPS: --' }),
    pngE = el('span', { id: 'n-ping', t: 'Ping: -- ms' }),
    ovl = el('div', { id: 'nova-ovl', c: 'nova-box dark' }, [
      fpsE,
      el('span', { t: '|' }),
      pngE,
    ]);
  shadow.appendChild(ovl);

  // Chatbot Assistant Layout Setup
  var aiHdr = el('div', { c: 'nova-hdr' }, [el('span', { c: 'nova-ttl', style: 'font-size:14.5px', t: 'Groq Chatbot' })]);
  var aiModelSelect = el('select', { id: 'sel-ai-model', c: 'nova-select' }, [el('option', { value: 'loading', t: 'Fetching models...' })]);
  var aiChatArea = el('div', { c: 'ai-chat-area' });
  var aiInput = el('input', { type: 'text', c: 'nova-in', placeholder: 'Ask AI...' });
  var aiSendBtn = el('button', { c: 'nova-kbtn', style: 'width:65px', t: 'Send' });
  var aiControls = el('div', { c: 'ai-controls' }, [aiModelSelect]);
  var aiInputWrap = el('div', { c: 'ai-input-wrap' }, [aiInput, aiSendBtn]);
  var aiOvl = el('div', { id: 'nova-ai-ovl', c: 'nova-box dark' }, [aiHdr, aiControls, aiChatArea, aiInputWrap]);
  shadow.appendChild(aiOvl);

  // Clock / Scratchpad / Crosshair overlays
  var clk = el('div', { id: 'nova-clk', c: 'nova-box dark', t: '--:--:--' });
  shadow.appendChild(clk);

  var noteHdr = el('div', { c: 'nova-hdr' }, [el('span', { c: 'nova-ttl', style: 'font-size:14.5px', t: 'Scratchpad' })]);
  var noteTa = el('textarea', { c: 'nova-ta', placeholder: 'Type notes here...' });
  var noteOvl = el('div', { id: 'nova-note', c: 'nova-box dark' }, [noteHdr, noteTa]);
  shadow.appendChild(noteOvl);

  var xh = el('div', { id: 'nova-xh' });
  shadow.appendChild(xh);

  // Query helper inside Shadow DOM
  var $ = function (id) {
    return shadow.getElementById(id);
  };

  $('tg-dark').checked = true;

  setTimeout(function () {
    ldr.style.opacity = '0';
    hub.style.display = 'flex';
    hub.style.left = Math.max(10, (window.innerWidth - hub.offsetWidth) / 2) + 'px';
    hub.style.top = Math.max(10, (window.innerHeight - hub.offsetHeight) / 2) + 'px';
    setTimeout(function () {
      ldr.remove();
    }, 400);
  }, 750);

  var isTouch = !!(window.matchMedia && window.matchMedia('(pointer:coarse)').matches);
  var tgt = null, acFab = null, syncFabs = null;

  document.addEventListener('mousemove', function (e) {
    st.x = e.clientX;
    st.y = e.clientY;
  });

  var showToast = function (msg) {
    clearTimeout(st.tid);
    toast.textContent = msg;
    toast.style.opacity = '1';
    st.tid = setTimeout(function () {
      toast.style.opacity = '0';
    }, 3000);
  };

  // Helper handling active record updates on elements
  var setupKeybindButton = function(btn, stateKey, fallbackLabel) {
    btn.onclick = function(e) {
      e.stopPropagation();
      if (st.currentRecording === btn) {
        // Double click/press active slot to clear and completely disable the layout parameter
        st[stateKey] = '';
        btn.textContent = 'DISABLED';
        btn.classList.remove('recording');
        st.currentRecording = null;
        showToast(fallbackLabel + ' keybind unassigned and completely disabled.');
        upd();
        return;
      }
      if (st.currentRecording) {
        st.currentRecording.classList.remove('recording');
      }
      st.currentRecording = btn;
      btn.classList.add('recording');
      btn.textContent = 'PRESS KEY';
      showToast('Press any standard keyboard controller button to bind. Double click button to disable.');
    };
  };

  setupKeybindButton(btnAcKey, 'acKey', 'AutoClicker');
  setupKeybindButton(btnAcHideKey, 'acHideKey', 'AutoClicker Panel');
  setupKeybindButton(btnHubKey, 'hubKey', 'Hub Window');
  setupKeybindButton(btnAiKey, 'aiKey', 'Chatbot Panel');

  var rz = 0, rx = 0, ry = 0, rw = 0, rh = 0;
  res.onpointerdown = function (e) {
    e.preventDefault();
    e.stopPropagation();
    rz = 1;
    rx = e.clientX;
    ry = e.clientY;
    rw = hub.offsetWidth;
    rh = hub.offsetHeight;
    hub.style.transition = 'none';
  };
  document.addEventListener('pointermove', function (e) {
    if (rz) {
      hub.style.width = Math.max(260, rw + (e.clientX - rx)) + 'px';
      hub.style.height = Math.max(220, rh + (e.clientY - ry)) + 'px';
    }
  });
  document.addEventListener('pointerup', function () {
    if (rz) {
      rz = 0;
      hub.style.transition = '';
    }
  });

  var drag = function (box, h) {
    var d = 0, ox = 0, oy = 0;
    h.onpointerdown = function (e) {
      if (e.target.closest('button,input,select,textarea,#nova-res,.ai-chat-area')) return;
      d = 1;
      var r = box.getBoundingClientRect();
      box.style.transition = 'none';
      box.style.right = 'auto';
      box.style.bottom = 'auto';
      box.style.left = r.left + 'px';
      box.style.top = r.top + 'px';
      ox = e.clientX - r.left;
      oy = e.clientY - r.top;
    };
    document.addEventListener('pointermove', function (e) {
      if (d) {
        box.style.left = e.clientX - ox + 'px';
        box.style.top = e.clientY - oy + 'px';
      }
    });
    document.addEventListener('pointerup', function () {
      if (d) {
        d = 0;
        box.style.transition = '';
      }
    });
  };
  drag(hub, hdr);
  drag(ovl, ovl);
  drag(acOvl, acHdr);
  drag(aiOvl, aiHdr);
  drag(clk, clk);
  drag(noteOvl, noteHdr);

  hub.querySelectorAll('.nova-tbtn').forEach(function (b) {
    b.onclick = function () {
      hub.querySelectorAll('.nova-tbtn,.nova-sec').forEach(function (x) {
        x.classList.remove('active');
      });
      b.classList.add('active');
      $('tab-' + b.dataset.tab).classList.add('active');
    };
  });

  var tgAc = $('tg-ac'),
    inMs = $('in-ms'),
    lbl = $('ac-lbl');

  var upd = function () {
    lbl.textContent = 'Toggle overlay dashboard panel' + (isTouch ? ' | Drag the red target, tap CLICK' : ' | Key: ' + (st.acKey ? st.acKey.toUpperCase() : 'NONE'));
  };
  upd();

  var stop = function () {
    clearInterval(st.id);
    st.id = 0;
  };

  var getDeepTargetData = function (x, y) {
    var currentDoc = document;
    var el = currentDoc.elementFromPoint(x, y);
    var targetWin = window;

    while (el && el.tagName === 'IFRAME') {
      try {
        var nextDoc = el.contentDocument || el.contentWindow.document;
        var nextWin = el.contentWindow;
        var rect = el.getBoundingClientRect();

        x = x - rect.left;
        y = y - rect.top;

        var innerEl = nextDoc.elementFromPoint(x, y);
        if (!innerEl || innerEl === el) break;

        el = innerEl;
        currentDoc = nextDoc;
        targetWin = nextWin;
      } catch (err) {
        break;
      }
    }
    return { element: el, doc: currentDoc, win: targetWin, cx: x, cy: y };
  };

  var start = function () {
    stop();
    st.id = setInterval(function () {
      var px = st.x, py = st.y;
      if (isTouch && tgt) {
        var tr = tgt.getBoundingClientRect();
        px = tr.left + tr.width / 2;
        py = tr.top + tr.height / 2;
        tgt.style.pointerEvents = 'none'; // so elementFromPoint sees the page under it
      }
      var rootEl = document.elementFromPoint(px, py);
      var blocked = rootEl === host || (rootEl && host.contains(rootEl));
      var data = blocked ? null : getDeepTargetData(px, py);
      if (isTouch && tgt) tgt.style.pointerEvents = 'auto';
      if (blocked) return;

      if (data && data.element) {
        try {
          var evtProps = {
            bubbles: true,
            cancelable: true,
            view: data.win,
            clientX: data.cx,
            clientY: data.cy,
          };

          var mDown = new data.win.MouseEvent('mousedown', evtProps);
          var mUp = new data.win.MouseEvent('mouseup', evtProps);
          var clickEvt = new data.win.MouseEvent('click', evtProps);

          if (isTouch && data.win.PointerEvent) {
            data.element.dispatchEvent(new data.win.PointerEvent('pointerdown', evtProps));
            data.element.dispatchEvent(new data.win.PointerEvent('pointerup', evtProps));
          }
          data.element.dispatchEvent(mDown);
          data.element.dispatchEvent(mUp);
          data.element.dispatchEvent(clickEvt);

          if (typeof data.element.click === 'function') {
            data.element.click();
          }
        } catch (e) {
          data.element.click();
        }
      }
    }, st.ms);
  };

  var setAc = function (v) {
    st.ac = v;
    acStatE.textContent = v ? 'ON' : 'OFF';
    acStatE.style.color = v ? '#48bb78' : '#e53e3e';
    if (acFab) acFab.classList.toggle('on', !!v);
    if (v) start();
    else stop();
  };

  tgAc.onchange = function (e) {
    acOvl.style.display = e.target.checked ? 'block' : 'none';
    if (!e.target.checked && st.ac) {
      setAc(0);
    }
  };
  inMs.onchange = function (e) {
    st.ms = Math.max(10, parseInt(e.target.value, 10) || 100);
    e.target.value = st.ms;
    if (st.ac) start();
  };

  $('nova-min').onclick = function () {
    hub.style.display = 'none';
    if (isTouch) {
      var fbT = $('tg-fb');
      if (fbT) fbT.checked = true; // make sure the HUB button is available to reopen
      if (syncFabs) syncFabs();
      showToast('Tap the HUB button to reopen');
    } else if (st.hubKey) {
      showToast('Click ' + st.hubKey.toUpperCase() + ' to unhide display dashboard');
    }
  };

  var appendAiMsg = function (text, type) {
    var m = el('div', { c: 'ai-msg ' + type, t: text });
    aiChatArea.appendChild(m);
    aiChatArea.scrollTop = aiChatArea.scrollHeight;
  };

  var populateModelsDropdown = function (modelsList) {
    aiModelSelect.innerHTML = '';
    var textModels = [];

    if (modelsList && modelsList.length > 0) {
      modelsList.forEach(function (model) {
        if (model.id) {
          var id = model.id.toLowerCase();
          // Precise Text Filter: pruning out speech-to-text, text-to-speech, audio or image models
          if (id.indexOf('whisper') === -1 &&
              id.indexOf('audio') === -1 &&
              id.indexOf('vision') === -1 &&
              id.indexOf('orpheus') === -1 &&
              id.indexOf('guard') === -1) {
            textModels.push(model.id);
          }
        }
      });
    }

    if (textModels.length === 0) {
      textModels.push('llama-3.3-70b-versatile');
    }

    textModels.forEach(function (modelId) {
      aiModelSelect.appendChild(el('option', { value: modelId, t: modelId }));
    });
  };

  var fetchGroqModelsList = function () {
    fetch('https://api.groq.com/openai/v1/models', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + st.groqKey,
        'Content-Type': 'application/json'
      }
    })
    .then(function (res) { return res.json(); })
    .then(function (data) {
      if (data && data.data) {
        populateModelsDropdown(data.data);
      } else {
        populateModelsDropdown([]);
      }
    })
    .catch(function () {
      populateModelsDropdown([]);
    });
  };

  var fetchGroqToken = function () {
    appendAiMsg('Fetching token from NovaGG...', 'system');
    fetch('https://starlightgg.github.io/NovaGG.github.io/txt/token.txt', { cache: 'no-store' })
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.text();
      })
      .then(function (raw) {
        // Split by newline, strip whitespace, and keep only valid-length lines
        var validLines = raw
          .split(/[\r\n]+/)
          .map(function (line) { return line.replace(/\s+/g, ''); })
          .filter(function (entry) { return entry.length > 10; });

        if (validLines.length === 0) {
          throw new Error('No valid token lines found');
        }

        // Pick a random line from the valid entries
        var randomIndex = Math.floor(Math.random() * validLines.length);
        var chosenLine = validLines[randomIndex];

        var decoded = atob(chosenLine);
        st.groqKey = 'gsk_' + decoded;
        appendAiMsg('Groq token successfully decoded! (Key ' + (randomIndex + 1) + ' of ' + validLines.length + ')', 'system');
        fetchGroqModelsList();
      })
      .catch(function () {
        appendAiMsg('Error downloading or decoding token via server requests.', 'system');
      });
  };


  $('tg-ai').onchange = function (e) {
    if (e.target.checked) {
      aiOvl.style.display = 'flex';
      if (!st.groqKey) {
        fetchGroqToken();
      }
    } else {
      aiOvl.style.display = 'none';
    }
  };

  var handleAiSend = function () {
    var query = aiInput.value.trim();
    if (!query) return;
    aiInput.value = '';

    appendAiMsg(query, 'user');

    if (!st.groqKey) {
      appendAiMsg('API Token error. Retrying load assignment...', 'system');
      fetchGroqToken();
      return;
    }

    var chosenModel = aiModelSelect.value;
    if (chosenModel === 'loading') {
      chosenModel = 'llama-3.3-70b-versatile';
    }

    appendAiMsg('Thinking...', 'bot');
    var trackingBotMsg = aiChatArea.lastChild;

    fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + st.groqKey
      },
      body: JSON.stringify({
        model: chosenModel,
        messages: [{ role: 'user', content: query }],
        temperature: 0.7
      })
    })
    .then(function (res) { return res.json(); })
    .then(function (data) {
      if (data.choices && data.choices[0] && data.choices[0].message) {
        trackingBotMsg.textContent = data.choices[0].message.content;
      } else if (data.error && data.error.message) {
        trackingBotMsg.textContent = 'Groq Error: ' + data.error.message;
      } else {
        trackingBotMsg.textContent = 'Malformed response pattern. Try checking key constraints.';
      }
      aiChatArea.scrollTop = aiChatArea.scrollHeight;
    })
    .catch(function () {
      trackingBotMsg.textContent = 'Network execution failure while connecting to Groq client.';
    });
  };

  aiSendBtn.onclick = handleAiSend;
  aiInput.onkeydown = function (e) {
    if (e.key === 'Enter') {
      e.stopPropagation();
      handleAiSend();
    }
  };

  document.addEventListener('keydown', function (e) {
    if (!e.isTrusted) return; // ignore fake typer's synthetic key events
    // Intercept if processing keybind mapping capture
    if (st.currentRecording) {
      e.preventDefault();
      e.stopPropagation();
      var keyStr = e.key;

      // Prevent collisions across layout targets
      if ((st.currentRecording !== btnAcKey && st.acKey && st.acKey.toLowerCase() === keyStr.toLowerCase()) ||
          (st.currentRecording !== btnAcHideKey && st.acHideKey && st.acHideKey.toLowerCase() === keyStr.toLowerCase()) ||
          (st.currentRecording !== btnHubKey && st.hubKey && st.hubKey.toLowerCase() === keyStr.toLowerCase()) ||
          (st.currentRecording !== btnAiKey && st.aiKey && st.aiKey.toLowerCase() === keyStr.toLowerCase())) {
        showToast('Key conflict! That button is currently bound elsewhere.');
        return;
      }

      if (st.currentRecording === btnAcKey) {
        st.acKey = keyStr;
        btnAcKey.textContent = keyStr.toUpperCase();
        upd();
      } else if (st.currentRecording === btnAcHideKey) {
        st.acHideKey = keyStr;
        btnAcHideKey.textContent = keyStr.toUpperCase();
      } else if (st.currentRecording === btnHubKey) {
        st.hubKey = keyStr;
        btnHubKey.textContent = keyStr.toUpperCase();
      } else if (st.currentRecording === btnAiKey) {
        st.aiKey = keyStr;
        btnAiKey.textContent = keyStr.toUpperCase();
      }

      st.currentRecording.classList.remove('recording');
      st.currentRecording = null;
      showToast('Successfully bound action to ' + keyStr.toUpperCase());
      return;
    }

    if (shadow.activeElement && (shadow.activeElement.tagName === 'INPUT' || shadow.activeElement.tagName === 'SELECT' || shadow.activeElement.tagName === 'TEXTAREA')) {
      return;
    }

    if (document.body.contentEditable !== 'true') {
      var pressedKey = e.key.toLowerCase();

      if (st.acKey && pressedKey === st.acKey.toLowerCase()) {
        if (tgAc.checked) {
          setAc(!st.ac);
        } else {
          showToast('Turn on AutoClicker in Scripts first.');
        }
      } else if (st.acHideKey && pressedKey === st.acHideKey.toLowerCase()) {
        if (tgAc.checked) {
          var isAcHidden = (acOvl.style.display === 'none');
          acOvl.style.display = isAcHidden ? 'block' : 'none';
        } else {
          showToast('Turn on AutoClicker in Scripts first.');
        }
      } else if (st.hubKey && pressedKey === st.hubKey.toLowerCase()) {
        var isHidden = (hub.style.display === 'none');
        hub.style.display = isHidden ? 'flex' : 'none';
      } else if (st.aiKey && pressedKey === st.aiKey.toLowerCase()) {
        if ($('tg-ai').checked) {
          var isAiHidden = (aiOvl.style.display === 'none');
          aiOvl.style.display = isAiHidden ? 'flex' : 'none';
        } else {
          showToast('Enable the Groq Chatbot switch inside Scripts panel first.');
        }
      }
    }
  });

  var fc = 0, lt = performance.now();
  var loop = function (n) {
    if (!st.st) return;
    fc++;
    if (n - lt >= 1000) {
      fpsE.textContent = 'FPS: ' + fc;
      fc = 0;
      lt = n;
    }
    st.rid = requestAnimationFrame(loop);
  };

  var ping = function() {
    if (!st.st) return;
    var t = performance.now();
    fetch('https://google.com', { mode: 'no-cors', cache: 'no-store' })
      .then(function () {
        pngE.textContent = 'Ping: ' + Math.round(performance.now() - t) + ' ms';
      })
      .catch(function () {
        pngE.textContent = 'Ping: Err';
      });
  };

  $('tg-st').onchange = function (e) {
    st.st = e.target.checked;
    if (st.st) {
      ovl.style.display = 'flex';
      fc = 0;
      lt = performance.now();
      st.rid = requestAnimationFrame(loop);
      ping();
      st.pid = setInterval(ping, 2000);
    } else {
      ovl.style.display = 'none';
      cancelAnimationFrame(st.rid);
      clearInterval(st.pid);
    }
  };

  $('tg-edit').onchange = function (e) {
    document.body.contentEditable = e.target.checked ? 'true' : 'false';
  };

  // ───────────────────────── Smart Dark Mode ─────────────────────────
  // Reads each element's real computed colors. Only elements that actually
  // have a visible light background get darkened; transparent ones are left
  // alone (they show whatever is behind them). Dark text gets lightened,
  // light borders get darkened. Elements with background images/gradients
  // are left untouched. Every change is saved so it can be fully undone.
  var dm = { on: 0, saved: new Map(), imgBg: new WeakMap(), obs: null };
  var DM_SKIP = { SCRIPT: 1, STYLE: 1, LINK: 1, META: 1, HEAD: 1, TITLE: 1, NOSCRIPT: 1, IMG: 1, VIDEO: 1, CANVAS: 1, PICTURE: 1, IFRAME: 1, SOURCE: 1, BR: 1 };

  var parseC = function (s) {
    var m = /rgba?\(([^)]+)\)/.exec(s || '');
    if (!m) return null;
    var p = m[1].split(/[\s,\/]+/).filter(Boolean).map(parseFloat);
    if (p.length < 3 || p.some(isNaN)) return null;
    var a = p.length > 3 ? p[3] : 1;
    if (a > 1) a = a / 100;
    return { r: p[0], g: p[1], b: p[2], a: a };
  };
  var lum = function (c) {
    return (0.299 * c.r + 0.587 * c.g + 0.114 * c.b) / 255;
  };
  var toHsl = function (c) {
    var r = c.r / 255, g = c.g / 255, b = c.b / 255;
    var mx = Math.max(r, g, b), mn = Math.min(r, g, b), h = 0, s = 0, l = (mx + mn) / 2, d = mx - mn;
    if (d) {
      s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
      h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
      h /= 6;
    }
    return { h: h, s: s, l: l };
  };
  var hueCh = function (p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  var fromHsl = function (h, s, l, a) {
    var r, g, b;
    if (!s) {
      r = g = b = l;
    } else {
      var q = l < 0.5 ? l * (1 + s) : l + s - l * s, p = 2 * l - q;
      r = hueCh(p, q, h + 1 / 3);
      g = hueCh(p, q, h);
      b = hueCh(p, q, h - 1 / 3);
    }
    return 'rgba(' + Math.round(r * 255) + ',' + Math.round(g * 255) + ',' + Math.round(b * 255) + ',' + a + ')';
  };
  var dmBg = function (c) { var h = toHsl(c); return fromHsl(h.h, Math.min(h.s * 0.8, 0.6), 0.07 + (1 - h.l) * 0.2, c.a); };
  var dmTx = function (c) { var h = toHsl(c); return fromHsl(h.h, Math.min(h.s, 0.9), 0.62 + (1 - h.l) * 0.33, c.a); };
  var dmBd = function (c) { var h = toHsl(c); return fromHsl(h.h, h.s * 0.6, 0.16 + (1 - h.l) * 0.2, c.a); };

  var dmSkip = function (e) {
    return DM_SKIP[e.tagName] || e.namespaceURI !== 'http://www.w3.org/1999/xhtml' || e === host;
  };

  var dmCompute = function (e) {
    var cs = getComputedStyle(e), out = [];
    var par = e.parentElement;
    var img = cs.backgroundImage !== 'none' && /url|gradient/.test(cs.backgroundImage);
    var ib = img || (par && dm.imgBg.get(par)) || false;
    dm.imgBg.set(e, ib);

    var bg = parseC(cs.backgroundColor);
    if (!img && bg && bg.a > 0.05 && lum(bg) > 0.45) out.push(['background-color', dmBg(bg)]);

    if (!ib) {
      var tc = parseC(cs.color);
      if (tc && tc.a > 0.05 && lum(tc) < 0.55) out.push(['color', dmTx(tc)]);
    }

    var bw = parseFloat(cs.borderTopWidth) + parseFloat(cs.borderRightWidth) + parseFloat(cs.borderBottomWidth) + parseFloat(cs.borderLeftWidth);
    if (bw > 0) {
      var bc = parseC(cs.borderTopColor);
      if (bc && bc.a > 0.05 && lum(bc) > 0.5) out.push(['border-color', dmBd(bc)]);
    }
    return out;
  };

  var dmApply = function (e, props) {
    var s = dm.saved.get(e);
    if (!s) { s = {}; dm.saved.set(e, s); }
    props.forEach(function (pv) {
      if (!(pv[0] in s)) s[pv[0]] = [e.style.getPropertyValue(pv[0]), e.style.getPropertyPriority(pv[0])];
      e.style.setProperty(pv[0], pv[1], 'important');
    });
  };

  var dmRevert = function (e) {
    var s = dm.saved.get(e);
    if (!s) return;
    Object.keys(s).forEach(function (p) {
      if (s[p][0]) e.style.setProperty(p, s[p][0], s[p][1]);
      else e.style.removeProperty(p);
    });
    dm.saved.delete(e);
  };

  // Process elements in small batches (reads first, then writes) so big pages don't freeze
  var dmRun = function (list) {
    var i = 0;
    (function step() {
      if (!dm.on) return;
      var end = Math.min(i + 250, list.length), jobs = [];
      for (; i < end; i++) {
        var e = list[i];
        if (!e.isConnected || dmSkip(e)) continue;
        var o = dmCompute(e);
        if (o.length) jobs.push([e, o]);
      }
      jobs.forEach(function (j) { dmApply(j[0], j[1]); });
      if (i < list.length) setTimeout(step, 0);
    })();
  };

  var dmStart = function () {
    dmStop();
    dm.on = 1;
    fdark.textContent = 'html{color-scheme:dark !important}';

    var html = document.documentElement, body = document.body;
    var hb = parseC(getComputedStyle(html).backgroundColor);
    var bb = parseC(getComputedStyle(body).backgroundColor);
    // Nothing paints a background at all -> give the canvas a dark one
    if ((!hb || hb.a < 0.05) && (!bb || bb.a < 0.05)) dmApply(html, [['background-color', '#121418']]);

    var list = [html, body].concat(Array.prototype.slice.call(body.querySelectorAll('*')));
    dmRun(list);

    dm.obs = new MutationObserver(function (ms) {
      var add = [];
      ms.forEach(function (m) {
        if (m.type === 'childList') {
          m.addedNodes.forEach(function (n) {
            if (n.nodeType === 1 && n !== host) {
              add.push(n);
              n.querySelectorAll('*').forEach(function (c) { add.push(c); });
            }
          });
        } else if (m.type === 'attributes') {
          dmRevert(m.target); // class changed: recompute from the element's new natural style
          add.push(m.target);
        }
      });
      if (add.length) dmRun(add);
    });
    dm.obs.observe(body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
  };

  var dmStop = function () {
    dm.on = 0;
    if (dm.obs) { dm.obs.disconnect(); dm.obs = null; }
    Array.from(dm.saved.keys()).forEach(dmRevert);
    dm.imgBg = new WeakMap();
    fdark.textContent = '';
  };

  $('tg-fdark').onchange = function (e) {
    if (e.target.checked) dmStart();
    else dmStop();
  };

  $('tg-inv').onchange = function (e) {
    document.documentElement.classList.toggle('n-inv', e.target.checked);
  };

  // ───────────────────────── Extra page tools ─────────────────────────
  var feat = {};

  // Unlock Copy & Right-Click
  var unl = {
    ev: ['contextmenu', 'copy', 'cut', 'paste', 'selectstart', 'dragstart'],
    fn: function (e) { if (e.target === host) return; e.stopImmediatePropagation(); },
    style: null
  };
  feat.unl = function (on) {
    unl.ev.forEach(function (x) {
      document.removeEventListener(x, unl.fn, true);
      if (on) document.addEventListener(x, unl.fn, true);
    });
    if (unl.style) { unl.style.remove(); unl.style = null; }
    if (on) {
      unl.style = document.createElement('style');
      unl.style.textContent = '*{-webkit-user-select:text !important;user-select:text !important}';
      document.head.appendChild(unl.style);
    }
  };

  // Show Passwords
  var pw = { list: [], iv: 0 };
  var pwScan = function () {
    document.querySelectorAll('input[type="password"]').forEach(function (i) {
      pw.list.push(i);
      i.type = 'text';
    });
  };
  feat.pw = function (on) {
    clearInterval(pw.iv);
    if (on) {
      pwScan();
      pw.iv = setInterval(pwScan, 1500);
    } else {
      pw.list.forEach(function (i) { i.type = 'password'; });
      pw.list = [];
    }
  };

  // Remove Elements
  var rm = { hov: null, prev: '' };
  rm.clr = function () {
    if (rm.hov) { rm.hov.style.outline = rm.prev; rm.hov = null; }
  };
  rm.over = function (e) {
    if (e.target === host) return;
    rm.clr();
    rm.hov = e.target;
    rm.prev = e.target.style.outline;
    e.target.style.outline = '2px solid #e53e3e';
  };
  rm.click = function (e) {
    if (e.target === host) return;
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    var t = rm.hov || e.target;
    rm.hov = null;
    if (t === document.body || t === document.documentElement) return;
    t.remove();
  };
  feat.rm = function (on) {
    document.removeEventListener('mouseover', rm.over, true);
    document.removeEventListener('click', rm.click, true);
    rm.clr();
    if (on) {
      document.addEventListener('mouseover', rm.over, true);
      document.addEventListener('click', rm.click, true);
    }
  };

  // Highlight Links
  var hlStyle = null;
  feat.hl = function (on) {
    if (hlStyle) { hlStyle.remove(); hlStyle = null; }
    if (on) {
      hlStyle = document.createElement('style');
      hlStyle.textContent = 'a{outline:2px dashed #f6ad55 !important;outline-offset:2px !important}';
      document.head.appendChild(hlStyle);
    }
  };

  // Page Zoom
  feat.zoom = function (on) {
    document.body.style.zoom = on ? $('rg-zoom').value / 100 : '';
  };

  // Custom CSS
  var ccss = null;
  feat.css = function (on) {
    if (ccss) { ccss.remove(); ccss = null; }
    if (on) {
      ccss = document.createElement('style');
      ccss.id = 'nova-custom-css';
      ccss.textContent = $('ta-css').value;
      document.head.appendChild(ccss);
    }
  };

  // Auto Scroller
  feat.scroll = function (on) {
    clearInterval(st.sid);
    st.sid = 0;
    if (on) {
      st.sid = setInterval(function () {
        window.scrollBy(0, parseInt($('rg-scroll').value, 10) || 3);
      }, 16);
    }
  };

  // Clock
  var tick = function () {
    clk.textContent = new Date().toLocaleTimeString();
  };
  feat.clk = function (on) {
    clearInterval(st.cid);
    st.cid = 0;
    clk.style.display = on ? 'block' : 'none';
    if (on) {
      tick();
      st.cid = setInterval(tick, 1000);
    }
  };

  // Scratchpad / Crosshair
  feat.note = function (on) { noteOvl.style.display = on ? 'flex' : 'none'; };
  // ───────────────────────── Crosshair (customizable) ─────────────────────────
  var xs = { color: '#48bb78', style: 'cross', size: 10, thick: 2, gap: 4, op: 100, outline: true };

  var drawXh = function () {
    var s = xs.size, t = xs.thick, g = xs.gap, c = xs.color, stl = xs.style, o = '';
    var L = function (x1, y1, x2, y2) {
      return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + c + '" stroke-width="' + t + '"/>';
    };
    if (stl === 'cross' || stl === 'crossdot' || stl === 'tshape') {
      o += L(-(g + s), 0, -g, 0) + L(g, 0, g + s, 0) + L(0, g, 0, g + s);
      if (stl !== 'tshape') o += L(0, -(g + s), 0, -g);
    }
    if (stl === 'x') {
      var a = g * 0.7071, b = (g + s) * 0.7071;
      o += L(a, a, b, b) + L(-a, a, -b, b) + L(a, -a, b, -b) + L(-a, -a, -b, -b);
    }
    if (stl === 'circle' || stl === 'circledot') {
      o += '<circle r="' + s + '" fill="none" stroke="' + c + '" stroke-width="' + t + '"/>';
    }
    if (stl === 'dot' || stl === 'crossdot' || stl === 'circledot') {
      var r = stl === 'dot' ? Math.max(s / 4, t) : Math.max(t, 1.5);
      o += '<circle r="' + r + '" fill="' + c + '"/>';
    }
    var f = (xs.outline ? 'filter:drop-shadow(0 0 1px #000) drop-shadow(0 0 1px #000);' : '') + 'opacity:' + xs.op / 100 + ';';
    xh.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="-64 -64 128 128" style="position:absolute;left:-64px;top:-64px;overflow:visible;' + f + '">' + o + '</svg>';
  };
  drawXh();

  feat.xh = function (on) {
    xh.style.display = on ? 'block' : 'none';
    if (on) drawXh();
  };

  // ───────────────────────── Fake Typer ─────────────────────────
  var ts = { text: 'Hello! This is a test of the fake typer.', speed: 120, rate: 6, notice: 2, fix: true, enter: false };
  var ty = { run: 0, t: 0 };
  var lastEdit = null;

  var isEdit = function (n) {
    if (!n || n === host || n.nodeType !== 1) return false;
    if (n.tagName === 'TEXTAREA') return !n.disabled && !n.readOnly;
    if (n.tagName === 'INPUT') return /^(text|search|email|url|tel|password|number)?$/i.test(n.type) && !n.disabled && !n.readOnly;
    return !!n.isContentEditable;
  };
  var onFocusIn = function (e) { if (isEdit(e.target)) lastEdit = e.target; };
  document.addEventListener('focusin', onFocusIn, true);
  if (isEdit(document.activeElement)) lastEdit = document.activeElement;
  feat._focus = function () { document.removeEventListener('focusin', onFocusIn, true); };

  var KB = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];
  var near = function (ch) {
    var lo = ch.toLowerCase(), r = -1, c = -1;
    KB.forEach(function (row, i) { var k = row.indexOf(lo); if (k > -1) { r = i; c = k; } });
    if (r < 0) return ch;
    var cand = [];
    for (var dr = -1; dr <= 1; dr++)
      for (var dc = -1; dc <= 1; dc++) {
        if (!dr && !dc) continue;
        var row = KB[r + dr];
        if (row && row[c + dc]) cand.push(row[c + dc]);
      }
    var n = cand[Math.floor(Math.random() * cand.length)];
    return ch === lo ? n : n.toUpperCase();
  };

  ty.fire = function (t, type, key) {
    try { t.dispatchEvent(new KeyboardEvent(type, { key: key, bubbles: true, cancelable: true })); } catch (e) {}
  };
  ty.setVal = function (t, v) {
    var proto = t.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
    var d = Object.getOwnPropertyDescriptor(proto, 'value');
    if (d && d.set) d.set.call(t, v); else t.value = v;
    t.dispatchEvent(new Event('input', { bubbles: true }));
  };
  ty.put = function (t, ch) {
    if (document.activeElement !== t) t.focus();
    ty.fire(t, 'keydown', ch);
    var ok = false;
    try { ok = document.execCommand('insertText', false, ch); } catch (e) {}
    if (!ok && 'value' in t) ty.setVal(t, t.value + ch);
    ty.fire(t, 'keyup', ch);
  };
  ty.back = function (t) {
    if (document.activeElement !== t) t.focus();
    ty.fire(t, 'keydown', 'Backspace');
    var ok = false;
    try { ok = document.execCommand('delete'); } catch (e) {}
    if (!ok && 'value' in t) ty.setVal(t, t.value.slice(0, -1));
    ty.fire(t, 'keyup', 'Backspace');
  };
  ty.enter = function (t) {
    if (t.tagName === 'TEXTAREA' || t.isContentEditable) { ty.put(t, '\n'); return; }
    ['keydown', 'keypress', 'keyup'].forEach(function (type) {
      try { t.dispatchEvent(new KeyboardEvent(type, { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true, cancelable: true })); } catch (e) {}
    });
  };
  ty.stop = function () {
    clearTimeout(ty.t);
    ty.run = 0;
  };
  ty.finish = function (msg) {
    ty.stop();
    $('tg-ty').checked = false;
    if (msg) showToast(msg);
  };

  ty.start = function () {
    ty.stop();
    var t = isEdit(document.activeElement) ? document.activeElement : lastEdit;
    if (!t || !t.isConnected) {
      $('tg-ty').checked = false;
      showToast('Click a text field on the page first, then turn Fake Typer on.');
      return;
    }
    var text = ts.text;
    if (!text) { $('tg-ty').checked = false; showToast('Set some text first (right-click the switch).'); return; }

    t.focus();
    try {
      if (t.isContentEditable && !('value' in t)) {
        var sel = window.getSelection(), rg = document.createRange();
        rg.selectNodeContents(t);
        rg.collapse(false);
        sel.removeAllRanges();
        sel.addRange(rg);
      } else if ('value' in t) {
        t.setSelectionRange(t.value.length, t.value.length);
      }
    } catch (e) {}

    ty.run = 1;
    var i = 0, back = 0, rewind = 0, notice = 0, erasing = false, skip = false;
    var jitter = function (ms) { return Math.max(10, ms * (0.6 + Math.random() * 0.8)); };
    var next = function (ms) { ty.t = setTimeout(step, ms); };

    var step = function () {
      if (!ty.run) return;
      if (!t.isConnected) { ty.finish('Fake Typer: field disappeared.'); return; }

      // Erasing a mistake
      if (erasing) {
        if (back > 0) {
          ty.back(t);
          back--;
          next(jitter(ts.speed * 0.6));
        } else {
          i -= rewind;
          rewind = 0;
          erasing = false;
          skip = true;
          next(jitter(ts.speed * 2));
        }
        return;
      }

      // Reached the end
      if (i >= text.length) {
        if (back > 0) { erasing = true; next(jitter(ts.speed * 4)); return; }
        if (ts.enter) ty.enter(t);
        ty.finish('Fake Typer done.');
        return;
      }

      var ch = text[i];

      // Still typing before noticing the mistake
      if (back > 0) {
        ty.put(t, ch);
        i++; back++; rewind++; notice--;
        if (notice <= 0) { erasing = true; next(jitter(ts.speed * 3)); }
        else next(jitter(ts.speed));
        return;
      }

      // Roll for a new mistake
      if (!skip && ts.rate > 0 && /[a-z]/i.test(ch) && Math.random() * 100 < ts.rate) {
        var r = Math.random();
        var canSwap = i + 1 < text.length && /[a-z]/i.test(text[i + 1]) && text[i + 1] !== ch;
        var nb = 0, rw = 0;
        if (r < 0.65 || (r >= 0.85 && !canSwap)) {          // wrong neighbouring key
          ty.put(t, near(ch)); i++; nb = 1; rw = 1;
        } else if (r < 0.85) {                              // doubled letter
          ty.put(t, ch); ty.put(t, ch); i++; nb = 1; rw = 0;
        } else {                                            // swapped letters
          ty.put(t, text[i + 1]); ty.put(t, ch); i += 2; nb = 2; rw = 2;
        }
        if (ts.fix) {
          back = nb; rewind = rw;
          notice = Math.floor(Math.random() * (ts.notice + 1));
          if (notice <= 0) { erasing = true; next(jitter(ts.speed * 3)); }
          else next(jitter(ts.speed));
        } else {
          next(jitter(ts.speed));
        }
        return;
      }

      // Normal character
      ty.put(t, ch);
      i++;
      skip = false;
      var d = ts.speed;
      if (ch === ' ' || /[.,!?;:]/.test(ch)) d *= 1.5;
      if (Math.random() < 0.03) d += ts.speed * 4; // occasional human hesitation
      next(jitter(d));
    };

    next(250);
  };

  feat.ty = function (on) {
    if (on) ty.start();
    else ty.stop();
  };

  // ───────────────────────── Right-click settings popups ─────────────────────────
  var mkPop = function (title) {
    var x = el('button', { c: 'nova-cls', t: 'X' });
    var h = el('div', { c: 'nova-hdr' }, [el('span', { c: 'nova-ttl', style: 'font-size:14.5px', t: title }), x]);
    var body = el('div');
    var p = el('div', { c: 'nova-box nova-pop dark' }, [h, body]);
    x.onclick = function () { p.style.display = 'none'; };
    shadow.appendChild(p);
    drag(p, h);
    return { p: p, body: body };
  };
  var openPop = function (o, e) {
    var p = o.p;
    p.style.display = 'block';
    p.style.right = 'auto';
    p.style.bottom = 'auto';
    p.style.left = Math.max(10, Math.min(e.clientX + 12, window.innerWidth - p.offsetWidth - 10)) + 'px';
    p.style.top = Math.max(10, Math.min(e.clientY - 10, window.innerHeight - p.offsetHeight - 10)) + 'px';
  };
  var pSlider = function (name, min, max, val, unit, cb) {
    var l = el('label', { t: name + ': ' + val + unit });
    var i = el('input', { type: 'range', c: 'nova-rng', min: String(min), max: String(max), value: String(val) });
    i.oninput = function () {
      var v = +i.value;
      l.textContent = name + ': ' + v + unit;
      cb(v);
    };
    return el('div', { c: 'nova-col', style: 'margin-bottom:10px' }, [l, i]);
  };
  var pCheck = function (name, val, cb) {
    var i = el('input', { type: 'checkbox' });
    i.checked = val;
    i.onchange = function () { cb(i.checked); };
    return el('label', { c: 'nova-chk' }, [i, el('span', { t: name })]);
  };
  var stopKeys = function (n) {
    n.onkeydown = function (e) { e.stopPropagation(); };
    n.onkeyup = function (e) { e.stopPropagation(); };
  };

  // Crosshair settings
  var xsPop = mkPop('Crosshair Settings');
  var xsColor = el('input', { type: 'color', c: 'nova-clr', value: xs.color });
  xsColor.oninput = function () { xs.color = xsColor.value; drawXh(); };
  var xsStyle = el('select', { c: 'nova-select' }, [
    el('option', { value: 'cross', t: 'Cross' }),
    el('option', { value: 'crossdot', t: 'Cross + Dot' }),
    el('option', { value: 'tshape', t: 'T-Shape' }),
    el('option', { value: 'x', t: 'X' }),
    el('option', { value: 'dot', t: 'Dot' }),
    el('option', { value: 'circle', t: 'Circle' }),
    el('option', { value: 'circledot', t: 'Circle + Dot' }),
  ]);
  xsStyle.value = xs.style;
  xsStyle.onchange = function () { xs.style = xsStyle.value; drawXh(); };
  [
    el('div', { c: 'nova-col', style: 'margin-bottom:10px' }, [el('label', { t: 'Color' }), xsColor]),
    el('div', { c: 'nova-col', style: 'margin-bottom:10px' }, [el('label', { t: 'Style' }), xsStyle]),
    pSlider('Size', 2, 40, xs.size, 'px', function (v) { xs.size = v; drawXh(); }),
    pSlider('Thickness', 1, 8, xs.thick, 'px', function (v) { xs.thick = v; drawXh(); }),
    pSlider('Gap', 0, 20, xs.gap, 'px', function (v) { xs.gap = v; drawXh(); }),
    pSlider('Opacity', 20, 100, xs.op, '%', function (v) { xs.op = v; drawXh(); }),
    pCheck('Dark outline', xs.outline, function (v) { xs.outline = v; drawXh(); }),
  ].forEach(function (n) { xsPop.body.appendChild(n); });

  // Fake typer settings
  var tsPop = mkPop('Fake Typer Settings');
  var tsText = el('textarea', { c: 'nova-ta', rows: 4, value: ts.text, placeholder: 'Text to type...' });
  tsText.oninput = function () { ts.text = tsText.value; };
  stopKeys(tsText);
  [
    el('p', { c: 'nova-hint', t: 'Click a text field on the page, then switch Fake Typer on.' }),
    el('div', { c: 'nova-col', style: 'margin-bottom:10px' }, [el('label', { t: 'Text to type' }), tsText]),
    pSlider('Speed', 20, 400, ts.speed, ' ms/char', function (v) { ts.speed = v; }),
    pSlider('Mistakes', 0, 30, ts.rate, '%', function (v) { ts.rate = v; }),
    pSlider('Notice after up to', 0, 4, ts.notice, ' chars', function (v) { ts.notice = v; }),
    pCheck('Fix mistakes (backspace)', ts.fix, function (v) { ts.fix = v; }),
    pCheck('Press Enter when done', ts.enter, function (v) { ts.enter = v; }),
  ].forEach(function (n) { tsPop.body.appendChild(n); });

  // Right-click the switches to open settings
  $('tg-xh').parentNode.oncontextmenu = function (e) { e.preventDefault(); openPop(xsPop, e); };
  $('tg-ty').parentNode.oncontextmenu = function (e) { e.preventDefault(); openPop(tsPop, e); };

  // ───────────────────────── Mobile: floating buttons, touch target, long-press ─────────────────────────
  if (isTouch) {
    // Keybinds don't apply on touch: hide those cards, add a toggle for the floating buttons
    [hAcKeyCard, hAcHideCard, hHubKeyCard, hAiKeyCard].forEach(function (c) { c.style.display = 'none'; });
    stTab.appendChild(card('Floating Buttons', 'Draggable on-screen buttons replace the keybinds', 'tg-fb'));
    $('tg-fb').checked = true;

    // "Right-click" wording -> "Long-press"
    hub.querySelectorAll('.nova-card p').forEach(function (p) {
      p.textContent = p.textContent.replace('Right-click', 'Long-press');
    });

    // Draggable red target the AutoClicker clicks on
    tgt = el('div', { id: 'nova-tgt' });
    shadow.appendChild(tgt);
    tgt.style.left = Math.round(window.innerWidth / 2 - 22) + 'px';
    tgt.style.top = Math.round(window.innerHeight / 2 - 22) + 'px';
    drag(tgt, tgt);

    // Floating button: drag to move, tap to trigger
    var mkFab = function (label, top, onTap) {
      var b = el('div', { c: 'nova-box nova-fab dark', t: label });
      b.style.left = Math.max(0, window.innerWidth - 60) + 'px';
      b.style.top = top + 'px';
      shadow.appendChild(b);
      var sx = 0, sy = 0, mv = 0, dn = 0, ox = 0, oy = 0;
      b.onpointerdown = function (e) {
        dn = 1; mv = 0; sx = e.clientX; sy = e.clientY;
        var r = b.getBoundingClientRect();
        ox = e.clientX - r.left;
        oy = e.clientY - r.top;
        try { b.setPointerCapture(e.pointerId); } catch (x) {}
      };
      b.onpointermove = function (e) {
        if (!dn) return;
        if (!mv && Math.abs(e.clientX - sx) + Math.abs(e.clientY - sy) > 8) mv = 1;
        if (mv) {
          b.style.left = Math.max(0, Math.min(window.innerWidth - 48, e.clientX - ox)) + 'px';
          b.style.top = Math.max(0, Math.min(window.innerHeight - 48, e.clientY - oy)) + 'px';
        }
      };
      b.onpointerup = function () {
        if (dn && !mv) onTap();
        dn = 0;
      };
      b.onpointercancel = function () { dn = 0; };
      return b;
    };

    acFab = mkFab('CLICK', 120, function () {
      if (tgAc.checked) setAc(!st.ac);
      else showToast('Turn on AutoClicker in Scripts first.');
    });
    var acpFab = mkFab('PANEL', 176, function () {
      acOvl.style.display = acOvl.style.display === 'none' ? 'block' : 'none';
    });
    var hubFab = mkFab('HUB', 232, function () {
      hub.style.display = hub.style.display === 'none' ? 'flex' : 'none';
    });
    var aiFab = mkFab('AI', 288, function () {
      aiOvl.style.display = aiOvl.style.display === 'none' ? 'flex' : 'none';
    });

    // Buttons only show when their feature is on
    syncFabs = function () {
      var on = $('tg-fb').checked;
      var acShow = on && tgAc.checked ? 'flex' : 'none';
      hubFab.style.display = on ? 'flex' : 'none';
      acFab.style.display = acShow;
      acpFab.style.display = acShow;
      aiFab.style.display = on && $('tg-ai').checked ? 'flex' : 'none';
      tgt.style.display = tgAc.checked ? 'block' : 'none';
    };
    tgAc.addEventListener('change', syncFabs);
    $('tg-ai').addEventListener('change', syncFabs);
    $('tg-fb').addEventListener('change', syncFabs);
    syncFabs();

    // Dark theme toggle also themes the buttons
    $('tg-dark').addEventListener('change', function (e) {
      [acFab, acpFab, hubFab, aiFab].forEach(function (x) { x.classList.toggle('dark', e.target.checked); });
    });

    // Long-press a switch = right-click (opens its settings)
    var longPress = function (sw, pop) {
      var tm = 0, fired = 0, sx = 0, sy = 0;
      sw.addEventListener('pointerdown', function (e) {
        if (e.pointerType === 'mouse') return;
        fired = 0;
        sx = e.clientX;
        sy = e.clientY;
        clearTimeout(tm);
        tm = setTimeout(function () {
          fired = 1;
          openPop(pop, { clientX: sx, clientY: sy });
        }, 500);
      });
      sw.addEventListener('pointermove', function (e) {
        if (Math.abs(e.clientX - sx) + Math.abs(e.clientY - sy) > 10) clearTimeout(tm);
      });
      ['pointerup', 'pointercancel'].forEach(function (t) {
        sw.addEventListener(t, function () { clearTimeout(tm); });
      });
      // swallow the click that follows a long-press so the switch doesn't flip
      sw.addEventListener('click', function (e) {
        if (fired) {
          e.preventDefault();
          e.stopPropagation();
          fired = 0;
        }
      }, true);
    };
    longPress($('tg-xh').parentNode, xsPop);
    longPress($('tg-ty').parentNode, tsPop);
  }

  // Wire toggles to features
  ['unl', 'pw', 'rm', 'hl', 'zoom', 'css', 'scroll', 'clk', 'note', 'xh', 'ty'].forEach(function (k) {
    $('tg-' + k).onchange = function (e) { feat[k](e.target.checked); };
  });
  $('rg-zoom').oninput = function () { if ($('tg-zoom').checked) feat.zoom(1); };
  $('ta-css').oninput = function () { if (ccss) ccss.textContent = $('ta-css').value; };
  // Don't let page key handlers eat typing in our textareas
  [noteTa, $('ta-css')].forEach(function (t) {
    t.onkeydown = function (e) { e.stopPropagation(); };
    t.onkeyup = function (e) { e.stopPropagation(); };
  });

  $('tg-dark').onchange = function (e) {
    [hub, ovl, acOvl, toast, aiOvl, clk, noteOvl, xsPop.p, tsPop.p].forEach(function (x) {
      x.classList.toggle('dark', e.target.checked);
    });
  };

  var cleanup = function () {
    setAc(0);
    st.st = 0;
    cancelAnimationFrame(st.rid);
    clearInterval(st.pid);
    dmStop();
    Object.keys(feat).forEach(function (k) {
      try { feat[k](0); } catch (e) {}
    });
    document.body.contentEditable = 'false';
    document.documentElement.classList.remove('n-inv');
    host.remove();
    gCss.remove();
    fdark.remove();
  };
  window.__novaCleanup = cleanup;

  $('nova-cls').onclick = function () {
    setAc(0);
    hub.style.opacity = '0';
    setTimeout(cleanup, 250);
  };
})();
