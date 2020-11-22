module.exports = async ({ github, context }) => {
  const { data: pull } = await github.pulls.get({
    ...context.repo,
    pull_number: process.env.number
  });
  const ref = pull.head.sha;

  const { data: checks } = await github.checks.listForRef({
    ...context.repo,
    ref
  });
  console.log('the job name: ', process.env.job)
  const check = checks.check_runs.filter(c => c.name === process.env.job);

  for (c of check) {
    const here = await github.checks.update({
      ...context.repo,
      check_run_id: c.id,
      status: 'in_progress',
    });
    console.log('this check update ', here);
  }

  return 'done';
}
