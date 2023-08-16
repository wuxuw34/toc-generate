import { OptionsIns, TOCItemIns } from './types/index';
declare class TOC {
    content: HTMLElement | null;
    toc: HTMLElement | null;
    options: OptionsIns | null;
    tocArr: TOCItemIns[] | null;
    observer: IntersectionObserver | null;
    scrollMove: 'up' | 'down';
    scrollThrottle: any;
    constructor(contentElement?: HTMLElement | string, TOCElement?: HTMLElement | string, options?: OptionsIns);
    /**
     * 设置所要生成目录的元素区域
     * @param contentElement
     */
    setContent(contentElement?: HTMLElement | string): void;
    /**
     * 填充目录的区域
     * @param TOCElement
     */
    setTOCElement(TOCElement?: HTMLElement | string): void;
    setOptions(options: OptionsIns): void;
    getContentElement(): void;
    initObserve(): void;
    addScrollListener(): void;
    removeScrollListener(): void;
    scrollFunc(pre: number, now: number): void;
}
export default TOC;
