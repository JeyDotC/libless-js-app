/**
 * @typedef {(el: HTMLElement, key: string, value: any) => void} AttrHandler
 * @type {Record<string, AttrHandler>}
 */
const AttrHandlers = {
  className: (element, key, value) => element.className = value,
  dataset: (element, key, value) => Object.entries(value || {}).forEach(([dataKey, dataValue]) => element.dataset[dataKey] = dataValue),
};
/**
 * @type {AttrHandler}
 */
const defaultAttrHandler = (element, key, value) => element.setAttribute(key, value);

/**
 * @template TElement
 * @callback SetChildren
 * @param {...*} children
 * @returns {TElement}
 */
/**
 * 
 * @param {string} tag 
 * @param {Object} attrs 
 * @returns {SetChildren}
 */
export function el(tag, attrs) {
  /**
   * @type {HTMLElement}
   */
  const element = document.createElement(tag);

  if (attrs instanceof Object) {
    Object.entries(attrs).forEach(
      ([attrName, attrValue]) => (AttrHandlers[attrName] || defaultAttrHandler)(element, attrName, attrValue)
    );
  }

  return (...children) => {
    children.forEach(child => {
      if (child instanceof HTMLElement) {
        element.appendChild(child);
      } else {
        element.appendChild(document.createTextNode(String(child ?? '')));
      }
    });
    return element;
  }
}

/**
 * 
 * @param {Object} attrs 
 * @returns {SetChildren<HTMLAnchorElement>}
 */
export function a(attrs) { return el('a', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLElement>}
 */
export function abbr(attrs) { return el('abbr', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLElement>}
 */
export function acronym(attrs) { return el('acronym', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLElement>}
 */
export function address(attrs) { return el('address', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLElement>}
 */
export function applet(attrs) { return el('applet', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLAreaElement>}
 */
export function area(attrs) { return el('area', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLElement>}
 */
export function article(attrs) { return el('article', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLElement>}
 */
export function aside(attrs) { return el('aside', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLAudioElement>}
 */
export function audio(attrs) { return el('audio', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLElement>}
 */
export function b(attrs) { return el('b', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLBaseElement>}
 */
export function base(attrs) { return el('base', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLElement>}
 */
export function basefont(attrs) { return el('basefont', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLElement>}
 */
export function bdi(attrs) { return el('bdi', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLElement>}
 */
export function bdo(attrs) { return el('bdo', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLElement>}
 */
export function big(attrs) { return el('big', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLElement>}
 */
export function blockquote(attrs) { return el('blockquote', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLBodyElement>}
 */
export function body(attrs) { return el('body', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLBRElement>}
 */
export function br(attrs) { return el('br', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLButtonElement>}
 */
export function button(attrs) { return el('button', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLCanvasElement>}
 */
export function canvas(attrs) { return el('canvas', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLTableCaptionElement>}
 */
export function caption(attrs) { return el('caption', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLElement>}
 */
export function center(attrs) { return el('center', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLElement>}
 */
export function cite(attrs) { return el('cite', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLElement>}
 */
export function code(attrs) { return el('code', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLTableColElement>}
 */
export function col(attrs) { return el('col', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLElement>}
 */
export function colgroup(attrs) { return el('colgroup', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLDataElement>}
 */
export function data(attrs) { return el('data', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLDataElement>}
 */
export function datalist(attrs) { return el('datalist', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLElement>}
 */
export function dd(attrs) { return el('dd', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLElement>}
 */
export function del(attrs) { return el('del', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLDetailsElement>}
 */
export function details(attrs) { return el('details', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLElement>}
 */
export function dfn(attrs) { return el('dfn', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLDialogElement>}
 */
export function dialog(attrs) { return el('dialog', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLElement>}
 */
export function dir(attrs) { return el('dir', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLDivElement>}
 */
export function div(attrs) { return el('div', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLElement>}
 */
export function dl(attrs) { return el('dl', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLElement>}
 */
export function dt(attrs) { return el('dt', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLElement>}
 */
export function em(attrs) { return el('em', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLEmbedElement>}
 */
export function embed(attrs) { return el('embed', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLFieldSetElement>}
 */
export function fieldset(attrs) { return el('fieldset', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLElement>}
 */
export function figcaption(attrs) { return el('figcaption', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLElement>}
 */
export function figure(attrs) { return el('figure', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLFontElement>}
 */
export function font(attrs) { return el('font', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLElement>}
 */
export function footer(attrs) { return el('footer', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLFormElement>}
 */
export function form(attrs) { return el('form', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLFrameElement>}
 */
export function frame(attrs) { return el('frame', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLFrameSetElement>}
 */
export function frameset(attrs) { return el('frameset', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLHeadElement>}
 */
export function head(attrs) { return el('head', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLElement>}
 */
export function header(attrs) { return el('header', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLHRElement>}
 */
export function hr(attrs) { return el('hr', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLHtmlElement>}
 */
export function html(attrs) { return el('html', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLElement>}
 */
export function i(attrs) { return el('i', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLIFrameElement>}
 */
export function iframe(attrs) { return el('iframe', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLImageElement>}
 */
export function img(attrs) { return el('img', attrs); }
/**
 * 
 * @param {Object} attrs 
 * @returns {SetChildren<HTMLInputElement>}
 */
export function input(attrs) { return el('input', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLElement>}
 */
export function ins(attrs) { return el('ins', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLElement>}
 */
export function kbd(attrs) { return el('kbd', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLLabelElement>}
 */
export function label(attrs) { return el('label', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLLegendElement>}
 */
export function legend(attrs) { return el('legend', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLLIElement>}
 */
export function li(attrs) { return el('li', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLLinkElement>}
 */
export function link(attrs) { return el('link', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLElement>}
 */
export function main(attrs) { return el('main', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLMapElement>}
 */
export function map(attrs) { return el('map', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLElement>}
 */
export function mark(attrs) { return el('mark', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLMetaElement>}
 */
export function meta(attrs) { return el('meta', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLMeterElement>}
 */
export function meter(attrs) { return el('meter', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLElement>}
 */
export function nav(attrs) { return el('nav', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLElement>}
 */
export function noframes(attrs) { return el('noframes', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLElement>}
 */
export function noscript(attrs) { return el('noscript', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLObjectElement>}
 */
export function object(attrs) { return el('object', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLOListElement>}
 */
export function ol(attrs) { return el('ol', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLOptGroupElement>}
 */
export function optgroup(attrs) { return el('optgroup', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLOptionElement>}
 */
export function option(attrs) { return el('option', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLOutputElement>}
 */
export function output(attrs) { return el('output', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLParagraphElement>}
 */
export function p(attrs) { return el('p', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLParamElement>}
 */
export function param(attrs) { return el('param', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLPictureElement>}
 */
export function picture(attrs) { return el('picture', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLPreElement>}
 */
export function pre(attrs) { return el('pre', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLProgressElement>}
 */
export function progress(attrs) { return el('progress', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLElement>}
 */
export function q(attrs) { return el('q', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLElement>}
 */
export function rp(attrs) { return el('rp', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLElement>}
 */
export function rt(attrs) { return el('rt', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLElement>}
 */
export function ruby(attrs) { return el('ruby', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLElement>}
 */
export function s(attrs) { return el('s', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLElement>}
 */
export function samp(attrs) { return el('samp', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLScriptElement>}
 */
export function script(attrs) { return el('script', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLElement>}
 */
export function section(attrs) { return el('section', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLSelectElement>}
 */
export function select(attrs) { return el('select', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLElement>}
 */
export function small(attrs) { return el('small', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLSourceElement>}
 */
export function source(attrs) { return el('source', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLElement>}
 */
export function span(attrs) { return el('span', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLElement>}
 */
export function strike(attrs) { return el('strike', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLElement>}
 */
export function strong(attrs) { return el('strong', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLStyleElement>}
 */
export function style(attrs) { return el('style', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLElement>}
 */
export function sub(attrs) { return el('sub', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLElement>}
 */
export function summary(attrs) { return el('summary', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLElement>}
 */
export function sup(attrs) { return el('sup', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<SVGElement>}
 */
export function svg(attrs) { return el('svg', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLTableElement>}
 */
export function table(attrs) { return el('table', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLTableSectionElement>}
 */
export function tbody(attrs) { return el('tbody', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLElement>}
 */
export function td(attrs) { return el('td', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLTemplateElement>}
 */
export function template(attrs) { return el('template', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLTextAreaElement>}
 */
export function textarea(attrs) { return el('textarea', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLTableSectionElement>}
 */
export function tfoot(attrs) { return el('tfoot', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLTableCellElement>}
 */
export function th(attrs) { return el('th', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLTableSectionElement>}
 */
export function thead(attrs) { return el('thead', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLTimeElement>}
 */
export function time(attrs) { return el('time', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLTitleElement>}
 */
export function title(attrs) { return el('title', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLTableRowElement>}
 */
export function tr(attrs) { return el('tr', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLTrackElement>}
 */
export function track(attrs) { return el('track', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLElement>}
 */
export function tt(attrs) { return el('tt', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLElement>}
 */
export function u(attrs) { return el('u', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLUListElement>}
 */
export function ul(attrs) { return el('ul', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLElement>}
 */
export function variable(attrs) { return el('var', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLVideoElement>}
 */
export function video(attrs) { return el('video', attrs); }
/**
 * @param {Object} attrs
 * @returns {SetChildren<HTMLElement>}
 */
export function wbr(attrs) { return el('wbr', attrs); }