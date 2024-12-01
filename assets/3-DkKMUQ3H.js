const e="You come across an experimental new kind of memory stored on an infinite two-dimensional grid.\n\nEach square on the grid is allocated in a spiral pattern starting at a location marked `1` and then counting up while spiraling outward. For example, the first few squares are allocated like this:\n\n```\n17  16  15  14  13\n18   5   4   3  12\n19   6   1   2  11\n20   7   8   9  10\n21  22  23---> ...\n```\n\nWhile this is very space-efficient (no squares are skipped), requested data must be carried back to square `1` (the location of the only access port for this memory system) by programs that can only move up, down, left, or right. They always take the shortest path: the [Manhattan Distance](https://en.wikipedia.org/wiki/Taxicab_geometry) between the location of the data and square `1`.\n\nFor example:\n\n- Data from square `1` is carried `0` steps, since it's at the access port.\n- Data from square `12` is carried `3` steps, such as: down, left, left.\n- Data from square `23` is carried only `2` steps: up twice.\n- Data from square `1024` must be carried `31` steps.\n\n**How many steps** are required to carry the data from the square identified in your puzzle input all the way to the access port?\n\n[comment]: <> (PART 2)\n\nAs a stress test on the system, the programs here clear the grid and then store the value `1` in square `1`. Then, in the same allocation order as shown above, they store the sum of the values in all adjacent squares, including diagonals.\n\nSo, the first few squares' values are chosen as follows:\n\n- Square `1` starts with the value `1`.\n- Square `2` has only one adjacent filled square (with value `1`), so it also stores `1`.\n- Square `3` has both of the above squares as neighbors and stores the sum of their values, `2`.\n- Square `4` has all three of the aforementioned squares as neighbors and stores the sum of their values, `4`.\n- Square `5` only has the first and fourth squares as neighbors, so it gets the value `5`.\n\nOnce a square is written, its value does not change. Therefore, the first few squares would receive the following values:\n\n```\n147  142  133  122   59\n304    5    4    2   57\n330   10    1    1   54\n351   11   23   25   26\n362  747  806--->   ...\n```\n\nWhat is the **first value written** that is **larger** than your puzzle input?";export{e as default};