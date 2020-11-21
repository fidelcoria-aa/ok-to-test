module.exports = async ({github, context}) => {
  const { data: pull } = await github.pulls.get({
    ...context.repo,
    pull_number: process.env.number
  });
  const ref = pull.head.sha;
  
  const { data: checks } = await github.checks.listForRef({
    ...context.repo,
    ref
  });
  
  const check = checks.check_runs.filter(c => c.name === process.env.job);
  
  const { data: result } = await github.checks.update({
    ...context.repo,
    check_run_id: check[0].id,
    status: 'in_progress',
  });
  
  return result;
}

