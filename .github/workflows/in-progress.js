module.exports = async ({ github, context }) => {
  const { data: pull } = await github.pulls.get({
    ...context.repo,
    pull_number: process.env.number
  });
  const ref = pull.head.sha;
  console.log('the context repo is ', context.repo);
  const response = await github.checks.create({
    // ...context.repo,
    owner: context.repo.owner,
    repo: context.repo.name,
    head_sha: ref,
    name: 'integration-fork',
    status: 'in_progress',
  });

  return response;
}
