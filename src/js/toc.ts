import  TOC  from '../index';
import { TOCItemIns } from '../types/index';

function createEL(el: TOCItemIns) {
  const li = document.createElement('li');
  const a = createA(el);
  li.appendChild(a);
  if (el.children && el.children?.length > 0) {
    const ol = document.createElement('ol');
    for (let i = 0; i < el.children.length; i++) {
      ol.appendChild(createEL(el.children[i]));
    }
    li.appendChild(ol);
  }
  return li;
}

function createA(el: TOCItemIns) {
  const a = document.createElement('a');
  a.innerHTML = el.text as string;
  a.href = `#${el.text}`;
  el.tocItem = a;
  el.el._toc = a;
  return a;
}

function createTOC(_: TOC) {
  const ol = document.createElement('ol');
  for (let i = 0; i < _.tocArr!.length; i++) {
    ol.appendChild(createEL(_.tocArr![i]));
  }
  return ol;
}

export default createTOC;
