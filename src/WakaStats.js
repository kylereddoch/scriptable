/******************************************************************************
 * Constants and Configurations
*****************************************************************************/

// NOTE: This script uses the Cache script (https://github.com/kylereddoch/scriptable/src/Cache.js)
// Make sure to add the Cache script in Scriptable as well!

// Cache keys and default location
const CACHE_KEY_LAST_UPDATED = 'last_updated';

// Date range for Waka data
const DATERANGE = 'last_7_days';

// Get current date and time
const updatedAt = new Date().toLocaleString();

// Font name and size
const FONT_NAME = 'Menlo';
const FONT_SIZE = 9;

// Colors
const COLORS = {
  bg0: '#29323c',
  bg1: '#1c1c1c',
};

// TODO: PLEASE SET THESE VALUES
const YOURNAME = 'TODO';
const WAKAUSER = 'TODO'; // Your wakatime username

/******************************************************************************
 * Initial Setups
*****************************************************************************/

// Import and setup Cache
const Cache = importModule('Cache');
const cache = new Cache('WakaStats');

// Fetch data and create widget
const data = await fetchData();
const widget = createWidget(data);

const bgColor = new LinearGradient();
    bgColor.colors = [new Color("#29323c"), new Color("#1c1c1c")];
    bgColor.locations = [0.0, 1.0];
    widget.backgroundGradient = bgColor;

Script.setWidget(widget);
Script.complete();

/******************************************************************************
 * Main Functions (Widget and Data-Fetching)
 *****************************************************************************/

/**
 * Main widget function.
 *
 * @param {} data The data for the widget to display
 */

function createWidget(data) {
  console.log(`Creating widget with data: ${JSON.stringify(data)}`);

  const widget = new ListWidget();
  const bgColor = new LinearGradient();
  bgColor.colors = [new Color(COLORS.bg0), new Color(COLORS.bg1)];
  bgColor.locations = [0.0, 1.0];
  widget.backgroundGradient = bgColor;
  widget.setPadding(10, 10, 10, 10);

  const stack = widget.addStack();
  stack.layoutVertically();
  stack.spacing = 4.85;
  stack.size = new Size(320, 0);

  // Line 0 - Title
  const titleLine = stack.addText('WakaStats for' + " " + YOURNAME + " | Last 7 Days");
  titleLine.textColor = Color.white();
  titleLine.textOpacity = 0.7;
  titleLine.font = new Font(FONT_NAME, FONT_SIZE);

  // Line 1 - Categories
  const categoriesLine = stack.addText('🗂 Categories:' + " " + data.waka.categories);
  categoriesLine.textColor = Color.white();
  categoriesLine.font = new Font(FONT_NAME, FONT_SIZE);

  // Line 2 - Editors
  const editorsLine = stack.addText('🛠 Editors:' + " " + data.waka.editors);
  editorsLine.textColor = Color.white();
  editorsLine.font = new Font(FONT_NAME, FONT_SIZE);

  // Line 3 - Languages
  const languagesLine = stack.addText('🌎 Languages:' + " " + data.waka.languages);
  languagesLine.textColor = Color.white();
  languagesLine.font = new Font(FONT_NAME, FONT_SIZE);

  // Line 4 - Daily Average Coding Time
  const dayAvLine = stack.addText('⏱ Daily Average:' + " " + data.waka.dayAv);
  dayAvLine.textColor = Color.white();
  dayAvLine.font = new Font(FONT_NAME, FONT_SIZE);

  // Line 5 - Total Coding Time
  const totalLine = stack.addText('⌛️ Total Time:' + " " + data.waka.total);
  totalLine.textColor = Color.white();
  totalLine.font = new Font(FONT_NAME, FONT_SIZE);

  // Line 6 - Operating Systems
  const opSysLine = stack.addText('🖥 Operating Systems Used:' + " " + data.waka.opSys);
  opSysLine.textColor = Color.white();
  opSysLine.font = new Font(FONT_NAME, FONT_SIZE);

// Line 6 - Updated time
  const updatedTime = stack.addText('Last updated:' + " " + updatedAt);
  updatedTime.textColor = Color.white();
  updatedTime.textOpacity = 0.7;
  updatedTime.font = new Font(FONT_NAME, 7);

  return widget;
}

/*
 * Fetch pieces of data for the widget.
 */

async function fetchData() {
  // Get the waka data
  const waka = await fetchWaka();

  // Get last data update time (and set)
  const lastUpdated = await getLastUpdated();
  cache.write(CACHE_KEY_LAST_UPDATED, new Date().getTime());

  return {
    waka,
    lastUpdated,
  };
}

/******************************************************************************
 * Helper Functions
 *****************************************************************************/

//-------------------------------------
// Wakatime Helper Functions
//-------------------------------------

/*
 * Fetch the stats from Wakatime
 */

async function fetchWaka() {

  const url = "https://wakatime.com/api/v1/users/" + WAKAUSER + "/stats/" + DATERANGE;

  const data = await fetchJson(url);

  if (!data) {
    return 'No data found';
    }

  return {
    categories: data.data.categories.map(e => e.name).join(", "),
    editors: data.data.editors.map(e => e.name).join(", "),
    languages: data.data.languages.map(e => e.name).join(", "),
    dayAv: data.data.human_readable_daily_average,
    total: data.data.human_readable_total,
    opSys: data.data.operating_systems.map(e => e.name).join(", "),
  }
}

//-------------------------------------
// Misc. Helper Functions
//-------------------------------------

/**
 * Make a REST request and return the response
 *
 * @param {*} url URL to make the request to
 * @param {*} headers Headers for the request
 */

async function fetchJson(url, headers) {
  try {
    console.log('Fetching url: ${url}');
    const req = new Request(url);
    req.headers = headers;
    const resp = await req.loadJSON();
    return resp;
  } catch (error) {
    console.error('Error fetching from url: ${url}, error: ${JSON.stringify(error)}');
  }
}

/*
 * Get the last updated timestamp from the Cache.
 */

async function getLastUpdated() {
  let cachedLastUpdated = await cache.read(CACHE_KEY_LAST_UPDATED);

  if (!cachedLastUpdated) {
    cachedLastUpdated = new Date().getTime();
    cache.write(CACHE_KEY_LAST_UPDATED, cachedLastUpdated);
  }

  return cachedLastUpdated;
}