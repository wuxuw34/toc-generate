import initOptions from './js/init';
import { OptionsIns, TOCItemIns } from './types/index';
import handleContent from './js/content';
import createTOC from './js/toc';
import { throttle } from './js/utils';

 class TOC {
  content: HTMLElement | null = null;
  toc: HTMLElement | null = null;
  options: OptionsIns|null = null;
  tocArr: TOCItemIns[]|null = null;
  observer: IntersectionObserver | null = null;
  scrollMove: 'up' | 'down' = 'down';
  scrollThrottle: any = null;

  constructor(contentElement?: HTMLElement | string, TOCElement?: HTMLElement | string, options?: OptionsIns) {
    this.setContent(contentElement);
    this.setTOCElement(TOCElement);
    initOptions(this, options as OptionsIns);
    this.getContentElement();
    this.scrollThrottle = throttle((pre: number, now: number) => {
      if (pre < now) {
        this.scrollMove = 'down';
      } else {
        this.scrollMove = 'up';
      }
    }, 500);
    this.addScrollListener();
    this.initObserve();
    this.toc!.appendChild(createTOC(this));
  }

  /**
   * 设置所要生成目录的元素区域
   * @param contentElement
   */
  setContent(contentElement?: HTMLElement | string) {
    if (contentElement instanceof HTMLElement) {
      this.content = contentElement;
    } else {
      this.content = document.querySelector(contentElement as string);
    }
  }

  /**
   * 填充目录的区域
   * @param TOCElement
   */
  setTOCElement(TOCElement?: HTMLElement | string) {
    if (TOCElement instanceof HTMLElement) {
      this.toc = TOCElement;
    } else {
      this.toc = document.querySelector(TOCElement as string);
    }
  }

  setOptions(options: OptionsIns) {
    initOptions(this, options);
  }

  getContentElement() {
    this.tocArr = handleContent(this) as TOCItemIns[];
  }

  initObserve() {
    const els = this.content?.querySelectorAll(this.options!.listenLabel!.join(','));
    function active(index: number) {
      // @ts-ignore
      els[index]._toc.classList.add('active');
      if(els?.length)
        els.forEach((item) => {
          // @ts-ignore
          const _i = item._index;
          if (_i !== index) {
            // @ts-ignore
            item._toc.classList.remove('active');
          }
        });
    }
    const option = {
      rootMargin: '10px',
      threshold: [1, 0],
    };
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((item: any) => {
        const { boundingClientRect, target } = item;

        // @ts-ignore
        const index = target._index;
        if (this.scrollMove === 'down' && boundingClientRect.y <= 50) {
          active(index);
        } else if (this.scrollMove === 'up' && boundingClientRect.y < 20) {
          active(index - 1 >= 0 ? index - 1 : index);
        }
      });
    }, option);
    this.content?.querySelectorAll(this.options!.listenLabel!.join(',')).forEach((item) => {
      this.observer!.observe(item);
    });
  }

  addScrollListener() {
    let pre = 0;
    window.addEventListener('scroll', (e: any) => {
      this.scrollFunc(pre, e.target.scrollingElement.scrollTop);
      pre = e.target.scrollingElement.scrollTop;
    });
  }

  removeScrollListener() {}

  scrollFunc(pre: number, now: number) {
    this.scrollThrottle(pre, now);
  }
}

export default TOC

