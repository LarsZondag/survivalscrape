const app = require('./app.js');
const parsers = require('./parsers/');


/**
 * Loop over seasons
 */
app.seasons.forEach(season => {
  /**
   * get all runs
   */
  parsers.getRunsInSeason(season).then(runs => {
    /**
     * Loop over all runs
     */
    runs.forEach(run => {
      console.log(run.date);
    // save the run if not yet present
  
    /**
     * If (link available && final results are not available): get enrollments
     */
    
    /**
     * If (final results are available and these have not yet been retrieved): get final results
     */
    
    })
    
  });
})


