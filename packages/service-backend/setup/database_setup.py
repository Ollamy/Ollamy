import sys

import os
from os.path import join, dirname
from dotenv import load_dotenv
import argparse

import psycopg2
from psycopg2 import sql
from psycopg2.extensions import cursor, connection

def create_database_structure(cursor: cursor) -> None:
    with open('database_schema_create.sql', 'r') as sql_file:
        sql_script = sql_file.read()
        cursor.execute(sql.SQL(sql_script))
    print_table_data(cursor)

def delete_database_data(cursor: cursor) -> None:
    with open('database_schema_delete.sql', 'r') as sql_file:
        sql_script = sql_file.read()
        cursor.execute(sql.SQL(sql_script))
    print_table_data(cursor)

def print_table_data(cursor: cursor) -> None:
    cursor.execute("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';")
    tables = cursor.fetchall()

    for table in tables:
        table_name = table[0]

        if table_name == "_prisma_migrations":
            continue

        print(f"\nData in table '{table_name}':")

        cursor.execute(f'SELECT * FROM "{table_name}";')
        rows = cursor.fetchall()

        for row in rows:
            print(row)

def test_database_data(cursor: cursor) -> None:
    FAKE_IDS: dict[str, set[str]] = {
        "User": {'a5e15301-9fb3-4d95-b08d-67fd781aafab', '56fb679c-973b-4b3e-8f87-3b7ddcadbfa4', '65d7c6f4-157b-4e7e-92e2-58b80e8e1d43', '83f7337b-cf79-438e-86d4-3ba0db64b5db'},
        "Section": {'df0e43ff-1310-4d92-9a19-c62854ab7391', 'e2c0e524-89b2-4f13-a36b-69c1b257e017', 'd2e9fc8b-31c0-493a-9b45-004a73fe9bb9', '4a7d9a21-b8fe-4301-9d8e-193a4310c387', 'daae7023-37d4-40b8-bb03-07f60a3e0a1d', 'c5e43220-e54f-4e0b-827e-eed18c9d1f50'},
        "Course": {'c87950af-2ee2-40c7-bd16-607d440cecb3', 'db6cf3cc-7cb4-4a5d-84f4-75a6fcf223d3', 'e5a1c556-193c-4a17-ba0c-5a9ddc5dd6f1', '3a43db61-67b7-4ef4-9b58-3fbc87ea80f4'},"UsertoCourse": {'2ac2e8e0-3a23-4a2e-aa41-10bce6f3bc9e', 'bc66af4b-e191-4e6f-afaf-cfe5bf3bf1d9', '0ddde9c0-915e-4f48-b5d4-28d0080d682c', 'bb24df4f-2b48-4a50-88a8-12a7cb3011e0', 'af1d1bd4-84cf-4752-b991-74da2ff3715d', 'f341c073-2b63-459c-ba85-6c83ed9c6d37'},
        "Answer": {'ae812f5e-c4c8-4d08-a3e3-55645a0999e9', '9de23c6e-59c0-4415-b538-1b9b59e34905', 'b8e24819-3c3c-4b46-9502-e2b48d3a6d55', '4217641d-e444-48cc-9bba-39257400da9e', '0c0a6e56-1314-4818-b424-3f1bea12162c', 'd60123d4-b768-4a20-9b43-eb6de55f755b', '703d9ad6-ece9-478c-905d-4f0d41c2973b', 'a07e20fd-69fa-40f3-a8fa-19643890ece2', '619bd7c2-b4d8-4ba4-9d98-aafe9552692c', '69eb0f80-30cd-4fea-9336-588c5f59ab57', '6d7cd9e1-f122-4234-bcd8-52ba8a466e7d', '25fa47d5-c50c-41ef-a62a-f2acaf22e81a', '6855af13-adc1-44df-8ad5-f043b4063fc6', 'd01ea964-c019-4f2f-8d6e-80727b8a2fd7', 'f6f7e890-736e-4ba5-ab70-f5002c7c609b', '7610521e-534e-492f-9dc1-0a14125bd1f8', '7f936bc2-462b-4aa6-b0c3-ea4b7bbda1e0', 'f5be72cd-5ea4-4d82-a86d-815d83bc497a', 'c02e5ef6-5399-4c46-87b5-6db1856b1741', '1c5efb0f-d69d-47b1-bd47-44f7e8e2e9cd', '199d0244-b605-42f1-8b2e-6f3927e97d4a', '0485f3b2-1f49-4dfa-93e1-61a3f1d0e94e', '6bfdc12b-5947-4b4a-aaa2-b4dc90231d36', '0bc2ecc3-7ede-47b0-9ae4-8dd9d20ef22a', 'f24dc293-34d7-48c2-bd76-7756f2c1ac76', '8c84e27a-aece-4840-895e-352272088cd6', '095ac2c9-43c0-4c1b-b876-92564973cbbf', '3a5a937a-fe93-4d9f-b357-25b0a3f3239c', '6c3d9919-98d3-4a46-ba62-c2af3c379dd7', 'f342eb48-9c1a-4adf-86dd-c8849fc55c3b', 'f962ecc6-6ec2-4fcb-9357-39d8c92d7f38', '11b31a1a-71d1-4e4c-8c8e-9884c295cf56', '6054d7dd-c284-40bd-bd33-0e76619ea2ee', 'f36e25bf-9f3f-4edd-84f6-487f604ec426', '2093ccd1-6830-4695-9602-45bc544da76f', 'b2a08e9f-7b2f-49d4-bfa3-2f0e78dfa976', '3042e3ca-7c0c-4b8c-8ed1-c9fe09a052d1', 'e2b60629-b15e-4955-b64e-c9ddc9f6c3cb', '5c721c16-2d40-42da-987e-a14922ee323d', 'b1bcb34b-0abe-4327-8907-ae828268d265', '545eebab-f727-4689-bfd1-dd89752f69d3', '313badca-e79d-4523-a6d0-1abc7aac4ff5', 'c1fa9900-fd3a-4b97-830a-779bd9267de3', '86949c87-514b-45ef-88c0-279d69f15b18', '3b7c7382-cc5c-4fe6-8117-6e03962f75fc', '03ff3dcc-95f2-4d0e-9723-386ba9ebb07b', '34f97a2e-a3f1-4dc0-9cb2-95b596550f5c', '7e298598-e138-4cf6-abb8-5cbdcf30e6dd', '0dc12427-b3db-4e1a-b8bc-c2f4b6032ce8', '5558e740-34a3-417c-9e0d-0e6a41df086d', 'a641f763-a0b7-4aae-be4e-f879a4676892', 'ac48703e-3b6c-41ea-a77d-de7afa5a7600', '601bc246-9b7e-4107-85bb-0ae76705d73c', '1910aa94-545c-4b3d-9a1e-bf45e6452da3', 'd489da6d-be7b-4c2c-bb66-9cc27396720d', '750dae04-7ad4-4b97-af45-1c52564b66a7', 'df3fb844-e891-43fd-9abc-1c5109a14a4c', '997ab22e-fc34-41b5-abe3-cc46bdce4c18', '090cf41d-4149-43b9-a571-dcf28efab371', '3dccca06-4eb1-4e1f-9ccc-30d21d7907d8', '17b20104-75f3-4770-85a1-0141b9423351', 'f741ffd4-504c-4aaa-9181-730b8312e6bd', '19917e22-c0ce-4c96-8381-df06230cdf6e', '09b36aab-fbc0-4394-b7ad-72ce82fc99ee', '237280a9-9838-4c15-be71-94b26a170bf9', '565ea299-e18e-4a91-819f-741fb31e268e', '05b4f98c-c808-4ffd-af8e-d4ad3f6a40b3', '9531243f-62b9-446d-8e42-6d5c759b76f8', 'e093060f-e298-43d2-9046-1b0c51a0a9e6', '799ff906-a0c5-43f4-a482-b0260c045537', 'aa417788-08e7-4242-b621-f39661faf93c', '1efb58e1-8f41-4c9e-b0c5-cf7eb2f9b23c', '1d95f27a-74c9-4b5a-9aee-599e447b82a0', '8acf1f75-0ebd-42dd-9342-3e885155a8ee', '806524f7-c70e-4c87-85bd-a6ed5ec8902e', '476ca37e-6d55-4500-9098-43cdcc190d81', 'c07a4cc2-b653-4c72-a2a5-b4013195ecad', 'c93cb301-4069-4a84-8417-a6aeea06a9ca', 'f8794de2-83f2-4684-9f9f-a1e6aa044779', 'b0e4546e-e50d-4618-b7d2-1acd678ef0b5', '6e0f86c2-6eba-4d19-be4b-8db2a9537296', '67e18f81-9f55-4952-9ea2-e6ddc4303b28', '21fe8fd7-0846-4a2b-b338-ddbe62f25ddb', 'b556889a-86d0-46c1-bfa4-f146c226ec76'},
        "Lesson": {'ebfe0b0c-6e42-438e-bf4e-cbbdbb05c51f', 'b8b7400d-52a1-4e10-96ce-995f5aa16739', '8722bf34-6868-4a8b-988d-3b18fdbc384f', 'ebd8e177-cede-4f23-b26e-b7405f4e8301', '9a75e507-4b5c-4b45-9379-c38a6f3f059e', '7d6392e1-8dc4-48e1-b162-c00b025f6b6a', '7fe0b554-1c69-4ee5-9e24-553f4b24d3c9', 'e756b488-1fc4-4fb6-b4f3-d1e28a5935de'},
        "Discussion": {'47ad9f5a-8fbb-44fb-8941-1045756ac952', '1a7f12c9-4981-4e99-aab6-3a42905bca13', 'c9bd485d-cb53-49d4-8f0d-0bb041a40cb3', 'd4d8c46d-92a8-4d2f-a8aa-d9b714faa90f'},
        "Message": {'e65edbbe-b47c-4ea4-87f3-4a42a141e24a', 'f9ffeb4d-4a43-4dcb-b8ab-5f7ea123c9dd', 'c8d02e26-8b6e-45de-9a10-6ea3db5d954b', '0b777e85-c10f-4b35-93f4-54b28317c743', 'dc02a3b3-c8b2-40b0-ae07-b8c0472c7a8e', 'a166a07b-4f7d-404d-9e24-b24ed6fc380b', 'c05b35db-5b21-49e2-8b48-5d0e25f7a3de'},
        "Lecture": {'6c0d816d-13b2-491d-8ef8-5b1468b7d5f3', '5a8a0bd8-25f4-4a4d-9104-55e2c4d3f7e7', 'f3a86e04-cd5e-4bf3-8bf3-3611397871e1'},
        "Question": {'2e9baa9b-42a0-4050-8235-10e232f5bf79', '0e975ad9-a2c9-4c88-a4bb-99076514ca28', 'ccbdc053-6094-4192-bf50-d496e566235c', 'ce360d48-2673-47bf-ad6f-964a9f4541b0', 'e06291a9-cafc-44f5-a5bd-495680d5ba3b', '3ed01a60-23c3-451f-bc66-1b65bbbd9b3c', '0a5f4512-5cb2-46fc-8273-38cffad1ebd1', 'fd353e6b-1e10-465c-a36b-4b226dc1f8f8', '43ce3b42-f38f-4616-9a28-9ea199a753f1', '6d8d128f-1e75-4b2b-9dc6-8a6b3a1b83c5', 'c3fdc564-8f46-4050-9d9b-515a20a9923a', '747ef924-17cc-4d03-a226-8e26864bc280', '71a6d640-66b3-4e34-8025-b88cddadace6', '0046b857-1fc0-430c-9439-a1d48ebe4c9b', '25eb593b-9932-43f4-9a0b-d965257188da', '04bae167-b647-4898-9bc9-61bd3a73e4e8', 'ce5d4580-a450-42ec-8a49-7222e8add528', 'c387a713-5ebd-4ae2-a80e-962db812ca59', '9383f283-6d36-48af-96d0-0f7b1f15e9d4', 'f0f60df4-b4b6-4e06-a44c-dc22d074a8e5', 'a0b245ee-bfe6-4a97-900d-5d3f83db3cc9'},
        "Picture": {'8d2ce538-9bb5-4e3f-9463-d9eb680a88d7', '7649c16e-e27d-4a17-b4a2-aae3bbbc6ad2', 'fae93a21-3b31-4d3c-b096-64ee0f6a724f', '3a43db61-67b7-4ef4-9b58-3fbc87ea80f4'},
        "UsertoLesson": {'3c8c23db-f42f-46ac-902d-98d124f0e39f', '3a720ba5-3f11-43df-bad7-e245d438224e', '2b3c9b37-bf1c-4e42-b72b-68e4e5754b25', '23f6f60b-c977-4b71-b953-554d61d7e9de', '7d8ffbbd-1e09-4ff9-88cf-b17d3a4bc067', '1c8eab78-7735-45ab-86e3-f1c03b3c8d29', 'b86110f5-6e92-4d4d-b870-c10b5a48a6e3', '2c7e2e95-65e2-48fe-b5f4-d41b0f2e48e5'},
    }

    cursor.execute("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';")
    tables = cursor.fetchall()

    table_data: dict[str, set[str]] = {}

    for table in tables:
        table_name = table[0]

        if table_name == "_prisma_migrations" or table_name == "UserDiscussions":
            continue

        cursor.execute(f'SELECT id FROM "{table_name}";')
        ids = {str(row[0]) for row in cursor.fetchall()}
        table_data[table_name] = ids

    GREEN = '\033[92m'
    RESET = '\033[0m'
    message = "[OK] Every tables has been successfully filled"
    prefix = message[:4]
    suffix = message[4:]

    print("Table data:")
    if table_data == FAKE_IDS:
        print(GREEN + prefix + RESET + suffix + '\n')
        print(table_data)
    else:
        print('Error')

def main() -> None:
    if sys.argv.__len__() != 2:
        print(f'Usage: $> python3 {sys.argv[0]} [-h][-c][-d]')
        return None

    dotenv_path: str = join(dirname(__file__), '../.env')
    load_dotenv(dotenv_path)

    db_params: dict[str, str] = {
        'dbname':   os.environ.get("POSTGRES_DB"),
        'user':     os.environ.get("POSTGRES_USER"),
        'password': os.environ.get("POSTGRES_PASSWORD"),
        'host':     os.environ.get("POSTGRES_HOST"),
        'port':     os.environ.get("POSTGRES_PORT"),
    }

    parser: argparse.ArgumentParser = argparse.ArgumentParser(description='Database Setup Script')
    parser.add_argument('-c', '--create', action='store_true', help='Create database structure')
    parser.add_argument('-d', '--delete', action='store_true', help='Delete database data')
    parser.add_argument('-i', '--info', action='store_true', help='Print data in tables after the action')
    parser.add_argument('-t', '--test', action='store_true', help='Test if data are in tables')

    args = parser.parse_args()

    db: connection = psycopg2.connect(**db_params)
    cursor = db.cursor()

    # if args.info:
    #     print_table_data(cursor)
    #     return

    actions: dict[str, tuple] = {
        'create': (create_database_structure, "Database setup complete."),
        'delete': (delete_database_data, "Database data deleted."),
        'info': (print_table_data, "Database data informations."),
        'test': (test_database_data, "Database data test."),
    }

    selected_action: tuple = (None, None)
    # actions.get('create' if args.create else 'delete', (None, None))

    if args.create:
        selected_action = actions.get('create')
    elif args.delete:
        selected_action = actions.get('delete')
    elif args.info:
        selected_action = actions.get('info')
    elif args.test:
        selected_action = actions.get('test')

    action_function, action_message = selected_action

    if action_function is not None:
        action_function(cursor)
        db.commit()
        print(action_message)

    db.close()

if __name__ == "__main__":
    main()
