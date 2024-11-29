const e="You barely reach the safety of the cave when the whale smashes into the cave mouth, collapsing it. Sensors indicate another exit to this cave at a much greater depth, so you have no choice but to press on.\n\nAs your submarine slowly makes its way through the cave system, you notice that the four-digit [seven-segment displays](https://en.wikipedia.org/wiki/Seven-segment_display) in your submarine are malfunctioning; they must have been damaged during the escape. You'll be in a lot of trouble without them, so you'd better figure out what's wrong.\n\nEach digit of a seven-segment display is rendered by turning on or off any of seven segments named `a` through `g`:\n\n```\n  0:      1:      2:      3:      4:\n aaaa    ....    aaaa    aaaa    ....\nb    c  .    c  .    c  .    c  b    c\nb    c  .    c  .    c  .    c  b    c\n ....    ....    dddd    dddd    dddd\ne    f  .    f  e    .  .    f  .    f\ne    f  .    f  e    .  .    f  .    f\n gggg    ....    gggg    gggg    ....\n\n  5:      6:      7:      8:      9:\n aaaa    aaaa    aaaa    aaaa    aaaa\nb    .  b    .  .    c  b    c  b    c\nb    .  b    .  .    c  b    c  b    c\n dddd    dddd    ....    dddd    dddd\n.    f  e    f  .    f  e    f  .    f\n.    f  e    f  .    f  e    f  .    f\n gggg    gggg    ....    gggg    gggg\n```\n\nSo, to render a `1`, only segments `c` and `f` would be turned on; the rest would be off. To render a `7`, only segments `a`, `c`, and `f` would be turned on.\n\nThe problem is that the signals which control the segments have been mixed up on each display. The submarine is still trying to display numbers by producing output on signal wires `a` through `g`, but those wires are connected to segments **randomly**. Worse, the wire/segment connections are mixed up separately for each four-digit display! (All of the digits **within** a display use the same connections, though.)\n\nSo, you might know that only signal wires `b` and `g` are turned on, but that doesn't mean **segments** `b` and `g` are turned on: the only digit that uses two segments is `1`, so it must mean segments `c and `f` are meant to be on. With just that information, you still can't tell which wire (`b`/`g`) goes to which segment (`c`/`f`). For that, you'll need to collect more information.\n\nFor each display, you watch the changing signals for a while, make a note of **all ten unique signal patterns** you see, and then write down a single **four digit output value** (your puzzle input). Using the signal patterns, you should be able to work out which pattern corresponds to which digit.\n\nFor example, here is what you might see in a single entry in your notes:\n\n```\nacedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab |\ncdfeb fcadb cdfeb cdbaf\n```\n\n(The entry is wrapped here to two lines so it fits; in your notes, it will all be on a single line.)\n\nEach entry consists of ten **unique signal patterns**, a `|` delimiter, and finally the **four digit output value**. Within an entry, the same wire/segment connections are used (but you don't know what the connections actually are). The unique signal patterns correspond to the ten different ways the submarine tries to render a digit using the current wire/segment connections. Because `7` is the only digit that uses three segments, `dab` in the above example means that to render a `7`, signal lines `d`, `a`, and `b` are on. Because `4` is the only digit that uses four segments, `eafb` means that to render a `4`, signal lines `e`, `a`, `f`, and `b` are on.\n\nUsing this information, you should be able to work out which combination of signal wires corresponds to each of the ten digits. Then, you can decode the four digit output value. Unfortunately, in the above example, all of the digits in the output value (`cdfeb fcadb cdfeb cdbaf`) use five segments and are more difficult to deduce.\n\nFor now, **focus on the easy digits**. Consider this larger example:\n\n<pre>\nbe cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb |\n<b>fdgacbe</b> cefdb cefbgd <b>gcbe</b>\nedbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec |\nfcgedb <b>cgb</b> <b>dgebacf</b> <b>gc</b>\nfgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef |\n<b>cg</b> <b>cg</b> fdcagb <b>cbg</b>\nfbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega |\nefabcd cedba gadfec <b>cb</b>\naecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga |\n<b>gecf</b> <b>egdcabf</b> <b>bgf</b> bfgea\nfgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf |\n<b>gebdcfa</b> <b>ecba</b> <b>ca</b> <b>fadegcb</b>\ndbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf |\n<b>cefg</b> dcbef <b>fcge</b> <b>gbcadfe</b>\nbdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd |\n<b>ed</b> bcgafe cdgba cbgef\negadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg |\n<b>gbdfcae</b> <b>bgc</b> <b>cg</b> <b>cgb</b>\ngcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc |\n<b>fgae</b> cfgab <b>fg</b> bagce\n</pre>\n\nBecause the digits `1`, `4`, `7`, and `8` each use a unique number of segments, you should be able to tell which combinations of signals correspond to those digits. Counting **only digits in the output values** (the part after `|` on each line), in the above example, there are **`26`** instances of digits that use a unique number of segments (highlighted above).\n\n**In the output values, how many times do digits `1`, `4`, `7`, or `8` appear?**\n\n[comment]: <> (PART 2)\n\nThrough a little deduction, you should now be able to determine the remaining digits. Consider again the first example above:\n\n```\nacedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab |\ncdfeb fcadb cdfeb cdbaf\n```\n\nAfter some careful analysis, the mapping between signal wires and segments only make sense in the following configuration:\n\n```\n dddd\ne    a\ne    a\n ffff\ng    b\ng    b\n cccc\n```\n\nSo, the unique signal patterns would correspond to the following digits:\n\n- `acedgfb`: `8`\n- `cdfbe`: `5`\n- `gcdfa`: `2`\n- `fbcad`: `3`\n- `dab`: `7`\n- `cefabd`: `9`\n- `cdfgeb`: `6`\n- `eafb`: `4`\n- `cagedb`: `0`\n- `ab`: `1`\n\nThen, the four digits of the output value can be decoded:\n\n- `cdfeb`: **`5`**\n- `fcadb`: **`3`**\n- `cdfeb`: **`5`**\n- `cdbaf`: **`3`**\n\nTherefore, the output value for this entry is **`5353`**.\n\nFollowing this same process for each entry in the second, larger example above, the output value of each entry can be determined:\n\n- `fdgacbe cefdb cefbgd gcbe`: `8394`\n- `fcgedb cgb dgebacf gc`: `9781`\n- `cg cg fdcagb cbg`: `1197`\n- `efabcd cedba gadfec cb`: `9361`\n- `gecf egdcabf bgf bfgea`: `4873`\n- `gebdcfa ecba ca fadegcb`: `8418`\n- `cefg dcbef fcge gbcadfe`: `4548`\n- `ed bcgafe cdgba cbgef`: `1625`\n- `gbdfcae bgc cg cgb`: `8717`\n- `fgae cfgab fg bagce`: `4315`\n\nAdding all of the output values in this larger example produces **`61229`**.\n\nFor each entry, determine all of the wire/segment connections and decode the four-digit output values. **What do you get if you add up all of the output values?**";export{e as default};
