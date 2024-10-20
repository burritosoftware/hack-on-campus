-- Create ratings table
CREATE TABLE ratings (
    recipe_id TEXT,
    rating TEXT,
    submitter TEXT,
    date TEXT
);

-- Create recipes table
CREATE TABLE recipes (
    recipe_id TEXT,
    name TEXT,
    description TEXT,
    author TEXT,
    rating TEXT,
    items TEXT
);

-- Create user_bookmarks table
CREATE TABLE user_bookmarks (
    owner_id TEXT,
    recipe_id TEXT,
    date_added TEXT
);