const { spawnSync } = require('child_process');

const exec = (args) => {
  const { stderr, stdout } = spawnSync('yarn', ['-s', ...args], { encoding: 'utf8', shell: true });
  expect(stderr).toMatch(/EXPECTED_FAIL/);
  return stdout;
};

describe('Should call `globalTeardown` function before exit', () => {
  it('without bail', () => {
    expect(exec(['jest', 'fail.test.js']))
      .toMatch(/TEARDOWN/);
  });

  it('with bail', () => {
    expect(exec(['jest', 'fail.test.js', '--bail']))
      .toMatch(/TEARDOWN/);
  })
});
