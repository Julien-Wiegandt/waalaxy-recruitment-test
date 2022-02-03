# waalaxy-recruitment-test

## Consignes

```
Re,

Du coup voici le deuxième test technique :

Nous avons un système de queue FIFO.

Soit des actions liées à des crédits. Effectuer une action coûte un crédit. Chaque action possède ses propres crédits.

Les crédits sont recalculés pour l'utilisateur si au moins 24 heures sont passées depuis le dernier calcul. Chaque action possède une valeur maximale de crédits définis par le développeur.

Les crédits seront calculés de manière aléatoire entre 80% et 100% de la valeur maximale.

Un utilisateur peut ajouter autant d'actions qu'ils souhaitent dans sa queue.

Les actions sont triées.

Exemple :

Je suis dans un système avec 3 actions, A, B, C ayant respectivement 20, 20, 30 en valeur maximale.

L'utilisateur après le premier calcul possède en crédits (toujours dans l'ordre A, B, C) 18, 20, 29.

Il ajoute 2 actions A, puis 5 B puis 2 C puis 2 A.

Il aura donc une queue [A, A, B, B, B, B, B, C, C, A, A]

Objectif :

Tu devras rendre un code mettant en place le système décrit ci-dessus.

- On doit pouvoir ajouter des actions à la queue.
- Afficher la queue.

Des tests devront être écrits.

Voici quelques consignes supplémentaires :

- Langages autorisés : Typescript, Javascript
- Le code devra être exécutable via un *npm run start.*
- Les tests devront être exécutable via un *npm run test*
- Aucune limite de temps
- Review du code en direct avec phases de questions
Si tu as des questions n'hésite pas :)
```
