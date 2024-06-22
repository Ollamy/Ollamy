-- User
INSERT INTO "User" (id, firstname, lastname, email, password) VALUES
    ('56fb679c-973b-4b3e-8f87-3b7ddcadbfa4', 'Paul', 'Miller', 'paul.miller@example.com', 'NAqTEqHA4qEZToRCvRRyuNo4mhbRZ1MEgAHfOVPMaVZmU5OW88ze0yrxDNNh4T5F3kbXOARSdJnja3vwXhFJCw=='),
    ('83f7337b-cf79-438e-86d4-3ba0db64b5db', 'Lucy', 'White', 'lucy.white@example.com', 'NAqTEqHA4qEZToRCvRRyuNo4mhbRZ1MEgAHfOVPMaVZmU5OW88ze0yrxDNNh4T5F3kbXOARSdJnja3vwXhFJCw=='),
    ('a5e15301-9fb3-4d95-b08d-67fd781aafab', 'Emma', 'Johnson', 'emma.johnson@example.com', 'NAqTEqHA4qEZToRCvRRyuNo4mhbRZ1MEgAHfOVPMaVZmU5OW88ze0yrxDNNh4T5F3kbXOARSdJnja3vwXhFJCw=='),
    ('65d7c6f4-157b-4e7e-92e2-58b80e8e1d43', 'Daniel', 'Smith', 'daniel.smith@example.com', 'NAqTEqHA4qEZToRCvRRyuNo4mhbRZ1MEgAHfOVPMaVZmU5OW88ze0yrxDNNh4T5F3kbXOARSdJnja3vwXhFJCw==');

-- UsertoScore
INSERT INTO "UsertoScore" (id, user_id, score) VALUES
    ('2ed5d296-e4bf-4464-a474-a8a33032fd11', '56fb679c-973b-4b3e-8f87-3b7ddcadbfa4', 0),
    ('38ff8078-7c0a-46c4-9e2a-d721c5747d36', '83f7337b-cf79-438e-86d4-3ba0db64b5db', 0),
    ('890f9e61-eafa-40f0-87da-2534789bee83', 'a5e15301-9fb3-4d95-b08d-67fd781aafab', 0),
    ('f23f74bb-ff85-403f-a07b-e4094f9b563d', '65d7c6f4-157b-4e7e-92e2-58b80e8e1d43', 0);

-- Picture
INSERT INTO "Picture" (id, filename) VALUES
    ('3a43db61-67b7-4ef4-9b58-3fbc87ea80f4', 'https://example.com/picture1.jpg'),
    ('7649c16e-e27d-4a17-b4a2-aae3bbbc6ad2', 'https://example.com/picture2.jpg'),
    ('fae93a21-3b31-4d3c-b096-64ee0f6a724f', 'https://example.com/picture3.jpg'),
    ('8d2ce538-9bb5-4e3f-9463-d9eb680a88d7', 'https://example.com/picture4.jpg');

-- Course
INSERT INTO "Course" (id, title, description, owner_id, picture_id) VALUES
    ('e5a1c556-193c-4a17-ba0c-5a9ddc5dd6f1', 'Introduction to Programming', 'Learn the basics of programming', '56fb679c-973b-4b3e-8f87-3b7ddcadbfa4', '3a43db61-67b7-4ef4-9b58-3fbc87ea80f4'),
    ('3a43db61-67b7-4ef4-9b58-3fbc87ea80f4', 'Another Course', 'Description for another course', '83f7337b-cf79-438e-86d4-3ba0db64b5db', '7649c16e-e27d-4a17-b4a2-aae3bbbc6ad2'),

    ('c87950af-2ee2-40c7-bd16-607d440cecb3', 'Advanced Programming Concepts', 'Explore advanced programming topics', 'a5e15301-9fb3-4d95-b08d-67fd781aafab', 'fae93a21-3b31-4d3c-b096-64ee0f6a724f'),
    ('db6cf3cc-7cb4-4a5d-84f4-75a6fcf223d3', 'Web Development Fundamentals', 'Learn the basics of web development', '65d7c6f4-157b-4e7e-92e2-58b80e8e1d43', '8d2ce538-9bb5-4e3f-9463-d9eb680a88d7');

-- Section
INSERT INTO "Section" (id, title, description, course_id) VALUES
    ('df0e43ff-1310-4d92-9a19-c62854ab7391', 'Getting Started', 'Introduction to the course', 'e5a1c556-193c-4a17-ba0c-5a9ddc5dd6f1'),
    ('c5e43220-e54f-4e0b-827e-eed18c9d1f50', 'Basic Concepts', 'Fundamental programming concepts', 'e5a1c556-193c-4a17-ba0c-5a9ddc5dd6f1'),
    ('4a7d9a21-b8fe-4301-9d8e-193a4310c387', 'Advanced Topics', 'Advanced programming topics', 'e5a1c556-193c-4a17-ba0c-5a9ddc5dd6f1'),
    ('d2e9fc8b-31c0-493a-9b45-004a73fe9bb9', 'Section for Another Course', 'Description for a section in another course', '3a43db61-67b7-4ef4-9b58-3fbc87ea80f4'),

    ('e2c0e524-89b2-4f13-a36b-69c1b257e017', 'Database Management', 'Introduction to database concepts', 'c87950af-2ee2-40c7-bd16-607d440cecb3'),
    ('daae7023-37d4-40b8-bb03-07f60a3e0a1d', 'Frontend Development', 'Building user interfaces with HTML, CSS, and JavaScript', 'db6cf3cc-7cb4-4a5d-84f4-75a6fcf223d3');

-- Lesson
INSERT INTO "Lesson" (id, section_id, title, description) VALUES
    ('8722bf34-6868-4a8b-988d-3b18fdbc384f', 'df0e43ff-1310-4d92-9a19-c62854ab7391', 'Choosing the right language', 'Factors to consider when selecting a programming language for a project'),
    ('9a75e507-4b5c-4b45-9379-c38a6f3f059e', 'c5e43220-e54f-4e0b-827e-eed18c9d1f50', 'Working with Strings and Numbers', 'Manipulating text and numeric data in programming'),
    ('b8b7400d-52a1-4e10-96ce-995f5aa16739', '4a7d9a21-b8fe-4301-9d8e-193a4310c387', 'Understanding Classes and Objects', 'Fundamental concepts of object-oriented programming'),
    ('7d6392e1-8dc4-48e1-b162-c00b025f6b6a', 'd2e9fc8b-31c0-493a-9b45-004a73fe9bb9', 'Lesson for Another Course', 'Description for a lesson in another course'),

    ('ebfe0b0c-6e42-438e-bf4e-cbbdbb05c51f', 'e2c0e524-89b2-4f13-a36b-69c1b257e017', 'Relational Databases', 'Understanding the principles of relational databases'),
    ('e756b488-1fc4-4fb6-b4f3-d1e28a5935de', 'e2c0e524-89b2-4f13-a36b-69c1b257e017', 'SQL Fundamentals', 'Learn the basics of SQL querying'),
    ('7fe0b554-1c69-4ee5-9e24-553f4b24d3c9', 'daae7023-37d4-40b8-bb03-07f60a3e0a1d', 'HTML5 and CSS3', 'Building the structure and style of web pages'),
    ('ebd8e177-cede-4f23-b26e-b7405f4e8301', 'daae7023-37d4-40b8-bb03-07f60a3e0a1d', 'JavaScript Basics', 'Introduction to client-side scripting with JavaScript');

-- Question
INSERT INTO "Question" (id, lesson_id, trust_answer_id, title, "order", type_answer, type_question, description, difficulty, points, picture_id) VALUES
    ('c3fdc564-8f46-4050-9d9b-515a20a9923a', '8722bf34-6868-4a8b-988d-3b18fdbc384f', '3b7c7382-cc5c-4fe6-8117-6e03962f75fc', 'What factors should you consider when choosing a programming language?', 'a0', 'FREE_ANSWER', 'TEXT', 'Explain the key factors to consider when selecting a programming language for a project.', 'BEGINNER', 2, NULL),
    ('04bae167-b647-4898-9bc9-61bd3a73e4e8', '8722bf34-6868-4a8b-988d-3b18fdbc384f', '9531243f-62b9-446d-8e42-6d5c759b76f8', 'What is the significance of syntax in programming languages?', 'a1', 'FREE_ANSWER', 'TEXT', 'Explain why proper syntax is crucial in programming languages and how it impacts code execution.', 'BEGINNER', 2, NULL),
    ('3ed01a60-23c3-451f-bc66-1b65bbbd9b3c', '8722bf34-6868-4a8b-988d-3b18fdbc384f', '25fa47d5-c50c-41ef-a62a-f2acaf22e81a', 'How does a programming language community contribute to language improvement?', 'a2', 'FREE_ANSWER', 'TEXT', 'Discuss the role of a programming language community in enhancing and evolving the language over time.', 'BEGINNER', 2, NULL),
    ('6d8d128f-1e75-4b2b-9dc6-8a6b3a1b83c5', '9a75e507-4b5c-4b45-9379-c38a6f3f059e', '7610521e-534e-492f-9dc1-0a14125bd1f8', 'How do you manipulate strings and numbers in programming?', 'a0', 'FREE_ANSWER', 'TEXT', 'Provide examples of manipulating text and numeric data in a programming language of your choice.', 'BEGINNER', 2, NULL),
    ('ce360d48-2673-47bf-ad6f-964a9f4541b0', '9a75e507-4b5c-4b45-9379-c38a6f3f059e', '8c84e27a-aece-4840-895e-352272088cd6', 'What are the common operations performed on strings?', 'a1', 'FREE_ANSWER', 'TEXT', 'Discuss common string operations and provide examples of how they are implemented in programming languages.', 'BEGINNER', 2, NULL),
    ('f0f60df4-b4b6-4e06-a44c-dc22d074a8e5', '9a75e507-4b5c-4b45-9379-c38a6f3f059e', 'd01ea964-c019-4f2f-8d6e-80727b8a2fd7', 'How can numeric data be manipulated in programming languages?', 'a2', 'FREE_ANSWER', 'TEXT', 'Explain various operations that can be performed on numeric data and provide examples in a programming language.', 'BEGINNER', 2, NULL),
    ('ccbdc053-6094-4192-bf50-d496e566235c', 'b8b7400d-52a1-4e10-96ce-995f5aa16739', '9de23c6e-59c0-4415-b538-1b9b59e34905', 'What are the main concepts of object-oriented programming?', 'a0', 'FREE_ANSWER', 'TEXT', 'Describe the fundamental concepts of object-oriented programming, including classes and objects.', 'INTERMEDIATE', 5, NULL),
    ('0a5f4512-5cb2-46fc-8273-38cffad1ebd1', 'b8b7400d-52a1-4e10-96ce-995f5aa16739', '6e0f86c2-6eba-4d19-be4b-8db2a9537296', 'How does encapsulation contribute to the principles of object-oriented programming?', 'a1', 'FREE_ANSWER', 'TEXT', 'Explain the role of encapsulation in achieving the principles of encapsulation and data hiding in OOP.', 'INTERMEDIATE', 5, NULL),
    ('2e9baa9b-42a0-4050-8235-10e232f5bf79', 'b8b7400d-52a1-4e10-96ce-995f5aa16739', '619bd7c2-b4d8-4ba4-9d98-aafe9552692c', 'How does polymorphism enhance code flexibility in object-oriented programming?', 'a2', 'FREE_ANSWER', 'TEXT', 'Discuss how polymorphism allows for flexibility in code design and implementation in OOP.', 'INTERMEDIATE', 5, NULL),
    ('a0b245ee-bfe6-4a97-900d-5d3f83db3cc9', 'ebfe0b0c-6e42-438e-bf4e-cbbdbb05c51f', '3a5a937a-fe93-4d9f-b357-25b0a3f3239c', 'Normalization in Databases', 'a0', 'FREE_ANSWER', 'TEXT', 'Explain the concept of normalization in relational databases.', 'ADVANCED', 10, NULL),
    ('c387a713-5ebd-4ae2-a80e-962db812ca59', 'ebfe0b0c-6e42-438e-bf4e-cbbdbb05c51f', 'b1bcb34b-0abe-4327-8907-ae828268d265', 'What is the role of normalization in optimizing database performance?', 'a1', 'FREE_ANSWER', 'TEXT', 'Discuss how normalization contributes to optimizing database performance and preventing data redundancy.', 'ADVANCED', 10, NULL),
    ('9383f283-6d36-48af-96d0-0f7b1f15e9d4', 'ebfe0b0c-6e42-438e-bf4e-cbbdbb05c51f', '11b31a1a-71d1-4e4c-8c8e-9884c295cf56', 'Give an example of a situation where denormalization might be justified in database design.', 'a2', 'FREE_ANSWER', 'TEXT', 'Discuss a scenario where denormalization could be a justifiable approach in database design and implementation.', 'ADVANCED', 10, NULL),
    ('e06291a9-cafc-44f5-a5bd-495680d5ba3b', 'e756b488-1fc4-4fb6-b4f3-d1e28a5935de', 'a641f763-a0b7-4aae-be4e-f879a4676892', 'Basic SELECT Statements', 'a0', 'FREE_ANSWER', 'TEXT', 'Write a basic SQL SELECT statement to retrieve data from a table.', 'INTERMEDIATE', 5, NULL),
    ('0e975ad9-a2c9-4c88-a4bb-99076514ca28', 'e756b488-1fc4-4fb6-b4f3-d1e28a5935de', '199d0244-b605-42f1-8b2e-6f3927e97d4a', 'How can you filter data using the WHERE clause in SQL?', 'a1', 'FREE_ANSWER', 'TEXT', 'Explain how the WHERE clause is used to filter data when querying a database using SQL.', 'INTERMEDIATE', 5, NULL),
    ('43ce3b42-f38f-4616-9a28-9ea199a753f1', 'e756b488-1fc4-4fb6-b4f3-d1e28a5935de', '19917e22-c0ce-4c96-8381-df06230cdf6e', 'Explain the purpose of the ORDER BY clause in SQL.', 'a2', 'FREE_ANSWER', 'TEXT', 'Discuss the role of the ORDER BY clause in sorting query results in SQL and provide examples.', 'INTERMEDIATE', 5, NULL),
    ('71a6d640-66b3-4e34-8025-b88cddadace6', '7fe0b554-1c69-4ee5-9e24-553f4b24d3c9', '6054d7dd-c284-40bd-bd33-0e76619ea2ee', 'Semantic HTML', 'a0', 'FREE_ANSWER', 'TEXT', 'Explain the importance of using semantic HTML elements in web development.', 'BEGINNER', 2, NULL),
    ('747ef924-17cc-4d03-a226-8e26864bc280', '7fe0b554-1c69-4ee5-9e24-553f4b24d3c9', '6c3d9919-98d3-4a46-ba62-c2af3c379dd7', 'Provide examples of semantic HTML elements and their uses.', 'a1', 'FREE_ANSWER', 'TEXT', 'List and explain examples of semantic HTML elements and describe their significance in web development.', 'BEGINNER', 2, NULL),
    ('0046b857-1fc0-430c-9439-a1d48ebe4c9b', '7fe0b554-1c69-4ee5-9e24-553f4b24d3c9', '0dc12427-b3db-4e1a-b8bc-c2f4b6032ce8', 'How does the use of semantic HTML contribute to website accessibility?', 'a2', 'FREE_ANSWER', 'TEXT', 'Discuss the role of semantic HTML in enhancing the accessibility of websites for users with disabilities.', 'BEGINNER', 2, NULL),
    ('25eb593b-9932-43f4-9a0b-d965257188da', 'ebd8e177-cede-4f23-b26e-b7405f4e8301', '7f936bc2-462b-4aa6-b0c3-ea4b7bbda1e0', 'JavaScript Variables', 'a0', 'FREE_ANSWER', 'TEXT', 'Define and give examples of JavaScript variables.', 'BEGINNER', 2, NULL),
    ('ce5d4580-a450-42ec-8a49-7222e8add528', 'ebd8e177-cede-4f23-b26e-b7405f4e8301', 'ae812f5e-c4c8-4d08-a3e3-55645a0999e9', 'Explain the difference between var, let, and const in JavaScript.', 'a1', 'FREE_ANSWER', 'TEXT', 'Discuss the distinctions between the var, let, and const keywords in JavaScript and when to use each.', 'BEGINNER', 2, NULL),
    ('fd353e6b-1e10-465c-a36b-4b226dc1f8f8', 'ebd8e177-cede-4f23-b26e-b7405f4e8301', 'c1fa9900-f5b9-4a37-9bc7-b6f4e15ec2a1', 'How can you effectively use comments in JavaScript code?', 'a2', 'FREE_ANSWER', 'TEXT', 'Explain the purpose and best practices for using comments in JavaScript code for improved readability and maintenance.', 'BEGINNER', 2, NULL);

-- Answer
INSERT INTO "Answer" (id, question_id, data, picture_id, "order") VALUES
    ('5c721c16-2d40-42da-987e-a14922ee323d', 'c3fdc564-8f46-4050-9d9b-515a20a9923a', 'Performance', NULL, 'a0'),
    ('1efb58e1-8f41-4c9e-b0c5-cf7eb2f9b23c', 'c3fdc564-8f46-4050-9d9b-515a20a9923a', 'Syntax', NULL, 'a0'),
    ('6d7cd9e1-f122-4234-bcd8-52ba8a466e7d', 'c3fdc564-8f46-4050-9d9b-515a20a9923a', 'Community', NULL, 'a0'),
    ('3b7c7382-cc5c-4fe6-8117-6e03962f75fc', 'c3fdc564-8f46-4050-9d9b-515a20a9923a', 'Compatibility', NULL, 'a0'),

    ('f741ffd4-504c-4aaa-9181-730b8312e6bd', '04bae167-b647-4898-9bc9-61bd3a73e4e8', 'Ensures code correctness', NULL, 'a0'),
    ('19917e22-c0ce-4c96-8381-df06230cdf6e', '04bae167-b647-4898-9bc9-61bd3a73e4e8', 'Facilitates code readability', NULL, 'a0'),
    ('9531243f-62b9-446d-8e42-6d5c759b76f8', '04bae167-b647-4898-9bc9-61bd3a73e4e8', 'Impacts code execution', NULL, 'a0'),
    ('67e18f81-9f55-4952-9ea2-e6ddc4303b28', '04bae167-b647-4898-9bc9-61bd3a73e4e8', 'Affects code compilation', NULL, 'a0'),

    ('69eb0f80-30cd-4fea-9336-588c5f59ab57', '3ed01a60-23c3-451f-bc66-1b65bbbd9b3c', 'Feedback on language features', NULL, 'a0'),
    ('34f97a2e-a3f1-4dc0-9cb2-95b596550f5c', '3ed01a60-23c3-451f-bc66-1b65bbbd9b3c', 'Bug reporting and fixing', NULL, 'a0'),
    ('25fa47d5-c50c-41ef-a62a-f2acaf22e81a', '3ed01a60-23c3-451f-bc66-1b65bbbd9b3c', 'Collaborative language development', NULL, 'a0'),
    ('0c0a6e56-1314-4818-b424-3f1bea12162c', '3ed01a60-23c3-451f-bc66-1b65bbbd9b3c', 'Community-driven updates', NULL, 'a0'),

    ('05b4f98c-c808-4ffd-af8e-d4ad3f6a40b3', '6d8d128f-1e75-4b2b-9dc6-8a6b3a1b83c5', 'Concatenation', NULL, 'a0'),
    ('313badca-e79d-4523-a6d0-1abc7aac4ff5', '6d8d128f-1e75-4b2b-9dc6-8a6b3a1b83c5', 'Substring', NULL, 'a0'),
    ('5558e740-34a3-417c-9e0d-0e6a41df086d', '6d8d128f-1e75-4b2b-9dc6-8a6b3a1b83c5', 'Arithmetic', NULL, 'a0'),
    ('7610521e-534e-492f-9dc1-0a14125bd1f8', '6d8d128f-1e75-4b2b-9dc6-8a6b3a1b83c5', 'Conversion', NULL, 'a0'),

    ('e2b60629-b15e-4955-b64e-c9ddc9f6c3cb', 'ce360d48-2673-47bf-ad6f-964a9f4541b0', 'Substring extraction', NULL, 'a0'),
    ('6855af13-adc1-44df-8ad5-f043b4063fc6', 'ce360d48-2673-47bf-ad6f-964a9f4541b0', 'String concatenation', NULL, 'a0'),
    ('8c84e27a-aece-4840-895e-352272088cd6', 'ce360d48-2673-47bf-ad6f-964a9f4541b0', 'Character replacement', NULL, 'a0'),
    ('750dae04-7ad4-4b97-af45-1c52564b66a7', 'ce360d48-2673-47bf-ad6f-964a9f4541b0', 'String comparison', NULL, 'a0'),

    ('f5be72cd-5ea4-4d82-a86d-815d83bc497a', 'f0f60df4-b4b6-4e06-a44c-dc22d074a8e5', 'Arithmetic operations', NULL, 'a0'),
    ('799ff906-a0c5-43f4-a482-b0260c045537', 'f0f60df4-b4b6-4e06-a44c-dc22d074a8e5', 'Numeric comparisons', NULL, 'a0'),
    ('d01ea964-c019-4f2f-8d6e-80727b8a2fd7', 'f0f60df4-b4b6-4e06-a44c-dc22d074a8e5', 'Data type conversions', NULL, 'a0'),
    ('c93cb301-4069-4a84-8417-a6aeea06a9ca', 'f0f60df4-b4b6-4e06-a44c-dc22d074a8e5', 'Random number generation', NULL, 'a0'),

    ('17b20104-75f3-4770-85a1-0141b9423351', 'ccbdc053-6094-4192-bf50-d496e566235c', 'Inheritance', NULL, 'a0'),
    ('6e0f86c2-6eba-4d19-be4b-8db2a9537296', 'ccbdc053-6094-4192-bf50-d496e566235c', 'Encapsulation', NULL, 'a0'),
    ('3042e3ca-7c0c-4b8c-8ed1-c9fe09a052d1', 'ccbdc053-6094-4192-bf50-d496e566235c', 'Polymorphism', NULL, 'a0'),
    ('9de23c6e-59c0-4415-b538-1b9b59e34905', 'ccbdc053-6094-4192-bf50-d496e566235c', 'Abstraction', NULL, 'a0'),

    ('8acf1f75-0ebd-42dd-9342-3e885155a8ee', '0a5f4512-5cb2-46fc-8273-38cffad1ebd1', 'Data protection', NULL, 'a0'),
    ('2093ccd1-6830-4695-9602-45bc544da76f', '0a5f4512-5cb2-46fc-8273-38cffad1ebd1', 'Reduced complexity', NULL, 'a0'),
    ('4217641d-e444-48cc-9bba-39257400da9e', '0a5f4512-5cb2-46fc-8273-38cffad1ebd1', 'Modularity', NULL, 'a0'),
    ('6bfdc12b-5947-4b4a-aaa2-b4dc90231d36', '0a5f4512-5cb2-46fc-8273-38cffad1ebd1', 'Code organization', NULL, 'a0'),

    ('619bd7c2-b4d8-4ba4-9d98-aafe9552692c', '2e9baa9b-42a0-4050-8235-10e232f5bf79', 'Dynamic method binding', NULL, 'a0'),
    ('b8e24819-3c3c-4b46-9502-e2b48d3a6d55', '2e9baa9b-42a0-4050-8235-10e232f5bf79', 'Code reuse', NULL, 'a0'),
    ('f6f7e890-736e-4ba5-ab70-f5002c7c609b', '2e9baa9b-42a0-4050-8235-10e232f5bf79', 'Interface implementation', NULL, 'a0'),
    ('f36e25bf-9f3f-4edd-84f6-487f604ec426', '2e9baa9b-42a0-4050-8235-10e232f5bf79', 'Increased extensibility', NULL, 'a0'),

    ('3dccca06-4eb1-4e1f-9ccc-30d21d7907d8', 'a0b245ee-bfe6-4a97-900d-5d3f83db3cc9', 'Validation', NULL, 'a0'),
    ('f24dc293-34d7-48c2-bd76-7756f2c1ac76', 'a0b245ee-bfe6-4a97-900d-5d3f83db3cc9', 'Conversion', NULL, 'a0'),
    ('aa417788-08e7-4242-b621-f39661faf93c', 'a0b245ee-bfe6-4a97-900d-5d3f83db3cc9', 'Memory', NULL, 'a0'),
    ('703d9ad6-ece9-478c-905d-4f0d41c2973b', 'a0b245ee-bfe6-4a97-900d-5d3f83db3cc9', 'Accuracy', NULL, 'a0'),

    ('b2a08e9f-7b2f-49d4-bfa3-2f0e78dfa976', 'c387a713-5ebd-4ae2-a80e-962db812ca59', 'Improved query execution', NULL, 'a0'),
    ('1c5efb0f-d69d-47b1-bd47-44f7e8e2e9cd', 'c387a713-5ebd-4ae2-a80e-962db812ca59', 'Reduced data redundancy', NULL, 'a0'),
    ('a07e20fd-69fa-40f3-a8fa-19643890ece2', 'c387a713-5ebd-4ae2-a80e-962db812ca59', 'Enhanced data integrity', NULL, 'a0'),
    ('1d95f27a-74c9-4b5a-9aee-599e447b82a0', 'c387a713-5ebd-4ae2-a80e-962db812ca59', 'Efficient storage utilization', NULL, 'a0'),

    ('3a5a937a-fe93-4d9f-b357-25b0a3f3239c', '9383f283-6d36-48af-96d0-0f7b1f15e9d4', 'Real-time analytics', NULL, 'a0'),
    ('f8794de2-83f2-4684-9f9f-a1e6aa044779', '9383f283-6d36-48af-96d0-0f7b1f15e9d4', 'Frequent complex queries', NULL, 'a0'),
    ('d60123d4-b768-4a20-9b43-eb6de55f755b', '9383f283-6d36-48af-96d0-0f7b1f15e9d4', 'High-performance reporting', NULL, 'a0'),
    ('11b31a1a-71d1-4e4c-8c8e-9884c295cf56', '9383f283-6d36-48af-96d0-0f7b1f15e9d4', 'Limited data modification operations', NULL, 'a0'),

    ('a641f763-a0b7-4aae-be4e-f879a4676892', 'e06291a9-cafc-44f5-a5bd-495680d5ba3b', 'SELECT * FROM table_name;', NULL, 'a0'),
    ('545eebab-f727-4689-bfd1-dd89752f69d3', 'e06291a9-cafc-44f5-a5bd-495680d5ba3b', 'SELECT column1, column2 FROM table_name WHERE condition;', NULL, 'a0'),
    ('d489da6d-be7b-4c2c-bb66-9cc27396720d', 'e06291a9-cafc-44f5-a5bd-495680d5ba3b', 'SELECT DISTINCT column FROM table_name;', NULL, 'a0'),
    ('03ff3dcc-95f2-4d0e-9723-386ba9ebb07b', 'e06291a9-cafc-44f5-a5bd-495680d5ba3b', 'SELECT COUNT(*) FROM table_name WHERE condition;', NULL, 'a0'),

    ('1910aa94-545c-4b3d-9a1e-bf45e6452da3', '0e975ad9-a2c9-4c88-a4bb-99076514ca28', 'Filters rows based on a specified condition', NULL, 'a0'),
    ('c07a4cc2-b653-4c72-a2a5-b4013195ecad', '0e975ad9-a2c9-4c88-a4bb-99076514ca28', 'Used in conjunction with SELECT statements', NULL, 'a0'),
    ('e093060f-e298-43d2-9046-1b0c51a0a9e6', '0e975ad9-a2c9-4c88-a4bb-99076514ca28', 'Supports logical operators (AND, OR, NOT)', NULL, 'a0'),
    ('ac48703e-3b6c-41ea-a77d-de7afa5a7600', '0e975ad9-a2c9-4c88-a4bb-99076514ca28', 'Specifies conditions for data retrieval', NULL, 'a0'),

    ('199d0244-b605-42f1-8b2e-6f3927e97d4a', '43ce3b42-f38f-4616-9a28-9ea199a753f1', 'Sorts query results in ascending or descending order', NULL, 'a0'),
    ('b1bcb34b-0abe-4327-8907-ae828268d265', '43ce3b42-f38f-4616-9a28-9ea199a753f1', 'Used with SELECT statements that retrieve multiple rows', NULL, 'a0'),
    ('b0e4546e-e50d-4618-b7d2-1acd678ef0b5', '43ce3b42-f38f-4616-9a28-9ea199a753f1', 'Supports sorting based on one or more columns', NULL, 'a0'),
    ('997ab22e-fc34-41b5-abe3-cc46bdce4c18', '43ce3b42-f38f-4616-9a28-9ea199a753f1', 'Enhances result set organization and readability', NULL, 'a0'),

    ('565ea299-e18e-4a91-819f-741fb31e268e', '71a6d640-66b3-4e34-8025-b88cddadace6', 'Semantic elements provide meaning to the content.', NULL, 'a0'),
    ('601bc246-9b7e-4107-85bb-0ae76705d73c', '71a6d640-66b3-4e34-8025-b88cddadace6', 'They enhance accessibility and SEO.', NULL, 'a0'),
    ('090cf41d-4149-43b9-a571-dcf28efab371', '71a6d640-66b3-4e34-8025-b88cddadace6', 'Semantic HTML improves document structure.', NULL, 'a0'),
    ('6054d7dd-c284-40bd-bd33-0e76619ea2ee', '71a6d640-66b3-4e34-8025-b88cddadace6', 'Using semantic tags aids in website navigation.', NULL, 'a0'),

    ('237280a9-9838-4c15-be71-94b26a170bf9', '747ef924-17cc-4d03-a226-8e26864bc280', '<header>: Defines a header for a document or a section', NULL, 'a0'),
    ('86949c87-514b-45ef-88c0-279d69f15b18', '747ef924-17cc-4d03-a226-8e26864bc280', '<article>: Represents an independent piece of content', NULL, 'a0'),
    ('7e298598-e138-4cf6-abb8-5cbdcf30e6dd', '747ef924-17cc-4d03-a226-8e26864bc280', '<footer>: Defines a footer for a document or a section', NULL, 'a0'),
    ('6c3d9919-98d3-4a46-ba62-c2af3c379dd7', '747ef924-17cc-4d03-a226-8e26864bc280', '<nav>: Defines navigation links in a document', NULL, 'a0'),

    ('806524f7-c70e-4c87-85bd-a6ed5ec8902e', '0046b857-1fc0-430c-9439-a1d48ebe4c9b', 'Facilitates screen reader interpretation', NULL, 'a0'),
    ('0dc12427-b3db-4e1a-b8bc-c2f4b6032ce8', '0046b857-1fc0-430c-9439-a1d48ebe4c9b', 'Improves compatibility with assistive technologies', NULL, 'a0'),
    ('095ac2c9-43c0-4c1b-b876-92564973cbbf', '0046b857-1fc0-430c-9439-a1d48ebe4c9b', 'Enhances document structure for accessibility tools', NULL, 'a0'),
    ('0485f3b2-1f49-4dfa-93e1-61a3f1d0e94e', '0046b857-1fc0-430c-9439-a1d48ebe4c9b', 'Supports better navigation and understanding for all users', NULL, 'a0'),

    ('476ca37e-6d55-4500-9098-43cdcc190d81', '25eb593b-9932-43f4-9a0b-d965257188da', 'A variable is a container for storing data values.', NULL, 'a0'),
    ('7f936bc2-462b-4aa6-b0c3-ea4b7bbda1e0', '25eb593b-9932-43f4-9a0b-d965257188da', 'Variables are used to store information to be referenced and manipulated in a program.', NULL, 'a0'),
    ('df3fb844-e891-43fd-9abc-1c5109a14a4c', '25eb593b-9932-43f4-9a0b-d965257188da', 'Variables are declared with the var, let, or const keyword.', NULL, 'a0'),
    ('b556889a-86d0-46c1-bfa4-f146c226ec76', '25eb593b-9932-43f4-9a0b-d965257188da', 'Example: var x = 5;', NULL, 'a0'),

    ('ae812f5e-c4c8-4d08-a3e3-55645a0999e9', 'ce5d4580-a450-42ec-8a49-7222e8add528', 'var: Function-scoped, can be redeclared and updated', NULL, 'a0'),
    ('21fe8fd7-0846-4a2b-b338-ddbe62f25ddb', 'ce5d4580-a450-42ec-8a49-7222e8add528', 'let: Block-scoped, can be updated but not redeclared', NULL, 'a0'),
    ('09b36aab-fbc0-4394-b7ad-72ce82fc99ee', 'ce5d4580-a450-42ec-8a49-7222e8add528', 'const: Block-scoped, cannot be redeclared or updated', NULL, 'a0'),
    ('c1fa9900-fd3a-4b97-830a-779bd9267de3', 'ce5d4580-a450-42ec-8a49-7222e8add528', 'Use var for older code, let for variables that change, const for constant values.', NULL, 'a0'),

    ('f962ecc6-6ec2-4fcb-9357-39d8c92d7f38', 'fd353e6b-1e10-465c-a36b-4b226dc1f8f8', 'Comments are used to add explanations and context to code.', NULL, 'a0'),
    ('0bc2ecc3-7ede-47b0-9ae4-8dd9d20ef22a', 'fd353e6b-1e10-465c-a36b-4b226dc1f8f8', 'Single-line comments start with //, while multi-line comments use /* */.', NULL, 'a0'),
    ('f342eb48-9c1a-4adf-86dd-c8849fc55c3b', 'fd353e6b-1e10-465c-a36b-4b226dc1f8f8', 'Use comments to describe complex parts of code, document functions, and provide insights for other developers.', NULL, 'a0'),
    ('c02e5ef6-5399-4c46-87b5-6db1856b1741', 'fd353e6b-1e10-465c-a36b-4b226dc1f8f8', 'Avoid unnecessary comments and ensure comments stay updated with code changes.', NULL, 'a0');

-- UsertoCourse
INSERT INTO "UsertoCourse" (id, course_id, user_id, role_user, permission_user, permission_course, status) VALUES
    ('bb24df4f-2b48-4a50-88a8-12a7cb3011e0', 'e5a1c556-193c-4a17-ba0c-5a9ddc5dd6f1', '56fb679c-973b-4b3e-8f87-3b7ddcadbfa4', 'OWNER', '{"READ", "WRITE", "DELETE", "ADMIN"}', '{"READ", "WRITE", "DELETE", "ADMIN"}', 'IN_PROGRESS'),
    ('bc66af4b-e191-4e6f-afaf-cfe5bf3bf1d9', 'e5a1c556-193c-4a17-ba0c-5a9ddc5dd6f1', '83f7337b-cf79-438e-86d4-3ba0db64b5db', 'MEMBER', '{"READ", "WRITE"}', '{"READ"}', 'IN_PROGRESS'),
    ('2ac2e8e0-3a23-4a2e-aa41-10bce6f3bc9e', '3a43db61-67b7-4ef4-9b58-3fbc87ea80f4', '83f7337b-cf79-438e-86d4-3ba0db64b5db', 'OWNER', '{"READ", "WRITE", "DELETE", "ADMIN"}', '{"READ", "WRITE", "DELETE", "ADMIN"}', 'IN_PROGRESS'),

    ('af1d1bd4-84cf-4752-b991-74da2ff3715d', 'c87950af-2ee2-40c7-bd16-607d440cecb3', 'a5e15301-9fb3-4d95-b08d-67fd781aafab', 'MEMBER', '{"READ", "WRITE"}', '{"READ"}', 'IN_PROGRESS'),
    ('f341c073-2b63-459c-ba85-6c83ed9c6d37', 'db6cf3cc-7cb4-4a5d-84f4-75a6fcf223d3', 'a5e15301-9fb3-4d95-b08d-67fd781aafab', 'OWNER', '{"READ", "WRITE", "DELETE", "ADMIN"}', '{"READ", "WRITE", "DELETE", "ADMIN"}', 'IN_PROGRESS'),
    ('0ddde9c0-915e-4f48-b5d4-28d0080d682c', 'db6cf3cc-7cb4-4a5d-84f4-75a6fcf223d3', '65d7c6f4-157b-4e7e-92e2-58b80e8e1d43', 'MEMBER', '{"READ"}', '{"READ"}', 'IN_PROGRESS');

-- UsertoSection
INSERT INTO "UsertoSection" (id, section_id, user_id, status, updated_at) VALUES
    ('db640804-a79b-456e-bd7b-640f97e2e37e', 'df0e43ff-1310-4d92-9a19-c62854ab7391', '56fb679c-973b-4b3e-8f87-3b7ddcadbfa4', 'IN_PROGRESS', NOW()),
    ('870d7a48-2ff7-4f07-8825-900cc7d0c718', 'df0e43ff-1310-4d92-9a19-c62854ab7391', '83f7337b-cf79-438e-86d4-3ba0db64b5db', 'IN_PROGRESS' , NOW()),
    ('503d5913-80b9-44b6-85d3-ab2feb2b9ba1', 'd2e9fc8b-31c0-493a-9b45-004a73fe9bb9', '83f7337b-cf79-438e-86d4-3ba0db64b5db', 'IN_PROGRESS', NOW()),

    ('8b4039a6-a075-4eb1-86a7-3cbd9eda84f2', 'e2c0e524-89b2-4f13-a36b-69c1b257e017', 'a5e15301-9fb3-4d95-b08d-67fd781aafab', 'IN_PROGRESS', NOW()),
    ('0ecdc155-ce9e-441b-b8bd-a347029e3ed0', 'daae7023-37d4-40b8-bb03-07f60a3e0a1d', 'a5e15301-9fb3-4d95-b08d-67fd781aafab', 'IN_PROGRESS', NOW()),
    ('5683cd68-af5a-4867-a2ab-1065572cf646', 'daae7023-37d4-40b8-bb03-07f60a3e0a1d', '65d7c6f4-157b-4e7e-92e2-58b80e8e1d43', 'IN_PROGRESS', NOW());


-- UsertoLesson
INSERT INTO "UsertoLesson" (id, lesson_id, user_id, complete_lecture, complete_question, status, updated_at) VALUES
    ('2c7e2e95-65e2-48fe-b5f4-d41b0f2e48e5', '8722bf34-6868-4a8b-988d-3b18fdbc384f', '56fb679c-973b-4b3e-8f87-3b7ddcadbfa4', true, true, 'IN_PROGRESS', NOW()),
    ('3c8c23db-f42f-46ac-902d-98d124f0e39f', '9a75e507-4b5c-4b45-9379-c38a6f3f059e', '56fb679c-973b-4b3e-8f87-3b7ddcadbfa4', true, false, 'IN_PROGRESS', NOW()),
    ('23f6f60b-c977-4b71-b953-554d61d7e9de', 'b8b7400d-52a1-4e10-96ce-995f5aa16739', '83f7337b-cf79-438e-86d4-3ba0db64b5db', false, false, 'NOT_STARTED', NOW()),
    ('1c8eab78-7735-45ab-86e3-f1c03b3c8d29', '7d6392e1-8dc4-48e1-b162-c00b025f6b6a', '83f7337b-cf79-438e-86d4-3ba0db64b5db', true, false, 'IN_PROGRESS', NOW()),

    ('3a720ba5-3f11-43df-bad7-e245d438224e', 'ebfe0b0c-6e42-438e-bf4e-cbbdbb05c51f', 'a5e15301-9fb3-4d95-b08d-67fd781aafab', true, true, 'NOT_STARTED', NOW()),
    ('b86110f5-6e92-4d4d-b870-c10b5a48a6e3', 'e756b488-1fc4-4fb6-b4f3-d1e28a5935de', 'a5e15301-9fb3-4d95-b08d-67fd781aafab', true, false, 'IN_PROGRESS', NOW()),
    ('7d8ffbbd-1e09-4ff9-88cf-b17d3a4bc067', '7fe0b554-1c69-4ee5-9e24-553f4b24d3c9', '65d7c6f4-157b-4e7e-92e2-58b80e8e1d43', true, false, 'IN_PROGRESS', NOW()),
    ('2b3c9b37-bf1c-4e42-b72b-68e4e5754b25', 'ebd8e177-cede-4f23-b26e-b7405f4e8301', '65d7c6f4-157b-4e7e-92e2-58b80e8e1d43', true, true, 'NOT_STARTED', NOW());

-- Discussion
INSERT INTO "Discussion" (id, title, image_url, updated_at) VALUES
    ('47ad9f5a-8fbb-44fb-8941-1045756ac952', 'General Discussion', NULL, NOW()),
    ('d4d8c46d-92a8-4d2f-a8aa-d9b714faa90f', 'Another Discussion', NULL, NOW()),

    ('c9bd485d-cb53-49d4-8f0d-0bb041a40cb3', 'Database Discussion', NULL, NOW()),
    ('1a7f12c9-4981-4e99-aab6-3a42905bca13', 'JavaScript Q&A', NULL, NOW());

-- Message
INSERT INTO "Message" (id, discussion_id, owner_id, content, updated_at) VALUES
    ('c05b35db-5b21-49e2-8b48-5d0e25f7a3de', '47ad9f5a-8fbb-44fb-8941-1045756ac952', '56fb679c-973b-4b3e-8f87-3b7ddcadbfa4', 'Hello, this is a message in the general discussion.', NOW()),
    ('a166a07b-4f7d-404d-9e24-b24ed6fc380b', '47ad9f5a-8fbb-44fb-8941-1045756ac952', '83f7337b-cf79-438e-86d4-3ba0db64b5db', 'Hi there ! This is another message.', NOW()),
    ('e65edbbe-b47c-4ea4-87f3-4a42a141e24a', 'd4d8c46d-92a8-4d2f-a8aa-d9b714faa90f', '56fb679c-973b-4b3e-8f87-3b7ddcadbfa4', 'Let''s discuss general programming concepts.', NOW()),
    ('0b777e85-c10f-4b35-93f4-54b28317c743', 'd4d8c46d-92a8-4d2f-a8aa-d9b714faa90f', '83f7337b-cf79-438e-86d4-3ba0db64b5db', 'Sure, I''m interested! What specific concepts would you like to discuss ?', NOW()),

    ('c8d02e26-8b6e-45de-9a10-6ea3db5d954b', 'c9bd485d-cb53-49d4-8f0d-0bb041a40cb3', 'a5e15301-9fb3-4d95-b08d-67fd781aafab', 'Let''s discuss database design and optimization.', NOW()),
    ('f9ffeb4d-4a43-4dcb-b8ab-5f7ea123c9dd', 'c9bd485d-cb53-49d4-8f0d-0bb041a40cb3', '65d7c6f4-157b-4e7e-92e2-58b80e8e1d43', 'I have some experience with indexing in databases.', NOW()),
    ('dc02a3b3-c8b2-40b0-ae07-b8c0472c7a8e', '1a7f12c9-4981-4e99-aab6-3a42905bca13', 'a5e15301-9fb3-4d95-b08d-67fd781aafab', 'Anyone struggling with JavaScript closures ?', NOW());

-- UserDiscussions
INSERT INTO "UserDiscussions" (user_id, discussion_id) VALUES
    ('56fb679c-973b-4b3e-8f87-3b7ddcadbfa4', '47ad9f5a-8fbb-44fb-8941-1045756ac952'),
    ('56fb679c-973b-4b3e-8f87-3b7ddcadbfa4', 'd4d8c46d-92a8-4d2f-a8aa-d9b714faa90f'),
    ('83f7337b-cf79-438e-86d4-3ba0db64b5db', '47ad9f5a-8fbb-44fb-8941-1045756ac952'),
    ('83f7337b-cf79-438e-86d4-3ba0db64b5db', 'd4d8c46d-92a8-4d2f-a8aa-d9b714faa90f'),

    ('a5e15301-9fb3-4d95-b08d-67fd781aafab', 'c9bd485d-cb53-49d4-8f0d-0bb041a40cb3'),
    ('a5e15301-9fb3-4d95-b08d-67fd781aafab', '1a7f12c9-4981-4e99-aab6-3a42905bca13'),
    ('65d7c6f4-157b-4e7e-92e2-58b80e8e1d43', 'c9bd485d-cb53-49d4-8f0d-0bb041a40cb3');

-- Lecture
INSERT INTO "Lecture" (id, lesson_id, data) VALUES
    ('5a8a0bd8-25f4-4a4d-9104-55e2c4d3f7e7', '8722bf34-6868-4a8b-988d-3b18fdbc384f', 'This lecture provides an overview of various programming languages and factors to consider when choosing one.'),
    ('f3a86e04-cd5e-4bf3-8bf3-3611397871e1', '9a75e507-4b5c-4b45-9379-c38a6f3f059e', 'In this lecture, we explore techniques for working with strings and numbers in programming.'),
    ('6c0d816d-13b2-491d-8ef8-5b1468b7d5f3', 'b8b7400d-52a1-4e10-96ce-995f5aa16739', 'Learn the fundamental concepts of object-oriented programming, including classes and objects.');


-- Subscriptions plans
INSERT INTO "Subscription" (id, plan, slots) VALUES
    ('aaed0f14-ef84-4d14-81ce-b2169db6a013', 'BASIC', 5),
    ('d369e00b-7e10-4b52-aca4-02be0eaeb804', 'ESSENTIAL', 100),
    ('1bfd23ba-ea5b-4a45-b2f9-2e4d8627b32b', 'MASTER', 9999999);
