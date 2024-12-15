const e="\"Our computers are having issues, so I have no idea if we have any Chief Historians in stock! You're welcome to check the warehouse, though,\" says the mildly flustered shopkeeper at the [North Pole Toboggan Rental Shop](https://adventofcode.com/2020/day/2). The Historians head out to take a look.\n\nThe shopkeeper turns to you. \"Any chance you can see why our computers are having issues again?\"\n\nThe computer appears to be trying to run a program, but its memory (your puzzle input) is **corrupted**. All of the instructions have been jumbled up!\n\nIt seems like the goal of the program is just to **multiply some numbers**. It does that with instructions like `mul(X,Y)`, where `X` and `Y` are each 1-3 digit numbers. For instance, `mul(44,46)` multiplies `44` by `46` to get a result of `2024`. Similarly, `mul(123,4)` would multiply `123` by `4`.\n\nHowever, because the program's memory has been corrupted, there are also many invalid characters that should be **ignored**, even if they look like part of a `mul` instruction. Sequences like `mul(4*`, `mul(6,9!`, `?(12,34)`, or `mul ( 2 , 4 )` do **nothing**.\n\nFor example, consider the following section of corrupted memory:\n\n<pre>\nx<b>mul(2,4)</b>%&mul[3,7]!@^do_not_<b>mul(5,5)</b>+mul(32,64]then(<b>mul(11,8)</b><b>mul(8,5)</b>)\n</pre>\n\nOnly the four highlighted sections are real mul instructions. Adding up the result of each instruction produces **`161`** (`2*4 + 5*5 + 11*8 + 8*5`).\n\nScan the corrupted memory for uncorrupted `mul` instructions. **What do you get if you add up all of the results of the multiplications?**\n\n[comment]: <> (PART 2)\n\nAs you scan through the corrupted memory, you notice that some of the conditional statements are also still intact. If you handle some of the uncorrupted conditional statements in the program, you might be able to get an even more accurate result.\n\nThere are two new instructions you'll need to handle:\n\n- The `do()` instruction **enables** future `mul` instructions.\n- The `don't()` instruction **disables** future `mul` instructions.\n\nOnly the **most recent** `do()` or `don't()` instruction applies. At the beginning of the program, `mul` instructions are **enabled**.\n\nFor example:\n\n<pre>\nx<b>mul(2,4)</b>&mul[3,7]!^<b>don't()</b>_mul(5,5)+mul(32,64](mul(11,8)un<b>do()</b>?<b>mul(8,5)</b>)\n</pre>\n\nThis corrupted memory is similar to the example from before, but this time the `mul(5,5)` and `mul(11,8)` instructions are **disabled** because there is a `don't()` instruction before them. The other `mul` instructions function normally, including the one at the end that gets re-**enabled** by a `do()` instruction.\n\nThis time, the sum of the results is **`48`** (`2*4 + 8*5`).\n\nHandle the new instructions; **what do you get if you add up all of the results of just the enabled multiplications?**";export{e as default};