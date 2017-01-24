import psycopg2

conn = psycopg2.connect("dbname=volnteer user=postgres")
cur = conn.cursor()

def add_memeber(str):
	