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
  console.log('the checks length is ', checks.total_count);
  console.log('the checks are ', checks);

  for (c of check.check_runs) {
    await github.checks.update({
      ...context.repo,
      check_run_id: c.id,
      status: 'in_progress',
    });
  }

  return 'done';
}
