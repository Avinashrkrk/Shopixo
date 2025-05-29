import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../data/products';
import { ChevronRight } from 'lucide-react';

const CategoryMenu = () => {
  return (
    <div className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 p-4">
          {categories.map((category) => (
            <div key={category.id} className="group relative">
              <Link
                to={`/products/${category.name.toLowerCase()}`}
                className="flex flex-col items-center gap-2 p-2 hover:text-blue-500 transition-colors"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <span className="text-sm font-medium">{category.name}</span>
              </Link>

              {/* Dropdown Menu */}
              <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute left-0 top-full w-48 bg-white shadow-lg rounded-lg transition-all duration-200 z-50">
                <div className="py-2">
                  {category.subcategories.map((subcategory) => (
                    <Link
                      key={subcategory.id}
                      to={`/products/${category.name.toLowerCase()}?subcategory=${subcategory.name.toLowerCase()}`}
                      className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <span>{subcategory.name}</span>
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryMenu;