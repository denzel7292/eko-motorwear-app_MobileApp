# EKO Motorwear app: Webflow API koppeling

Deze app haalt producten en blogs rechtstreeks op uit de Webflow API met `fetch`. Dat sluit aan bij de opdracht: JSON wordt verwerkt in `services/webflowApi.js` en getoond in de product- en blogschermen.

Zonder ingevulde API-gegevens blijft de lokale demonstratie-data zichtbaar, zodat de app altijd werkt tijdens het ontwikkelen.

## Instellen

1. Kopieer `.env.example` naar een nieuw lokaal bestand met de naam `.env`.
2. Vul daar jouw Webflow Site Token en Site ID in.
3. Herstart Expo met `npx expo start -c`.

De blogcollectie wordt automatisch gezocht op de naam `Blogs`. De API gebruikt staging-data voor de blogs; de Webflow-site hoeft dus niet eerst gepubliceerd te worden.

> Let op: een `EXPO_PUBLIC_` token is zichtbaar in een ontwikkelapp. Dit is daarom enkel geschikt voor je schooldemonstratie. Commit `.env` nooit naar GitHub en trek de token na je evaluatie in.
