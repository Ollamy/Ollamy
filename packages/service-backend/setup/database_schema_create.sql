CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User
INSERT INTO "User" (id, firstname, lastname, email, password) VALUES
    (uuid_generate_v4(), 'Paul', 'Miller', 'paul.miller@example.com', 'NAqTEqHA4qEZToRCvRRyuNo4mhbRZ1MEgAHfOVPMaVZmU5OW88ze0yrxDNNh4T5F3kbXOARSdJnja3vwXhFJCw=='),
    (uuid_generate_v4(), 'Lucy', 'White', 'lucy.white@example.com', 'NAqTEqHA4qEZToRCvRRyuNo4mhbRZ1MEgAHfOVPMaVZmU5OW88ze0yrxDNNh4T5F3kbXOARSdJnja3vwXhFJCw==');

-- Course
INSERT INTO "Course" (id, title, description, owner_id) VALUES
    (uuid_generate_v4(), 'Introduction to Programming', 'Learn the basics of programming', (SELECT id FROM "User" WHERE email = 'paul.miller@example.com'));

-- Section
INSERT INTO "Section" (id, title, description, course_id) VALUES
    (uuid_generate_v4(), 'Getting Started', 'Introduction to the course', (SELECT id FROM "Course" WHERE title = 'Introduction to Programming')),
    (uuid_generate_v4(), 'Basic Concepts', 'Fundamental programming concepts', (SELECT id FROM "Course" WHERE title = 'Introduction to Programming')),
    (uuid_generate_v4(), 'Advanced Topics', 'Advanced programming topics', (SELECT id FROM "Course" WHERE title = 'Introduction to Programming'));

-- Lesson
INSERT INTO "Lesson" (id, section_id, title, description) VALUES
    (uuid_generate_v4(), (SELECT id FROM "Section" WHERE title = 'Getting Started'), 'Choosing the right language', 'Factors to consider when selecting a programming language for a project'),
    (uuid_generate_v4(), (SELECT id FROM "Section" WHERE title = 'Basic Concepts'), 'Working with Strings and Numbers', 'Manipulating text and numeric data in programming'),
    (uuid_generate_v4(), (SELECT id FROM "Section" WHERE title = 'Advanced Topics'), 'Understanding Classes and Objects', 'Fundamental concepts of object-oriented programming');

-- Question
INSERT INTO "Question" (id, title, type_answer, type_question, description, difficulty, points, lesson_id) VALUES
    ('55052c17-f8dc-4364-81a2-60d46b6c5930', 'What factors should you consider when choosing a programming language ?', 'TEXT', 'TEXT', 'Explain the key factors to consider when selecting a programming language for a project.', 'INTERMEDIATE', 1, (SELECT id FROM "Lesson" WHERE title = 'Choosing the right language')),
    ('533d1411-4375-43a2-9cae-ce0087cee6b0', 'How do you manipulate strings and numbers in programming ?', 'TEXT',  'TEXT','Provide examples of manipulating text and numeric data in a programming language of your choice.', 'INTERMEDIATE', 1, (SELECT id FROM "Lesson" WHERE title = 'Working with Strings and Numbers')),
    ('72742460-5535-4f25-bf9f-4eb0f6f34ded', 'What are the main concepts of object-oriented programming ?', 'TEXT', 'TEXT', 'Describe the fundamental concepts of object-oriented programming, including classes and objects.', 'INTERMEDIATE', 1, (SELECT id FROM "Lesson" WHERE title = 'Understanding Classes and Objects')),
    ('621f0e2a-45d8-4f70-98d2-24a309213468', 'Explain the importance of data types in programming.', 'TEXT',  'TEXT','Discuss why understanding and using appropriate data types is crucial in programming.', 'INTERMEDIATE', 1, (SELECT id FROM "Lesson" WHERE title = 'Understanding Classes and Objects')),
    ('bd94395f-3f34-455d-97d7-cec92bb9396b', 'How does procedural programming differ from object-oriented programming ?', 'TEXT', 'TEXT', 'Highlight the differences between procedural programming and object-oriented programming.', 'INTERMEDIATE', 1, (SELECT id FROM "Lesson" WHERE title = 'Understanding Classes and Objects'));

-- Answer
INSERT INTO "Answer" (id, question_id, data)
VALUES
    ('af56727d-26b4-42b0-b006-21a759729b57', '55052c17-f8dc-4364-81a2-60d46b6c5930', 'Performance'),
    ('c43e2c5d-6ad2-4155-99ed-708f4a12c8fb', '55052c17-f8dc-4364-81a2-60d46b6c5930', 'Syntax'),
    ('e207eae2-93aa-4d9f-9b7a-b0f6d2c6d02e', '55052c17-f8dc-4364-81a2-60d46b6c5930', 'Community'),
    ('f3eb8c02-26c4-4f04-a35a-d8f26c883877', '55052c17-f8dc-4364-81a2-60d46b6c5930', 'Compatibility'),

    ('6a34b74b-d2a5-4322-9675-5cfbde7c0f25', '533d1411-4375-43a2-9cae-ce0087cee6b0', 'Concatenation'),
    ('e8f3a967-c21f-4f0b-9da9-789d1c964e78', '533d1411-4375-43a2-9cae-ce0087cee6b0', 'Substring'),
    ('d7e0889f-4853-4c9f-80b2-41c5bb535f19', '533d1411-4375-43a2-9cae-ce0087cee6b0', 'Arithmetic'),
    ('9ab8ad2e-40de-4a7a-a6d6-82348ce6dce4', '533d1411-4375-43a2-9cae-ce0087cee6b0', 'Conversion'),

    ('78a57938-b8d9-45f8-afec-0a85bcb2bc0d', '72742460-5535-4f25-bf9f-4eb0f6f34ded', 'Inheritance'),
    ('32b4b59a-af46-4c44-9a97-8b5278f98d18', '72742460-5535-4f25-bf9f-4eb0f6f34ded', 'Encapsulation'),
    ('49823d82-e9ab-4482-90e3-8f20eeec700f', '72742460-5535-4f25-bf9f-4eb0f6f34ded', 'Polymorphism'),
    ('e6b12aeb-1f0d-4b2f-879e-5573965b0b2e', '72742460-5535-4f25-bf9f-4eb0f6f34ded', 'Abstraction'),

    ('cb9f5c57-5c3c-44fb-bf5e-89c5f22e8e86', '621f0e2a-45d8-4f70-98d2-24a309213468', 'Validation'),
    ('23ee930c-8b7f-4e7f-a91f-5c6f97a53f94', '621f0e2a-45d8-4f70-98d2-24a309213468', 'Conversion'),
    ('c117bb89-1f03-44a0-90d3-31d2016f442c', '621f0e2a-45d8-4f70-98d2-24a309213468', 'Memory'),
    ('b5b99c09-10ae-41b4-995c-0e4f1cf61c3f', '621f0e2a-45d8-4f70-98d2-24a309213468', 'Accuracy'),

    ('23f1b31c-cd2a-4381-8b07-2c01c493e9a9', 'bd94395f-3f34-455d-97d7-cec92bb9396b', 'Encapsulation'),
    ('a7d5c1e3-37b4-4389-b48c-04d71b351aaf', 'bd94395f-3f34-455d-97d7-cec92bb9396b', 'Inheritance'),
    ('e53d2a50-6cf2-4cc6-a5a9-7db0103cf61f', 'bd94395f-3f34-455d-97d7-cec92bb9396b', 'Functions'),
    ('6b4a4a4a-bb8e-46c9-b7ec-6aa523d0ec1f', 'bd94395f-3f34-455d-97d7-cec92bb9396b', 'DataFlow');


-- UsertoCourse
INSERT INTO "UsertoCourse" (id, course_id, user_id, role_user, permission_user, permission_course) VALUES
    (uuid_generate_v4(), (SELECT id FROM "Course" WHERE title = 'Introduction to Programming'), (SELECT id FROM "User" WHERE email = 'paul.miller@example.com'), 'OWNER', '{"READ", "WRITE", "DELETE", "ADMIN"}', '{"READ", "WRITE", "DELETE", "ADMIN"}'),
    (uuid_generate_v4(), (SELECT id FROM "Course" WHERE title = 'Introduction to Programming'), (SELECT id FROM "User" WHERE email = 'lucy.white@example.com'), 'MEMBER', '{"READ", "WRITE"}', '{"READ"}');
