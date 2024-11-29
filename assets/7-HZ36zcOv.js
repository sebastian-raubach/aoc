const a="You land at the regional airport in time for your next flight. In fact, it looks like you'll even have time to grab some food: all flights are currently delayed due to **issues in luggage processing**.\n\nDue to recent aviation regulations, many rules (your puzzle input) are being enforced about bags and their contents; bags must be color-coded and must contain specific quantities of other color-coded bags. Apparently, nobody responsible for these regulations considered how long they would take to enforce!\n\nFor example, consider the following rules:\n\n```\nlight red bags contain 1 bright white bag, 2 muted yellow bags.\ndark orange bags contain 3 bright white bags, 4 muted yellow bags.\nbright white bags contain 1 shiny gold bag.\nmuted yellow bags contain 2 shiny gold bags, 9 faded blue bags.\nshiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.\ndark olive bags contain 3 faded blue bags, 4 dotted black bags.\nvibrant plum bags contain 5 faded blue bags, 6 dotted black bags.\nfaded blue bags contain no other bags.\ndotted black bags contain no other bags.\n```\n\nThese rules specify the required contents for `9` bag types. In this example, every `faded blue` bag is empty, every `vibrant plum` bag contains 11 bags (5 `faded blue` and 6 `dotted black`), and so on.\n\nYou have a **`shiny gold`** bag. If you wanted to carry it in at least one other bag, how many different bag colors would be valid for the outermost bag? (In other words: how many colors can, eventually, contain at least one shiny gold bag?)\n\nIn the above rules, the following options would be available to you:\n\n- A `bright white` bag, which can hold your `shiny gold` bag directly.\n- A `muted yellow` bag, which can hold your `shiny gold` bag directly, plus some other bags.\n- A `dark orange` bag, which can hold `bright white` and `muted yellow` bags, either of which could then hold your `shiny gold` bag.\n- A `light red` bag, which can hold `bright white` and muted `yellow bags`, either of which could then hold your `shiny gold` bag.\n\nSo, in this example, the number of bag colors that can eventually contain at least one `shiny gold` bag is **`4`**.\n\n**How many bag colors can eventually contain at least one `shiny gold` bag?** (The list of rules is quite long; make sure you get all of it.)\n\n[comment]: <> (PART 2)\n\nIt's getting pretty expensive to fly these days - not because of ticket prices, but because of the ridiculous number of bags you need to buy!\n\nConsider again your shiny gold bag and the rules from the above example:\n\n- `faded blue` bags contain `0` other bags.\n- `dotted black` bags contain `0` other bags.\n- `vibrant plum` bags contain `11` other bags: `5` `faded blue` bags and `6` `dotted black` bags.\n- `dark olive` bags contain `7` other bags: `3` `faded blue` bags and `4` `dotted black` bags.\n\nSo, a single `shiny gold` bag must contain 1 `dark olive` bag (and the 7 bags within it) plus 2 `vibrant plum` bags (and the 11 bags within **each** of those): `1 + 1*7 + 2 + 2*11` = `32` bags!\n\nOf course, the actual rules have a small chance of going several levels deeper than this example; be sure to count all of the bags, even if the nesting becomes topologically impractical!\n\nHere's another example:\n\n```\nshiny gold bags contain 2 dark red bags.\ndark red bags contain 2 dark orange bags.\ndark orange bags contain 2 dark yellow bags.\ndark yellow bags contain 2 dark green bags.\ndark green bags contain 2 dark blue bags.\ndark blue bags contain 2 dark violet bags.\ndark violet bags contain no other bags.\n```\n\nIn this example, a single `shiny gold` bag must contain `126` other bags.\n\n**How many individual bags are required inside your single shiny gold bag?**";export{a as default};
