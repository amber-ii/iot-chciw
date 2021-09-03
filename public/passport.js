(function () {
    'use strict';
  
    /**
     * Module dependencies
     */
  
    const passport = require('passport');
    const LocalStrategy = require('passport-local').Strategy;
    const mssql = require('mssql');
    let config = {
        server: 'kepdb',
        database: 'KEP',
        user: 'sa',
        password: 'jack1021',
        port: 1433,
        options: {
            "encrypt": false,
            "enableArithAbort": true
        }
    };
    var connection = new mssql.ConnectionPool(config);
    connection.connect();

    const bcrypt = require('bcrypt-nodejs');
  
    /**
     * Query definitions
     */
  
    const deserializeQuery = 'SELECT * FROM [dbo].[userlist] WHERE [id] =';
    const strategyQuery = 'SELECT [id], [username], [password], [permission] FROM [userlist] WHERE [username] = @usernameParam';
  
    /**
     * Expose
     */
  
    module.exports = function () {
      // serialize sessions
      passport.serializeUser((user, done) => {
        done(null, user.id);
      });
  
      passport.deserializeUser((id, done) => {
        const request = new sql.Request(connection);
        request.query(`${deserializeQuery} ${id}`, (err, recordset) => {
          done(err, recordset[0]);
        });
      });
  
      // use local strategy
      passport.use(new LocalStrategy(
        (username, password, done) => {
          const ps = new sql.PreparedStatement(connection);
          ps.input('usernameParam', sql.VarChar);
          ps.prepare(strategyQuery, (err) => {
            // catch prepare error
            if (err) {
              return done(err);
            }
  
            ps.execute({
              usernameParam: username,
            }, (err, recordset) => {
              // catch execute error
              if (err) {
                return done(err);
              }
  
              ps.unprepare((err) => {
                // catch unprepare error
                if (err) {
                  return done(err);
                }
              });
  
              // user does not exist
              if (recordset.length <= 0) {
                return done(null, false, {
                  message: 'Invalid username or password',
                });
              }
              else {
                const user = recordset[0];
                // compare input to hashed password in database
                const isValid = bcrypt.compareSync(password, user.password);
  
                if (isValid) {
                  // user
                  return done(null, user);
                }
                else {
                  // password is invalid
                  return done(null, false, {
                    message: 'Invalid username or password',
                  });
                }
              }
            });
          });
        }));
    };
  })();