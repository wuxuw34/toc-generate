import  TOC  from '../index';
import { OptionsIns } from '../types/index';
import defaultOptions from '../config/options';

const initOptions = (_: TOC, options: OptionsIns) => {
  _.options = Object.assign({}, defaultOptions);

  if (options) {
    Object.keys(options).forEach((key) => {
      _.options![key as keyof OptionsIns] = options[key as keyof OptionsIns] as any;
    });
  }
};
export default initOptions;
