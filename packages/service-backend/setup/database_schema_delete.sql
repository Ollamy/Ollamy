-- Delete multiple users
DELETE FROM "User" WHERE email IN
    (
        'paul.miller@example.com',
        'lucy.white@example.com'
    );
