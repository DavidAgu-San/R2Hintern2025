const form = document.getElementById('search-form');
const results = document.getElementById('results');
const API_KEY = 'ef5e3854';

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  results.innerHTML = '';

  const title = document.getElementById('title').value.trim();
  const genre = document.getElementById('genre').value.trim().toLowerCase();
  const year = document.getElementById('year').value.trim();

  if (!title) {
    results.innerHTML = '<p>Please enter a movie title.</p>';
    return;
  }

  const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${title}&type=movie${year ? `&y=${year}` : ''}`);
  const data = await response.json();

  if (data.Response === 'False') {
    results.innerHTML = `<p>${data.Error}</p>`;
    return;
  }

  const movies = data.Search;

  for (const movie of movies) {
    const detailsRes = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}`);
    const details = await detailsRes.json();

    if (genre && !details.Genre.toLowerCase().includes(genre)) continue;
    if (year && details.Year !== year) continue;

    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-transform flex flex-col';
    card.innerHTML = `
     <img 
        src="${details.Poster !== 'N/A' ? details.Poster : 'https://via.placeholder.com/300x450?text=No+Image'}" 
        alt="${details.Title} Poster" 
        class="rounded-t-lg object-cover h-72 w-full"
      />
      <div class="p-4 flex flex-col flex-grow">
        <h2 class="text-lg font-semibold text-blue-600 mb-1">${details.Title} (${details.Year})</h2>
        <p class="text-gray-500 text-sm mb-1"><span class="font-medium">Genre:</span> ${details.Genre}</p>
        <p class="text-gray-500 text-sm mb-1"><span class="font-medium">Director:</span> ${details.Director}</p>
        <p class="text-gray-500 text-sm mb-1"><span class="font-medium">Actors:</span> ${details.Actors}</p>
        <p class="text-gray-700 text-sm mb-2 line-clamp-4"><span class="font-medium">Plot:</span> ${details.Plot}</p>
        <p class="text-sm text-gray-700 font-semibold mt-auto">IMDb Rating: ${details.imdbRating}</p>
      </div>
    `;

    results.appendChild(card);
  }

});
