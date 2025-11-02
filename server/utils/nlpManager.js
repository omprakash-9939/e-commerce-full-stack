import { NlpManager } from "node-nlp";
const manager = new NlpManager({ languages: ["en"], forceNER: true });
manager.addRegexEntity("price", "en", /\b\d+\b/);


manager.addRegexEntity("price_comparison", "en", /\b(above|over|greater than|below|under|less than)\s+(\d+)\b/i);
manager.addRegexEntity("price_range", "en", /\bbetween\s+(\d+)\s+(and|to)\s+(\d+)\b/i);
manager.addNamedEntityText("category", "Women", ["en"], ["women", "ladies", "girls"]);
manager.addNamedEntityText("category", "Men", ["en"], ["men", "gents", "boys"]);
manager.addNamedEntityText("category", "Kids", ["en"], ["kids", "children"]);
manager.addNamedEntityText("subCategory", "Topwear", ["en"], ["tops", "shirts", "tshirts", "tees", "round neck", "topwear"]);
manager.addNamedEntityText("subCategory", "Shoes", ["en"], ["shoe", "shoes", "sneakers", "footwear"]);
manager.addNamedEntityText("date", "today", ["en"], ["today", "now"]);
manager.addNamedEntityText("date", "yesterday", ["en"], ["yesterday"]);
manager.addNamedEntityText("date", "last_week", ["en"], ["last week", "previous week"]);
manager.addNamedEntityText("date", "last_month", ["en"], ["last month", "previous month"]);
manager.addRegexEntity("email", "en", /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i);
manager.addNamedEntityText("name", "John", ["en"], ["John", "Johnny"]);
manager.addNamedEntityText("name", "Aditi", ["en"], ["Aditi", "Adi"]);


manager.addDocument("en", "hi", "greet");
manager.addDocument("en", "hello", "greet");
manager.addDocument("en", "hey", "greet");
manager.addDocument("en", "good morning", "greet");
manager.addDocument("en", "how are you", "ask.health");
manager.addDocument("en", "how's it going", "ask.health");
manager.addDocument("en", "what's up", "ask.health");



manager.addDocument("en", "show products cheaper than %price%", "search.products");
manager.addDocument("en", "find items under %price%", "search.products");
manager.addDocument("en", "list products below %price%", "search.products");
manager.addDocument("en", "show products above %price%", "search.products");
manager.addDocument("en", "items over %price%", "search.products");
manager.addDocument("en", "products between %price_range%", "search.products");
manager.addDocument("en", "show all bestseller products", "search.products");
manager.addDocument("en", "which are the best sellers", "search.products");
manager.addDocument("en", "show trending items", "search.products");
manager.addDocument("en", "Show me products added in last 15 days", "search.products");
manager.addDocument("en", "Give me products added today", "search.products");
manager.addDocument("en", "List items added in last week", "search.products");
manager.addDocument("en", "Show trending products from last month", "search.products");


manager.addDocument("en", "show me %category% products", "search.products");
manager.addDocument("en", "list %subCategory% in %category%", "search.products");
manager.addDocument("en", "show me kids topwear", "search.products");


manager.addDocument("en", "show me %category% %subCategory% cheaper than %price%", "search.products");
manager.addDocument("en", "list %subCategory% under %price% for %category%", "search.products");
manager.addDocument("en", "get %category% items from %date% under %price%", "search.products");
manager.addDocument("en", "show me %category% %subCategory% above %price%", "search.products");


// Intent: search.products.refine
manager.addDocument("en", "only bestsellers", "search.products.refine");
manager.addDocument("en", "just trending ones", "search.products.refine");
manager.addDocument("en", "filter to popular items", "search.products.refine");
manager.addDocument("en", "under %price%", "search.products.refine");
manager.addDocument("en", "above %price%", "search.products.refine");
manager.addDocument("en", "only %subCategory%", "search.products.refine");
manager.addDocument("en", "Show only bestsellers", "search.products.refine");
manager.addDocument("en", "Show trending items for women", "search.products.refine");



manager.addDocument("en", "show products", "search.products.incomplete");

// Users
manager.addDocument("en", "show all users", "search.users");
manager.addDocument("en", "find user with email %email%", "search.users");
manager.addDocument("en", "get info for %name%", "search.users");
manager.addDocument("en", "list all customers", "search.users");
manager.addDocument("en", "how many users do we have", "search.users");
manager.addDocument("en", "users from %date%", "search.users");



manager.addDocument("en", "Show me new users who registered in last 5 days", "search.users");
manager.addDocument("en", "Find users signed up today", "search.users");
manager.addDocument("en", "List all users from last week", "search.users");


manager.addDocument("en", "Find user with email john@example.com", "search.users");
manager.addDocument("en", "Get info for Aditi", "search.users");


manager.addDocument("en", "Show men's shoes under %price% added in last 7 days", "search.products");
manager.addDocument("en", "Show trending women's tops added in last month", "search.products");

/*ANSWERS*/
manager.addAnswer("en", "greet", "Hello, How can I help you today?");
manager.addAnswer("en", "ask.health", "I'm doing great, thanks for asking! How about you?");
manager.addAnswer("en", "search.products.incomplete", "Do you want a category, price filter, or all products?");
manager.addAnswer("en", "None", "Sorry, I didn’t understand. Did you mean products or users?");



manager.addAnswer("en", "search.products", "Here are the products matching your request.");
manager.addAnswer("en", "search.products", "These products were added as per your query.");
manager.addAnswer("en", "search.products", "Here’s what I found for your product search.");
manager.addAnswer("en", "search.products", "These trending products match your criteria.");


manager.addAnswer("en", "search.products", "Showing products based on your price filter.");
manager.addAnswer("en", "search.products", "Here are items above the price you requested.");
manager.addAnswer("en", "search.products", "These products fall within the price range you specified.");
manager.addAnswer("en", "search.products", "Here are affordable tops under your specified price.");


manager.addAnswer("en", "search.products", "Showing products from the category you requested.");
manager.addAnswer("en", "search.products", "Here are the items in that subcategory and price range.");
manager.addAnswer("en", "search.products", "These are the kids' footwear products under your filter.");


manager.addAnswer("en", "search.products.refine", "Here are the bestselling products as requested.");
manager.addAnswer("en", "search.products.refine", "These trending items match your filter.");


manager.addAnswer("en", "search.users", "Here are the new users registered recently.");
manager.addAnswer("en", "search.users", "These users signed up today.");
manager.addAnswer("en", "search.users", "Showing users registered within the last week.");


manager.addAnswer("en", "search.users", "Here is the user information you requested.");
manager.addAnswer("en", "search.users", "User details found based on your query.");


manager.addAnswer("en", "search.products", "Here are the products matching all your filters.");
manager.addAnswer("en", "search.products", "These items fit your price, category, and date criteria.");

/*TRAIN + EXPORT*/
(async () => {
  await manager.train();
  manager.save();
  console.log("NLP model trained and ready");
})();

export default manager;
