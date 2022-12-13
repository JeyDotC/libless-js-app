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
export function abbr(attrs) { return el('abbr', attrs); }
export function acronym(attrs) { return el('acronym', attrs); }
export function address(attrs) { return el('address', attrs); }
export function applet(attrs) { return el('applet', attrs); }
export function area(attrs) { return el('area', attrs); }
export function article(attrs) { return el('article', attrs); }
export function aside(attrs) { return el('aside', attrs); }
export function audio(attrs) { return el('audio', attrs); }
export function b(attrs) { return el('b', attrs); }
export function base(attrs) { return el('base', attrs); }
export function basefont(attrs) { return el('basefont', attrs); }
export function bdi(attrs) { return el('bdi', attrs); }
export function bdo(attrs) { return el('bdo', attrs); }
export function big(attrs) { return el('big', attrs); }
export function blockquote(attrs) { return el('blockquote', attrs); }
export function body(attrs) { return el('body', attrs); }
export function br(attrs) { return el('br', attrs); }
export function button(attrs) { return el('button', attrs); }
export function canvas(attrs) { return el('canvas', attrs); }
export function caption(attrs) { return el('caption', attrs); }
export function center(attrs) { return el('center', attrs); }
export function cite(attrs) { return el('cite', attrs); }
export function code(attrs) { return el('code', attrs); }
export function col(attrs) { return el('col', attrs); }
export function colgroup(attrs) { return el('colgroup', attrs); }
export function data(attrs) { return el('data', attrs); }
export function datalist(attrs) { return el('datalist', attrs); }
export function dd(attrs) { return el('dd', attrs); }
export function del(attrs) { return el('del', attrs); }
export function details(attrs) { return el('details', attrs); }
export function dfn(attrs) { return el('dfn', attrs); }
export function dialog(attrs) { return el('dialog', attrs); }
export function dir(attrs) { return el('dir', attrs); }
export function div(attrs) { return el('div', attrs); }
export function dl(attrs) { return el('dl', attrs); }
export function dt(attrs) { return el('dt', attrs); }
export function em(attrs) { return el('em', attrs); }
export function embed(attrs) { return el('embed', attrs); }
export function fieldset(attrs) { return el('fieldset', attrs); }
export function figcaption(attrs) { return el('figcaption', attrs); }
export function figure(attrs) { return el('figure', attrs); }
export function font(attrs) { return el('font', attrs); }
export function footer(attrs) { return el('footer', attrs); }
export function form(attrs) { return el('form', attrs); }
export function frame(attrs) { return el('frame', attrs); }
export function frameset(attrs) { return el('frameset', attrs); }
export function head(attrs) { return el('head', attrs); }
export function header(attrs) { return el('header', attrs); }
export function hr(attrs) { return el('hr', attrs); }
export function html(attrs) { return el('html', attrs); }
export function i(attrs) { return el('i', attrs); }
export function iframe(attrs) { return el('iframe', attrs); }
export function img(attrs) { return el('img', attrs); }
/**
 * 
 * @param {Object} attrs 
 * @returns {SetChildren<HTMLInputElement>}
 */
export function input(attrs) { return el('input', attrs); }
export function ins(attrs) { return el('ins', attrs); }
export function kbd(attrs) { return el('kbd', attrs); }
export function label(attrs) { return el('label', attrs); }
export function legend(attrs) { return el('legend', attrs); }
export function li(attrs) { return el('li', attrs); }
export function link(attrs) { return el('link', attrs); }
export function main(attrs) { return el('main', attrs); }
export function map(attrs) { return el('map', attrs); }
export function mark(attrs) { return el('mark', attrs); }
export function meta(attrs) { return el('meta', attrs); }
export function meter(attrs) { return el('meter', attrs); }
export function nav(attrs) { return el('nav', attrs); }
export function noframes(attrs) { return el('noframes', attrs); }
export function noscript(attrs) { return el('noscript', attrs); }
export function object(attrs) { return el('object', attrs); }
export function ol(attrs) { return el('ol', attrs); }
export function optgroup(attrs) { return el('optgroup', attrs); }
export function option(attrs) { return el('option', attrs); }
export function output(attrs) { return el('output', attrs); }
export function p(attrs) { return el('p', attrs); }
export function param(attrs) { return el('param', attrs); }
export function picture(attrs) { return el('picture', attrs); }
export function pre(attrs) { return el('pre', attrs); }
export function progress(attrs) { return el('progress', attrs); }
export function q(attrs) { return el('q', attrs); }
export function rp(attrs) { return el('rp', attrs); }
export function rt(attrs) { return el('rt', attrs); }
export function ruby(attrs) { return el('ruby', attrs); }
export function s(attrs) { return el('s', attrs); }
export function samp(attrs) { return el('samp', attrs); }
export function script(attrs) { return el('script', attrs); }
export function section(attrs) { return el('section', attrs); }
export function select(attrs) { return el('select', attrs); }
export function small(attrs) { return el('small', attrs); }
export function source(attrs) { return el('source', attrs); }
export function span(attrs) { return el('span', attrs); }
export function strike(attrs) { return el('strike', attrs); }
export function strong(attrs) { return el('strong', attrs); }
export function style(attrs) { return el('style', attrs); }
export function sub(attrs) { return el('sub', attrs); }
export function summary(attrs) { return el('summary', attrs); }
export function sup(attrs) { return el('sup', attrs); }
export function svg(attrs) { return el('svg', attrs); }
export function table(attrs) { return el('table', attrs); }
export function tbody(attrs) { return el('tbody', attrs); }
export function td(attrs) { return el('td', attrs); }
export function template(attrs) { return el('template', attrs); }
export function textarea(attrs) { return el('textarea', attrs); }
export function tfoot(attrs) { return el('tfoot', attrs); }
export function th(attrs) { return el('th', attrs); }
export function thead(attrs) { return el('thead', attrs); }
export function time(attrs) { return el('time', attrs); }
export function title(attrs) { return el('title', attrs); }
export function tr(attrs) { return el('tr', attrs); }
export function track(attrs) { return el('track', attrs); }
export function tt(attrs) { return el('tt', attrs); }
export function u(attrs) { return el('u', attrs); }
export function ul(attrs) { return el('ul', attrs); }
export function variable(attrs) { return el('var', attrs); }
export function video(attrs) { return el('video', attrs); }
export function wbr(attrs) { return el('wbr', attrs); }