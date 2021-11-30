/******************************************************************************
 * Constants and Configurations
*****************************************************************************/

// NOTE: This script uses the Cache script (https://github.com/yaylinda/scriptable/blob/main/Cache.js)
// Make sure to add the Cache script in Scriptable as well!

// Cache keys and default location
const CACHE_KEY_LAST_UPDATED = 'last_updated';
 
// Font name and size
const FONT_NAME = 'Menlo';
const FONT_SIZE = 10;

// Colors
const COLORS = {
  bg0: '#29323c',
  bg1: '#1c1c1c',
};

// TODO: PLEASE SET THESE VALUES
const YOURNAME = 'Kyle';
const WAKAUSER = 'kylereddoch'; // Your wakatime username

/******************************************************************************
 * Initial Setups
*****************************************************************************/

// Import and setup Cache
const Cache = importModule('Cache');
const cache = new Cache('WakaStats');

// Fetch data and create widget
const data = await fetchWaka();
const widget = createWidget(data);

const DATERANGE = 'last_7_days';
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
  widget.setPadding(10, 15, 15, 10);

  const stack = widget.addStack();
  stack.layoutVertically();
  stack.spacing = 4;
  stack.size = new Size(320, 0);

  // Line 0 - Name
  const nameLine = stack.addText('WakaStats for' + " " + YOURNAME + " " + "| Last 7 days");
  nameLine.textColor = Color.white();
  nameLine.textOpacity = 0.7;
  nameLine.font = new Font(FONT_NAME, FONT_SIZE);

  // Line 1 - Categories
  const categoriesLine = stack.addText('Categories: ${data.categories.name}');
  categoriesLine.textColor = Color.white();
  categoriesLine.font = new Font(FONT_NAME, FONT_SIZE);

  // Line 2 - Editors
  const editorsLine = stack.addText('Editors: ${data.editors.name}');
  editorsLine.textColor = Color.white();
  editorsLine.font = new Font(FONT_NAME, FONT_SIZE);

  // Line 3 - Languages
  const languagesLine = stack.addText('Languages: ${data.languages.name}');
  languagesLine.textColor = Color.white();
  languagesLine.font = new Font(FONT_NAME, FONT_SIZE);

  // Line 4 - Daily Average Coding Time
  const dayAvLine = stack.addText('Daily Average: ${data.human_readable_daily_average}');
  dayAvLine.textColor = Color.white();
  dayAvLine.font = new Font(FONT_NAME, FONT_SIZE);
  
  // Line 5 - Total Coding Time
  const totalLine = stack.addText('Total: ${data.human_readable_total}');
  totalLine.textColor = Color.white();
  totalLine.font = new Font(FONT_NAME, FONT_SIZE);

  // Line 6 - Operating Systems
  const opSysLine = stack.addText('Operating Systems Used: ${data.operating_systems.name}');
  opSysLine.textColor = Color.white();
  opSysLine.font = new Font(FONT_NAME, FONT_SIZE);

  return widget;
}

/**
 * Fetch pieces of data for the widget.
 */
async function fetchWaka() {

  // Get last data update time (and set)
  const lastUpdated = await getLastUpdated();
  cache.write(CACHE_KEY_LAST_UPDATED, new Date().getTime());

  return {
    nameLine,
    categoriesLine,
    editorsLine,
    languagesLine,
    dayAvLine,
    totalLine,
    opSysLine,
    lastUpdated,
  };
}

/******************************************************************************
 * Helper Functions
 *****************************************************************************/

/**
 * Fetch the data from WakaStats */
async function fetchWaka() {
  const url = 'https://wakatime.com//api/v1/users/" + WAKAUSER + "/stats/" + DATERANGE';  
  }// 
// const fetch = await fetchJson(url);

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
