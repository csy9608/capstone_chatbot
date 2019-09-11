DATABASE_NAME="recipe_bot"

# INIT DATABASE
mysql --defaults-file=.my.cnf -e "CREATE DATABASE IF NOT EXISTS $DATABASE_NAME;"

# LOAD SQL
for file in Dump20180705/*.sql
do
    mysql --defaults-file=.my.cnf $DATABASE_NAME <  "$file"
done
