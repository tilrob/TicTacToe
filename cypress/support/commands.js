
const winningPatterns = {
  // X winning patterns
  'xtop row':     [0, 3, 1, 4, 2],
  'xmiddle row':  [3, 0, 4, 1, 5],
  'xbottom row':  [6, 0, 7, 1, 8],
  'xleft col':    [0, 1, 3, 2, 6],
  'xmiddle col':  [1, 0, 4, 2, 7],
  'xright col':   [2, 0, 5, 1, 8],
  'xdiag lr':     [0, 1, 4, 2, 8],
  'xdiag rl':     [2, 0, 4, 1, 6],

  // O winning patterns
  'otop row':     [3, 0, 6, 1, 7, 2],
  'omiddle row':  [0, 3, 2, 4, 6, 5],
  'obottom row':  [0, 6, 1, 7, 3, 8],
  'oleft col':    [1, 0, 2, 3, 5, 6],
  'omiddle col':  [0, 1, 3, 4, 5, 7],
  'oright col':   [0, 2, 1, 5, 3, 8],
  'odiag lr':     [1, 0, 2, 4, 3, 8],
  'odiag rl':     [0, 2, 1, 4, 3, 6]
};

Cypress.Commands.add('clickSequence', (sequence) => {
  const moves = Array.isArray(sequence) ? sequence : winningPatterns[sequence];

  moves.forEach(index => {
    cy.get('[class="square"]').eq(index).click();
  });
});

