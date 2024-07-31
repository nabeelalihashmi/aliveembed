(function () {
  const scriptTag = document.currentScript;
  const formId = scriptTag.getAttribute("data-form-id");
  const classes = scriptTag.getAttribute("data-classes") || "";
  const displayStyle = scriptTag.getAttribute("data-display") || "bottom-right";
  const showFab = scriptTag.getAttribute("data-show-fab") !== "false";
  const iconSvg =
    scriptTag.getAttribute("data-icon-svg") ||
    '<svg fill="#000000" width="800px" height="800px" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50,22 L50,22 C66.6,22 80,34.5 80.1,50 C80.1,65.5 66.7,78 50.1,78 C44.3,78 38.9,76.5 34.3,73.8 C33.8,73.5 33.2,73.4 32.6,73.6 L23.8,76.7 C22.2,77.2 20.7,75.8 21.2,74.2 L24,65.3 C24.2,64.8 24.1,64.2 23.8,63.7 C21.4,59.6 20,55 20,50 C20,34.5 33.4,22 50,22 Z M63,45 C63.6,45 64,44.6 64,44 L64,38 C64,37.4 63.6,37 63,37 L37,37 C36.4,37 36,37.4 36,38 L36,44 C36,44.6 36.4,45 37,45 L63,45 Z M43,65 C43.6,65 44,64.6 44,64 L44,52 C44,51.4 43.6,51 43,51 L37,51 C36.4,51 36,51.4 36,52 L36,64 C36,64.6 36.4,65 37,65 L43,65 Z M63,65 C63.6,65 64,64.6 64,64 L64,52 C64,51.4 63.6,51 63,51 L51,51 C50.4,51 50,51.4 50,52 L50,64 C50,64.6 50.4,65 51,65 L63,65 Z"/></svg>';
  const popupWidth = scriptTag.getAttribute("data-popup-width") || "90vw";
  const popupHeight = scriptTag.getAttribute("data-popup-height") || "80vh";
  const maxPopupWidth =
    scriptTag.getAttribute("data-max-popup-width") || "400px";
  const popupBottom = scriptTag.getAttribute("data-popup-bottom") || "20px";
  const popupRight = scriptTag.getAttribute("data-popup-right") || "20px";
  const fabSize = scriptTag.getAttribute("data-fab-size") || "50px";
  const fabBottom = scriptTag.getAttribute("data-fab-bottom") || "10px";
  const fabRight = scriptTag.getAttribute("data-fab-right") || "10px";
  const fabBackground =
    scriptTag.getAttribute("data-fab-background") || "white";
  const fabForeground =
    scriptTag.getAttribute("data-fab-foreground") || "black";
  const fabClasses = scriptTag.getAttribute("data-fab-classes") || "";

  const formContainer = document.createElement("div");
  formContainer.id = `${formId}`;
  formContainer.className = `rounded ${classes}`;
  formContainer.style.display = "none";
  formContainer.style.position = "fixed";
  formContainer.style.zIndex = "9999992";
  formContainer.style.backgroundColor = "white";
  formContainer.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.2)";
  formContainer.style.transition =
    "transform 0.5s ease-in-out, opacity 0.5s ease-in-out";
  formContainer.style.transform = "translateX(100vw)";
  formContainer.style.opacity = "0";

  if (displayStyle === "fullscreen") {
    formContainer.style.top = "0";
    formContainer.style.left = "0";
    formContainer.style.width = "100vw";
    formContainer.style.height = "100vh";
  } else if (displayStyle === "bottom-right") {
    formContainer.style.maxWidth = maxPopupWidth;
    formContainer.style.bottom = popupBottom;
    formContainer.style.right = popupRight;
    formContainer.style.width = popupWidth;
    formContainer.style.height = popupHeight;
  }

  formContainer.innerHTML = `<iframe id="frame-${formId}" src="https://aliveforms.com/form/${formId}" frameborder="0" style="width: 100%; height: 100%; max-height: 100vh;"></iframe>`;
  let closeButton = document.createElement("div");
  closeButton.style.cursor = "pointer";
  closeButton.innerHTML =
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.3394 9.32245C16.7434 8.94589 16.7657 8.31312 16.3891 7.90911C16.0126 7.50509 15.3798 7.48283 14.9758 7.85938L12.0497 10.5866L9.32245 7.66048C8.94589 7.25647 8.31312 7.23421 7.90911 7.61076C7.50509 7.98731 7.48283 8.62008 7.85938 9.0241L10.5866 11.9502L7.66048 14.6775C7.25647 15.054 7.23421 15.6868 7.61076 16.0908C7.98731 16.4948 8.62008 16.5171 9.0241 16.1405L11.9502 13.4133L14.6775 16.3394C15.054 16.7434 15.6868 16.7657 16.0908 16.3891C16.4948 16.0126 16.5171 15.3798 16.1405 14.9758L13.4133 12.0497L16.3394 9.32245Z" fill="#f00"/><path fill-rule="evenodd" clip-rule="evenodd" d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z" fill="#f00"/></svg>';
  closeButton.addEventListener("click", () => {
    hideForm(formContainer.id);
  });

  closeButton.style.zIndex = "99999999";
  closeButton.style.position = "absolute";
  closeButton.style.right = "10px";
  closeButton.style.top = "10px";
  closeButton.style.height = "32px";
  closeButton.style.width = "32px";

  formContainer.prepend(closeButton);
  document.body.appendChild(formContainer);

  let fabButton;

  if (showFab) {
    fabButton = document.createElement("button");
    fabButton.id = `fab-${formId}`;
    fabButton.style.position = "fixed";
    fabButton.style.bottom = fabBottom;
    fabButton.style.right = fabRight;
    fabButton.style.width = fabSize;
    fabButton.style.height = fabSize;
    fabButton.style.borderRadius = "50%";
    fabButton.style.backgroundColor = fabBackground;
    fabButton.style.color = fabForeground;
    fabButton.style.border = "none";
    fabButton.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
    fabButton.style.fontSize = "24px";
    fabButton.style.cursor = "pointer";
    fabButton.style.zIndex = "9999991";
    fabButton.style.display = "flex";
    fabButton.style.alignItems = "center";
    fabButton.style.justifyContent = "center";
    fabButton.className = fabClasses;

    fabButton.innerHTML = iconSvg;

    document.body.appendChild(fabButton);

    fabButton.addEventListener("click", () => {
      if (
        formContainer.style.display === "none" ||
        formContainer.style.display === ""
      ) {
        showForm(formContainer.id);
      } else {
        hideForm(formContainer.id);
      }
    });
  }

  window.showForm = function (frmId = formId) {
    const formContainer = document.getElementById(frmId);
    if (formContainer) {
      if (formContainer.style.display === "block") return;
      formContainer.style.display = "block";
      setTimeout(() => {
        formContainer.style.transform = "translateX(0)";
        formContainer.style.opacity = "1";
      }, 10);
    }
  };

  window.hideForm = function (frmId = formId) {
    const formContainer = document.getElementById(frmId);
    if (formContainer) {
      if (formContainer.style.display === "none") return;
      formContainer.style.transform = "translateX(100vw)";
      formContainer.style.opacity = "0";
      setTimeout(() => {
        formContainer.style.display = "none";
      }, 500);
    }
  };

  window.getFrameRef = function (frmId = formId) {
    const iframe = document.getElementById(`frame-${frmId}`);
    return iframe;
  };

  window.aliveFormIds = window.aliveFormIds || [];
  window.aliveFormIds.push(formContainer.id);

  function applyResponsiveStyles() {
    if (displayStyle === "fullscreen") {
      return;
    }
    const width = window.innerWidth;

    if (showFab && fabButton) {
      fabButton.style.width = fabSize;
      fabButton.style.height = fabSize;
      fabButton.style.bottom = fabBottom;
      fabButton.style.right = fabRight;
    }

    if (width <= 480) {
      formContainer.style.width = "100vw";
      formContainer.style.height = "100vh";
      formContainer.style.bottom = "0";
      formContainer.style.right = "0";
    } else {
      formContainer.style.width = popupWidth;
      formContainer.style.height = popupHeight;
      formContainer.style.bottom = popupBottom;
      formContainer.style.right = popupRight;
    }
  }

  window.addEventListener("resize", applyResponsiveStyles);
  applyResponsiveStyles();
})();
