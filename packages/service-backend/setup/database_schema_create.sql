CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User
INSERT INTO "User" (id, firstname, lastname, email, password) VALUES
    (uuid_generate_v4(), 'Paul', 'Miller', 'paul.miller@example.com', 'Password1.'),
    (uuid_generate_v4(), 'Lucy', 'White', 'lucy.white@example.com', 'Password2.');

-- Course
INSERT INTO "Course" (id, title, description, owner_id) VALUES
    (uuid_generate_v4(), 'Introduction to Programming', 'Learn the basics of programming', (SELECT id FROM "User" WHERE email = 'paul.miller@example.com'));

-- Section
INSERT INTO "Section" (id, title, description, course_id) VALUES
    (uuid_generate_v4(), 'Getting Started', 'Introduction to the course', (SELECT id FROM "Course" WHERE title = 'Introduction to Programming')),
    (uuid_generate_v4(), 'Basic Concepts', 'Fundamental programming concepts', (SELECT id FROM "Course" WHERE title = 'Introduction to Programming')),
    (uuid_generate_v4(), 'Advanced Topics', 'Advanced programming topics', (SELECT id FROM "Course" WHERE title = 'Introduction to Programming'));

-- Chapter
INSERT INTO "Chapter" (id, section_id, title, description) VALUES
    (uuid_generate_v4(), (SELECT id FROM "Section" WHERE title = 'Getting Started'), 'Introduction to Programming Languages', 'Overview of different programming languages and their uses'),
    (uuid_generate_v4(), (SELECT id FROM "Section" WHERE title = 'Basic Concepts'), 'Data Types and Variables', 'Understanding data types and using variables in programming'),
    (uuid_generate_v4(), (SELECT id FROM "Section" WHERE title = 'Advanced Topics'), 'Object-Oriented Programming', 'Exploring the principles of object-oriented programming');

-- Lesson
INSERT INTO "Lesson" (id, chapter_id, title, description) VALUES
    (uuid_generate_v4(), (SELECT id FROM "Chapter" WHERE title = 'Introduction to Programming Languages'), 'Choosing the right language', 'Factors to consider when selecting a programming language for a project'),
    (uuid_generate_v4(), (SELECT id FROM "Chapter" WHERE title = 'Data Types and Variables'), 'Working with Strings and Numbers', 'Manipulating text and numeric data in programming'),
    (uuid_generate_v4(), (SELECT id FROM "Chapter" WHERE title = 'Object-Oriented Programming'), 'Understanding Classes and Objects', 'Fundamental concepts of object-oriented programming');

-- Question
INSERT INTO "Question" (id, title, type_answer, type_question, description, data, lesson_id) VALUES
    (uuid_generate_v4(), 'What factors should you consider when choosing a programming language ?', 'TEXT', 'TEXT', 'Explain the key factors to consider when selecting a programming language for a project.', 'Data for Question 1', (SELECT id FROM "Lesson" WHERE title = 'Choosing the right language')),
    (uuid_generate_v4(), 'How do you manipulate strings and numbers in programming ?', 'TEXT', 'TEXT', 'Provide examples of manipulating text and numeric data in a programming language of your choice.', 'Data for Question 2', (SELECT id FROM "Lesson" WHERE title = 'Working with Strings and Numbers')),
    (uuid_generate_v4(), 'What are the main concepts of object-oriented programming ?', 'TEXT', 'TEXT', 'Describe the fundamental concepts of object-oriented programming, including classes and objects.', 'Data for Question 3', (SELECT id FROM "Lesson" WHERE title = 'Understanding Classes and Objects')),
    (uuid_generate_v4(), 'Explain the importance of data types in programming.', 'TEXT', 'TEXT', 'Discuss why understanding and using appropriate data types is crucial in programming.', 'Data for Question 4', (SELECT id FROM "Lesson" WHERE title = 'Understanding Classes and Objects')),
    (uuid_generate_v4(), 'How does procedural programming differ from object-oriented programming ?', 'TEXT', 'TEXT', 'Highlight the differences between procedural programming and object-oriented programming.', 'Data for Question 5', (SELECT id FROM "Lesson" WHERE title = 'Understanding Classes and Objects'));

-- UsertoCourse
INSERT INTO "UsertoCourse" (id, course_id, user_id, role_user, permission_user, permission_course) VALUES
    (uuid_generate_v4(), (SELECT id FROM "Course" WHERE title = 'Introduction to Programming'), (SELECT id FROM "User" WHERE email = 'paul.miller@example.com'), 'OWNER', '{"READ", "WRITE", "DELETE", "ADMIN"}', '{"READ", "WRITE", "DELETE", "ADMIN"}'),
    (uuid_generate_v4(), (SELECT id FROM "Course" WHERE title = 'Introduction to Programming'), (SELECT id FROM "User" WHERE email = 'lucy.white@example.com'), 'MEMBER', '{"READ", "WRITE"}', '{"READ"}');
