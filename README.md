Pokémon Explorer is a React-based single-page application (SPA) that allows users to explore, search, sort, and compare Pokémon using data from the PokeAPI. It includes interactive features such as detailed views, filtering, pagination, favorites, and comparisons.

🔍 Features
Pokémon List View

Displays first 151 Pokémon

Sorting (ID & Name), Filtering by Type

Pagination and adjustable items per page

Detailed Pokémon View

Shows stats, abilities, moves, and evolution chain

Dynamically fetched via route (/pokemon/:id)

Favorites

Add/remove Pokémon as favorites (stored in localStorage)

View them via the "⭐ View Favorites" link

Comparison Tool

Select multiple Pokémon to compare their base stats in a side-by-side table

Random Pokémon Button

Jump to a random Pokémon's detail page

Performance & Error Handling

Optimized with useMemo and useCallback

Error boundaries catch unexpected rendering issues

🛠️ Technologies Used
React

React Router

Context API

Custom Hooks

Local Storage

Fetch API / PokeAPI

