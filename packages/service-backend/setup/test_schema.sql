CREATE TABLE "Test" (
    "id" SERIAL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

INSERT INTO "Test" (username, email, password) VALUES
    ('user1', 'user1@example.com', 'password123'),
    ('user2', 'user2@example.com', 'securepass'),
    ('user3', 'user3@example.com', 'letmein');
