(function () {
    const scriptTag = document.currentScript;
    const formId = scriptTag.getAttribute('data-form-id');
    const classes = scriptTag.getAttribute('data-classes') || '';
    const displayStyle = scriptTag.getAttribute('data-display') || 'bottom-right';
    const showFab = scriptTag.getAttribute('data-show-fab') !== 'false';
    const iconSvg = scriptTag.getAttribute('data-icon-svg') || '<svg fill="#000000" width="800px" height="800px" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50,22 L50,22 C66.6,22 80,34.5 80.1,50 C80.1,65.5 66.7,78 50.1,78 C44.3,78 38.9,76.5 34.3,73.8 C33.8,73.5 33.2,73.4 32.6,73.6 L23.8,76.7 C22.2,77.2 20.7,75.8 21.2,74.2 L24,65.3 C24.2,64.8 24.1,64.2 23.8,63.7 C21.4,59.6 20,55 20,50 C20,34.5 33.4,22 50,22 Z M63,45 C63.6,45 64,44.6 64,44 L64,38 C64,37.4 63.6,37 63,37 L37,37 C36.4,37 36,37.4 36,38 L36,44 C36,44.6 36.4,45 37,45 L63,45 Z M43,65 C43.6,65 44,64.6 44,64 L44,52 C44,51.4 43.6,51 43,51 L37,51 C36.4,51 36,51.4 36,52 L36,64 C36,64.6 36.4,65 37,65 L43,65 Z M63,65 C63.6,65 64,64.6 64,64 L64,52 C64,51.4 63.6,51 63,51 L51,51 C50.4,51 50,51.4 50,52 L50,64 C50,64.6 50.4,65 51,65 L63,65 Z"/></svg>';
    const popupWidth = scriptTag.getAttribute('data-popup-width') || '90vw';
    const popupHeight = scriptTag.getAttribute('data-popup-height') || '80vh';
    const maxPopupWidth = scriptTag.getAttribute('data-max-popup-width') || '400px';
    const popupBottom = scriptTag.getAttribute('data-popup-bottom') || '20px';
    const popupRight = scriptTag.getAttribute('data-popup-right') || '20px';
    const fabSize = scriptTag.getAttribute('data-fab-size') || '50px';
    const fabBottom = scriptTag.getAttribute('data-fab-bottom') || '10px';
    const fabRight = scriptTag.getAttribute('data-fab-right') || '10px';
    const fabBackground = scriptTag.getAttribute('data-fab-background') || 'white';
    const fabForeground = scriptTag.getAttribute('data-fab-foreground') || 'black';
    const fabClasses = scriptTag.getAttribute('data-fab-classes') || '';

    const formContainer = document.createElement('div');
    formContainer.id = `${formId}`;
    formContainer.className = `rounded ${classes}`;
    formContainer.style.display = 'none';
    formContainer.style.position = 'fixed';
    formContainer.style.zIndex = '999';
    formContainer.style.backgroundColor = 'white';
    formContainer.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
    formContainer.style.transition = 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out';
    formContainer.style.transform = 'translateX(100vw)';
    formContainer.style.opacity = '0';
    formContainer.style.maxWidth = maxPopupWidth;

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

    let fabButton;

    if (showFab) {
        fabButton = document.createElement('button');
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
                formContainer.style.transform = 'translateX(0)';
                formContainer.style.opacity = '1';
            }, 10);
        }
    };

    window.hideForm = function (formId) {
        const formContainer = document.getElementById(formId);
        if (formContainer) {
            if (formContainer.style.display === 'none') return;
            formContainer.style.transform = 'translateX(100vw)';
            formContainer.style.opacity = '0';
            setTimeout(() => {
                formContainer.style.display = 'none';
            }, 500);
        }
    };

    window.getFrameRef = function (formId) {
        const iframe = document.getElementById(`frame-${formId}`);
        return iframe;
    };

    window.aliveFormIds = window.aliveFormIds || [];
    window.aliveFormIds.push(formContainer.id);

    function applyResponsiveStyles() {
        const width = window.innerWidth;

        if (width <= 480) {
            formContainer.style.width = '100vw';
            formContainer.style.height = '100vh';
            formContainer.style.bottom = '0';
            formContainer.style.right = '0';

            if (showFab && fabButton) {
                fabButton.style.width = '35px';
                fabButton.style.height = '35px';
                fabButton.style.bottom = '10px';
                fabButton.style.right = '10px';
            }
        } else if (width <= 768) {
            formContainer.style.width = '95vw';
            formContainer.style.height = '90vh';
            formContainer.style.bottom = '10px';
            formContainer.style.right = '10px';

            if (showFab && fabButton) {
                fabButton.style.width = '40px';
                fabButton.style.height = '40px';
                fabButton.style.bottom = '15px';
                fabButton.style.right = '15px';
            }
        } else {
            formContainer.style.width = popupWidth;
            formContainer.style.height = popupHeight;
            formContainer.style.bottom = popupBottom;
            formContainer.style.right = popupRight;

            if (showFab && fabButton) {
                fabButton.style.width = fabSize;
                fabButton.style.height = fabSize;
                fabButton.style.bottom = fabBottom;
                fabButton.style.right = fabRight;
            }
        }
    }

    window.addEventListener('resize', applyResponsiveStyles);
    applyResponsiveStyles();
})();
