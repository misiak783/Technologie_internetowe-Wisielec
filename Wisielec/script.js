// Pobranie referencji do elementów HTML
const slowoE1 = document.getElementById('slowo');
const bledneLiteryE1 = document.getElementById('bledne-litery');
const przyciskGrajPonownie = document.getElementById('przycisk-graj-ponownie');
const popup = document.getElementById('kontener-popup');
const powiadomienie = document.getElementById('kontener-powiadomienia');
const wiadomoscKoncowa = document.getElementById('wiadomosc-koncowa');
// Pobranie referencji do części rysunku
const czesciRysunku = document.querySelectorAll(".czesc-rysunku");

// Tablica słów do zgadnięcia
const slowa = ['messi', 'ronaldo', 'maradona', 'kubica', 'tyson', 'krzynowek', 'pudzian', 'eminem','skrillex', 'maklowicz','malysz', 'benzema', 'verstappen', 'mcgregor'];

// Losowe wybranie słowa z tablicy słów
let wybraneSlowo = slowa[Math.floor(Math.random() * slowa.length)];

// Tablice przechowujące poprawnie i błędnie odgadnięte litery
const poprawneLitery = [];
const bledneLitery = [];

// Funkcja wyświetlająca słowo do odgadnięcia
function wyswietlSlowo() {
    slowoE1.innerHTML = `
    ${wybraneSlowo
        .split('')
        .map(
            litera => `
                <span class="litera">
                    ${(poprawneLitery.includes(litera.toUpperCase()) ? litera.toUpperCase() : '')}
                </span>
            `
        )
        .join('')}
    `;

    // Sprawdzenie czy całe słowo zostało odgadnięte
    const innerWord = slowoE1.innerText.replace(/\n/g, '');
    if (innerWord === wybraneSlowo.replace(/\s/g, '').toUpperCase()) {
        wiadomoscKoncowa.innerText = 'Gratulacje! Wygrałeś! 😃';
        popup.style.display = 'flex'; // Wyświetlenie okna popup z wiadomością końcową
    }
}

// Funkcja aktualizująca wyświetlanie błędnych liter i części rysunku
function aktualizujBledneLitery() {
    bledneLiteryE1.innerHTML = `
    ${bledneLitery.length > 0 ? '<p>Błędne</p>' : ''}
    ${bledneLitery.map(litera => `<span>${litera}</span>`)}
    `;
    czesciRysunku.forEach((czesc, index) => {
        const iloscBledow = bledneLitery.length;

        // Wyświetlenie odpowiedniej liczby części rysunku w zależności od liczby błędnych liter
        if (index < iloscBledow) {
            czesc.style.display = 'block'
        } else {
            czesc.style.display = 'none';
        }
    });

    // Sprawdzenie, czy liczba błędnych liter odpowiada liczbie części rysunku (czyli czy gracz przegrał)
    if (bledneLitery.length === czesciRysunku.length) {
        wiadomoscKoncowa.innerText = 'Niestety przegrałeś. 😕';
        popup.style.display = 'flex'; // Wyświetlenie okna popup z wiadomością końcową
    }
}

// Funkcja wyświetlająca powiadomienie o podaniu już wcześniej litery
function wyswietlPowiadomienie() {
    powiadomienie.classList.add('show');

    // Automatyczne usunięcie powiadomienia po 2 sekundach
    setTimeout(() => {
        powiadomienie.classList.remove('show');
    }, 2000);
}

// Reakcja na naciśnięcie klawisza
window.addEventListener('keydown', e => {
    if (e.keyCode >= 65 && e.keyCode <= 90) { // Sprawdzenie czy klawisz należy do przedziału liter alfabetu (A-Z)
        const litera = e.key.toUpperCase(); // Konwersja wprowadzonej litery na wielką literę

        if (wybraneSlowo.toUpperCase().includes(litera)) { // Sprawdzenie czy wprowadzona litera znajduje się w słowie
            if (!poprawneLitery.includes(litera)) { // Sprawdzenie czy litera nie została wcześniej odgadnięta
                poprawneLitery.push(litera); // Dodanie poprawnie odgadniętej litery do tablicy

                wyswietlSlowo(); // Ponowne wyświetlenie słowa, uwzględniając poprawnie odgadnięte litery
            } else {
                wyswietlPowiadomienie(); // Wyświetlenie powiadomienia o podaniu już wcześniej litery
            }
        } else {
            if (!bledneLitery.includes(litera) && litera !== ' ') { // Sprawdzenie czy litera nie została wcześniej podana jako błędna
                bledneLitery.push(litera); // Dodanie błędnie podanej litery do tablicy

                aktualizujBledneLitery();
            } else {
                wyswietlPowiadomienie();
            }
        }
    }
});

// Reakcja na kliknięcie przycisku "Graj Ponownie"
przyciskGrajPonownie.addEventListener('click', () => {
    poprawneLitery.splice(0); // Wyczyszczenie tablicy poprawnych liter
    bledneLitery.splice(0); // Wyczyszczenie tablicy błędnych liter

    wybraneSlowo = slowa[Math.floor(Math.random() * slowa.length)]; // Losowy wybór nowego słowa

    wyswietlSlowo();
    aktualizujBledneLitery();

    popup.style.display = 'none'; // Ukrycie okna popup z wiadomością końcową
});

wyswietlSlowo();
