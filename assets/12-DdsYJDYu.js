const e="You try contacting the Elves using your handheld device, but the river you're following must be too low to get a decent signal.\n\nYou ask the device for a heightmap of the surrounding area (your puzzle input). The heightmap shows the local area from above broken into a grid; the elevation of each square of the grid is given by a single lowercase letter, where `a` is the lowest elevation, `b` is the next-lowest, and so on up to the highest elevation, `z`.\n\nAlso included on the heightmap are marks for your current position (`S`) and the location that should get the best signal (`E`). Your current position (`S`) has elevation `a`, and the location that should get the best signal (`E`) has elevation `z`.\n\nYou'd like to reach `E`, but to save energy, you should do it in as **few steps as possible**. During each step, you can move exactly one square up, down, left, or right. To avoid needing to get out your climbing gear, the elevation of the destination square can be **at most one higher** than the elevation of your current square; that is, if your current elevation is `m`, you could step to elevation `n`, but not to elevation `o`. (This also means that the elevation of the destination square can be much lower than the elevation of your current square.)\n\nFor example:\n\n<pre>\n<b>S</b>abqponm\nabcryxxl\naccsz<b>E</b>xk\nacctuvwj\nabdefghi\n</pre>\n\nHere, you start in the top-left corner; your goal is near the middle. You could start by moving down or right, but eventually you'll need to head toward the `e` at the bottom. From there, you can spiral around to the goal:\n\n```\nv..v<<<<\n>v.vv<<^\n.>vv>E^^\n..v>>>^^\n..>>>>>^\n```\n\nIn the above diagram, the symbols indicate whether the path exits each square moving up (`^`), down (`v`), left (`<`), or right (`>`). The location that should get the best signal is still `E`, and `.` marks unvisited squares.\n\nThis path reaches the goal in **`31`** steps, the fewest possible.\n\n**What is the fewest steps required to move from your current position to the location that should get the best signal?**\n\n[comment]: <> (PART 2)\n\nAs you walk up the hill, you suspect that the Elves will want to turn this into a hiking trail. The beginning isn't very scenic, though; perhaps you can find a better starting point.\n\nTo maximize exercise while hiking, the trail should start as low as possible: elevation `a`. The goal is still the square marked `E`. However, the trail should still be direct, taking the fewest steps to reach its goal. So, you'll need to find the shortest path from **any square at elevation `a`** to the square marked `E`.\n\nAgain consider the example from above:\n\n<pre>\n<b>S</b>abqponm\nabcryxxl\naccsz<b>E</b>xk\nacctuvwj\nabdefghi\n</pre>\n\nNow, there are six choices for starting position (five marked `a`, plus the square marked `S` that counts as being at elevation `a`). If you start at the bottom-left square, you can reach the goal most quickly:\n\n```\n...v<<<<\n...vv<<^\n...v>E^^\n.>v>>>^^\n>^>>>>>^\n```\n\nThis path reaches the goal in only **`29`** steps, the fewest possible.\n\n**What is the fewest steps required to move starting from any square with elevation `a` to the location that should get the best signal?**";export{e as default};
