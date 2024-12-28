<!doctype html>
<html @if ($direction) dir="{{ $direction }}" @endif
      @if ($language) lang="{{ $language }}" @endif>
<head>
    <meta charset="utf-8">
    <title>{{ $title }}</title>

    {!! $head !!}
</head>

<body>
    {!! $layout !!}

    <div id="modal"></div>
    <div id="alerts"></div>

    <script>
        document.getElementById('flarum-loading').style.display = 'block';
        var flarum = {extensions: {}};
    </script>

    {!! $js !!}

    <script id="flarum-json-payload" type="application/json">
        @json($payload)
    </script>

    <script async>
        var boot = function() {
            const data = JSON.parse(document.getElementById('flarum-json-payload').textContent);
            document.getElementById('flarum-loading').style.display = 'none';
            try {
                flarum.core.app.load(data);
                flarum.core.app.bootExtensions(flarum.extensions);
                flarum.core.app.boot();
            } catch (e) {
                var error = document.getElementById('flarum-loading-error');
                error.innerHTML += document.getElementById('flarum-content').textContent;
                error.style.display = 'block';
                throw e;
            }
        };
        /** TODO: move to application */
        var bootInIframe = function () {
            var timer = setTimeout(() => {
                boot();
            }, 3000);
            window.addEventListener('message', function (event) {
                if (event.data.type === 'ready_ack') {
                    clearTimeout(timer);
                    window.isIn0xApp = true;
                    boot();
                }
            }, { once: true });
            window.parent.postMessage({
                from: 'frame',
                type: 'ready',
            }, '*');
        };
        setTimeout(() => {
            if (window.parent !== window) {
                bootInIframe();
            } else {
                boot();
            }
        }, 0);
    </script>

    {!! $foot !!}
</body>
</html>
