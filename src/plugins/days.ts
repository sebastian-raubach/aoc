import { WARNING_LONG_RUNTIME } from '@/plugins/warning'

export interface Day {
  title: string
  partOne: boolean
  partTwo: boolean
  isVisual?: boolean
  tags?: string[]
  warnings?: string[],
  stars?: number
}

const solvedDays: Map<number, Day[]> = new Map([
  [2024, []],
  [2023, [
    { title: 'Trebuchet?!', partOne: true, partTwo: true, isVisual: false },
    { title: 'Cube Conundrum', partOne: true, partTwo: true, isVisual: false },
    { title: 'Gear Ratios', partOne: true, partTwo: true, isVisual: true },
    { title: 'Scratchcards ', partOne: true, partTwo: true, isVisual: false },
    { title: 'If You Give A Seed A Fertilizer', partOne: true, partTwo: true, isVisual: true, warnings: [WARNING_LONG_RUNTIME] },
    { title: 'Wait For It', partOne: true, partTwo: true, isVisual: false },
    { title: 'Camel Cards', partOne: true, partTwo: true, isVisual: false },
    { title: 'Haunted Wasteland', partOne: true, partTwo: true, isVisual: false },
    { title: 'Mirage Maintenance', partOne: true, partTwo: true, isVisual: false },
    { title: 'Pipe Maze', partOne: true, partTwo: true, isVisual: true },
    { title: 'Cosmic Expansion', partOne: true, partTwo: true, isVisual: false },
    { title: 'Hot Springs', partOne: true, partTwo: true, isVisual: false },
    { title: 'Point of Incidence', partOne: true, partTwo: true, isVisual: false },
    { title: 'Parabolic Reflector Dish', partOne: true, partTwo: true, isVisual: false },
    { title: 'Lens Library', partOne: true, partTwo: true, isVisual: false },
    { title: 'The Floor Will Be Lava', partOne: true, partTwo: true, isVisual: true },
    { title: 'Clumsy Crucible', partOne: true, partTwo: true, isVisual: true },
    { title: 'Lavaduct Lagoon', partOne: true, partTwo: true, isVisual: true, warnings: [WARNING_LONG_RUNTIME] },
    { title: 'Aplenty', partOne: true, partTwo: true, isVisual: false },
    { title: 'Pulse Propagation', partOne: true, partTwo: true, isVisual: false },
    { title: 'Step Counter', partOne: true, partTwo: false, isVisual: true },
    { title: 'Sand Slabs', partOne: true, partTwo: true, isVisual: true, warnings: [WARNING_LONG_RUNTIME] },
    { title: 'A Long Walk', partOne: true, partTwo: true, isVisual: true, warnings: [WARNING_LONG_RUNTIME] },
  ]],
  [2022, [
    { title: 'Calorie Counting', partOne: true, partTwo: true, isVisual: true },
    { title: 'Rock Paper Scissors', partOne: true, partTwo: true, isVisual: false },
    { title: 'Rucksack Reorganization', partOne: true, partTwo: true, isVisual: false },
    { title: 'Camp Cleanup', partOne: true, partTwo: true, isVisual: true },
    { title: 'Supply Stacks', partOne: true, partTwo: true, isVisual: true },
    { title: 'Tuning Trouble', partOne: true, partTwo: true, isVisual: false },
    { title: 'No Space Left On Device', partOne: true, partTwo: true, isVisual: true },
    { title: 'Treetop Tree House', partOne: true, partTwo: true, isVisual: true },
    { title: 'Rope Bridge', partOne: true, partTwo: true, isVisual: true },
    { title: 'Cathode-Ray Tube', partOne: true, partTwo: true, isVisual: false },
    { title: 'Monkey in the Middle', partOne: true, partTwo: true, isVisual: false },
    { title: 'Hill Climbing Algorithm', partOne: true, partTwo: true, isVisual: true },
    { title: 'Distress Signal', partOne: true, partTwo: true, isVisual: false },
  ]],
  [2021, [
    { title: 'Sonar Sweep', partOne: true, partTwo: true, isVisual: false },
    { title: 'Dive!', partOne: true, partTwo: true, isVisual: true },
    { title: 'Binary Diagnostic', partOne: true, partTwo: true, isVisual: false },
    { title: 'Giant Squid', partOne: true, partTwo: true, isVisual: false },
    { title: 'Hydrothermal Venture', partOne: true, partTwo: true, isVisual: true },
    { title: 'Lanternfish', partOne: true, partTwo: true, isVisual: false },
    { title: 'The Treachery of Whales', partOne: true, partTwo: true, isVisual: false },
    { title: 'Seven Segment Search', partOne: true, partTwo: true, isVisual: false, tags: ['substitution', 'deduction'] },
    { title: 'Smoke Basin', partOne: true, partTwo: true, isVisual: true, tags: ['2d', 'segmentation'] },
    { title: 'Syntax Scoring', partOne: true, partTwo: true, isVisual: false, tags: ['parsing'] },
    { title: 'Dumbo Octopus', partOne: true, partTwo: true, isVisual: true, tags: ['2d', 'array-manipulation'] },
    { title: 'Passage Pathing', partOne: true, partTwo: true, isVisual: true, tags: ['graph', 'path-finding'] },
    { title: 'Transparent Origami', partOne: true, partTwo: true, isVisual: true, tags: ['2d', 'array-manipulation'] },
    { title: 'Extended Polymerization', partOne: true, partTwo: true, isVisual: false, tags: ['substitution'] },
    { title: 'Chiton', partOne: true, partTwo: true, isVisual: true, tags: ['2d', 'path-finding'] },
    { title: 'Packet Decoder', partOne: true, partTwo: true, isVisual: false, tags: ['tree', 'parsing'] },
    { title: 'Trick Shot', partOne: true, partTwo: true, isVisual: true, tags: ['2d'] },
    { title: 'Snailfish', partOne: true, partTwo: true, isVisual: false, tags: ['string-manipulation', 'parsing'] },
    { title: 'Beacon Scanner', partOne: true, partTwo: true, isVisual: false, tags: ['3d'] },
    { title: 'Trench Map', partOne: true, partTwo: true, isVisual: true, tags: ['2d'] },
    { title: 'Dirac Dice', partOne: true, partTwo: true, isVisual: false, tags: ['caching', 'optimization'] },
    { title: 'Reactor Reboot', partOne: true, partTwo: true, isVisual: false, tags: ['3d', 'intersection'] },
    { title: 'Amphipod', partOne: true, partTwo: true, isVisual: false, tags: ['path-finding'] },
    { title: 'Arithmetic Logic Unit', partOne: true, partTwo: true, isVisual: false, tags: [] },
    { title: 'Sea Cucumber', partOne: true, partTwo: true, isVisual: false, tags: ['2d'] },
  ]],
  [2020, [
    { title: 'Report Repair', partOne: true, partTwo: true, isVisual: false },
    { title: 'Password Philosophy', partOne: true, partTwo: true, isVisual: false },
    { title: 'Toboggan Trajectory', partOne: true, partTwo: true, isVisual: true },
    { title: 'Passport Processing', partOne: true, partTwo: true, isVisual: false },
    { title: 'Binary Boarding', partOne: true, partTwo: true, isVisual: false },
    { title: 'Custom Customs', partOne: true, partTwo: true, isVisual: false },
    { title: 'Handy Haversacks', partOne: true, partTwo: true, isVisual: false },
    { title: 'Handheld Halting', partOne: true, partTwo: true, isVisual: false },
    { title: 'Encoding Error', partOne: true, partTwo: true, isVisual: false },
    { title: 'Adapter Array', partOne: true, partTwo: true, isVisual: false },
    { title: 'Seating System', partOne: true, partTwo: true, isVisual: true },
    { title: 'Rain Risk', partOne: true, partTwo: true, isVisual: true },
    { title: 'Shuttle Search', partOne: true, partTwo: true, isVisual: false },
    { title: 'Docking Data', partOne: true, partTwo: true, isVisual: false },
    { title: 'Rambunctious Recitation', partOne: true, partTwo: true, isVisual: false },
    { title: 'Ticket Translation', partOne: true, partTwo: true, isVisual: false },
    { title: 'Conway Cubes', partOne: true, partTwo: true, isVisual: false },
    { title: 'Operation Order', partOne: true, partTwo: true, isVisual: false },
    { title: 'Monster Messages', partOne: true, partTwo: true, isVisual: false },
    { title: 'Jurassic Jigsaw', partOne: true, partTwo: true, isVisual: true },
    { title: 'Allergen Assessment', partOne: true, partTwo: true, isVisual: false },
    { title: 'Crab Combat', partOne: true, partTwo: true, isVisual: false },
    { title: 'Crab Cups', partOne: true, partTwo: true, isVisual: false },
    { title: 'Lobby Layout', partOne: true, partTwo: true, isVisual: false },
    { title: 'Combo Breaker', partOne: true, partTwo: true, isVisual: false },
  ]],
  [2018, [
    { title: 'Chronal Calibration', partOne: true, partTwo: true, isVisual: false },
    { title: 'Inventory Management System', partOne: true, partTwo: true, isVisual: false },
    { title: 'No Matter How You Slice It', partOne: true, partTwo: true, isVisual: false },
    { title: 'Repose Record', partOne: true, partTwo: true, isVisual: false },
    { title: 'Alchemical Reduction', partOne: true, partTwo: true, isVisual: false },
    { title: 'Chronal Coordinates', partOne: true, partTwo: true, isVisual: false },
    { title: 'The Sum of Its Parts', partOne: true, partTwo: true, isVisual: false },
    { title: 'Memory Maneuver', partOne: true, partTwo: true, isVisual: false },
    { title: 'Marble Mania', partOne: true, partTwo: true, isVisual: false },
    { title: 'The Stars Align', partOne: true, partTwo: true, isVisual: true },
    { title: 'Chronal Charge', partOne: true, partTwo: true, isVisual: false },
    { title: 'Subterranean Sustainability', partOne: true, partTwo: true, isVisual: false },
    { title: 'Mine Cart Madness', partOne: true, partTwo: true, isVisual: false },
    { title: 'Chocolate Charts', partOne: true, partTwo: true, isVisual: false },
    { title: 'Beverage Bandits', partOne: true, partTwo: true, isVisual: false },
    { title: 'Chronal Classification', partOne: true, partTwo: true, isVisual: false },
    { title: 'Reservoir Research', partOne: true, partTwo: true, isVisual: true },
    { title: 'Settlers of The North Pole', partOne: true, partTwo: true, isVisual: true },
    { title: 'A Regular Map', partOne: true, partTwo: true, isVisual: false },
    { title: 'Mode Maze', partOne: true, partTwo: true, isVisual: false },
  ]],
  [2017, [
    { title: 'Inverse Captcha', partOne: true, partTwo: true, isVisual: false },
    { title: 'Corruption Checksum', partOne: true, partTwo: true, isVisual: false },
    { title: 'Spiral Memory', partOne: true, partTwo: true, isVisual: false },
    { title: 'High-Entropy Passphrases', partOne: true, partTwo: true, isVisual: false },
    { title: 'A Maze of Twisty Trampolines, All Alike', partOne: true, partTwo: true, isVisual: false },
    { title: 'Memory Reallocation', partOne: true, partTwo: true, isVisual: false },
    { title: 'Recursive Circus', partOne: true, partTwo: true, isVisual: false },
    { title: 'I Heard You Like Registers', partOne: true, partTwo: true, isVisual: false },
    { title: 'Stream Processing', partOne: true, partTwo: true, isVisual: false },
    { title: 'Knot Hash', partOne: true, partTwo: true, isVisual: false },
    { title: 'Hex Ed', partOne: true, partTwo: true, isVisual: true },
    { title: 'Digital Plumber', partOne: true, partTwo: true, isVisual: false },
    { title: 'Packet Scanners', partOne: true, partTwo: true, isVisual: false },
    { title: 'Disk Defragmentation', partOne: false, partTwo: false, isVisual: false },
    { title: 'Dueling Generators', partOne: true, partTwo: true, isVisual: false },
    { title: 'Permutation Promenade', partOne: true, partTwo: true, isVisual: false },
    { title: 'Spinlock', partOne: true, partTwo: true, isVisual: false },
    { title: 'Duet', partOne: true, partTwo: true, isVisual: false },
    { title: 'A Series of Tubes', partOne: true, partTwo: true, isVisual: false },
    { title: 'Particle Swarm', partOne: true, partTwo: true, isVisual: false },
    { title: 'Fractal Art', partOne: false, partTwo: false, isVisual: false },
    { title: 'Sporifica Virus', partOne: true, partTwo: true, isVisual: true },
    { title: 'Coprocessor Conflagration', partOne: true, partTwo: false, isVisual: false },
    { title: 'Electromagnetic Moat', partOne: true, partTwo: true, isVisual: false },
    { title: 'The Halting Problem', partOne: true, partTwo: false, isVisual: false },
  ]],
  [2016, [
    { title: 'No Time for a Taxicab', partOne: true, partTwo: true, isVisual: true },
    { title: 'Bathroom Security', partOne: true, partTwo: true, isVisual: true },
    { title: 'Squares With Three Sides', partOne: true, partTwo: true, isVisual: false },
    { title: 'Security Through Obscurity', partOne: true, partTwo: true, isVisual: false },
    { title: 'How About a Nice Game of Chess?', partOne: true, partTwo: true, isVisual: false },
  ]],
  [2015, [
    { title: 'Not Quite Lisp', partOne: true, partTwo: true, isVisual: false },
    { title: 'I Was Told There Would Be No Math', partOne: true, partTwo: true, isVisual: false },
    { title: 'Perfectly Spherical Houses in a Vacuum', partOne: true, partTwo: true, isVisual: true },
    { title: 'The Ideal Stocking Stuffer', partOne: true, partTwo: true, isVisual: false },
    { title: 'Doesn\'t He Have Intern- Elves For This ?', partOne: true, partTwo: true, isVisual: false },
    { title: 'Probably a Fire Hazard', partOne: true, partTwo: true, isVisual: true },
    { title: 'Some Assembly Required', partOne: true, partTwo: true, isVisual: false },
    { title: 'Matchsticks', partOne: true, partTwo: true, isVisual: false },
    { title: 'All in a Single Night', partOne: true, partTwo: true, isVisual: false },
    { title: 'Elves Look, Elves Say', partOne: true, partTwo: true, isVisual: false },
    { title: 'Corporate Policy', partOne: true, partTwo: true, isVisual: false },
    { title: 'JSAbacusFramework.io', partOne: true, partTwo: true, isVisual: false },
    { title: 'Knights of the Dinner Table', partOne: true, partTwo: true, isVisual: false },
    { title: 'Reindeer Olympics', partOne: true, partTwo: true, isVisual: true },
    { title: 'Science for Hungry People', partOne: false, partTwo: false, isVisual: false },
    { title: 'Aunt Sue', partOne: true, partTwo: true, isVisual: false },
    { title: 'No Such Thing as Too Much', partOne: false, partTwo: false, isVisual: false },
    { title: 'Like a GIF For Your Yard', partOne: true, partTwo: true, isVisual: true },
  ]],
])

export {
  solvedDays,
}
