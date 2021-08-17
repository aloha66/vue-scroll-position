import {
    nextTick
  } from "vue-demi";
import type {Options,To,Each} from "./type"

interface Point {
    x:number,
    y:number
}

export default class Scroll  {
  private el:Element|null
  private exclude:Options['exclude']
  private posMap :Map<string,{x:number,y:number}> = new Map()
  private max:number
  private delay:Options['delay']

  constructor(options: Options) {
    console.log("options",options)

    this.el = document.querySelector(options.el);
    this.exclude = options.exclude
    this.max = options.max ??50
    this.delay = options.delay
  }

  private isIgnoreRoute  (target: To) {
    return this.exclude.some((e) => target.fullPath.match(e));
  };

  private getScrollPosition() {
    const {el} = this
    return {
      x: el ? el.scrollLeft : window.pageXOffset,
      y: el ? el.scrollTop : window.pageYOffset,
    };
  }
  private setScrollPosition(position:Point={x:0,y:0}){
      const scrollTo = () => {
        nextTick(() => {
            const {el} = this
            const {x,y} = position
        
                if (el) {
                    el.scrollLeft = x;
                    el.scrollTop = y;
                  } else {                   
                    window.scrollTo(x, y);
                  }
            
        })
      }
      const {delay} = this
      if(delay) {
          setTimeout(scrollTo, delay);
      } else {
        scrollTo()
      }
  }
  private clean() {
      const tmp = [...this.posMap]
      const len = tmp.length/2
      const arr = tmp.slice(len)
      this.posMap = new Map(arr)
    //  TODO lru
  }

// @ts-expect-error
  before(to, from, next) {
    if (this.isIgnoreRoute(from)) return next();
    const position = this.getScrollPosition();
    if(this.posMap.size>this.max) {
        this.clean()
    }
    this.posMap.set(from.fullPath,position)

    next()
  }


  after(to:To) {
    if (this.isIgnoreRoute(to)) return 
   const curPos = this.posMap.get(to.fullPath)
   if(curPos) {
          this.setScrollPosition(curPos)
   }
 
  }
}
