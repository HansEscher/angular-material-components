import { Directive, ElementRef, AfterViewInit } from '@angular/core';
// // import * as hljs from 'highlight.js';
// const hljs = require('highlight.js/lib/common');

import hljs from 'highlight.js/lib/common';

@Directive({
    selector: 'code[ngxMatHighlight]'
})
export class NgxMatHighlightDirective implements AfterViewInit {
    constructor(private eltRef: ElementRef) {
    }
    ngAfterViewInit() {
        hljs.highlightBlock(this.eltRef.nativeElement);
    }
}
