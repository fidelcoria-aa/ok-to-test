module.exports = async ({ github, context }) => {
  const { data: pull } = await github.pulls.get({
    ...context.repo,
    pull_number: process.env.number
  });
  const ref = pull.head.sha;

  const response = await github.checks.create({
    ...context.repo,
    head_sha: ref,
    name: 'integration-fork',
    status: 'in_progress',
  });

  return response;
}
