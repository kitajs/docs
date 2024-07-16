# Benchmark

`@kitajs/html` is a string builder and template engine on steroids.

You can run this benchmark yourself by cloning our
[source code](https://github.com/kitajs/html) and executing `pnpm bench`.

> Microbenchmarks can easily mislead with statistics, as discussed in
> [How to Lie with Statistics](https://en.wikipedia.org/wiki/How_to_Lie_with_Statistics).
> Please do not base any decisions solely on the information provided below.

The difference between the fastest and slowest builders is on the order of
microseconds. So, if _a millionth of a second_ is critical to you, **PLEASE STOP
WRITING JAVASCRIPT**.

## Results

Below is a results of a comparison against this package and other popular _"HTML
builders,"_ such as [React](https://react.dev/),
[Typed Html](https://github.com/nicojs/typed-html),
[Common Tags](https://github.com/zspecza/common-tags), and
[GHtml](https://github.com/gurgunday/ghtml).

```
cpu: 13th Gen Intel(R) Core(TM) i5-13600K
runtime: node v20.11.0 (x64-linux)

benchmark        time (avg)             (min … max)       p75       p99      p999
--------------------------------------------------- -----------------------------
• Many Components (31.4kb)
--------------------------------------------------- -----------------------------
KitaJS/Html  98'860 ns/iter    (76'287 ns … 448 µs) 97'481 ns    238 µs    410 µs
Typed Html      738 µs/iter     (635 µs … 1'398 µs)    779 µs  1'118 µs  1'398 µs
React         4'119 µs/iter   (3'871 µs … 4'775 µs)  4'210 µs  4'755 µs  4'775 µs
Common Tags   2'815 µs/iter   (2'565 µs … 3'461 µs)  2'905 µs  3'414 µs  3'461 µs
Ghtml           753 µs/iter     (654 µs … 1'358 µs)    773 µs  1'080 µs  1'358 µs

summary for Many Components (31.4kb)
  KitaJS/Html
   7.46x faster than Typed Html
   7.61x faster than Ghtml
   28.47x faster than Common Tags
   41.66x faster than React

• Many Props (7.4kb)
--------------------------------------------------- -----------------------------
KitaJS/Html  18'628 ns/iter    (15'527 ns … 515 µs) 16'945 ns 60'084 ns    218 µs
Typed Html   76'473 ns/iter    (65'986 ns … 509 µs) 70'509 ns    225 µs    379 µs
React        71'436 ns/iter    (56'823 ns … 805 µs) 65'783 ns    272 µs    482 µs
Common Tags  43'080 ns/iter    (36'634 ns … 594 µs) 39'846 ns    125 µs    357 µs
Ghtml        42'271 ns/iter    (37'753 ns … 511 µs) 39'867 ns    101 µs    319 µs

summary for Many Props (7.4kb)
  KitaJS/Html
   2.27x faster than Ghtml
   2.31x faster than Common Tags
   3.83x faster than React
   4.11x faster than Typed Html

• MdnHomepage (66.7Kb)
--------------------------------------------------- -----------------------------
KitaJS/Html  14'981 µs/iter (10'529 µs … 33'066 µs) 15'980 µs 33'066 µs 33'066 µs
Typed Html   28'667 µs/iter (25'501 µs … 36'842 µs) 30'385 µs 36'842 µs 36'842 µs
React        94'917 µs/iter    (85'455 µs … 108 ms)    105 ms    108 ms    108 ms
Common Tags  39'634 µs/iter (37'625 µs … 40'880 µs) 40'517 µs 40'880 µs 40'880 µs
Ghtml        37'052 µs/iter (33'344 µs … 41'569 µs) 39'852 µs 41'569 µs 41'569 µs

summary for MdnHomepage (66.7Kb)
  KitaJS/Html
   1.91x faster than Typed Html
   2.47x faster than Ghtml
   2.65x faster than Common Tags
   6.34x faster than React
```
