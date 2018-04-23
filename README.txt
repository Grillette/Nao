Requis :
	- nodejs v6.X.X ou supérieur
	- serveur php 5.4 mini
	- mysql
	
comment installer le projet ?

mettre tout le contenu de nao dans /var/www/htdocs/new sur le raspberry

JS
	- aller dans /client puis faire un "npm install" puis un "npm run build"
	- mettre le contenu de /client/dist dans / ( dossier assets + index.html) et ajouter aussi qimessaging.js dans /assets

PHP
	- modifier la configuration dans /api/config.php
	- installer la base de données qui est dans /api/model/db.sql
	
aller sur l'URL 'IP_RASPERRY'/new pour avoir acces a l'application

nom de compte : test
mot de passe : test

( ne fonctionne pas sur le raspberry, je ne connais pas la raison)
pour lancer le projet nao client faire une npm start sur /client et avoir le serveur php et aller sur localhost:8080 et modifier dans /client/conf/webpack/dev.js l'url de l'application php
