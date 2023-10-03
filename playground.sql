\c nc_news

SELECT * FROM users;
SELECT * FROM topics;
SELECT * FROM articles WHERE articles.articles_id = $1;', [
articles_id])
