setLegend(
  [ '@', bitmap`
................
.....0000000....
...00.......00..
..0...........0.
..0....0.0....0.
.0.....000.....0
.0.....0.0.....0
.0.....0.0.....0
.0.....0.0.....0
.0.....000.....0
.0.....0.0.....0
..0....0.0....0.
..0...........0.
...00.......00..
.....0000000....
................` ],
  [ 'E', bitmap`
................
.....0000000....
...00.......00..
..0...........0.
..0....0000...0.
.0.....0...0...0
.0.....00000...0
.0.....00000...0
.0.....0...0...0
.0.....0...0...0
.0.....00000...0
..0....0000....0
..0...........0.
...00.......00..
.....0000000....
................` ],
  [ '#', bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777` ],
  [ '-', bitmap`
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................` ]
);

const uniqueMazeLayout = `
####################
#------------------#
#-###-#####-###-##-#
#-#-#-----#---#--#-#
#-#-###-#-###-####-#
#-#-----#-#-----#--#
#-#####-###-###-#-##
#---#---#-----#----#
###-#####-#####-####
#-------#----------#
#-###-#####-###-##-#
#-#-#-----#---#--#-#
#-#-###-#-###-####-#
#------------------#
####################
`;

setMap(uniqueMazeLayout);

const player = '@';
const exit = 'E';

addSprite(1, 1, player); 
addSprite(18, 13, exit); 

console.log('Initial player position:', getFirst(player));

function movePlayer(dx, dy) {
  const playerPos = getFirst(player);
  if (!playerPos) {
    console.log('Player not found');
    return;
  }
  console.log('Current player position:', playerPos); 
  const newX = playerPos.x + dx;
  const newY = playerPos.y + dy;
  const nextTile = getTile(newX, newY);
  console.log(`Attempting to move to: (${newX}, ${newY}) which has tile type: ${nextTile}`);
  if (nextTile === '-' || nextTile === exit) {
    clearTile(playerPos.x, playerPos.y);
    addSprite(newX, newY, player);
    console.log('Player moved to:', newX, newY); 
    checkVictory(newX, newY);
  } else {
    console.log('Cannot move to:', newX, newY); 
  }
}

onInput('a', () => {
  console.log('Move left pressed'); 
  movePlayer(-1, 0);
});
onInput('d', () => {
  console.log('Move right pressed'); 
  movePlayer(1, 0);
});
onInput('w', () => {
  console.log('Move up pressed'); 
  movePlayer(0, -1);
});
onInput('s', () => {
  console.log('Move down pressed'); 
  movePlayer(0, 1);
});

function checkVictory(x, y) {
  if (getTile(x, y) === exit) {
    console.log('You win!');
    addText('Congratulations!', { y: 7, color: color`8` });
  }
}

console.log('Initial player position:', getFirst(player));
