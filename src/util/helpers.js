const nanoid = () => {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
};

module.exports = { nanoid };
