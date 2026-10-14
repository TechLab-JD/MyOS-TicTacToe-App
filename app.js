// MyOS Tic-Tac-Toe — you (X) vs a simple AI (O).
const boardEl = document.getElementById('tt-board');
const statusEl = document.getElementById('tt-status');
if (boardEl) {
  const LINES = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  let b, over, cells = [];
  function winner(bd) { for (const l of LINES) { const a = l[0], c = l[1], d = l[2]; if (bd[a] && bd[a] === bd[c] && bd[a] === bd[d]) return bd[a]; } return bd.every(Boolean) ? 'draw' : null; }
  function findMove(who) { for (let i = 0; i < 9; i++) if (!b[i]) { b[i] = who; const w = winner(b); b[i] = ''; if (w === who) return i; } return -1; }
  function aiMove() {
    let m = findMove('O'); if (m < 0) m = findMove('X'); if (m < 0 && !b[4]) m = 4;
    if (m < 0) { const free = []; b.forEach((v, i) => { if (!v) free.push(i); }); m = free[Math.floor(Math.random() * free.length)]; }
    if (m >= 0) place(m, 'O');
  }
  function place(i, who) { b[i] = who; cells[i].textContent = who; cells[i].className = 'tt-cell ' + who.toLowerCase(); check(); }
  function check() {
    const w = winner(b);
    if (w === 'draw') { statusEl.textContent = 'It is a draw!'; over = true; }
    else if (w === 'X') { statusEl.textContent = 'You win!'; over = true; }
    else if (w === 'O') { statusEl.textContent = 'AI wins'; over = true; }
  }
  function reset() {
    b = Array(9).fill(''); over = false; statusEl.textContent = 'Your turn (X)';
    boardEl.replaceChildren(); cells = [];
    for (let i = 0; i < 9; i++) { const c = document.createElement('button'); c.className = 'tt-cell';
      c.addEventListener('click', () => { if (over || b[i]) return; place(i, 'X'); if (!over) setTimeout(aiMove, 250); });
      boardEl.appendChild(c); cells.push(c); }
  }
  document.getElementById('tt-new').addEventListener('click', reset);
  reset();
}
