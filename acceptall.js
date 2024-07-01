function waitForElement(selector) {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      const element = document.querySelector(selector);
      if (element) {
        clearInterval(interval);
        resolve(element);
      }
    }, 100);
  });
}

function waitUntilGone(selector) {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      const element = document.querySelector(selector);
      if (!element) {
        clearInterval(interval);
        resolve();
      }
    }, 100);
  });
}

async function main(count) {
  for (let i = 0; i < count; i++) {
    let element = await waitForElement(
      ".glyphicon.glyphicon-edit.glyphicon-action.ng-scope"
    );
    element.click();
    element = await waitForElement("button.btn:nth-child(3)");
    element.click();
    await waitUntilGone("button.btn:nth-child(3)");
    await waitUntilGone(".progress-bar");
  }
}