(function() {
    window.Solvpath = {
        config: function(elementId, baseUrl) {
            var targetElement = document.getElementById(elementId);
            if (!targetElement) {
                console.error('Element not found: ' + elementId);
                return;
            }

            var responsiveDiv = document.createElement('div');
            responsiveDiv.id = 'responsiveDiv';
            responsiveDiv.style.width = '100%';
            responsiveDiv.style.minHeight = '665px';

            var iframe = document.createElement('iframe');
            iframe.id = 'responsiveIframe';
            iframe.style.border = '0';
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            iframe.src = baseUrl + '?display=iframe';

            responsiveDiv.appendChild(iframe);

            targetElement.appendChild(responsiveDiv);

            function setupMessageListener() {
                window.addEventListener('message', function(event) {
                    if (event.data && event.data.type === 'iframeHeight') {
                        document.getElementById('responsiveDiv').style.height =
                            event.data.height + 'px';
                    }
                });
            }

            if (iframe.contentDocument.readyState === 'complete') {
                setupMessageListener();
            } else {
                iframe.addEventListener('load', setupMessageListener);
            }
        }
    };
})();
