export interface OptionsIns {
  activeClass?: string; // 激活时当前选项的样式
  listenLabel?: Array<string>; // 需要监听的元素标签
  scrollElement?: string;
}

export interface TOCItemIns {
  label: string;
  text?: string;
  el?: any;
  level: number;
  children?: TOCItemIns[];
  tocItem?: any;
  _index?: number;
}
