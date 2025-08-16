const commitlintConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // Nouvelle fonctionnalité
        'fix',      // Correction de bug
        'docs',     // Documentation
        'style',    // Formatage, indentation
        'refactor', // Refactoring
        'test',     // Ajout de tests
        'chore',    // Tâches de maintenance
        'perf',     // Amélioration de performance
        'ci',       // Configuration CI/CD
        'revert',
      ],
    ],
    'subject-max-length': [2, 'always', 72],
    'body-max-line-length': [2, 'always', 100],
  },
}

export default commitlintConfig;