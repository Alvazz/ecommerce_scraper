import pymysql


class QueryBuilder:

    def __init__(self):
        self.base_insert_query = 'INSERT INTO {0}({1}) VALUES({2});'
        self.base_select_query = 'SELECT {0} FROM {1} {2};'
        self.field = ""
        self.value = ""
        self.rows = ""

    def handle_value_for_query(self, value, last):

        """
            This method will decide the type of values
            to put under quotes as well handle the 
            last item
        """

        if last:
            if value == 'CURRENT_DATE()':
                return '{0}'.format(value)
            elif type(value) == str:
                return "'{0}'".format(value)
            else:
                return '{0}'.format(value)
        else:
            if value == 'CURRENT_DATE()':
                return '{0},'.format(value)
            elif type(value) == str:
                return "'{0}',".format(value)
            else:
                return '{0},'.format(value)

    def build_select_query(self, table_name, all, *fields, **args):
        
        """
            This method will build a select 
            dynamically query for the db
        """

        if all:
            self.field += "*"
        else: 
            # build query here.
            pass

        return self.base_select_query.format(self.field, table_name, self.value)

    def build_insert_query(self, table_name, **args):

        """
            This method will build an insert query
            dynamically to insert for the db
        """

        self.field, self.value = "", ""

        dict_size, index = len(args.keys()), 1

        for key, item in args.items():

            if index == dict_size:
                self.field += "`{0}`".format(key)
                self.value += self.handle_value_for_query(item, True)
            else:
                self.field += "`{0}`,".format(key)
                self.value += self.handle_value_for_query(item, False)

            index += 1

        return self.base_insert_query.format(table_name, self.field, self.value)

    def build_insert_multiple_query(self, table_name, rows):

        """
            This table will build an query to
            insert multiple rows
        """
        pass


    def build_update_query(self, **args):

        """
            This method will build an update
            query dynamically for the db.
        """

        pass


class DatabaseHelper:

    def __init__(self, user, password, host, db):
        self.connection = None
        self.host = host
        self.user = user
        self.db = db
        self.password = password

    def execute_get_query(self, query):

        """
            This method will fetch all 
            the items from the db
        """

        try:
            self.connection = pymysql.connect(
                host=self.host,
                user=self.user, 
                password=self.password,
                db=self.db,
            )
            
            cursor = self.connection.cursor()
            cursor.execute(query)
            output = cursor.fetchall()

            self.connection.close()
            return output
        
        except Exception:

            # in case of an exception rollback and close connection
            self.connection.rollback()
            self.connection.close()

    def execute_insert(self, query):

        """
            This method will insert
            records into the database
        """

        try:
            self.connection = pymysql.connect(
                host=self.host,
                user=self.user, 
                password=self.password,
                db=self.db,
            )
            
            cursor = self.connection.cursor()
            cursor.execute(query)
            self.connection.commit() # commit the query
            self.connection.close() # close connection

        except Exception:

            # in case of an error rollback and close connection
            self.connection.rollback()
            self.connection.close()
