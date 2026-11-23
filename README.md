# Joyeux Anniversaire, Papa 🕊️

Un site web d'anniversaire intime, élégant, émouvant et mémorable, pensé comme une lettre d'amour et de gratitude d'un fils à son père.

---

## 🌟 Présentation & Expérience

Le site est conçu selon les standards du design éditorial de luxe et de l'esthétique minimaliste (inspiration Apple, typographies de haute facture, nuances champagne et ivoire) :

1. **Écran d'ouverture solennel** :
   - Message délicat : *« Pour la personne qui m'a tant donné... »*
   - Bouton d'entrée : *« Ouvrir cette petite surprise »* avec transition fluide et révélation lumineuse.
2. **Message principal** :
   - Cœur typographique : *« Joyeux anniversaire, Papa. »*
   - Pensée sincère sur les mots qui ne suffisent jamais pour remercier un père.
3. **Lettre personnelle** :
   - Mise en page façon beau papier vélin d'art avec sceau doré personnalisé.
   - Texte humain, vrai, touchant et pudique : les sacrifices discrets, la présence rassurante, la gratitude profonde, et les vœux sincères pour sa vie.
4. **Section cinématographique (La phrase qui marque)** :
   - *« Je ne pourrai peut-être jamais te rendre tout ce que tu m'as donné, mais je n'oublierai jamais tout ce que tu as fait pour moi. »*
5. **Final chaleureux & interactif** :
   - *« Je te souhaite encore de longues années de bonheur, de santé, de paix et de beaux moments. »*
   - *« Je t'aime, Papa. ❤️ »*
   - Cœur interactif qui libère des éclats de lumière et de petits symboles d'amour.
   - Possibilité d'imprimer la lettre ou de la sauvegarder en PDF dans une mise en page d'art prête à être encadrée.

---

## 🎨 Caractéristiques & Atouts Techniques

- **100% Vanilla** : HTML5 sémantique, CSS3 moderne et JavaScript pur. Aucun framework lourd, aucun tracking, aucun backend.
- **Ambiance sonore douce générative intégrée** : Générée dynamiquement via l'API Web Audio (aucun MP3 externe qui risque de ne pas se charger ou d'être bloqué). Fonctionne 100% hors-ligne.
- **Poussière d'étoiles dorées (Canvas)** : Animation de particules subtile et ultra-légère (60 FPS, sans latence).
- **Double ambiance visuelle** : 
  - *Nocturne doré* (par défaut, intime et cinématographique)
  - *Vélin & Champagne clair* (accessible en un clic sur l'icône soleil/lune).
- **Feuille de style d'impression dédiée (`@media print`)** : Permet au père d'imprimer la lettre ou de l'enregistrer au format PDF comme un souvenir physique intemporel.
- **Accessibilité & Respect du mouvement** : Prise en charge native de `prefers-reduced-motion`.
- **100% Responsive** : Parfaitement adapté aux smartphones (iPhone & Android), tablettes et écrans haute résolution.

---

## 🚀 Comment lancer le site

### En local (sur votre ordinateur) :
Il vous suffit de double-cliquer sur le fichier `index.html` ou de l'ouvrir dans n'importe quel navigateur web moderne (Google Chrome, Safari, Firefox, Edge).

### Hébergement gratuit sur GitHub Pages (en 2 minutes) :
1. Créez un nouveau dépôt public sur GitHub (ex: `papa-anniversaire`).
2. Déposez-y l'ensemble des fichiers :
   - `index.html`
   - le dossier `css/`
   - le dossier `js/`
3. Rendez-vous dans les paramètres du dépôt (**Settings**) > onglet **Pages**.
4. Sous **Branch**, sélectionnez la branche `main` (ou `master`), dossier `/(root)`, puis cliquez sur **Save**.
5. Votre lien personnalisé sera immédiatement actif (ex: `https://votre-pseudo.github.io/papa-anniversaire/`). Vous pourrez ainsi lui envoyer le lien par message le matin de son anniversaire !

---

## ✍️ Comment personnaliser le texte

Tous les textes sont centralisés dans le fichier `index.html` avec des commentaires clairs :
- Pour modifier un paragraphe de la lettre : ouvrez `index.html` et modifiez les paragraphes situés dans la section `<section class="letter-section">`.
- Pour changer la signature : modifiez la balise `<span class="signature-name">Ton fils</span>` (vous pouvez y ajouter votre prénom ou surnom).
