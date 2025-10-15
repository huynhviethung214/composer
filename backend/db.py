import os

from neo4j import GraphDatabase

# URI examples: "neo4j://localhost", "neo4j+s://xxx.databases.neo4j.io"
URI = "neo4j://127.0.0.1:7687"
AUTH = ("neo4j", "12345678")
DB_NAME = "neo4j"

with GraphDatabase.driver(URI, auth=AUTH) as driver:
    driver.verify_connectivity()
    summary = driver.execute_query(
        """
        CREATE (a:Person {name: $name})
        CREATE (b:Person {name: $friendName})
        CREATE (a)-[:KNOWS]->(b)
        """,
        name="Alice",
        friendName="David",
        database_=DB_NAME,
    ).summary
    print(
        "Created {nodes_created} nodes in {time} ms.".format(
            nodes_created=summary.counters.nodes_created,
            time=summary.result_available_after,
        )
    )

    records, summary, keys = driver.execute_query(
        """
        MATCH (p:Person)-[:KNOWS]->(:Person)
        RETURN p.name AS name
        """,
            database_=DB_NAME,
        )

    # Loop through results and do something with them
    for record in records:
        print(record.data())  # obtain record as dict

    # Summary information
    print(
        "The query `{query}` returned {records_count} records in {time} ms.".format(
            query=summary.query,
            records_count=len(records),
            time=summary.result_available_after,
        )
    )
