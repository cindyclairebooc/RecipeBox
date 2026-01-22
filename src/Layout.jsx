import { Outlet, Link } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex h-screen">
      
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 shrink-0">
        <div className="h-full flex flex-col">
          <h2 className="font-bold text-2xl p-7">RecipeBox</h2>
          <nav className="flex flex-col gap-4 p-7">
            <Link to="/" className="text-blue-600 text-xl hover:underline">
              Recipes
            </Link>
            <Link to="/favorites" className="text-blue-600 text-xl hover:underline">
              Favorites
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
