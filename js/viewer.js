(function () {
  'use strict';

  function getQueryFile() {
    var params = new URLSearchParams(window.location.search);
    var file = params.get('file');
    return file != null ? String(file).trim() : '';
  }

  function isAllowedPath(path) {
    if (!path || path.length === 0) {
      return false;
    }
    if (/^[/\\]/.test(path)) {
      return false;
    }
    if (path.indexOf('://') !== -1) {
      return false;
    }
    if (path.indexOf('..') !== -1) {
      return false;
    }
    return true;
  }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function extensionOf(path) {
    var m = /\.([a-z0-9]+)$/i.exec(path);
    return m ? m[1].toLowerCase() : '';
  }

  function showError(mount, filename, message) {
    mount.removeAttribute('aria-busy');
    mount.innerHTML =
      '<div class="viewer-error" role="alert">' +
      '<h2 class="viewer-error__title">Could not load file</h2>' +
      '<p class="viewer-error__path"><code>' +
      escapeHtml(filename || '(no file)') +
      '</code></p>' +
      '<p class="viewer-error__msg">' +
      escapeHtml(message || 'Unknown error') +
      '</p>' +
      '<p class="viewer-error__hint"><a href="../index.html">Return to shelf</a></p>' +
      '</div>';
  }

  function wrapLogicSpans(escapedLine) {
    return escapedLine.replace(/\{[^}]*\}/g, function (chunk) {
      return '<span class="tok-logic">' + chunk + '</span>';
    });
  }

  function highlightInkLine(line) {
    if (/^\s*\/\/.*/.test(line)) {
      return '<span class="tok-comment">' + escapeHtml(line) + '</span>';
    }
    if (/^\s*VAR\b/.test(line)) {
      return '<span class="tok-var">' + escapeHtml(line) + '</span>';
    }
    if (/^\s*===\s+.+\s+===\s*$/.test(line)) {
      return '<span class="tok-knot">' + escapeHtml(line) + '</span>';
    }
    if (/^\s*==\s+.+\s+==\s*$/.test(line)) {
      return '<span class="tok-knot">' + escapeHtml(line) + '</span>';
    }
    if (/^\s*=\s+\w+/.test(line)) {
      return '<span class="tok-stitch">' + escapeHtml(line) + '</span>';
    }
    if (/^\s*->/.test(line) || /<-/.test(line)) {
      return '<span class="tok-divert">' + escapeHtml(line) + '</span>';
    }
    if (/^\s*[*+]+ /.test(line)) {
      return '<span class="tok-choice">' + escapeHtml(line) + '</span>';
    }
    if (/^\s*-\s/.test(line)) {
      return '<span class="tok-gather">' + escapeHtml(line) + '</span>';
    }
    return wrapLogicSpans(escapeHtml(line));
  }

  function renderInk(mount, text) {
    var lines = String(text).split(/\n/);
    var html = lines.map(highlightInkLine).join('\n');
    mount.innerHTML = '<pre class="ink-code" tabindex="0">' + html + '</pre>';
    mount.removeAttribute('aria-busy');
  }

  function renderPlain(mount, text) {
    mount.innerHTML = '<pre class="viewer-plain"><code>' + escapeHtml(text) + '</code></pre>';
    mount.removeAttribute('aria-busy');
  }

  function promoteMermaidBlocks(mount) {
    var codes = mount.querySelectorAll('pre > code.language-mermaid');
    codes.forEach(function (code) {
      var pre = code.parentElement;
      if (!pre || pre.tagName !== 'PRE') {
        return;
      }
      var diagram = document.createElement('pre');
      diagram.className = 'mermaid';
      diagram.textContent = code.textContent;
      pre.replaceWith(diagram);
    });
  }

  async function renderMarkdown(mount, text) {
    if (typeof marked === 'undefined' || !marked.parse) {
      showError(mount, '', 'Markdown renderer (marked) failed to load.');
      return;
    }
    mount.innerHTML = marked.parse(text, { async: false });
    promoteMermaidBlocks(mount);

    if (typeof mermaid !== 'undefined' && mermaid.run) {
      try {
        mermaid.initialize({
          startOnLoad: false,
          theme: 'base',
          securityLevel: 'loose',
        });
        await mermaid.run({ querySelector: '#viewer-mount .mermaid' });
      } catch (e) {
        var err = document.createElement('p');
        err.className = 'viewer-mermaid-error';
        err.setAttribute('role', 'alert');
        err.textContent =
          'Mermaid diagram error: ' + (e && e.message ? e.message : String(e));
        mount.insertBefore(err, mount.firstChild);
      }
    }
    mount.removeAttribute('aria-busy');
  }

  async function loadAndRender() {
    var mount = document.getElementById('viewer-mount');
    var pathEl = document.getElementById('viewer-filename');
    if (!mount) {
      return;
    }

    var raw = getQueryFile();
    var path = '';
    try {
      path = decodeURIComponent(raw);
    } catch (e) {
      showError(mount, raw, 'Invalid file query (bad encoding).');
      if (pathEl) {
        pathEl.textContent = '';
      }
      document.title = 'Source Viewer — error';
      return;
    }

    if (pathEl) {
      pathEl.textContent = path || 'No file specified';
    }
    document.title = path ? 'Source — ' + path : 'Source Viewer';

    if (!path) {
      showError(mount, '', 'No file was specified. Use utils/viewer.html?file=relative/path.md');
      return;
    }

    if (!isAllowedPath(path)) {
      showError(mount, path, 'Only relative paths within this site are allowed.');
      return;
    }

    mount.setAttribute('aria-busy', 'true');
    mount.innerHTML = '<p class="viewer-loading">Loading…</p>';

    var res;
    try {
      res = await fetch('../' + path, { cache: 'no-store' });
    } catch (e) {
      showError(mount, path, 'Network error: ' + (e && e.message ? e.message : String(e)));
      return;
    }

    if (!res.ok) {
      showError(mount, path, 'HTTP ' + res.status + ' ' + (res.statusText || ''));
      return;
    }

    var text;
    try {
      text = await res.text();
    } catch (e) {
      showError(mount, path, 'Could not read response: ' + (e && e.message ? e.message : String(e)));
      return;
    }

    var ext = extensionOf(path);
    if (ext === 'md' || ext === 'markdown') {
      await renderMarkdown(mount, text);
    } else if (ext === 'ink' || ext === 'twee') {
      renderInk(mount, text);
    } else {
      renderPlain(mount, text);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      loadAndRender();
    });
  } else {
    loadAndRender();
  }
})();
