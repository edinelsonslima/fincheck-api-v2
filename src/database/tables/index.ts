const users = `
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'users')
CREATE TABLE users (
    id          UNIQUEIDENTIFIER  NOT NULL  DEFAULT NEWID(),
    name        NVARCHAR(255)     NOT NULL,
    email       NVARCHAR(255)     NOT NULL,
    password    NVARCHAR(255)     NOT NULL,

    created_at  DATETIME          NOT NULL  DEFAULT GETDATE(),
    updated_at  DATETIME          NOT NULL  DEFAULT GETDATE(),

    CONSTRAINT PK_users PRIMARY KEY (id),
    CONSTRAINT IDX_users_email UNIQUE (email)
);
`;

const bankAccounts = `
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'bank_accounts')
CREATE TABLE bank_accounts (
    id                UNIQUEIDENTIFIER  NOT NULL  DEFAULT NEWID(),
    user_id           UNIQUEIDENTIFIER  NOT NULL,
    initial_balance   FLOAT             NOT NULL,
    name              NVARCHAR(255)     NOT NULL,
    color             NVARCHAR(255)     NOT NULL,
    type              NVARCHAR(50)      NOT NULL  CHECK (type IN ('CHECKING', 'INVESTMENT', 'CASH')),

    created_at        DATETIME          NOT NULL  DEFAULT GETDATE(),
    updated_at        DATETIME          NOT NULL  DEFAULT GETDATE(),

    CONSTRAINT PK_bank_accounts PRIMARY KEY (id),
    CONSTRAINT FK_bank_accounts_users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
`;

const categories = `
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'categories')
CREATE TABLE categories (
    id          UNIQUEIDENTIFIER  NOT NULL  DEFAULT NEWID(),
    user_id     UNIQUEIDENTIFIER  NOT NULL,
    name        NVARCHAR(255)     NOT NULL,
    icon        NVARCHAR(255)     NOT NULL,
    type        NVARCHAR(50)      NOT NULL  CHECK (type IN ('INCOME', 'EXPENSE')),

    created_at  DATETIME          NOT NULL  DEFAULT GETDATE(),
    updated_at  DATETIME          NOT NULL  DEFAULT GETDATE(),

    CONSTRAINT PK_categories PRIMARY KEY (id),
    CONSTRAINT FK_categories_users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
`;

const transactions = `
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'transactions')
CREATE TABLE transactions (
    id                UNIQUEIDENTIFIER  NOT NULL  DEFAULT NEWID(),
    user_id           UNIQUEIDENTIFIER  NOT NULL,
    category_id       UNIQUEIDENTIFIER,
    bank_account_id   UNIQUEIDENTIFIER  NOT NULL,
    name              NVARCHAR(255)     NOT NULL,
    value             FLOAT             NOT NULL,
    date              DATETIME2         NOT NULL,
    type              NVARCHAR(50)      NOT NULL  CHECK (type IN ('INCOME', 'EXPENSE')),

    created_at        DATETIME          NOT NULL  DEFAULT GETDATE(),
    updated_at        DATETIME          NOT NULL  DEFAULT GETDATE(),

    CONSTRAINT PK_transactions PRIMARY KEY (id),
    CONSTRAINT FK_transactions_users FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT FK_transactions_bank_accounts FOREIGN KEY (bank_account_id) REFERENCES bank_accounts(id) ON DELETE CASCADE,
    CONSTRAINT FK_transactions_categories FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);
`;

export const tables = [users, bankAccounts, categories, transactions];
