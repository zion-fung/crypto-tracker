/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(null, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/common/locales/ar-DZ", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // THIS CODE IS GENERATED - DO NOT MODIFY
    // See angular/tools/gulp-tasks/cldr/extract.js
    var u = undefined;
    function plural(n) {
        if (n === 0)
            return 0;
        if (n === 1)
            return 1;
        if (n === 2)
            return 2;
        if (n % 100 === Math.floor(n % 100) && n % 100 >= 3 && n % 100 <= 10)
            return 3;
        if (n % 100 === Math.floor(n % 100) && n % 100 >= 11 && n % 100 <= 99)
            return 4;
        return 5;
    }
    exports.default = [
        'ar-DZ', [['ص', 'م'], u, u], [['ص', 'م'], u, ['صباحًا', 'مساءً']],
        [
            ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'],
            [
                'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس',
                'الجمعة', 'السبت'
            ],
            u, ['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت']
        ],
        u,
        [
            ['ج', 'ف', 'م', 'أ', 'م', 'ج', 'ج', 'أ', 'س', 'أ', 'ن', 'د'],
            [
                'جانفي', 'فيفري', 'مارس', 'أفريل', 'ماي', 'جوان', 'جويلية',
                'أوت', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
            ],
            u
        ],
        u, [['ق.م', 'م'], u, ['قبل الميلاد', 'ميلادي']], 6, [5, 6],
        ['d\u200f/M\u200f/y', 'dd\u200f/MM\u200f/y', 'd MMMM y', 'EEEE، d MMMM y'],
        ['h:mm a', 'h:mm:ss a', 'h:mm:ss a z', 'h:mm:ss a zzzz'], ['{1} {0}', u, u, u],
        [
            ',', '.', ';', '\u200e%\u200e', '\u200e+', '\u200e-', 'E', '×', '‰', '∞',
            'ليس رقمًا', ':'
        ],
        ['#,##0.###', '#,##0%', '¤ #,##0.00', '#E0'], 'د.ج.\u200f', 'دينار جزائري', {
            'AED': ['د.إ.\u200f'],
            'ARS': [u, 'AR$'],
            'AUD': ['AU$'],
            'BBD': [u, 'BB$'],
            'BHD': ['د.ب.\u200f'],
            'BMD': [u, 'BM$'],
            'BND': [u, 'BN$'],
            'BSD': [u, 'BS$'],
            'BZD': [u, 'BZ$'],
            'CAD': ['CA$'],
            'CLP': [u, 'CL$'],
            'CNY': ['CN¥'],
            'COP': [u, 'CO$'],
            'CUP': [u, 'CU$'],
            'DOP': [u, 'DO$'],
            'DZD': ['د.ج.\u200f'],
            'EGP': ['ج.م.\u200f', 'E£'],
            'FJD': [u, 'FJ$'],
            'GBP': ['£', 'UK£'],
            'GYD': [u, 'GY$'],
            'HKD': ['HK$'],
            'IQD': ['د.ع.\u200f'],
            'IRR': ['ر.إ.'],
            'JMD': [u, 'JM$'],
            'JOD': ['د.أ.\u200f'],
            'JPY': ['JP¥'],
            'KWD': ['د.ك.\u200f'],
            'KYD': [u, 'KY$'],
            'LBP': ['ل.ل.\u200f', 'L£'],
            'LYD': ['د.ل.\u200f'],
            'MAD': ['د.م.\u200f'],
            'MRO': ['أ.م.\u200f'],
            'MXN': ['MX$'],
            'NZD': ['NZ$'],
            'OMR': ['ر.ع.\u200f'],
            'QAR': ['ر.ق.\u200f'],
            'SAR': ['ر.س.\u200f'],
            'SBD': [u, 'SB$'],
            'SDD': ['د.س.\u200f'],
            'SDG': ['ج.س.'],
            'SRD': [u, 'SR$'],
            'SYP': ['ل.س.\u200f', '£'],
            'THB': ['฿'],
            'TND': ['د.ت.\u200f'],
            'TTD': [u, 'TT$'],
            'TWD': ['NT$'],
            'USD': ['US$'],
            'UYU': [u, 'UY$'],
            'XXX': ['***'],
            'YER': ['ر.ي.\u200f']
        },
        plural
    ];
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXItRFouanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21tb24vbG9jYWxlcy9hci1EWi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7OztJQUVILHlDQUF5QztJQUN6QywrQ0FBK0M7SUFFL0MsSUFBTSxDQUFDLEdBQUcsU0FBUyxDQUFDO0lBRXBCLGdCQUFnQixDQUFTO1FBQ3ZCLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxFQUFFLENBQUM7WUFBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQy9FLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxFQUFFLENBQUM7WUFBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ2hGLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRUQsa0JBQWU7UUFDYixPQUFPLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FB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RSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUM7WUFDakIsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQ2QsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQ2QsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQztZQUNqQixLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFDZCxLQUFLLEVBQUUsQ0FBQyxZQUFZLENBQUM7U0FDdEI7UUFDRCxNQUFNO0tBQ1AsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuLy8gVEhJUyBDT0RFIElTIEdFTkVSQVRFRCAtIERPIE5PVCBNT0RJRllcbi8vIFNlZSBhbmd1bGFyL3Rvb2xzL2d1bHAtdGFza3MvY2xkci9leHRyYWN0LmpzXG5cbmNvbnN0IHUgPSB1bmRlZmluZWQ7XG5cbmZ1bmN0aW9uIHBsdXJhbChuOiBudW1iZXIpOiBudW1iZXIge1xuICBpZiAobiA9PT0gMCkgcmV0dXJuIDA7XG4gIGlmIChuID09PSAxKSByZXR1cm4gMTtcbiAgaWYgKG4gPT09IDIpIHJldHVybiAyO1xuICBpZiAobiAlIDEwMCA9PT0gTWF0aC5mbG9vcihuICUgMTAwKSAmJiBuICUgMTAwID49IDMgJiYgbiAlIDEwMCA8PSAxMCkgcmV0dXJuIDM7XG4gIGlmIChuICUgMTAwID09PSBNYXRoLmZsb29yKG4gJSAxMDApICYmIG4gJSAxMDAgPj0gMTEgJiYgbiAlIDEwMCA8PSA5OSkgcmV0dXJuIDQ7XG4gIHJldHVybiA1O1xufVxuXG5leHBvcnQgZGVmYXVsdCBbXG4gICdhci1EWicsIFtbJ9i1JywgJ9mFJ10sIHUsIHVdLCBbWyfYtScsICfZhSddLCB1LCBbJ9i12KjYp9it2YvYpycsICfZhdiz2KfYodmLJ11dLFxuICBbXG4gICAgWyfYrScsICfZhicsICfYqycsICfYsScsICfYricsICfYrCcsICfYsyddLFxuICAgIFtcbiAgICAgICfYp9mE2KPYrdivJywgJ9in2YTYp9ir2YbZitmGJywgJ9in2YTYq9mE2KfYq9in2KEnLCAn2KfZhNij2LHYqNi52KfYoScsICfYp9mE2K7ZhdmK2LMnLFxuICAgICAgJ9in2YTYrNmF2LnYqScsICfYp9mE2LPYqNiqJ1xuICAgIF0sXG4gICAgdSwgWyfYo9it2K8nLCAn2KXYq9mG2YrZhicsICfYq9mE2KfYq9in2KEnLCAn2KPYsdio2LnYp9ihJywgJ9iu2YXZitizJywgJ9is2YXYudipJywgJ9iz2KjYqiddXG4gIF0sXG4gIHUsXG4gIFtcbiAgICBbJ9isJywgJ9mBJywgJ9mFJywgJ9ijJywgJ9mFJywgJ9isJywgJ9isJywgJ9ijJywgJ9izJywgJ9ijJywgJ9mGJywgJ9ivJ10sXG4gICAgW1xuICAgICAgJ9is2KfZhtmB2YonLCAn2YHZitmB2LHZiicsICfZhdin2LHYsycsICfYo9mB2LHZitmEJywgJ9mF2KfZiicsICfYrNmI2KfZhicsICfYrNmI2YrZhNmK2KknLFxuICAgICAgJ9ij2YjYqicsICfYs9io2KrZhdio2LEnLCAn2KPZg9iq2YjYqNixJywgJ9mG2YjZgdmF2KjYsScsICfYr9mK2LPZhdio2LEnXG4gICAgXSxcbiAgICB1XG4gIF0sXG4gIHUsIFtbJ9mCLtmFJywgJ9mFJ10sIHUsIFsn2YLYqNmEINin2YTZhdmK2YTYp9ivJywgJ9mF2YrZhNin2K/ZiiddXSwgNiwgWzUsIDZdLFxuICBbJ2RcXHUyMDBmL01cXHUyMDBmL3knLCAnZGRcXHUyMDBmL01NXFx1MjAwZi95JywgJ2QgTU1NTSB5JywgJ0VFRUXYjCBkIE1NTU0geSddLFxuICBbJ2g6bW0gYScsICdoOm1tOnNzIGEnLCAnaDptbTpzcyBhIHonLCAnaDptbTpzcyBhIHp6enonXSwgWyd7MX0gezB9JywgdSwgdSwgdV0sXG4gIFtcbiAgICAnLCcsICcuJywgJzsnLCAnXFx1MjAwZSVcXHUyMDBlJywgJ1xcdTIwMGUrJywgJ1xcdTIwMGUtJywgJ0UnLCAnw5cnLCAn4oCwJywgJ+KInicsXG4gICAgJ9mE2YrYs8Kg2LHZgtmF2YvYpycsICc6J1xuICBdLFxuICBbJyMsIyMwLiMjIycsICcjLCMjMCUnLCAnwqTCoCMsIyMwLjAwJywgJyNFMCddLCAn2K8u2KwuXFx1MjAwZicsICfYr9mK2YbYp9ixINis2LLYp9im2LHZiicsIHtcbiAgICAnQUVEJzogWyfYry7YpS5cXHUyMDBmJ10sXG4gICAgJ0FSUyc6IFt1LCAnQVIkJ10sXG4gICAgJ0FVRCc6IFsnQVUkJ10sXG4gICAgJ0JCRCc6IFt1LCAnQkIkJ10sXG4gICAgJ0JIRCc6IFsn2K8u2KguXFx1MjAwZiddLFxuICAgICdCTUQnOiBbdSwgJ0JNJCddLFxuICAgICdCTkQnOiBbdSwgJ0JOJCddLFxuICAgICdCU0QnOiBbdSwgJ0JTJCddLFxuICAgICdCWkQnOiBbdSwgJ0JaJCddLFxuICAgICdDQUQnOiBbJ0NBJCddLFxuICAgICdDTFAnOiBbdSwgJ0NMJCddLFxuICAgICdDTlknOiBbJ0NOwqUnXSxcbiAgICAnQ09QJzogW3UsICdDTyQnXSxcbiAgICAnQ1VQJzogW3UsICdDVSQnXSxcbiAgICAnRE9QJzogW3UsICdETyQnXSxcbiAgICAnRFpEJzogWyfYry7YrC5cXHUyMDBmJ10sXG4gICAgJ0VHUCc6IFsn2Kwu2YUuXFx1MjAwZicsICdFwqMnXSxcbiAgICAnRkpEJzogW3UsICdGSiQnXSxcbiAgICAnR0JQJzogWyfCoycsICdVS8KjJ10sXG4gICAgJ0dZRCc6IFt1LCAnR1kkJ10sXG4gICAgJ0hLRCc6IFsnSEskJ10sXG4gICAgJ0lRRCc6IFsn2K8u2LkuXFx1MjAwZiddLFxuICAgICdJUlInOiBbJ9ixLtilLiddLFxuICAgICdKTUQnOiBbdSwgJ0pNJCddLFxuICAgICdKT0QnOiBbJ9ivLtijLlxcdTIwMGYnXSxcbiAgICAnSlBZJzogWydKUMKlJ10sXG4gICAgJ0tXRCc6IFsn2K8u2YMuXFx1MjAwZiddLFxuICAgICdLWUQnOiBbdSwgJ0tZJCddLFxuICAgICdMQlAnOiBbJ9mELtmELlxcdTIwMGYnLCAnTMKjJ10sXG4gICAgJ0xZRCc6IFsn2K8u2YQuXFx1MjAwZiddLFxuICAgICdNQUQnOiBbJ9ivLtmFLlxcdTIwMGYnXSxcbiAgICAnTVJPJzogWyfYoy7ZhS5cXHUyMDBmJ10sXG4gICAgJ01YTic6IFsnTVgkJ10sXG4gICAgJ05aRCc6IFsnTlokJ10sXG4gICAgJ09NUic6IFsn2LEu2LkuXFx1MjAwZiddLFxuICAgICdRQVInOiBbJ9ixLtmCLlxcdTIwMGYnXSxcbiAgICAnU0FSJzogWyfYsS7Ysy5cXHUyMDBmJ10sXG4gICAgJ1NCRCc6IFt1LCAnU0IkJ10sXG4gICAgJ1NERCc6IFsn2K8u2LMuXFx1MjAwZiddLFxuICAgICdTREcnOiBbJ9isLtizLiddLFxuICAgICdTUkQnOiBbdSwgJ1NSJCddLFxuICAgICdTWVAnOiBbJ9mELtizLlxcdTIwMGYnLCAnwqMnXSxcbiAgICAnVEhCJzogWyfguL8nXSxcbiAgICAnVE5EJzogWyfYry7Yqi5cXHUyMDBmJ10sXG4gICAgJ1RURCc6IFt1LCAnVFQkJ10sXG4gICAgJ1RXRCc6IFsnTlQkJ10sXG4gICAgJ1VTRCc6IFsnVVMkJ10sXG4gICAgJ1VZVSc6IFt1LCAnVVkkJ10sXG4gICAgJ1hYWCc6IFsnKioqJ10sXG4gICAgJ1lFUic6IFsn2LEu2YouXFx1MjAwZiddXG4gIH0sXG4gIHBsdXJhbFxuXTtcbiJdfQ==