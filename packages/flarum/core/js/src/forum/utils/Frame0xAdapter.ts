
const IFRAME_BOOT_TIMEOUT = 1000;

export interface Frame0xMessage {
  from: 'app' | 'frame';
  type: 'navigate' | 'back' | 'ready' | 'ready_ack';
  payload?: any;
}

export class NavigateMessage implements Frame0xMessage {
  from: 'app' | 'frame' = 'frame';
  type: 'navigate' = 'navigate';
  payload: {
    href: string;
    type?: 'push' | 'replace';
  };
  constructor(payload: typeof NavigateMessage.prototype.payload) {
    this.payload = payload;
  }
};

export class Frame0xAdapter {
  isIn0xApp: boolean = false;

  private resHandler: ((msg: Frame0xMessage) => void) | null = null;

  bootApp = (boot: () => void) => {
    if (window === window.parent) {
      boot();
      return;
    }
    this.registerEvents();
    const timer = setTimeout(() => {
      boot();
    }, IFRAME_BOOT_TIMEOUT);
    this.postMsgToParent({ type: 'ready' }, () => {
      clearTimeout(timer);
      this.isIn0xApp = true;
      boot();
    });
  };

  navigate = (href: string, type: 'push' | 'replace' = 'push') => {
    this.postMsgToParent(new NavigateMessage({ href, type }));
  };

  postMsgToParent = (message: Partial<Frame0xMessage>, onRes?: (msg: Frame0xMessage) => void) => {
    console.log('postMsgToParent', message);
    window.parent.postMessage({
      from: 'frame',
      ...message,
    }, '*');
    if (onRes) {
      this.resHandler = onRes;
    }
  };

  private registerEvents = () => {
    window.addEventListener('message', this.handleMessage);
    window.addEventListener('click', this.handleLinkClick);
  };

  private handleLinkClick = (e: MouseEvent) => {
    const target = e.target as HTMLAnchorElement;
    if (!target.href || target.target === '_blank') {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    this.navigate(target.href);
  };

  private handleMessage = (event: MessageEvent) => {
    const message = event.data as Frame0xMessage;
    if (message.from === 'app') {
      switch (message.type) {
        case 'ready_ack':
          this.resHandler?.(message);
          break;
      };
    }
  };
}
