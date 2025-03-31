import json
import uuid


def read_datafile(file_path):
    """
    Reads a data file and returns a list of dictionaries representing the rows.
            Data format: json
    """
    with open(file_path, "r") as file:
        data = json.load(file)
    return data


def parse_data(data) -> tuple[list, list, list]:
    """
    Parses the data and returns a list of dictionaries.
    """
    province_data = []
    district_data = []
    ward_data = []

    for province in data:
        province_id = str(uuid.uuid4())
        province_data.append(
            {
                "id": province_id,
                "name": escape_sql_string(province.get("FullName")),
                "name_en": escape_sql_string(province.get("FullNameEn")),
                "code": province.get("CodeName"),
            }
        )

        for district in province.get("District", []):
            district_id = str(uuid.uuid4())
            district_data.append(
                {
                    "id": district_id,
                    "name": escape_sql_string(district.get("FullName")),
                    "name_en": escape_sql_string(district.get("FullNameEn")),
                    "code": district.get("CodeName"),
                    "province_id": province_id,
                }
            )

            print("District Name:", district.get("FullName"))
            if not isinstance(district.get("Ward"), list):
                print(f"Ward of district {district.get("FullName")} is null")
                ward_id = str(uuid.uuid4())
                ward_data.append(
                    {
                        "id": ward_id,
                        "name": escape_sql_string(district.get("FullName")),
                        "name_en": escape_sql_string(district.get("FullNameEn")),
                        "code": district.get("CodeName"),
                        "district_id": district_id,
                    }
                )
            else:
                for ward in district.get("Ward", []):
                    ward_id = str(uuid.uuid4())
                    ward_data.append(
                        {
                            "id": ward_id,
                            "name": escape_sql_string(ward.get("FullName")),
                            "name_en": escape_sql_string(ward.get("FullNameEn")),
                            "code": ward.get("CodeName"),
                            "district_id": district_id,
                        }
                    )

    return province_data, district_data, ward_data


def escape_sql_string(value):
    """
    Escapes single quotes in a string for SQL insertion.
    """
    if value is None:
        return "NULL"
    return value.replace("'", "''")


def generate_sql(province_data, district_data, ward_data):
    """
    Generates SQL insert statements from the provided data.
    """
    # Define columns for each table
    province_columns = ["id", "name", "name_en", "code"]
    district_columns = ["id", "name", "name_en", "code", "province_id"]
    ward_columns = ["id", "name", "name_en", "code", "district_id"]

    sql_statements = []

    # Generate SQL statements for each table
    sql_statements.append(
        generate_sql_location(province_data, province_columns, "province")
    )
    sql_statements.append(
        generate_sql_location(district_data, district_columns, "district")
    )
    sql_statements.append(generate_sql_location(ward_data, ward_columns, "ward"))

    return sql_statements


def generate_sql_location(data, columns, table_name):
    """
    Generates SQL insert statements from the provided data.
    """
    sql_statement = f"INSERT INTO {table_name} ({", ".join(columns)}, created_at, updated_at) VALUES"
    value_joined = []

    for row in data:
        # Only select columns that exist in the row
        values = []
        for column in columns:
            value = row.get(column)
            if value is None:
                values.append("NULL")
            else:
                values.append(f"'{value}'")

        # Add created_at and updated_at with the current timestamp
        values.append("NOW()")
        values.append("NOW()")
        value_joined.append(f"\n({", ".join(values)})")

    return sql_statement + ",".join(value_joined) + ";"


def write_sql_file(sql_statements, output_file):
    """
    Writes the SQL statements to a file.
    """
    with open(output_file, "w") as file:
        for statement in sql_statements:
            file.write(statement + "\n")


def main():
    input_file = "../data/locations.json"  # Path to your JSON data file
    output_file = "../data/locations.sql"  # Path to the output SQL file

    # Read the data from the JSON file
    data = read_datafile(input_file)

    province_data, district_data, ward_data = parse_data(data)

    # Generate SQL statements
    sql_statements = generate_sql(province_data, district_data, ward_data)

    # Write the SQL statements to a file
    write_sql_file(sql_statements, output_file)

    print(f"SQL statements have been written to {output_file}")


if __name__ == "__main__":
    main()
