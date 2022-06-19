// Copies a string to the clipboard. Must be called from within an
// event handler such as click. May return false if it failed, but
// this is not always possible. Browser support for Chrome 43+,
// Firefox 42+, Safari 10+, Edge and Internet Explorer 10+.
// Internet Explorer: The clipboard feature may be disabled by
// an administrator. By default a prompt is shown the first
// time the clipboard is used (per session).
// from: https://stackoverflow.com/a/33928558
function copyToClipboard(text) {
  if (window.clipboardData && window.clipboardData.setData) {
      // Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
      return window.clipboardData.setData("Text", text);

  }
  else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
      var textarea = document.createElement("textarea");
      textarea.textContent = text;
      textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in Microsoft Edge.
      document.body.appendChild(textarea);
      textarea.select();
      try {
          return document.execCommand("copy");  // Security exception may be thrown by some browsers.
      }
      catch (ex) {
          console.warn("Copy to clipboard failed.", ex);
          return prompt("Copy to clipboard: Ctrl+C, Enter", text);
      }
      finally {
          document.body.removeChild(textarea);
      }
  }
}

function checkIsIOS() {
  return [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ].includes(navigator.platform)
  // iPad on iOS 13 detection
  || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}

function checkIsAndroid() {
  return /android/i.test(navigator.userAgent);
}

const isIOSQQ = (checkIsIOS() && / QQ/i.test(navigator.userAgent));
const isAndroidQQ = (checkIsAndroid() && /MQQBrowser/i.test(navigator.userAgent) && /QQ/i.test((navigator.userAgent).split('MQQBrowser')));

function isMobileQQ() {
  return isIOSQQ || isAndroidQQ;
}

function isWeiXin(){ 
  const ua = window.navigator.userAgent.toLowerCase(); 
  return ua.match(/MicroMessenger/i) == 'micromessenger';
}

const Toast = {
  toastElem: null,
  isShow: false,
  timer: null,
  show(text = '', ms = 1500) {
    if (!this.isShow) {
      this.toastElem.querySelector('.toast').innerText = text;
      this.toastElem.classList.add('active');
      this.isShow = true;
      clearTimeout(this.timer);
      setTimeout(() => {
        this.isShow = false;
        this.toastElem.classList.remove('active');
        this.toastElem.querySelector('.toast').innerText = '';
      }, ms);
    }
  },
  init() {
    this.toastElem = document.querySelector('.toast-wrap');
    this.toastElem.querySelector('.toast').innerText = '';
  }
};

function getQuery(key) {
  const { search = '' } = window.location;
  const input = search.startsWith('?') ? search.slice(1) : search;
  const paramMap = input.split('&')
    .map(kvStr => kvStr.split('='))
    .reduce((accu, [k, v]) => {
      accu[k] = decodeURIComponent(v);
      return accu;
    }, {});
  return paramMap[key];
}

function main() {
  Toast.init();
  // const discussionId = +getQuery('d');
  // const floorId = +getQuery('f');
  // let url = 'https://0xffff.one';
  // if (discussionId) {
  //   url += `/d/${discussionId}`;
  // }
  // if (floorId) {
  //   url += `/${floorId}`;
  // }
  const url = location.href;
  document.querySelector('.link-url').innerText = url;
  document.querySelector('.copy-btn').addEventListener('click', () => {
    copyToClipboard(url);
    Toast.show('复制成功！');
  });
  // 安卓、微信提示浏览器打开
  document.querySelector('.open-tips').style.display = (isMobileQQ() || isWeiXin()) ? 'block' : 'none';
  // if (!isMobileQQ() && !isWeiXin()) {
  //   setTimeout(() => {
  //     location.href = url;
  //   }, 1500);
  // }
}

// start
main();
