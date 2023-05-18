export const SudokuService = {
  getBoard: function (c) {
    const data = {
      coef: c,
    };
    return fetch(`https://localhost:5000/api/puzzle`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  },
  solveBoard: function (grid) {
    const data = {
      board: grid,
    };
    return fetch(`https://localhost:5000/api/solve`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  },
  validateBoard: function (grid, uid, lid, time) {
    const data = {
      board: grid,
      uid: uid,
      lid: lid,
      time: time
    };
    return fetch(`https://localhost:5000/api/validate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
};
