/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

$(function() {
  // Test suite for the main content, allFeeds section
  describe('RSS Feeds', function() {
    /* Tests to make sure that the allFeeds variable has been defined and
    /* that it is not empty.
    */
    it('are defined', function() {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length).not.toBe(0);
    });

    /* Test that loops through each feed in the allFeeds object
    /* and ensures it has a URL defined, and that the URL is not empty.
    */
    it('each have a URL defined that is not empty', function() {
      //urlChecks increments for each URL found in allFeeds
      let urlChecks = 0;
      for (feed of allFeeds) {
        if (feed.url && feed.url != null) {
          urlChecks += 1;
        }
      }

      //Checks that number of URLs counted matches number of feeds
      expect(urlChecks).toBe(allFeeds.length);
    });


    /* Test that loops through each feed
     * in the allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     */
    it('each have a name defined that is not empty', function() {
      // The nameChecks variable increments for each name found in allFeeds
      let nameChecks = 0;

      for (feed of allFeeds) {
        if (feed.name && feed.name != null) {
          nameChecks +=1;
        }
      }

      //Checks that number of names counted matches number of feeds
      expect(nameChecks).toBe(allFeeds.length);
    });
  });


  // Test suite for the sliding menu
  describe('The menu', function() {

    /* Test that ensures the menu element is
    * hidden by default.
    */
    it('should be hidden by default', function() {
      const bodyClassList = document.querySelector('body').classList;

      expect(bodyClassList.contains('menu-hidden')).toBe(true);
    });

    /* Test that ensures the menu changes
    * visibility when the menu icon is clicked. This test
    * has two expectations: does the menu display when
    * clicked and does it hide when clicked again.
    */
    it('should toggle between visible/hidden when clicked', function() {
      const bodyClassList = document.querySelector('body').classList;
      const menuIcon = document.querySelector('.menu-icon-link');

      const click = new Event('click');

      // Confirm that menu-hidden class is toggled when menuIcon is clicked
      menuIcon.dispatchEvent(click);
      expect(bodyClassList.contains('menu-hidden')).toBe(false);

      menuIcon.dispatchEvent(click);
      expect(bodyClassList.contains('menu-hidden')).toBe(true);
    });
  });

  // Test suite for initial feed load
  describe('Initial Entries', function() {

    /* Test that ensures when the loadFeed
    * function is called and completes its work, there is at least
    * a single .entry element within the .feed container.
    */
    const feedContainer = document.querySelector('.feed');

    beforeEach(function(done) {
      loadFeed(0, done);
    });

    it('should load at least one entry', function(done) {
      // Create list of <a> elements in feed
      const feedArticles = feedContainer.children;
      // Instantiate variable to monitor if article with "entry" class is present
      let checkEntry = false;

      // Check each <a> element's children elements (<article>s for "entry" class)
      for (article of feedArticles) {
        if (article.firstElementChild.classList.contains('entry')) {
          // Set checkEntry to true if at least one <article> has "entry" class
          checkEntry = true;
        };
      };

      expect(checkEntry).toBe(true);
      done();
    });
  });

  // Test suite for loading new feed
  describe('New Feed Selection', function() {

    /* Test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     */
    const feedContainer = document.querySelector('.feed');
    const originalFeed = [];

    beforeEach(function(done) {
      loadFeed(0);
      // Establish array of elements from original feed
      for (feed of feedContainer.children) {
        originalFeed.push(feed);
      };
      loadFeed(1, done);
    });

    it('should load new content when loadFeed runs', function() {
      const newFeed = [];
      // Establish array of elements after loadFeed has been run again
      for (feed of feedContainer.children) {
        newFeed.push(feed);
      };

      expect(originalFeed).not.toBe(newFeed);
    });
  });
});
