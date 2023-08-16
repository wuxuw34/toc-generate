import  TOC  from '../index';
import { TOCItemIns } from '../types/index';

// function findElement(element:HTMLElement,index:number,labels:string[]){
//     let res = {
//         el:element,
//         children:[] as any[]
//     }
//     const i = index
//     index ++
//      element.querySelectorAll(labels[i]).forEach(item=>{
//         res.children.push(findElement(item as HTMLElement,index,labels))
//      })

//      return res
// }

interface el {
  label: string;
  el: HTMLElement;
  children: el[];
}

const handleContent = (_: TOC) => {
  let { content, options } = _;
  let e = content!.querySelectorAll(options!.listenLabel!.join(','));
  // let tocArr:el = {
  //     label:'root',
  //     el:content,
  //     children:[]
  // }
  const flag: boolean[] = [];
  let tocArr: TOCItemIns[] = [
    {
      label: 'root',
      level: 0,
      children: [],
    },
  ];
  e.forEach((item, index) => {
    // @ts-ignore
    item._index = index;
    tocArr.push({
      label: item.tagName,
      text: item.innerHTML,
      el: item,
      level: parseInt(item.tagName.replace('H', '')),
      children: [] as any[],
    });
  });

  for (let i = 0; i < tocArr.length; i++) {
    for (let j = i + 1; j < tocArr.length; j++) {
      if (tocArr[i].level === tocArr[j].level - 1) {
        tocArr[i].children!.push(tocArr[j]);
        flag[j] = true;
      } else if (tocArr[i].level === tocArr[j].level) {
        break;
      }
    }
  }

  return tocArr[0].children;
};

export default handleContent;
