const e="The Elves of Gear Island are thankful for your help and send you on your way. They even have a hang glider that someone [stole](https://adventofcode.com/2023/day/9) from Desert Island; since you're already going that direction, it would help them a lot if you would use it to get down there and return it to them.\n\nAs you reach the bottom of the **relentless avalanche of machine parts**, you discover that they're already forming a formidable heap. Don't worry, though - a group of Elves is already here organizing the parts, and they have a **system**.\n\nTo start, each part is rated in each of four categories:\n\n- `x`: E**x**tremely cool looking\n- `m`: **M**usical (it makes a noise when you hit it)\n- `a`: **A**erodynamic\n- `s`: **S**hiny\n\nThen, each part is sent through a series of **workflows** that will ultimately **accept** or **reject** the part. Each workflow has a name and contains a list of rules; each rule specifies a condition and where to send the part if the condition is true. The first rule that matches the part being considered is applied immediately, and the part moves on to the destination described by the rule. (The last rule in each workflow has no condition and always applies if reached.)\n\nConsider the workflow `ex{x>10:one,m<20:two,a>30:R,A}`. This workflow is named ex and contains four rules. If workflow ex were considering a specific part, it would perform the following steps in order:\n\n- Rule \"`x>10:one`\": If the part's `x` is more than `10`, send the part to the workflow named `one`.\n- Rule \"`m<20:two`\": Otherwise, if the part's `m` is less than `20`, send the part to the workflow named `two`.\n- Rule \"`a>30:R`\": Otherwise, if the part's `a` is more than `30`, the part is immediately **rejected** (`R`).\n- Rule \"`A`\": Otherwise, because no other rules matched the part, the part is immediately **accepted** (`A`).\n\nIf a part is sent to another workflow, it immediately switches to the start of that workflow instead and never returns. If a part is **accepted** (sent to `A`) or **rejected** (sent to `R`), the part immediately stops any further processing.\n\nThe system works, but it's not keeping up with the torrent of weird metal shapes. The Elves ask if you can help sort a few parts and give you the list of workflows and some part ratings (your puzzle input). For example:\n\n```\npx{a<2006:qkq,m>2090:A,rfg}\npv{a>1716:R,A}\nlnx{m>1548:A,A}\nrfg{s<537:gd,x>2440:R,A}\nqs{s>3448:A,lnx}\nqkq{x<1416:A,crn}\ncrn{x>2662:A,R}\nin{s<1351:px,qqz}\nqqz{s>2770:qs,m<1801:hdj,R}\ngd{a>3333:R,R}\nhdj{m>838:A,pv}\n\n{x=787,m=2655,a=1222,s=2876}\n{x=1679,m=44,a=2067,s=496}\n{x=2036,m=264,a=79,s=2244}\n{x=2461,m=1339,a=466,s=291}\n{x=2127,m=1623,a=2188,s=1013}\n```\n\nThe workflows are listed first, followed by a blank line, then the ratings of the parts the Elves would like you to sort. All parts begin in the workflow named `in`. In this example, the five listed parts go through the following workflows:\n\n- `{x=787,m=2655,a=1222,s=2876}`: `in` -> `qqz` -> `qs` -> `lnx` -> **`A`**\n- `{x=1679,m=44,a=2067,s=496}`: `in` -> `px` -> `rfg` -> `gd` -> **`R`**\n- `{x=2036,m=264,a=79,s=2244}`: `in` -> `qqz` -> `hdj` -> `pv` -> **`A`**\n- `{x=2461,m=1339,a=466,s=291}`: `in` -> `px` -> `qkq` -> `crn` -> **`R`**\n- `{x=2127,m=1623,a=2188,s=1013}`: `in` -> `px` -> `rfg` -> **`A`**\n\nUltimately, three parts are **accepted**. Adding up the `x`, `m`, `a`, and `s` rating for each of the accepted parts gives `7540` for the part with `x=787`, `4623` for the part with `x=2036`, and `6951` for the part with `x=2127`. Adding all of the ratings for **all** of the accepted parts gives the sum total of **`19114`**.\n\nSort through all of the parts you've been given; **what do you get if you add together all of the rating numbers for all of the parts that ultimately get accepted?**\n\n[comment]: <> (PART 2)\n\nEven with your help, the sorting process **still** isn't fast enough.\n\nOne of the Elves comes up with a new plan: rather than sort parts individually through all of these workflows, maybe you can figure out in advance which combinations of ratings will be accepted or rejected.\n\nEach of the four ratings (`x`, `m`, `a`, `s`) can have an integer value ranging from a minimum of `1` to a maximum of `4000`. Of **all possible distinct combinations** of ratings, your job is to figure out which ones will be **accepted**.\n\nIn the above example, there are **`167409079868000`** distinct combinations of ratings that will be accepted.\n\nConsider only your list of workflows; the list of part ratings that the Elves wanted you to sort is no longer relevant. **How many distinct combinations of ratings will be accepted by the Elves' workflows?**";export{e as default};