(function () {
    const scriptTag = document.currentScript;
    const formId = scriptTag.getAttribute('data-form-id');
    const classes = scriptTag.getAttribute('data-classes') || '';
    const displayStyle = scriptTag.getAttribute('data-display') || 'bottom-right';
    const showFab = scriptTag.getAttribute('data-show-fab') !== 'false';
    const iconSvg = scriptTag.getAttribute('iconSvg') || '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2c1.1 0 2 .9 2 2h2c0-2.76-2.24-5-5-5S7 1.24 7 4h2c0-1.1.9-2 2-2zm6.45 7.74L19 10c1.45 0 3 1.11 3 2.5v4.22c0 .63-.47 1.18-1.1 1.25l-1.95.37c-.45.09-.9-.2-1.05-.63l-.89-2.67c-1.31-.39-2.58-.71-3.77-.96l-.27-.78C11.4 13.2 11 12.66 11 12V5.5c0-.6-.4-1.12-.96-1.3L9.27 3.47c-.45-.14-.93.18-1.04.64l-.66 2.24c-1.19.26-2.46.58-3.77.96l-.89 2.67c-.15.44-.6.73-1.05.63L2.1 17.97c-.63-.07-1.1-.62-1.1-1.25V12.5c0-1.39 1.55-2.5 3-2.5l1.55.24c1.07.16 2.18.38 3.35.65.57.15 1.16-.16 1.34-.7l.27-.78c1.07-.32 2.18-.6 3.35-.82l.89-.18c.57-.12 1.18.17 1.36.74l.62 1.86c1.07.09 2.18.27 3.35.52.57.14 1.16-.16 1.34-.7zM11 20c0 1 .66 1.83 1.55 2.07.45.12.76.51.72.97-.03.46-.4.8-.86.8H9.59c-.45 0-.82-.34-.86-.8-.04-.46.27-.85.72-.97.89-.24 1.55-1.07 1.55-2.07z"/></svg>';
    const popupWidth = scriptTag.getAttribute('data-popup-width') || '400px';
    const popupHeight = scriptTag.getAttribute('data-popup-height') || '600px';
    const popupBottom = scriptTag.getAttribute('data-popup-bottom') || '20px';
    const popupRight = scriptTag.getAttribute('data-popup-right') || '20px';
    const fabSize = scriptTag.getAttribute('data-fab-size') || '50px';
    const fabBottom = scriptTag.getAttribute('data-fab-bottom') || '10px';
    const fabRight = scriptTag.getAttribute('data-fab-right') || '10px';
    const fabBackground = scriptTag.getAttribute('data-fab-background') || 'white';
    const fabForeground = scriptTag.getAttribute('data-fab-foreground') || 'black';
    const fabClasses = scriptTag.getAttribute('data-fab-classes') || '';

    const formContainer = document.createElement('div');
    formContainer.id = `form-container-${formId}`;
    formContainer.className = `rounded ${classes}`;
    formContainer.style.display = 'none';
    formContainer.style.position = 'fixed';
    formContainer.style.zIndex = '999';
    formContainer.style.backgroundColor = 'white';
    formContainer.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
    formContainer.style.transition = 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out';
    formContainer.style.transform = 'scale(0)';
    formContainer.style.opacity = '0';

    if (displayStyle === 'fullscreen') {
        formContainer.style.top = '0';
        formContainer.style.left = '0';
        formContainer.style.width = '100vw';
        formContainer.style.height = '100vh';
    } else if (displayStyle === 'bottom-right') {
        formContainer.style.bottom = popupBottom;
        formContainer.style.right = popupRight;
        formContainer.style.width = popupWidth;
        formContainer.style.height = popupHeight;
    }

    formContainer.innerHTML = `<iframe id="frame-${formId}" src="https://aliveforms.com/form/${formId}" frameborder="0" style="width: 100%; height: 100%;"></iframe>`;

    document.body.appendChild(formContainer);

    if (showFab) {
        const fabButton = document.createElement('button');
        fabButton.id = `fab-${formId}`;
        fabButton.style.position = 'fixed';
        fabButton.style.bottom = fabBottom;
        fabButton.style.right = fabRight;
        fabButton.style.width = fabSize;
        fabButton.style.height = fabSize;
        fabButton.style.borderRadius = '50%';
        fabButton.style.backgroundColor = fabBackground;
        fabButton.style.color = fabForeground;
        fabButton.style.border = 'none';
        fabButton.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        fabButton.style.fontSize = '24px';
        fabButton.style.cursor = 'pointer';
        fabButton.style.zIndex = '1000';
        fabButton.style.display = 'flex';
        fabButton.style.alignItems = 'center';
        fabButton.style.justifyContent = 'center';
        fabButton.className = fabClasses;

        fabButton.innerHTML = iconSvg;

        document.body.appendChild(fabButton);

        fabButton.addEventListener('click', () => {
            if (formContainer.style.display === 'none' || formContainer.style.display === '') {
                showForm(formContainer.id);
            } else {
                hideForm(formContainer.id);
            }
        });
    }

    window.showForm = function (formId) {
        const formContainer = document.getElementById(formId);
        if (formContainer) {
            if (formContainer.style.display === 'block') return;
            formContainer.style.display = 'block';
            setTimeout(() => {
                formContainer.style.transform = 'scale(1)';
                formContainer.style.opacity = '1';
            }, 10);
        }
    };

    window.hideForm = function (formId) {
        const formContainer = document.getElementById(formId);
        if (formContainer) {
            if (formContainer.style.display === 'none') return;
            formContainer.style.transform = 'scale(0)';
            formContainer.style.opacity = '0';
            setTimeout(() => {
                formContainer.style.display = 'none';
            }, 300);
        }
    };

    window.getFrameRef = function (formId) {
        const iframe = document.getElementById(`frame-${formId}`);
        return iframe;
    };

    window.aliveFormIds = window.aliveFormIds || [];
    window.aliveFormIds.push(formContainer.id);
})();
