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

def delete_database_data(cursor: cursor) -> None:
    with open('database_schema_delete.sql', 'r') as sql_file:
        sql_script = sql_file.read()
        cursor.execute(sql.SQL(sql_script))

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
    # parser.add_argument('-i', '--info', action='store_true', help='Print data in tables after the action')

    args = parser.parse_args()

    db: connection = psycopg2.connect(**db_params)
    cursor: cursor = db.cursor()

    actions: dict[str, tuple] = {
        'create': (create_database_structure, "Database setup complete."),
        'delete': (delete_database_data, "Database data deleted.")
    }

    selected_action: tuple = actions.get('create' if args.create else 'delete', (None, None))

    action_function, action_message = selected_action

    if action_function is not None:
        action_function(cursor)
        db.commit()
        print(action_message)

    print_table_data(cursor)

    # if args.info:
    #     print_table_data(cursor)

    db.close()

if __name__ == "__main__":
    main()
