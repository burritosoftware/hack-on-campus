-- Create ratings table
CREATE TABLE IF NOT EXISTS ratings (
    recipe_id TEXT,
    rating TEXT,
    submitter TEXT,
    date TEXT
);

-- Create recipes table
CREATE TABLE IF NOT EXISTS recipes (
    recipe_id TEXT,
    name TEXT,
    description TEXT,
    author TEXT,
    rating TEXT,
    items TEXT
);

-- Create user_bookmarks table
CREATE TABLE IF NOT EXISTS user_bookmarks (
    owner_id TEXT,
    recipe_id TEXT,
    date_added TEXT
);

-- Insert data into recipes table
-- Insert rows only if they don't already exist in the recipes table
INSERT OR IGNORE INTO recipes (recipe_id, name, description, author, rating, items) VALUES
('o9ikg4NUd1Hd5-qP1qHp8', 'Pesto Corner Pasta',
 'Savor the perfect balance of tender grilled chicken, vibrant pesto pasta, and crispy herbed croutons for a fresh, flavorful twist on a classic dish.',
 'Zyjay Cruz', '4.5',
 '["67143e2e2b7b7acd380020b1", "67143e2e2b7b7acd38002064", "67143e2e2b7b7acd38002030", "67143e2e2b7b7acd38001f65", "67143e2e2b7b7acd38002588"]');

INSERT OR IGNORE INTO recipes (recipe_id, name, description, author, rating, items) VALUES
('PViU6vFPaUJ6ZLlVZTPGa', 'Cajun Parmesan Fries',
 'Indulge in crispy Cajun-spiced fries topped with a rich sprinkle of Parmesan for the ultimate savory snack with a spicy kick.',
 'Zyjay Cruz', '4.2',
 '["67143e2e2b7b7acd380020fb", "67143e2e2b7b7acd3800211d", "67143e2e2b7b7acd38001fd4", "67143e2e2b7b7acd38002569"]');

INSERT OR IGNORE INTO recipes (recipe_id, name, description, author, rating, items) VALUES
('awukZo6_dMaD1pT_tOaCv', 'Halal Fries Bowl',
 'Enjoy a hearty Halal fries bowl loaded with tender chicken, creamy guac, sour cream, and melted shredded cheese, all over crispy fries for a satisfying, flavor-packed meal.',
 'Zyjay Cruz', '4.8',
 '["67143e2e2b7b7acd380020fb", "67143e2e2b7b7acd38002167", "67143e2e2b7b7acd38002080", "67143e2e2b7b7acd3800206e", "67143e2e2b7b7acd38002069"]');

INSERT OR IGNORE INTO recipes (recipe_id, name, description, author, rating, items) VALUES
('f23ldj7nsglC_wVdFZcKk', 'Golden Arch''s Sausage Biscuits with Egg',
 'Enjoy a warm, buttery biscuit filled with a savory pork sausage patty, fluffy eggs, and topped with rich sausage gravy for a hearty breakfast delight.',
 'Zyjay Cruz', '5.0',
 '["67144d192b7b7acd389deaf4", "67144d192b7b7acd389deadb", "67144d192b7b7acd389deaea"]');
