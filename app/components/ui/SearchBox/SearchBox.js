'use client';

import { useState, useEffect, useRef } from 'react';
import { API_ENDPOINTS } from '../../../config/api';
import Image from 'next/image';

export default function SearchBox() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [allTags, setAllTags] = useState([]);
  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Fetch all tags on component mount
  useEffect(() => {
    const fetchAllTags = async () => {
      try {
        console.log('Fetching all tags from:', API_ENDPOINTS.tags.getAll);
        const response = await fetch(API_ENDPOINTS.tags.getAll);
        console.log('Response status:', response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log('Tags data:', data);
          setAllTags(data.data || []);
        } else {
          console.error('Failed to fetch tags:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    fetchAllTags();
  }, []);

  // Filter suggestions based on search term
  useEffect(() => {
    if (searchTerm.trim().length < 1) {
      setSuggestions([]);
      return;
    }

    // Filter from all tags instead of making API call
    const filtered = allTags.filter(tag => 
      tag.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedTags.some(selected => selected.id === tag.id)
    );
    
    setSuggestions(filtered);
  }, [searchTerm, selectedTags, allTags]);

  // Fetch filtered articles when selected tags change
  useEffect(() => {
    const fetchFilteredArticles = async () => {
      if (selectedTags.length === 0) {
        setFilteredArticles([]);
        return;
      }

      setIsLoading(true);
      try {
        // استفاده از route جدید برای دریافت مقالات بر اساس چندین تگ
        const tagIds = selectedTags.map(tag => tag.id).join(',');
        console.log('Fetching articles for tags:', selectedTags.map(tag => tag.name).join(', '), 'IDs:', tagIds);
        
        const response = await fetch(API_ENDPOINTS.articles.getByTags(tagIds, 50));
        if (response.ok) {
          const data = await response.json();
          const articles = data.data?.articles || [];
          console.log(`Found ${articles.length} articles for selected tags`);
          setFilteredArticles(articles);
        } else {
          console.error('Failed to fetch articles for tags:', response.statusText);
          setFilteredArticles([]);
        }
      } catch (error) {
        console.error('Error fetching filtered articles:', error);
        setFilteredArticles([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilteredArticles();
  }, [selectedTags]);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target) &&
          suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTagSelect = (tag) => {
    console.log('Selecting tag:', tag);
    if (!selectedTags.some(selected => selected.id === tag.id)) {
      setSelectedTags([...selectedTags, tag]);
    }
    setSearchTerm('');
    setSuggestions([]);
    setIsOpen(false);
  };

  const handleTagRemove = (tagId) => {
    console.log('Removing tag with ID:', tagId);
    setSelectedTags(selectedTags.filter(tag => tag.id !== tagId));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (suggestions.length > 0) {
      handleTagSelect(suggestions[0]);
    }
  };

  // Helper for relative time
  function getRelativeTime(dateString) {
    const now = new Date();
    const date = new Date(dateString);
    const diff = Math.floor((now - date) / 1000); // seconds
    if (diff < 60) return 'چند ثانیه پیش';
    if (diff < 3600) return `${Math.floor(diff / 60)} دقیقه پیش`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} ساعت پیش`;
    return `${Math.floor(diff / 86400)} روز پیش`;
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Search Input */}
      <div className="relative" ref={searchRef}>
        <form onSubmit={handleSearchSubmit}>
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              placeholder="جستجو در تگ‌ها... (مثال: ایران، اسلام، سیاست)"
              className="w-full px-4 py-3 pr-12 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </form>

        {/* Suggestions Dropdown */}
        {isOpen && suggestions.length > 0 && (
          <div 
            ref={suggestionsRef}
            className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
          >
            {suggestions.map((tag) => (
              <button
                key={tag.id}
                onClick={() => handleTagSelect(tag)}
                className="w-full px-4 py-3 text-right hover:bg-gray-50 focus:bg-gray-50 focus:outline-none border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 text-right">
                    <div className="font-medium text-gray-900">{tag.name}</div>
                    {tag.description && (
                      <div className="text-sm text-gray-500 mt-1">{tag.description}</div>
                    )}
                  </div>
                  <div className="mr-3">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Selected Tags */}
      {selectedTags.length > 0 && (
        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {selectedTags.map((tag) => (
              <div
                key={tag.id}
                className="inline-flex items-center px-3 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200"
              >
                <span className="ml-2">{tag.name}</span>
                <button
                  onClick={() => handleTagRemove(tag.id)}
                  className="mr-1 inline-flex items-center justify-center w-4 h-4 rounded-full text-blue-600 hover:bg-blue-200 focus:outline-none"
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
          
          <div className="mt-2 text-sm text-gray-600">
            {selectedTags.length === 1 
              ? `نمایش اخبار مرتبط با تگ "${selectedTags[0].name}"`
              : `نمایش اخبار مرتبط با ${selectedTags.length} تگ انتخاب شده`
            }
          </div>
        </div>
      )}

      {/* Filtered Articles Results */}
      {selectedTags.length > 0 && (
        <div className="mt-6">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-gray-600">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                در حال جستجو...
              </div>
            </div>
          ) : filteredArticles.length > 0 ? (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2 text-right">نتایج اخبار مرتبط:</h3>
              <ul className="space-y-2 text-right">
                {filteredArticles.map((article) => (
                  <li key={article.id}>
                    <a
                      href={`/news/${article.id}`}
                      className="flex items-center gap-3 hover:bg-blue-50 rounded p-2 transition-colors"
                    >
                      {article.imageUrl && (
                        <Image
                          src={article.imageUrl}
                          alt={article.title}
                          width={48}
                          height={48}
                          className="w-12 h-12 object-cover rounded-md border"
                        />
                      )}
                      <span className="text-sm font-medium text-blue-800 truncate text-right">
                        {article.title}
                        {article.agency?.name && (
                          <span className="text-gray-500 font-normal ml-2">| {article.agency.name}</span>
                        )}
                        <span className="flex items-center gap-1 text-gray-400 font-normal ml-2 inline-flex">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                          </svg>
                          {getRelativeTime(article.publishedAt)}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">هیچ خبری یافت نشد</h3>
              <p className="text-gray-500">
                هیچ خبری با تگ‌های انتخاب شده یافت نشد. لطفاً تگ‌های دیگری انتخاب کنید.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 