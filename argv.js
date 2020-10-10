const args = process.argv.slice(2);

function argv(arg) {
  const index = args.indexOf(`--${arg}`);
  if (index !== -1 && args[index + 1] !== undefined) {
    return args[index + 1];
  } else {
    return null;
  }
}

function validate(args) {
  let vaild = true;

  args.forEach((el) => {
    if (!argv(el)) {
      vaild = false;
    }
  });

  return vaild;
}

module.exports = {
  get: argv,
  validate: validate,
};
