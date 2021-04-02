const created_at_column = {
  name: 'created_at',
  type: 'timestamp',
  default: 'now()',
} as const;

const updated_at_column = {
  name: 'updated_at',
  type: 'timestamp',
  default: 'now()',
};

export { created_at_column, updated_at_column };
