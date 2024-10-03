-- Delete multiple users
DELETE FROM "User" WHERE email IN
    (
        'paul.miller@example.com',
        'lucy.white@example.com',
        'emma.johnson@example.com',
        'daniel.smith@example.com'
    );
DELETE FROM "Discussion";
DELETE FROM "Picture";
DELETE FROM "Subscription";
DELETE FROM "Badge";
DELETE FROM "Event";
