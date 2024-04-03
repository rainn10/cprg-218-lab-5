const generateRandomSpell = () => {
    const randomIndex = Math.floor(Math.random() * allSpells.length);
    const randomSpell = allSpells[randomIndex];
    const spellsSection = document.getElementById('spellsSection');
    const spellCard = document.createElement('div');
    spellCard.classList.add('spell-card');
    spellCard.innerHTML = `
        <p>Spell: ${randomSpell.spell}</p>
        <p>Use: ${randomSpell.use}</p>
    `;
    spellsSection.innerHTML = '';
    spellsSection.appendChild(spellCard);
};

async function fetchAndDisplayCharacters() {
    try {
        const res = await fetch('https://potterapi-fedeperin.vercel.app/en/characters');
        if (!res.ok) {
            throw new Error('Failed to fetch characters');
        }
        const characters = await res.json();

        const charactersSection = document.getElementById('charactersSection');
        const searchInput = document.getElementById('searchInput');

        const displayCharacters = () => {
            charactersSection.innerHTML = '';
            characters
                .filter(character =>
                    character.fullName.toLowerCase().includes(searchInput.value.toLowerCase())
                )
                .forEach(character => {
                    const characterCard = document.createElement('div');
                    characterCard.classList.add('character-card');
                    characterCard.innerHTML = `
                        <h4>${character.fullName}</h4>
                        <img src="${character.image}" alt="${character.fullName}">
                        <p>House: ${character.hogwartsHouse}</p>
                        <p>Birthdate: ${character.birthdate}</p>
                        <p>Interpreted By: ${character.interpretedBy}</p>
                    `;
                    charactersSection.appendChild(characterCard);
                });
        };

        searchInput.addEventListener('input', displayCharacters);
        displayCharacters();
    } catch (error) {
        console.error('Error fetching characters:', error);
    }
}


async function fetchAndDisplayBooks() {
    try {
        const res = await fetch('https://potterapi-fedeperin.vercel.app/en/books');
        if (!res.ok) {
            throw new Error('Failed to fetch books');
        }
        const books = await res.json();

        const booksSection = document.getElementById('booksSection');

        books.forEach(book => {
            const bookCard = document.createElement('div');
            bookCard.classList.add('book-card');
            bookCard.innerHTML = `
                        <h4>Book ${book.number}: ${book.title}</h4>
                        <p>Release Date: ${book.releaseDate}</p>
                        <p>Pages: ${book.pages}</p>
                        <img src="${book.cover}" alt="${book.title}">
                        <p>${book.description}</p>
                        `;
            booksSection.appendChild(bookCard);
        });
    } catch (error) {
        console.error('Error fetching books:', error);
    }
}


let allSpells = [];

const fetchAndDisplaySpells = async () => {
    try {
        const res = await fetch('https://potterapi-fedeperin.vercel.app/en/spells');
        if (!res.ok) {
            throw new Error('Failed to fetch spells');
        }
        allSpells = await res.json();
    } catch (error) {
        console.error('Error fetching spells:', error);
    }
};


document.getElementById('SpellButton').addEventListener('click', generateRandomSpell);

fetchAndDisplayCharacters();
fetchAndDisplayBooks();
fetchAndDisplaySpells();
