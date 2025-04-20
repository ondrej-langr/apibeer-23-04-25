# O ASTs a automatizaci

## O čem se dnes budeme bavit

- Co jsou ty ASTs
- Proč by nás měly zajímat, Automatizace
- Co na to AI

## Co jsou ty ASTs

### Intro

AST neboli abstract syntax tree je struktura reprezentující kód v souvislostech. Představte si to jakousi logickou mapu kde je co definované, kde se co volá, odkdu se to bere atp.

AST umíme my, jakožto programátoři. Při programování si mapujeme kód který čteme nebo píšeme. Nebo teda doufám.
Při takovém programování člověk přemýšlí nad funkcemi, proměnnými a občas nad tím co si dá k jídlu. Tohle vše musí compiler daného psaného jazyku podstoupit také aby vlastně pochopil čeho se vlastně snažíme dosáhnout. Mínus teda to jídlo.

Compiler, stejně jako člověk, jde dvěmi jednoduchými kroky:
- nejdříve kód je rozbit do jednotlivých částí kterým se říká tokeny (slova, čísla, aj)
- dalé tyhle tokeny jsou přiřazeny k sobě pomocí implementace AST tak aby to dávalo smysl ()

Nutno podotknout že AST je v rodě mužském. Důvod je takový že ho nezajímájí kosmetické části kód jako středníky a nebo složený závorky.

## Proč by nás to mělo vlastně zajímat

### Intro

AST je jeden z nejdůležitějších stabních prvků v programování ke kterému by se měl dostat snad každý.

U využití se můžete setkat u třech hlavních tématech:
- Kompilátory - samozřejmě hlavní použítí je u kompilátorů které využívají AST k pochopení kodů a následně jeho ověření. Important stuff
- Nástroje statické analýzy - To už by mělo být jasný už z názvu. Analýza statického kódu podle které se můžou už dělat další kroky. Pro javascriptáře takovou statickou analýzu používá babel a nebo eslint. Pokud jste dělali plugin do takového nástroje tak jste se s AST určitě setkali
- Codemods - Tady už trochu přecházím do automatizace. Pro ty co nevedí co jsou codemods - v jednoduchosti: codemod je nástrojem pro urychlení repetivní práce například při hromadné migraci na nový nástroj a nebo na novou verzi nástroje. Ti lepší to dělají pomocí search and replace, ale pro ty kteří to chtějí mít přesnější a přenositelnější tak rozhodně codemod je jasná volba.

### Whats up, Mods & Gents?

Pojďmě chvíli zůstat u codemods a codegens. Teda tahle přednáška má být hlavně o nich. Jak jsem už zmínil skrz codemods můžeme jasně a přesně definovat co dělat při nějaké migraci. Typicky při migraci starého zápisu (typicky nějakých libs) do nového.
Codegens už je samostatné označení nástroji pro generaci kódu. Codegenem můžeme nazvat prakticky cokoliv co nám generuje nějaký kód. Dobrý příkladem může být příkaz `npx create-next-app` který vytvoří nový nextjs projekt i s dalšími akčními kroky.

#### Jak je to teda v typescriptu?

V typescriptu, jak je zvykem, máme nástrojů plno. Ještě víc nástrojů je které využívají statickou analýzu k udržování jednoty zápisu nebo transpilaci - jakožto je třeba babel a nebo eslint, ale tomu se v této přednášce věnovat nebudu.

Prvně si projdeme nějaké nástroje statické analýzi a standardy. Poté se budeme věnovat nástrojům jak tohle to všechno uchopit a na co to zvolit.

#### Nástroje statické analýzy a standardy

Pojdme si prolítnout standardy a nástroje statické analýzy. Node.js nemá přímo svůj dedikovaný AST nástroj nebo nějaké api. Vše jeden povětšinou v C++.
Opakem je třeba PHP kde takový AST parser je nativně poskytován. V jazycích jako je C# mají roslyn. Podobný případ jako Node.js

- standardy
  - Estree
      - Standard pro ECMA script,
      - vtipné je že tento standard byl inspirován API které poskytoval SpiderMonkey do JavaScriptu.
  - Shift
      - Není akceptovaným standardem ECMA scriptu, ale práci to udělá podobnou
      - konečný důvod vzniku byl spíše namířen na transformaci kodu
  - babel
      - ano, babel je samotným standardem jako samo o sobě a podporuje jako první experimentální zápisy

- parsery
  - typescript
    - ano, typescript jde cestou PHP kde poskytuje API na svůj transpiler engine (doufám že přepisem do GO toto zůstane)
  - esprisma
    - jeden z prvních a první se prosadil
  - babel
    - @babel/parser je už samotnou library která je schopná vykonat statickou analýzu
  - espree
    - důležité zmínit kvůli eslintu

#### Ukázka AST z AST exploreru

// Insert code reprentation of typescript code

#### Nástroje na využití statické analýzy

- JS Codeshift
  - facebook odpověď na časté změny v reactu
  - jednodušeně řečeno nástroj na definici proměny kódu ze starého api na nové.
  - poskytuje danou strukturu (to se u facebooku nevidí) definici codemodů a poskytuje vlastní api které následně volá nástroje statické analýzy
  - je schopen využít nejen babel, ale třeba i estree
  - nespočet populárních nástrojů volí tento nástroj. Kupříkladu MUI

  // TODO: Ukázka definice

- NX
  - projektová automatizace na dlani
  - NX je známé hlavně ve spojitosti orchestrací monorep - Běh scriptů jednotlivých tasků efektivně, kešování výsledků a distribuované běhy testů
  - Pro nás bude hlavně důležitá znalost nx plugins díky který můžeme využít naši znalost AST naplno.
  - Výhodou je samozřejmě celkem zralá komunita a již připravené pluginy
  - Dnes se nástroj nedrží pouze javascriptu (čtěte typescript) ale lepí se na pole neorané - rust, c# a nebo go. To je jenom díky vytvořeným NX pluginům
  - Nevýhodou může být definice pluginů pouze v CJS, na esm se moc nechystají
  - Zápis příkazů může být totální opruz

  // TODO: ukázka zápisu pluginu v ACO

- Tsuru
  - můj vlastní nástroj
  - podobné jako nx, méně out of the box
  - velmi jednoduchý zápis příkazů, filebase definice
  - typesafe šablony a jasnější definice šablon
  - CLI program může mít vlasní název, nástroji je jedno jak je pojmenován
  - Podpora CJS a ESM
  - prakticky bez funkce v základu

  // TODO: Ukázka zápisu příkazu
  // Příkazy v jednotlivých projektech


## Co Na To AI?

AI je v tomhle v celkem zajímavé pozici. Již vznikají nástroje na generaci kódu ať již z existující codebase tak už z alternativní z natrénovaného datasetu.
Já jsem menší odpůrce AI v tomhle obraze jelikož výsledky které to generuje nejsou dost uspokojivé a kolikrát celkem abstraktní. V mé zkušenosti u toho člověk musí sedět dlouho a vše definovat a doufat. Další důvod proč toho nejsem zastáncem je že si rád přidávám práci.

Minulý rok ale anthropic přišel s peckou s názvem MCP - model context protocol. To všechno moje remcání trochu utišuje jelikož vývojář využívá LLM pouze jako router a tenkou vrstvu vědění okolo. Všechno důležité si totiž musí vytvořit vývojář sám.
Ať už jde o připojení k databázy a vytvoření prvků sebrané z proomtu, mazání, a nebo odeslání jaderný rakety.

Tahleta situaci nám otvírá mnoho dalších možností kdy si můžeme definovat projektovou generaci a údržbu přes MCP a bude nám to suplovat CLI - nebo ještě lépe. Bude samotné CLI využívat!
