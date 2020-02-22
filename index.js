require('dotenv').config()
const app = require('./app.js');
const parsers = require('./parsers/');
const db = require('./models');
const R = require('ramda');

/**
 * Loop over seasons
 */
app.seasons.forEach(season => {
  /**
   * get all runs
   */
  parsers.getRunsInSeason(season).then(runs => {

    // Standard transformations for all runs:
    const transformations = {
      location: R.pipe(R.split('('), R.nth(0))
    }
    /**
     * Loop over all runs
     */
    runs.forEach(run => {
      run = R.evolve(transformations, run);

      db.Run.findOrCreate({where: {location: run.location, organiser: run.organiser.text, website: run.organiser.href}});
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


