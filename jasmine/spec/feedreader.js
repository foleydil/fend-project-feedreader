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

    // Run async loadFeed function to completion before test
    beforeEach(function(done) {
      loadFeed(0, done);
    });

    it('should load at least one entry', function(done) {
      // Create list of elements with 'feed' and 'entry' class
      const feedArticles = document.querySelectorAll('.feed .entry');

      // Ensure the collection of feedArticles includes at least one entry item
      expect(feedArticles.length).toBeGreaterThan(0);
      done();
    });
  });

  // Test suite for loading new feed
  describe('New Feed Selection', function() {

    /* Test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     */
    const feedContainer = document.querySelector('.feed');
    // Instantiate array of elements for original feed
    let originalFeed = '';
    // Instantiate array of elements after loadFeed has been run again
    let newFeed = '';

    beforeEach(function(done) {
      // Run initial load and put each feed element into an array
      loadFeed(0, function() {
        originalFeed = feedContainer.innerHTML;

        // Re-load the feeds and put each feed element into an array
        loadFeed(1, function() {
          newFeed = feedContainer.innerHTML;
          done();
        });
      });
    });

    it('should load new content when loadFeed runs', function() {
      expect(originalFeed).not.toBe(newFeed);
    });
  });
});
