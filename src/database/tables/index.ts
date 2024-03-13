const tables = {
  users: `
    IF OBJECT_ID('users','U') IS NULL
    CREATE TABLE users (
      id VARCHAR(255) PRIMARY KEY NOT NULL DEFAULT NEWID(),
      name VARCHAR(255),
      email VARCHAR(255) UNIQUE,
      password VARCHAR(255),

      created_at DATETIME DEFAULT GETDATE(),
      updated_at DATETIME DEFAULT GETDATE(),
    );
  `,
};

export type ITables = typeof tables;

export { tables };
