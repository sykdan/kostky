<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { fly, slide } from "svelte/transition";

    import Back from "svelte-material-icons/ArrowLeft.svelte";

    import Down from "svelte-material-icons/ArrowDownBold.svelte";
    import Both from "svelte-material-icons/SwapVerticalBold.svelte";
    import Up from "svelte-material-icons/ArrowUpBold.svelte";
    import Announced from "svelte-material-icons/Bullhorn.svelte";

    import Dice1 from "svelte-material-icons/Dice1.svelte";
    import Dice2 from "svelte-material-icons/Dice2.svelte";
    import Dice3 from "svelte-material-icons/Dice3.svelte";
    import Dice4 from "svelte-material-icons/Dice4.svelte";
    import Dice5 from "svelte-material-icons/Dice5.svelte";
    import Dice6 from "svelte-material-icons/Dice6.svelte";
    import Maximum from "svelte-material-icons/Plus.svelte";
    import Minimum from "svelte-material-icons/Minus.svelte";
    import Sequence from "svelte-material-icons/Numeric.svelte";
    import FullHouse from "svelte-material-icons/Home.svelte";
    import Poker from "svelte-material-icons/StarFourPoints.svelte";
    import Yamb from "svelte-material-icons/Star.svelte";

    import TopBar from "./UI/TopBar.svelte";

    const emit = createEventDispatcher();
    let show_actions = false;
</script>

<div class="rulesscreen appscreen" transition:fly>
    <TopBar
        title="Pravidla"
        hideRight={true}
        on:leftbutton={() => emit("back")}
        on:rightbutton={() => (show_actions = !show_actions)}
    >
        <Back slot="leftbutton" color="white" size="28" />
    </TopBar>
    <div class="rules">
        <h1>Pravidla hry Yamb</h1>
        <p>
            Yamb je kostková hra pro neomezený počet hráčů (ale je samozřejmě
            mnohem zábavnější s přáteli). Cílem je nashromáždit co nejvyšší
            počet bodů na hrací kartě.
        </p>
        <p>
            Hráči se střídají v házení šesti kostek. Každý hráč při svém tahu
            může hodit až třikrát a při druhém a třetím hodu si může vybrat,
            kterými kostkami hodí. Do bodového hodnocení se vždy počítá jen pět
            ze šesti kostek (s výjimkou postupky).
        </p>
        <p>
            Tah končí zapsáním bodů do hrací karty. Do hrací karty může hráč
            zapsat body kdykoliv ve svém tahu, zpravidla je to ale při tahu
            třetím. Karta má několik řádků (které představují kombinace) a
            sloupců (které představují čtyři "hry", které hrajete). Body nelze
            přepsat, pokud zapíšete nějakou hodnotu, již ji nelze změnit. Pokud
            hráč nehodil žádnou kombinaci, musí napsat nulu do nějakého volného
            pole.
        </p>
        <h2>Řádky</h2>
        <p>Řádky představují kombinace, za které dostáváte body. Těmi jsou:</p>
        <p><Dice1 /> Jedničky: Zapisuje se součet všech jedniček.</p>
        <p><Dice2 /> Dvojky: Zapisuje se součet všech dvojek.</p>
        <p><Dice3 /> Trojky: Zapisuje se součet všech trojek.</p>
        <p><Dice4 /> Čtyřky: Zapisuje se součet všech čtyřek.</p>
        <p><Dice5 /> Pětky: Zapisuje se součet všech pětek.</p>
        <p><Dice6 /> Šestky: Zapisuje se součet všech šestek.</p>
        <p>
            <Maximum /> Maximum: Zapisuje se libovolný součet kostek, měl by být
            co nejvyšší.
        </p>
        <p>
            <Minimum /> Minimum: Zapisuje se libovolný součet kostek, měl by být
            co nejmenší.
        </p>
        <p style="margin-bottom: 0">
            <Sequence /> Postupka: Zapisuje se bodové ohodnocení dle toho, jakou
            postupku hodíte:
        </p>
        <ul>
            <li>
                Pokud máte postupku 1-5 či 2-6 při prvním hodu, zapisujete 66
                bodů.
            </li>
            <li>
                Pokud máte postupku 1-5 či 2-6 při druhém hodu, zapisujete 56
                bodů.
            </li>
            <li>
                Pokud máte postupku 1-5 či 2-6 při třetím hodu, zapisujete 46
                bodů.
            </li>
            <li>
                Pokud máte postupku 1-6 při prvním hodu, zapisujete 76 bodů.
            </li>
        </ul>
        <p>
            <FullHouse /> Full House: Pokud máte dvojici a trojici, zapište jejich
            součet + bonus 30 bodů (ten aplikace připočte automaticky, pište pouze
            součet).
        </p>
        <p>
            <Poker /> Poker: Pokud máte čtveřici, zapište součet + bonus 40 bodů
            (připočten automaticky).
        </p>
        <p>
            <Yamb /> Yamb: Pokud máte pětici, zapište součet + bonus 50 bodů (připočten
            automaticky).
        </p>
        <h2>Sloupce</h2>
        <p>
            Ve hře Yamb každou kombinaci vyplňujete čtyřikrát, pokaždé do jiného
            sloupce. Těmito sloupci jsou:
        </p>
        <p>
            <Down /> Shora: Kombinace vyplňujete shora dolů (takže musíte zapsat
            <i>nějaké</i> body do jedniček, abyste mohli zapisovat do dvojek, pak
            trojek, atd.)
        </p>
        <p><Both /> Různě: Kombinace můžete vyplňovat v jakémkoli pořadí.</p>
        <p>
            <Up /> Vzhůru: Kombinace vyplňujete zdola nahoru. (takže musíte zapsat
            body za Yamb, abyste mohli zapsat Poker, Full House...)
        </p>
        <p>
            <Announced /> Hlášení: Kombinace můžete vyplňovat v jakémkoli pořadí,
            ale po <i>prvním hodu</i> musíte oznámit, jakou kombinaci budete vyplňovat.
            Poté již nesmíte změnit své rozhodnutí.
        </p>

        <h2>Co je důležité si uvědomit</h2>
        <p>
            Takto napsaná pravidla možná nemusí dávat na první pohled smysl,
            pojďme si projít nějaké příklady, které by mohly pomoct.
        </p>
        <p>
            <b>Rozhodněte se, co budete zapisovat.</b> Řekněme, že jste právě
            začali hrát a vaše karta je prázdná. Pokud na kostkách hodíte
            kombinaci [1, 1, 1, 1, 2, 2], můžete si zapsat 4 body do jedniček
            (4krát jednička) do sloupce <i>Shora</i>, nebo 6 bodů do minima
            (počítá se pouze 5 kostek, tedy složíte minimum z 1 1 1 1 2) ve
            sloupci <i>Různě</i>. Také byste si mohli zapsat 4 body do dvojek
            (2x dvojka), ale později byste mohli hodit třeba pět dvojek a napsat
            do stejného pole 10 bodů. Musíte se proto rozhodnout, do které
            kombinace a kterého sloupce budete zapisovat, abyste si nezaplnili
            políčko příliš nízkou hodnotou.
        </p>
        <p>
            <b>Nezaplňujte hned sloupec <i>Různě</i>.</b> Bude se vám zdát, že je
            to tak nejlepší a že tak získáte nejvíc možných bodů, opak je ale pravdou.
            Budete poté muset spoléhat na ostatní sloupce, ve kterých nemůžete zapisovat
            body tak, jak se vám zachce. Pokud vám nebudou na kostkách padat vhodná
            čísla, budete muset zapisovat nuly a ztrácet.
        </p>
        <h2>Bodování</h2>
        <p style="margin-bottom: 0">
            Po vyplnění všech polí je hra u konce a spočítají se body. Každý
            sloupec má vlastní konečné skóre spočítané následovně:
        </p>
        <ul>
            <li>
                Sečtou se body za jedničky, dvojky, trojky, čtyřky, pětky a
                šestky. Pokud tento součet přesahuje 60, připočte se bonusových
                30 bodů. (Aplikace na to upozorní změnou barvy na zeleno)
            </li>
            <li>
                Odečte se minimum od maxima a výsledek je vynásoben body za
                jedničky.
            </li>
            <li>
                Body za postupku, Full House, Poker a Yamb se sčítají bez
                speciálních pravidel.
            </li>
            <li>Součet těchto tří oddílů tvoří konečné skóre za sloupec.</li>
        </ul>
        <p>
            Konečné skóre sloupců se poté sečte do jednoho čísla, které je Vaším
            výsledkem. Aplikace toto udělá za vás a zobrazí celkový součet dole
            na obrazovce.
        </p>
    </div>
</div>

<style>
    div.rules {
        color: var(--black);
        padding: 1em;
        overflow-y: auto;
    }

    p {
        font-size: 140%;
    }

    ul {
        margin-top: 0;
    }

    li {
        font-size: 120%;
    }

    :global(div.rules svg) {
        height: 48px;
        width: 48px;
        vertical-align: middle;
    }

    :global(div.rules svg path) {
        fill: var(--black);
    }
</style>
