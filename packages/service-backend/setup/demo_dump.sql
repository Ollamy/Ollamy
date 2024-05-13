DROP TABLE IF EXISTS _prisma_migrations;
create table _prisma_migrations
(
    id                  varchar(36)                            not null
        primary key,
    checksum            varchar(64)                            not null,
    finished_at         timestamp with time zone,
    migration_name      varchar(255)                           not null,
    logs                text,
    rolled_back_at      timestamp with time zone,
    started_at          timestamp with time zone default now() not null,
    applied_steps_count integer                  default 0     not null
);

alter table _prisma_migrations
    owner to postgres;

DROP TABLE IF EXISTS "Lecture";
DROP TABLE IF EXISTS "Answer";
DROP TABLE IF EXISTS "Question";
DROP TABLE IF EXISTS "UsertoCourse";
DROP TABLE IF EXISTS "UsertoScore";
DROP TABLE IF EXISTS "UsertoLesson";
DROP TABLE IF EXISTS "Lesson";
DROP TABLE IF EXISTS "UserDiscussions";
DROP TABLE IF EXISTS "UserBadges";
DROP TABLE IF EXISTS "Section";
DROP TABLE IF EXISTS "Message";
DROP TABLE IF EXISTS "Discussion";
DROP TABLE IF EXISTS "Course";
DROP TABLE IF EXISTS "Picture";
DROP TABLE IF EXISTS "Badge";
DROP TABLE IF EXISTS "User";

create table "User"
(
    id             uuid not null
        primary key,
    firstname      text not null,
    lastname       text not null,
    email          text not null,
    password       text not null,
    communities_id uuid[]
);

alter table "User"
    owner to postgres;

create unique index "User_email_key"
    on "User" (email);

create table "Badge"
(
    id          uuid default gen_random_uuid() not null
        primary key,
    name        text                           not null,
    description text                           not null,
    image_name  text                           not null,
    color       text                           not null,
    "order"     integer                        not null
);

alter table "Badge"
    owner to postgres;

create table "Picture"
(
    id       uuid not null
        primary key,
    filename text not null
);

alter table "Picture"
    owner to postgres;

create table "Course"
(
    id          uuid not null
        primary key,
    owner_id    uuid not null
        references "User"
            on update cascade on delete cascade,
    title       text not null,
    description text,
    picture_id  uuid
        references "Picture"
            on update cascade on delete cascade
);

alter table "Course"
    owner to postgres;

create table "Discussion"
(
    id         uuid                                   not null
        primary key,
    created_at timestamp(3) default CURRENT_TIMESTAMP not null,
    updated_at timestamp(3)                           not null,
    title      text,
    image_url  text
);

alter table "Discussion"
    owner to postgres;

create table "Message"
(
    id            uuid                                   not null
        primary key,
    created_at    timestamp(3) default CURRENT_TIMESTAMP not null,
    updated_at    timestamp(3)                           not null,
    discussion_id uuid                                   not null
        references "Discussion"
            on update cascade on delete cascade,
    owner_id      uuid                                   not null
        references "User"
            on update cascade on delete cascade,
    content       text                                   not null
);

alter table "Message"
    owner to postgres;

create table "Section"
(
    id          uuid not null
        primary key,
    course_id   uuid not null
        references "Course"
            on update cascade on delete cascade,
    title       text not null,
    description text
);

alter table "Section"
    owner to postgres;

create table "UserBadges"
(
    user_id    uuid                                   not null
        references "User"
            on update cascade on delete cascade,
    badge_id   uuid                                   not null
        references "Badge"
            on update cascade on delete cascade,
    created_at timestamp(3) default CURRENT_TIMESTAMP not null,
    primary key (user_id, badge_id)
);

alter table "UserBadges"
    owner to postgres;

create table "UserDiscussions"
(
    user_id       uuid not null
        references "User"
            on update cascade on delete cascade,
    discussion_id uuid not null
        references "Discussion"
            on update cascade on delete cascade,
    primary key (user_id, discussion_id)
);

alter table "UserDiscussions"
    owner to postgres;

create table "Lesson"
(
    id          uuid not null
        primary key,
    title       text not null,
    description text,
    section_id  uuid not null
        references "Section"
            on update cascade on delete cascade
);

alter table "Lesson"
    owner to postgres;

create table "UsertoLesson"
(
    id                uuid                                                 not null
        primary key,
    lesson_id         uuid                                                 not null
        references "Lesson"
            on update cascade on delete cascade,
    user_id           uuid                                                 not null
        references "User"
            on update cascade on delete cascade,
    complete_lecture  boolean        default false                         not null,
    complete_question boolean        default false                         not null,
    status            "LessonStatus" default 'NOT_STARTED'::"LessonStatus" not null,
    created_at        timestamp(3)   default CURRENT_TIMESTAMP             not null,
    updated_at        timestamp(3)                                         not null,
    score             integer        default 0
);

create table "UsertoScore"
(
    id      uuid not null
        primary key,
    user_id uuid not null
        references "User"
            on update cascade on delete cascade,
    score   integer default 0
);

alter table "UsertoScore"
    owner to postgres;

create unique index "UsertoScore_user_id_key"
    on "UsertoScore" (user_id);

create table "UsertoCourse"
(
    id                 uuid                                           not null
        primary key,
    role_user          "Role"                default 'MEMBER'::"Role" not null,
    permission_user    "PermissionUser"[]    default ARRAY []::"PermissionUser"[],
    permission_course  "PermissionCourse"[]  default ARRAY []::"PermissionCourse"[],
    permission_section "PermissionSection"[] default ARRAY []::"PermissionSection"[],
    permission_lesson  "PermissionLesson"[]  default ARRAY []::"PermissionLesson"[],
    course_id          uuid                                           not null
        references "Course"
            on update cascade on delete cascade,
    user_id            uuid                                           not null
        references "User"
            on update cascade on delete cascade,
    last_lesson_id     uuid
                                                                      references "Lesson"
                                                                          on update cascade on delete set null,
    last_section_id    uuid
                                                                      references "Section"
                                                                          on update cascade on delete set null,
    score              integer               default 0,
    hp                 integer               default 20
);

alter table "UsertoCourse"
    owner to postgres;

create unique index "UsertoCourse_course_id_user_id_key"
    on "UsertoCourse" (course_id, user_id);

create table "Question"
(
    id              uuid           not null
        primary key,
    lesson_id       uuid           not null
        references "Lesson"
            on update cascade on delete cascade,
    title           text           not null,
    description     text,
    trust_answer_id uuid,
    type_answer     "AnswerType"   not null,
    type_question   "QuestionType" not null,
    difficulty      "QuestionDifficulty",
    picture_id      uuid
        references "Picture"
            on update cascade on delete cascade,
    points          integer default 0,
    "order"         text           not null
);

alter table "Question"
    owner to postgres;

create table "Answer"
(
    id          uuid not null
        primary key,
    question_id uuid not null
        references "Question"
            on update cascade on delete cascade,
    data        text,
    picture_id  uuid
        references "Picture"
            on update cascade on delete cascade,
    "order"     text not null
);

alter table "Answer"
    owner to postgres;

create table "Lecture"
(
    id        uuid not null
        primary key,
    lesson_id uuid not null
        references "Lesson"
            on update cascade on delete cascade,
    data      text not null
);

alter table "Lecture"
    owner to postgres;

INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('55d1bce5-7cf7-4365-bb3b-621297e56082', 'bf8d98457d08ed4f1c3f3923573b575a0568f79780233d9b36295a6e776754ad', '2024-05-11 13:17:24.313016 +00:00', '20221214100930_', null, null, '2024-05-11 13:17:24.293720 +00:00', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('99ba6711-6345-4d51-b99a-1d4ff80c44a5', '0ddcc5a5cbfc3445a2acabb25f40deccfdd77f7d1aa798c13b234c03b6ee556a', '2024-05-11 13:17:24.367600 +00:00', '20240212063615_', null, null, '2024-05-11 13:17:24.364529 +00:00', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('81137554-43c8-4e5c-a27c-e8e472b7b5ad', '9cb207b8e31482827b2519b4c4489215d28d69f73db88b4cf381cef462a73787', '2024-05-11 13:17:24.317481 +00:00', '20221214122620_lesson', null, null, '2024-05-11 13:17:24.313569 +00:00', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('6f3b0780-4cd0-42e9-89a3-536b379aaeaf', 'd50023d1531a1d81bbed83b2eaf9e4b8aeaa0515dac69c422e334bac13d9a07c', '2024-05-11 13:17:24.319259 +00:00', '20221214145849_data_lesson', null, null, '2024-05-11 13:17:24.317950 +00:00', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('d03e4c00-052e-4f36-bcdb-f6a9f3dbf2a7', 'fcf606cdf814a4786bb4022bae26fec437c076ebb08704206b0e35822363d079', '2024-05-11 13:17:24.321535 +00:00', '20221214152052_refracto', null, null, '2024-05-11 13:17:24.319674 +00:00', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('529efed5-5bd6-4539-b1be-70e3be8f8834', 'bf5212fa9643430be197994c74df176737f9bd92cf9b2e351bfb51379ab6ce29', '2024-05-11 13:17:24.374647 +00:00', '20240310172811_update_score_system', null, null, '2024-05-11 13:17:24.368013 +00:00', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('0718a553-f9ee-449f-9407-11c4426c8831', '18d033cb720e041a674841a56cfeb0e2fac7cbd8cfaf9ee31982006cab4aec37', '2024-05-11 13:17:24.323197 +00:00', '20221215143452_description_optionnal', null, null, '2024-05-11 13:17:24.321965 +00:00', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('8b486aeb-4ef9-4f32-b1a5-663aa9730617', 'a4132b13862dcae074f5fc4744bf468a850c4e1bc4f6862606f4d488c675e2d5', '2024-05-11 13:17:24.325105 +00:00', '20221215143854_description_optionnal_all_fields', null, null, '2024-05-11 13:17:24.323622 +00:00', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('1618a8c8-b3a5-44d6-9939-bf27d7498a70', '444f44e845ec3cd5469407dce0bce0fcfce022dd28bd18ac33783efb38f049b5', '2024-05-11 13:17:24.329655 +00:00', '20230226124958_refracto', null, null, '2024-05-11 13:17:24.325528 +00:00', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('a64621e0-f585-4735-a78b-895b2175fc13', '4556433b612d91b92f0958557a096143e51b4aa507f9bd62965441db2436c7b1', '2024-05-11 13:17:24.378172 +00:00', '20240310181508_update_score_to_be_optionnal', null, null, '2024-05-11 13:17:24.375534 +00:00', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('880f1d72-f15e-40dc-8a6a-66a92f034229', 'ab9a6dd6bc3e38079e85d0dade4b81257c467254b01bbc905162bf208284d6e1', '2024-05-11 13:17:24.338271 +00:00', '20230913033104_discussion_model', null, null, '2024-05-11 13:17:24.330127 +00:00', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('995bc438-f17b-46cf-bd00-2be6e7d1a38b', '3dff73ab59ddefadc1fd0f4264abc0d97748be7606f6de1a4044244f0e12826d', '2024-05-11 13:17:24.342482 +00:00', '20231112000422_create_picture_table_and_add_it_to_course', null, null, '2024-05-11 13:17:24.338665 +00:00', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('b5b0ae20-ba29-4407-87db-d192f491b14a', '46bf86f4d5124a1fac0502e3b10d90152975622c4e88cd85a2b93b130ecbc8c6', '2024-05-11 13:17:24.354708 +00:00', '20231205170651_add_user_to_lesson_answer_and_lecture_table', null, null, '2024-05-11 13:17:24.342930 +00:00', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('e8cc159e-e966-4519-9c31-daef35a607f5', '0e591b63ababc33d261f4e32d188b3e2fcb2a8acbd0307a3d8c8ab72404389df', '2024-05-11 13:17:24.383288 +00:00', '20240310214533_update_order_to_string', null, null, '2024-05-11 13:17:24.378770 +00:00', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('bcd8c046-1035-4881-945d-c183d6b8e8eb', '5170b15349e988d4ee8802de2d36a9e3f2c30688d533d02abc440016d65bb2f8', '2024-05-11 13:17:24.356760 +00:00', '20240107174552_add_order_field_to_question_table', null, null, '2024-05-11 13:17:24.355260 +00:00', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('53bf1bbc-2481-4c2d-a534-caf7ca6d0340', '43d33d14798acbb7c1dbe7ae364b070d5693c01518a1f64ae03ba65f490aa927', '2024-05-11 13:17:24.360299 +00:00', '20240205195422_image', null, null, '2024-05-11 13:17:24.357211 +00:00', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('13f1fb6d-839d-40a3-a786-150391bac71e', '970b8b5c5351e460c251de863d522ec9ffa6400f0c8dc9fe945f3b0ddf9f1327', '2024-05-11 13:17:24.364087 +00:00', '20240212063138_', null, null, '2024-05-11 13:17:24.360812 +00:00', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('fe5dc2ff-81c4-49c6-9ec3-347e855d529d', '0af0d0b99e3d46485c7fde4cc22526d8b5fddcd4f36a11f4c307369cb8c338d9', '2024-05-11 13:17:24.385059 +00:00', '20240408171918_add_users_hp_in_user_to_course', null, null, '2024-05-11 13:17:24.383713 +00:00', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('e2dfce8c-eec6-4767-a656-b2c3305d178a', '7fa2b1b6047f2759416c17ba175446f9489794e4171397b41644a6684a8929db', '2024-05-11 13:17:24.393153 +00:00', '20240410225903_add_badges', null, null, '2024-05-11 13:17:24.385503 +00:00', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('7e309bd5-28a7-4e7b-9c6b-8903f43859d2', '9fd4dec582b8acbf9ae7042228a31b1d57a2b4fe595306cebcb7cdb3dfb8732f', '2024-05-11 13:17:24.394650 +00:00', '20240511095723_order_answer', null, null, '2024-05-11 13:17:24.393555 +00:00', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('1fac4135-415b-4736-b78a-37a10be85367', '050c35899e801075d59950134db63f7bcef92db654e5f13de96a5f349f0b4aca', '2024-05-12 18:38:10.924995 +00:00', '20240512081041_answer_type', null, null, '2024-05-12 18:38:10.914172 +00:00', 1);


INSERT INTO public."User" (id, firstname, lastname, email, password, communities_id) VALUES ('73284fcd-28f4-415d-b72b-90ca512f52fb', 'alexandre', 'grare', 'alexandre@ollamy.fr', 'il+7JzlflhOI6N6gPssVDnDfJSNcmGdw6948CKFoCg3QNNrJr7YRIqNRLCMi/AJsiuwBiSK7HvlFqFgZ1V107A==', '{}');

INSERT INTO public."Course" (id, owner_id, title, description, picture_id) VALUES ('fa2a2aa3-303c-4c23-bf1f-937e1cce37e5', '73284fcd-28f4-415d-b72b-90ca512f52fb', 'Les bases de la photographie', 'Ce cours à pour but d''introduire les bases de la photographie à tout debutant.', null);

INSERT INTO public."Badge" (id, name, description, image_name, color, "order") VALUES ('92713ffc-54e0-4eb7-9405-05cf3cbb654c', 'First Lesson', 'You completed your first Lesson', 'first_lesson', '#DC8F69', 0);
INSERT INTO public."Badge" (id, name, description, image_name, color, "order") VALUES ('11d04962-0422-412a-8b15-6a81fc3709c3', 'Second Lesson', 'You completed your second Lesson', 'second_lesson', '#787DA3', 1);
INSERT INTO public."Badge" (id, name, description, image_name, color, "order") VALUES ('6da00b99-6c48-4c42-85c7-9cc400025aba', 'Third Lesson', 'You completed your third Lesson', 'third_lesson', '#E0AD03', 2);
INSERT INTO public."Badge" (id, name, description, image_name, color, "order") VALUES ('5432a8bf-26f1-4c89-a06b-bf64bd6e633e', 'Fourth Lesson', 'You completed your fourth Lesson', 'fourth_lesson', '#8EBBFF', 3);
INSERT INTO public."Badge" (id, name, description, image_name, color, "order") VALUES ('d101a686-e56a-4dda-8c50-e0f61a80fe1f', 'Fifth Lesson', 'You completed your fifth Lesson', 'fifth_lesson', '#E0AD03', 4);

INSERT INTO public."Picture" (id, filename) VALUES ('3a43db61-67b7-4ef4-9b58-3fbc87ea80f4', 'https://example.com/picture1.jpg');
INSERT INTO public."Picture" (id, filename) VALUES ('7649c16e-e27d-4a17-b4a2-aae3bbbc6ad2', 'https://example.com/picture2.jpg');
INSERT INTO public."Picture" (id, filename) VALUES ('fae93a21-3b31-4d3c-b096-64ee0f6a724f', 'https://example.com/picture3.jpg');
INSERT INTO public."Picture" (id, filename) VALUES ('8d2ce538-9bb5-4e3f-9463-d9eb680a88d7', 'https://example.com/picture4.jpg');

INSERT INTO public."Discussion" (id, created_at, updated_at, title, image_url) VALUES ('47ad9f5a-8fbb-44fb-8941-1045756ac952', '2024-05-12 20:58:07.931', '2024-05-12 20:58:07.931', 'General Discussion', null);
INSERT INTO public."Discussion" (id, created_at, updated_at, title, image_url) VALUES ('d4d8c46d-92a8-4d2f-a8aa-d9b714faa90f', '2024-05-12 20:58:07.931', '2024-05-12 20:58:07.931', 'Another Discussion', null);
INSERT INTO public."Discussion" (id, created_at, updated_at, title, image_url) VALUES ('c9bd485d-cb53-49d4-8f0d-0bb041a40cb3', '2024-05-12 20:58:07.931', '2024-05-12 20:58:07.931', 'Database Discussion', null);
INSERT INTO public."Discussion" (id, created_at, updated_at, title, image_url) VALUES ('1a7f12c9-4981-4e99-aab6-3a42905bca13', '2024-05-12 20:58:07.931', '2024-05-12 20:58:07.931', 'JavaScript Q&A', null);

INSERT INTO public."Section" (id, course_id, title, description) VALUES ('7f50f484-6587-4803-9fdc-fad5b98b0059', 'fa2a2aa3-303c-4c23-bf1f-937e1cce37e5', 'Composition', 'Cette section a pour but d''initier tout debutant aux notions de compositions en photographie');
INSERT INTO public."Section" (id, course_id, title, description) VALUES ('3d836536-cd31-46d9-9097-cd6660cf871d', 'fa2a2aa3-303c-4c23-bf1f-937e1cce37e5', 'Post-Production', 'Cette section a pour but d''initier tout débutant aux notions de post-production en photographie');
INSERT INTO public."Section" (id, course_id, title, description) VALUES ('32498b7b-3f7e-44a4-a417-14879e090d89', 'fa2a2aa3-303c-4c23-bf1f-937e1cce37e5', 'Eclairage', 'Cette section a pour but d''initier tout débutant aux notions d''éclairage en photographie');

INSERT INTO public."Lesson" (id, title, description, section_id) VALUES ('43b06e6e-bbdc-46e8-a096-29f2005b1f79', 'Les règles de base de composition', 'Cette leçon aborde les principes fondamentaux de la composition en photographie, essentiels pour créer des images équilibrées et attrayantes.', '7f50f484-6587-4803-9fdc-fad5b98b0059');
INSERT INTO public."Lesson" (id, title, description, section_id) VALUES ('ce42901c-adb5-4110-bb5b-6fda4bc50154', 'La profondeur de champ', 'Cette leçon explore le concept de profondeur de champ et son importance dans la composition d''une image.', '7f50f484-6587-4803-9fdc-fad5b98b0059');
INSERT INTO public."Lesson" (id, title, description, section_id) VALUES ('f86f6143-b171-4cfa-81da-b54a5fb2a8ab', 'Les types d''éclairage en photographie', 'Cette leçon explore les principaux types d''éclairage utilisés en photographie et leur impact sur l''apparence d''une image.', '32498b7b-3f7e-44a4-a417-14879e090d89');
INSERT INTO public."Lesson" (id, title, description, section_id) VALUES ('591c741d-2dcd-4bcc-9165-2b11425a2a69', 'L''utilisation des ombres en photographie', 'Cette leçon explore le rôle des ombres en photographie et comment les utiliser de manière créative pour ajouter de la profondeur et du dynamisme à une image.', '32498b7b-3f7e-44a4-a417-14879e090d89');
INSERT INTO public."Lesson" (id, title, description, section_id) VALUES ('a5f1531d-86b5-46f6-9666-7f543f86b907', 'Introduction à la retouche photo', 'Cette leçon explore les concepts fondamentaux de la retouche photo et les outils utilisés pour améliorer et transformer des images.', '3d836536-cd31-46d9-9097-cd6660cf871d');
INSERT INTO public."Lesson" (id, title, description, section_id) VALUES ('761e0269-8cd7-4cb5-9ae2-bdc817bb479f', 'Correction des couleurs et balance des blancs', 'Cette leçon explore l''importance de la correction des couleurs et de la balance des blancs en post-production pour garantir des images fidèles à la réalité.', '3d836536-cd31-46d9-9097-cd6660cf871d');

INSERT INTO public."Lecture" (id, lesson_id, data) VALUES ('0fa79f55-1846-47ba-b594-1d398953735d', '43b06e6e-bbdc-46e8-a096-29f2005b1f79', 'La composition est un aspect crucial de la photographie, déterminant la manière dont les éléments d''une image sont disposés et organisés. Parmi les règles de base de composition, on trouve la règle des tiers, qui consiste à diviser l''image en neuf parties égales à l''aide de deux lignes horizontales et deux lignes verticales imaginaires, et à placer les sujets principaux le long de ces lignes ou à leurs intersections. Une autre règle importante est celle de l''équilibre, où les éléments visuels sont répartis de manière harmonieuse dans l''image pour éviter qu''elle paraisse trop chargée d''un côté ou de l''autre.');
INSERT INTO public."Lecture" (id, lesson_id, data) VALUES ('bf397c92-ba9f-40d6-b328-b0d10a9d1d90', 'ce42901c-adb5-4110-bb5b-6fda4bc50154', 'La profondeur de champ se réfère à la zone de netteté dans une image, c''est-à-dire la plage de distances sur l''axe de la caméra où les objets apparaissent nets dans la photo. Une profondeur de champ peu profonde signifie qu''une petite partie de l''image est nette, créant un flou d''arrière-plan esthétique, souvent utilisé pour isoler un sujet principal. À l''inverse, une profondeur de champ profonde signifie que la plupart de l''image est nette, idéale pour les paysages et les scènes nécessitant une grande netteté dans toute la scène.');
INSERT INTO public."Lecture" (id, lesson_id, data) VALUES ('da3e2f3a-a0f5-4992-be43-d50ca5c75e45', 'f86f6143-b171-4cfa-81da-b54a5fb2a8ab', 'En photographie, l''éclairage est essentiel pour créer l''ambiance et mettre en valeur les sujets. Le premier type d''éclairage est la lumière naturelle, provenant du soleil ou de sources naturelles telles que les fenêtres. Elle offre une lumière douce et diffuse, idéale pour les portraits et les paysages. Ensuite, il y a l''éclairage artificiel, qui peut être continu (comme les lampes de studio) ou flash (comme les flashs de studio ou les flashs intégrés). Il offre un contrôle total sur la direction et l''intensité de la lumière.');
INSERT INTO public."Lecture" (id, lesson_id, data) VALUES ('1ed4279e-23ff-4018-a02f-51bda7351af9', '591c741d-2dcd-4bcc-9165-2b11425a2a69', 'Les ombres jouent un rôle crucial dans la création de contrastes et de dimension dans une image. Les ombres peuvent être utilisées pour souligner la forme et la texture des sujets, ainsi que pour créer des motifs intéressants. L''utilisation judicieuse des ombres peut ajouter du mystère et de l''intrigue à une photo, en attirant l''attention sur certains éléments et en cachant d''autres.');
INSERT INTO public."Lecture" (id, lesson_id, data) VALUES ('df9f9469-bbbb-4982-9cdb-63b3147e32a6', 'a5f1531d-86b5-46f6-9666-7f543f86b907', 'La retouche photo est le processus de modification d''une image après sa capture pour améliorer sa qualité ou son apparence. Les logiciels de retouche photo, tels que Adobe Photoshop et Lightroom, offrent une gamme d''outils puissants pour ajuster la luminosité, le contraste, la couleur, et bien plus encore. Les principaux outils de retouche comprennent les calques, les masques, les outils de sélection et de correction des imperfections.');
INSERT INTO public."Lecture" (id, lesson_id, data) VALUES ('ef7452df-2cac-42a0-8b0c-188074341bb3', '761e0269-8cd7-4cb5-9ae2-bdc817bb479f', 'La correction des couleurs consiste à ajuster les teintes, la saturation et la luminance des couleurs dans une image pour obtenir un rendu cohérent et naturel. La balance des blancs permet de corriger les variations de température de couleur causées par différentes sources de lumière, garantissant que les blancs apparaissent blancs dans l''image. Les outils de correction des couleurs et de balance des blancs sont essentiels pour reproduire fidèlement les couleurs et l''ambiance d''une scène.');

INSERT INTO public."Question" (id, lesson_id, title, description, trust_answer_id, type_answer, type_question, difficulty, picture_id, points, "order") VALUES ('a8e66582-7108-45e2-b18d-1ce7cdde464d', '43b06e6e-bbdc-46e8-a096-29f2005b1f79', 'Règle des neufs', 'Quelle est la règle qui consiste à diviser une image en neuf parties égales ?', 'f347d8ac-f032-4160-863e-9db66bf8f0db', 'MULTIPLE_CHOICE', 'TEXT', 'BEGINNER', null, 0, 'a0');
INSERT INTO public."Question" (id, lesson_id, title, description, trust_answer_id, type_answer, type_question, difficulty, picture_id, points, "order") VALUES ('4171ed97-d046-46be-831a-f50dc6df7a4f', '43b06e6e-bbdc-46e8-a096-29f2005b1f79', 'Règles de composition', 'Pourquoi est-il important de respecter les règles de composition en photographie ?', '8a3a014b-569a-4128-a2a1-1131627dc23e', 'MULTIPLE_CHOICE', 'TEXT', 'BEGINNER', null, 0, 'a1');
INSERT INTO public."Question" (id, lesson_id, title, description, trust_answer_id, type_answer, type_question, difficulty, picture_id, points, "order") VALUES ('c121698e-0db9-4eb1-b978-38fa86e0c964', 'ce42901c-adb5-4110-bb5b-6fda4bc50154', 'Profondeur de champ', 'Qu''est-ce que la profondeur de champ ?', 'aeef50a9-6593-428d-8dea-5aef1da1a82e', 'MULTIPLE_CHOICE', 'TEXT', 'INTERMEDIATE', null, 0, 'a0');
INSERT INTO public."Question" (id, lesson_id, title, description, trust_answer_id, type_answer, type_question, difficulty, picture_id, points, "order") VALUES ('8830decc-7c40-4c2a-b2f7-28819810dcde', 'ce42901c-adb5-4110-bb5b-6fda4bc50154', 'Utilisation de la profondeur de champ', 'Pour quel type de photographie une profondeur de champ peu profonde est-elle généralement utilisée ?', 'b73e98d6-6a34-42d1-9ddf-7bd2f6c69c9b', 'MULTIPLE_CHOICE', 'TEXT', 'INTERMEDIATE', null, 0, 'a1');
INSERT INTO public."Question" (id, lesson_id, title, description, trust_answer_id, type_answer, type_question, difficulty, picture_id, points, "order") VALUES ('6ab73c4d-666e-45c9-b012-736b905a9342', 'f86f6143-b171-4cfa-81da-b54a5fb2a8ab', 'Type d''eclairage', 'Quel est le premier type d''éclairage abordé dans cette leçon ?', '89e2b4e2-4a27-4b57-8f3d-3f245cdf3387', 'MULTIPLE_CHOICE', 'TEXT', 'BEGINNER', null, 0, 'a0');
INSERT INTO public."Question" (id, lesson_id, title, description, trust_answer_id, type_answer, type_question, difficulty, picture_id, points, "order") VALUES ('62e94ab3-0ff2-40d2-a129-5ecc79a45ae6', 'f86f6143-b171-4cfa-81da-b54a5fb2a8ab', 'Eclairage articifiel', 'Quelle est l''une des caractéristiques de l''éclairage artificiel ?', 'f332ec57-60c5-438b-9848-e51d046d877f', 'MULTIPLE_CHOICE', 'TEXT', 'BEGINNER', null, 0, 'a1');
INSERT INTO public."Question" (id, lesson_id, title, description, trust_answer_id, type_answer, type_question, difficulty, picture_id, points, "order") VALUES ('15d8f952-172c-4ef3-94bd-ad23c0d1f3e6', '591c741d-2dcd-4bcc-9165-2b11425a2a69', 'Rôle des ombres', 'Quel est le rôle des ombres en photographie ?', '77ecff20-f205-454e-b2b5-d24519485c5e', 'MULTIPLE_CHOICE', 'TEXT', 'INTERMEDIATE', null, 0, 'Zz');
INSERT INTO public."Question" (id, lesson_id, title, description, trust_answer_id, type_answer, type_question, difficulty, picture_id, points, "order") VALUES ('a4c7e8a3-192a-4d53-88ff-704bd0827196', '591c741d-2dcd-4bcc-9165-2b11425a2a69', 'Utilisation des ombres', 'Comment l''utilisation judicieuse des ombres peut-elle contribuer à une image ?', '5370c2ae-4dd4-4948-9645-9c8ab99fd0ac', 'MULTIPLE_CHOICE', 'TEXT', 'INTERMEDIATE', null, 0, 'a0');
INSERT INTO public."Question" (id, lesson_id, title, description, trust_answer_id, type_answer, type_question, difficulty, picture_id, points, "order") VALUES ('76abbcd6-5aef-451f-862b-0dd89c4d6684', 'a5f1531d-86b5-46f6-9666-7f543f86b907', 'Retouche photo', 'Qu''est-ce que la retouche photo ?', '248f362d-05f3-4b8a-8959-4f3c7dcbc7f3', 'MULTIPLE_CHOICE', 'TEXT', 'ADVANCED', null, 0, 'a0');
INSERT INTO public."Question" (id, lesson_id, title, description, trust_answer_id, type_answer, type_question, difficulty, picture_id, points, "order") VALUES ('3844246f-e483-497c-b37f-1078d5ecbf97', 'a5f1531d-86b5-46f6-9666-7f543f86b907', 'Logiciel de retouche', 'Quel est l''un des logiciels populaires utilisés pour la retouche photo ?', 'f6a3ef3b-0971-4284-b649-52083f386d75', 'MULTIPLE_CHOICE', 'TEXT', 'ADVANCED', null, 0, 'a1');
INSERT INTO public."Question" (id, lesson_id, title, description, trust_answer_id, type_answer, type_question, difficulty, picture_id, points, "order") VALUES ('ebe0d87b-d13f-421c-8882-c4ea71d7d37b', '761e0269-8cd7-4cb5-9ae2-bdc817bb479f', 'Correction des couleurs', 'Que permet la correction des couleurs en post-production ?', '0c163e1c-1b08-4b2e-9a9a-6240016dc131', 'MULTIPLE_CHOICE', 'TEXT', 'ADVANCED', null, 0, 'Zz');
INSERT INTO public."Question" (id, lesson_id, title, description, trust_answer_id, type_answer, type_question, difficulty, picture_id, points, "order") VALUES ('25718d38-6adc-435d-bce2-0c188ede1a13', '761e0269-8cd7-4cb5-9ae2-bdc817bb479f', 'Balance des blancs', 'Quel est le but de la balance des blancs ?', '73c8cadf-f207-4a85-a90f-654bebf612e5', 'MULTIPLE_CHOICE', 'TEXT', 'ADVANCED', null, 0, 'a0');
INSERT INTO public."Question" (id, lesson_id, title, description, trust_answer_id, type_answer, type_question, difficulty, picture_id, points, "order") VALUES ('35718d38-6adc-435d-bce2-0c188ede1a13', '761e0269-8cd7-4cb5-9ae2-bdc817bb479f', 'Test FREE Answser', 'Test Free Answser description', '73c8cadf-f207-4a85-a90f-654bebf612e5', 'FREE_ANSWER', 'TEXT', 'ADVANCED', null, 0, 'a0');
INSERT INTO public."Question" (id, lesson_id, title, description, trust_answer_id, type_answer, type_question, difficulty, picture_id, points, "order") VALUES ('45718d38-6adc-435d-bce2-0c188ede1a13', '761e0269-8cd7-4cb5-9ae2-bdc817bb479f', '1 + 1 = ?', '1 + 1 = ?', '66f486a0-0be4-4829-9ccd-6de64cd334a5', 'SQUARE_CHOICE', 'TEXT', 'ADVANCED', null, 0, 'a0');


INSERT INTO public."Answer" (id, question_id, data, picture_id, "order") VALUES ('86f486a0-0be4-4829-9ccd-6de64cd334a5', '45718d38-6adc-435d-bce2-0c188ede1a13', '3', null, 'a0');
INSERT INTO public."Answer" (id, question_id, data, picture_id, "order") VALUES ('76f486a0-0be4-4829-9ccd-6de64cd334a5', '45718d38-6adc-435d-bce2-0c188ede1a13', '4', null, 'a1');
INSERT INTO public."Answer" (id, question_id, data, picture_id, "order") VALUES ('66f486a0-0be4-4829-9ccd-6de64cd334a5', '45718d38-6adc-435d-bce2-0c188ede1a13', '2', null, 'a2');
INSERT INTO public."Answer" (id, question_id, data, picture_id, "order") VALUES ('56f486a0-0be4-4829-9ccd-6de64cd334a5', '45718d38-6adc-435d-bce2-0c188ede1a13', '1', null, 'a3');
INSERT INTO public."Answer" (id, question_id, data, picture_id, "order") VALUES ('46f486a0-0be4-4829-9ccd-6de64cd334a5', '35718d38-6adc-435d-bce2-0c188ede1a13', 'Michel Sardou', null, 'a0');
INSERT INTO public."Answer" (id, question_id, data, picture_id, "order") VALUES ('26f486a0-0be4-4829-9ccd-6de64cd334a5', 'a8e66582-7108-45e2-b18d-1ce7cdde464d', 'La règle des quarts', null, 'a0');
INSERT INTO public."Answer" (id, question_id, data, picture_id, "order") VALUES ('8d7397db-b515-4e51-b788-94c586da61d4', 'a8e66582-7108-45e2-b18d-1ce7cdde464d', 'La règle des moitiés', null, 'a1');
INSERT INTO public."Answer" (id, question_id, data, picture_id, "order") VALUES ('f347d8ac-f032-4160-863e-9db66bf8f0db', 'a8e66582-7108-45e2-b18d-1ce7cdde464d', 'La règle des tiers', null, 'a2');
INSERT INTO public."Answer" (id, question_id, data, picture_id, "order") VALUES ('f347d8ac-f032-4160-863e-9fb66bf8f0db', 'a8e66582-7108-45e2-b18d-1ce7cdde464d', 'La règle pour mesurer', null, 'a3');
INSERT INTO public."Answer" (id, question_id, data, picture_id, "order") VALUES ('8a3a014b-569a-4128-a2a1-1131627dc23e', '4171ed97-d046-46be-831a-f50dc6df7a4f', 'Pour créer des images équilibrées et attrayantes', null, 'a0');
INSERT INTO public."Answer" (id, question_id, data, picture_id, "order") VALUES ('7c66d9cc-2323-4256-873a-3248804e2766', '4171ed97-d046-46be-831a-f50dc6df7a4f', 'Pour impressionner ses amis', null, 'a1');
INSERT INTO public."Answer" (id, question_id, data, picture_id, "order") VALUES ('d20ed4ef-a155-4e9f-b0b0-5566a9aa16b0', '4171ed97-d046-46be-831a-f50dc6df7a4f', 'Pour suivre les tendances', null, 'a2');
INSERT INTO public."Answer" (id, question_id, data, picture_id, "order") VALUES ('d20ed4ef-a155-4e9f-b0b0-5566a9af16b0', '4171ed97-d046-46be-831a-f50dc6df7a4f', 'Pour devenir super beau', null, 'a3');
INSERT INTO public."Answer" (id, question_id, data, picture_id, "order") VALUES ('55b18a91-71eb-4e94-b802-10b8c93fa817', 'c121698e-0db9-4eb1-b978-38fa86e0c964', 'La luminosité de l''image', null, 'a0');
INSERT INTO public."Answer" (id, question_id, data, picture_id, "order") VALUES ('aeef50a9-6593-428d-8dea-5aef1da1a82e', 'c121698e-0db9-4eb1-b978-38fa86e0c964', 'La zone de netteté dans une image', null, 'a1');
INSERT INTO public."Answer" (id, question_id, data, picture_id, "order") VALUES ('c4fd2f1c-6584-451c-b7c7-ed350c8298b7', 'c121698e-0db9-4eb1-b978-38fa86e0c964', 'Le nombre d''objets dans une image', null, 'a2');
INSERT INTO public."Answer" (id, question_id, data, picture_id, "order") VALUES ('1d4306ba-3421-4537-8c1e-0b2a0fd4f8c9', '8830decc-7c40-4c2a-b2f7-28819810dcde', 'Les paysages', null, 'a0');
INSERT INTO public."Answer" (id, question_id, data, picture_id, "order") VALUES ('b73e98d6-6a34-42d1-9ddf-7bd2f6c69c9b', '8830decc-7c40-4c2a-b2f7-28819810dcde', 'Les portraits', null, 'a1');
INSERT INTO public."Answer" (id, question_id, data, picture_id, "order") VALUES ('89e2b4e2-4a27-4b57-8f3d-3f245cdf3387', '6ab73c4d-666e-45c9-b012-736b905a9342', 'Lumière naturelle', null, 'a0');
INSERT INTO public."Answer" (id, question_id, data, picture_id, "order") VALUES ('f1fd9555-05da-4259-9a71-cf6bb633ccea', '6ab73c4d-666e-45c9-b012-736b905a9342', 'Éclairage artificiel', null, 'a1');
INSERT INTO public."Answer" (id, question_id, data, picture_id, "order") VALUES ('75e8305c-88e3-42a0-8685-b3ce7558251d', '6ab73c4d-666e-45c9-b012-736b905a9342', 'Lumière laser', null, 'a2');
INSERT INTO public."Answer" (id, question_id, data, picture_id, "order") VALUES ('22ab64cc-4e35-491c-a73f-544cd57bb6d9', '62e94ab3-0ff2-40d2-a129-5ecc79a45ae6', 'Il est toujours doux et diffus', null, 'a0');
INSERT INTO public."Answer" (id, question_id, data, picture_id, "order") VALUES ('f332ec57-60c5-438b-9848-e51d046d877f', '62e94ab3-0ff2-40d2-a129-5ecc79a45ae6', 'Il offre un contrôle total sur la direction et l''intensité de la lumière', null, 'a1');
INSERT INTO public."Answer" (id, question_id, data, picture_id, "order") VALUES ('ef2fce58-10b2-401e-a176-273584cb44d0', '62e94ab3-0ff2-40d2-a129-5ecc79a45ae6', 'Il est moins cher que la lumière naturelle', null, 'a2');
INSERT INTO public."Answer" (id, question_id, data, picture_id, "order") VALUES ('bc4acf20-57fe-439e-8d3d-a83a763daa3a', '15d8f952-172c-4ef3-94bd-ad23c0d1f3e6', 'Ajouter de la lumière à l''image', null, 'a0');
INSERT INTO public."Answer" (id, question_id, data, picture_id, "order") VALUES ('77ecff20-f205-454e-b2b5-d24519485c5e', '15d8f952-172c-4ef3-94bd-ad23c0d1f3e6', 'Créer des contrastes et de la dimension', null, 'a1');
INSERT INTO public."Answer" (id, question_id, data, picture_id, "order") VALUES ('fd9e2355-b31f-4e9c-94db-25e4b690dadf', '15d8f952-172c-4ef3-94bd-ad23c0d1f3e6', 'Masquer les sujets principaux', null, 'a2');
INSERT INTO public."Answer" (id, question_id, data, picture_id, "order") VALUES ('cca132d8-066b-45a9-a9ea-35c7f783feda', 'a4c7e8a3-192a-4d53-88ff-704bd0827196', 'En ajoutant de la lumière uniforme', null, 'a0');
INSERT INTO public."Answer" (id, question_id, data, picture_id, "order") VALUES ('4b413222-d340-466f-9ccb-78fcb6a7ae56', 'a4c7e8a3-192a-4d53-88ff-704bd0827196', 'En rendant l''image moins intéressante', null, 'a1');
INSERT INTO public."Answer" (id, question_id, data, picture_id, "order") VALUES ('5370c2ae-4dd4-4948-9645-9c8ab99fd0ac', 'a4c7e8a3-192a-4d53-88ff-704bd0827196', 'En attirant l''attention sur certains éléments et en cachant d''autres', null, 'a2');
INSERT INTO public."Answer" (id, question_id, data, picture_id, "order") VALUES ('08f49ad9-beb7-48c9-b403-3dcfadbaf6db', '76abbcd6-5aef-451f-862b-0dd89c4d6684', 'Le processus de capture d''une image', null, 'a0');
INSERT INTO public."Answer" (id, question_id, data, picture_id, "order") VALUES ('248f362d-05f3-4b8a-8959-4f3c7dcbc7f3', '76abbcd6-5aef-451f-862b-0dd89c4d6684', 'Le processus de modification d''une image après sa capture', null, 'a1');
INSERT INTO public."Answer" (id, question_id, data, picture_id, "order") VALUES ('28ad945b-1b5c-4352-ba2b-91f23a44cd6c', '76abbcd6-5aef-451f-862b-0dd89c4d6684', 'Le processus d''impression d''une image', null, 'a2');
INSERT INTO public."Answer" (id, question_id, data, picture_id, "order") VALUES ('f6a3ef3b-0971-4284-b649-52083f386d75', '3844246f-e483-497c-b37f-1078d5ecbf97', 'Adobe Photoshop', null, 'a0');
INSERT INTO public."Answer" (id, question_id, data, picture_id, "order") VALUES ('5fa07a8e-6237-40d6-85a0-01951170e629', '3844246f-e483-497c-b37f-1078d5ecbf97', 'Microsoft Word', null, 'a1');
INSERT INTO public."Answer" (id, question_id, data, picture_id, "order") VALUES ('93b18297-cae7-4330-8908-dc6115ceacf7', '3844246f-e483-497c-b37f-1078d5ecbf97', 'Google Chrome', null, 'a2');
INSERT INTO public."Answer" (id, question_id, data, picture_id, "order") VALUES ('62b2d65e-394a-4497-91f8-b961bb921b69', 'ebe0d87b-d13f-421c-8882-c4ea71d7d37b', 'Ajuster la température de couleur', null, 'a0');
INSERT INTO public."Answer" (id, question_id, data, picture_id, "order") VALUES ('0c163e1c-1b08-4b2e-9a9a-6240016dc131', 'ebe0d87b-d13f-421c-8882-c4ea71d7d37b', 'Modifier les teintes, la saturation et la luminance des couleurs', null, 'a1');
INSERT INTO public."Answer" (id, question_id, data, picture_id, "order") VALUES ('1292cd78-33cd-4fb6-905e-a262b59aed00', 'ebe0d87b-d13f-421c-8882-c4ea71d7d37b', 'Ajouter des filtres artistiques', null, 'a2');
INSERT INTO public."Answer" (id, question_id, data, picture_id, "order") VALUES ('23718244-36d9-4d51-a78f-9b84bf45f302', '25718d38-6adc-435d-bce2-0c188ede1a13', 'Ajouter un éclairage supplémentaire', null, 'a0');
INSERT INTO public."Answer" (id, question_id, data, picture_id, "order") VALUES ('06e704f1-b78b-4765-890c-7e11fb74e056', '25718d38-6adc-435d-bce2-0c188ede1a13', 'Appliquer des effets spéciaux', null, 'a1');
INSERT INTO public."Answer" (id, question_id, data, picture_id, "order") VALUES ('73c8cadf-f207-4a85-a90f-654bebf612e5', '25718d38-6adc-435d-bce2-0c188ede1a13', 'Corriger les variations de température de couleur', null, 'a2');

INSERT INTO public."UsertoCourse" (id, role_user, permission_user, permission_course, permission_section, permission_lesson, course_id, user_id, last_lesson_id, last_section_id, score, hp) VALUES ('72f901a2-ca51-4d9b-9bd2-54ab6291ceec', 'OWNER', null, null, null, null, 'fa2a2aa3-303c-4c23-bf1f-937e1cce37e5', '73284fcd-28f4-415d-b72b-90ca512f52fb', null, null, 0, 20);
